import { useSearchParams, useNavigate } from 'react-router-dom';
import Playground from '../../components/Playground';

export default function PlaygroundPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Payload disimpan di sessionStorage agar tetap ada walau eo:dev melakukan
  // full reload saat pindah route (history state hilang pada full reload).
  const id = params.get('p');
  const from = params.get('from');
  let payload = {};
  try {
    payload = id ? JSON.parse(sessionStorage.getItem(id) || '{}') : {};
  } catch {
    payload = {};
  }

  const code = payload.code || '';
  const lang = payload.lang || 'html';

  let initialHtml = '';
  let initialCss = '';
  let initialJs = '';
  if (lang === 'css') initialCss = code;
  else if (lang === 'js' || lang === 'javascript') initialJs = code;
  else initialHtml = code; // html / tidak dikenal -> panel HTML

  return (
    <Playground
      initialHtml={initialHtml}
      initialCss={initialCss}
      initialJs={initialJs}
      title={payload.title}
      onBack={() => navigate(from || '/')}
    />
  );
}
