// EdgeOne Makers Agent — asisten chat CodeLearn.
// Route: agents/chat/index.js -> POST /chat
// Entry point di-syaratkan bernama `onRequest(context)`; semua kapabilitas
// diinjeksi lewat object context:
//   - context.request.body        : body JSON yang sudah di-parse
//   - context.conversation_id     : session id, diambil dari header Makers-Conversation-Id
//   - context.store               : conversation storage (persisten lintas instance)
//   - context.env                 : environment variables (AI_GATEWAY_*)

const DEFAULT_MODEL = '@makers/deepseek-v4-flash';
const DEFAULT_GATEWAY = 'https://ai-gateway.edgeone.link/v1';

const DEFAULT_SYSTEM_PROMPT = `Kamu adalah "Q", asisten tutor belajar coding dari CodeLearn. Kamu bicara dengan santai dan natural persis seperti tutor manusia yang lagi ngobrol sama muridnya lewat chat — bukan robot yang menjawab kaku.

## Cara Kamu Bicara
1. Natural & tidak kaku: jangan mulai dengan kalimat sapaan generik seperti "Halo! 👋" atau "Selamat datang!". Langsung saja ke topik, seolah lagi meneruskan obrolan.
2. Pendek & padat: jawab singkat dulu, detail menyusul kalau diminta. Jangan bertele-tele.
3. Gunakan kata sapaan ringan hanya sesekali ("oh iya", "oke", "iya bener"), sesuai konteks.
4. Lanjutkan percakapan: akhiri dengan satu pertanyaan lanjutan yang relevan supaya pengguna makin paham — bukan pertanyaan kosong seperti "mau mulai dari mana?".
5. Jelaskan konsep dulu dengan bahasa sederhana, baru kasih contoh kode singkat (\\\`\\\`\\\`html/css/js) kalau membantu.
6. Untuk soal/error: ajak baca pesan errornya, sebut baris & kolom, jelaskan penyebab umum, lalu tawarkan perbaikan — biarkan pengguna mencoba dulu (metode Socratic).
7. Ikuti bahasa pengguna: kalau dia Indonesia, jawab Indonesia.

## Batasan
- Jangan ngaku manusia: kamu asisten AI dari CodeLearn, tapi bicaralah wajar tanpa menyebut itu terus-menerus.
- Jangan sebut detail internal sistem, API key, atau konfigurasi.
- Jangan menulis kode berbahaya (XSS, injeksi, malware).
- Jangan pakai emoji berlebihan — maksimal satu kali per jawaban, itupun kalau pas.

## Konteks Halaman
Jika ada konteks halaman saat ini (judul/URL/isi), pakai untuk menjawab tentang halaman yang sedang dibuka pengguna. Contoh: kalau pengguna di halaman "Learn HTML", ajak membahas HTML dengan contoh yang dekat dengan materi yang sedang dia lihat.`;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Makers-Conversation-Id',
  };
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...corsHeaders() },
  });

// Fallback memori in-proses bila context.store (conversation storage) gagal.
const _memory = new Map();

async function appendMessage(context, conversationId, role, content) {
  try {
    if (context.store && typeof context.store.appendMessage === 'function') {
      await context.store.appendMessage({ conversationId, role, content });
      return;
    }
  } catch (err) {
    console.warn('[chat] conversation storage gagal, pakai memori in-proses:', err?.message || err);
  }
  const list = _memory.get(conversationId) || [];
  list.push({ role, content, createdAt: Date.now() });
  _memory.set(conversationId, list);
}

async function getHistory(context, conversationId) {
  try {
    if (context.store && typeof context.store.getMessages === 'function') {
      const msgs = await context.store.getMessages({ conversationId, limit: 50 });
      if (msgs && msgs.length) return msgs;
      return _memory.get(conversationId) || [];
    }
  } catch (err) {
    console.warn('[chat] getMessages gagal, pakai memori in-proses:', err?.message || err);
  }
  return _memory.get(conversationId) || [];
}

function toChatMessages(history) {
  const out = [];
  for (const m of history || []) {
    const role = m.role;
    const content = typeof m.content === 'string' ? m.content : JSON.stringify(m.content);
    if (content) out.push({ role, content });
  }
  return out;
}

function buildSystemPrompt(env, pageContext) {
  let prompt = env.SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;
  if (
    pageContext &&
    typeof pageContext === 'object' &&
    (pageContext.title || pageContext.content)
  ) {
    prompt += '\n\n---\n## Konteks Halaman Saat Ini\n';
    if (pageContext.title) prompt += `**Judul:** ${String(pageContext.title)}\n`;
    if (pageContext.url) prompt += `**URL:** ${String(pageContext.url)}\n`;
    if (pageContext.content) {
      prompt += `\n**Isi Halaman:**\n${String(pageContext.content).slice(0, 6000)}\n`;
    }
    prompt +=
      '\n---\nGunakan konteks halaman ini untuk menjawab pertanyaan tentang halaman yang sedang dibuka.';
  }
  return prompt;
}

async function chatCompletion(env, systemPrompt, history) {
  const apiKey = env.AI_GATEWAY_API_KEY;
  if (!apiKey) throw new Error('AI_GATEWAY_API_KEY belum diset');

  const baseURL = (env.AI_GATEWAY_BASE_URL || DEFAULT_GATEWAY).replace(/\/$/, '');
  const model = env.AI_GATEWAY_MODEL || DEFAULT_MODEL;

  const res = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...history],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`LLM gateway ${res.status}`);
  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;
  return typeof reply === 'string' ? reply.trim() : '';
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  let body = context.request.body;
  if (!body || typeof body !== 'object') {
    try {
      body = await context.request.json();
    } catch {
      body = {};
    }
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) return json({ error: "'message' is required" }, 400);

  const env = context.env ?? {};
  const conversationId = context.conversation_id || body.conversation_id || '';
  const pageContext = body.pageContext;

  try {
    // 1) Simpan pesan user (conversation storage, fallback memori in-proses).
    await appendMessage(context, conversationId, 'user', message);

    // 2) Ambil riwayat percakapan.
    const history = await getHistory(context, conversationId);

    // 3) Panggil model via AI Gateway.
    const reply = await chatCompletion(env, buildSystemPrompt(env, pageContext), toChatMessages(history));

    // 4) Simpan jawaban assistant.
    await appendMessage(context, conversationId, 'assistant', reply);

    return json({ reply, conversationId });
  } catch (err) {
    console.error('[chat]', err);
    return json({ error: err?.message || 'Internal error' }, 500);
  }
}