const LEARN_API = '/api/learn';

export async function fetchTracks() {
  const res = await fetch(LEARN_API);
  if (!res.ok) throw new Error(`/api/learn ${res.status}`);
  return (await res.json()).tracks || [];
}

export async function fetchTrack(slug) {
  const res = await fetch(`${LEARN_API}?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`/api/learn?slug=${slug} ${res.status}`);
  return res.json();
}