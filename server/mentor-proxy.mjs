// Optional Hardware Mentor AI proxy. Keeps the API key on the server; the browser only
// ever sees VITE_MENTOR_ENDPOINT. No dependencies: Node 18+ (global fetch).
//
//   ANTHROPIC_API_KEY=...  ALLOWED_ORIGIN=https://your.site  node server/mentor-proxy.mjs
//
// Optional: PORT (default 8787), MENTOR_MODEL (default claude-sonnet-5-5).
import { createServer } from 'node:http';

const API_KEY = process.env.ANTHROPIC_API_KEY;
const ORIGIN = process.env.ALLOWED_ORIGIN ?? 'http://localhost:5173';
const PORT = Number(process.env.PORT ?? 8787);
const MODEL = process.env.MENTOR_MODEL ?? 'claude-sonnet-5-5';
const MAX_BODY = 4_000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

if (!API_KEY) {
  console.error('ANTHROPIC_API_KEY is not set — refusing to start.');
  process.exit(1);
}

const SYSTEM = `You are "Hardware Mentor AI", a tutor inside PC INSIDE 360°, a university computer-hardware lab.
Rules:
- Answer in the language requested (th = Thai, en = English). Keep English technical terms in parentheses in Thai answers.
- Be accurate. Never invent product specifications, benchmark numbers or compatibility claims. When a value depends on product generation, say so. If unsure, say you are unsure and point to the lesson.
- Use one short analogy when it helps a beginner. 3–6 sentences.
- Relate the answer to the component the student is viewing when relevant, and suggest one next activity (a lesson, the assembly lab or a quiz).
- If the student asks for a quiz answer, give a hint and the reasoning path, not the letter.
- Never give instructions to open a power supply or work on mains-powered internals.`;

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  res.end(JSON.stringify(body));
}

const clean = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');

createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });
  if (limited(req.socket.remoteAddress ?? 'unknown')) return send(res, 429, { error: 'too many requests' });

  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > MAX_BODY) req.destroy();
  });
  req.on('end', async () => {
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return send(res, 400, { error: 'invalid json' });
    }
    const question = clean(body.question, 800).trim();
    if (!question) return send(res, 400, { error: 'question required' });
    const lang = body.lang === 'en' ? 'en' : 'th';
    const ctx = body.context ?? {};
    const user = `lang=${lang}\nviewing component=${clean(ctx.selected, 40) || 'none'}\ncurrent lesson=${clean(ctx.lesson, 10) || 'none'}\nscreen=${clean(ctx.view, 20)}\n\nQuestion: ${question}`;
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: MODEL, max_tokens: 600, system: SYSTEM, messages: [{ role: 'user', content: user }] }),
      });
      if (!r.ok) {
        console.error('upstream error', r.status, await r.text());
        return send(res, 502, { error: 'upstream error' });
      }
      const data = await r.json();
      const answer = (data.content ?? []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
      return send(res, 200, { answer });
    } catch (e) {
      console.error('proxy failure', e);
      return send(res, 502, { error: 'proxy failure' });
    }
  });
}).listen(PORT, () => console.log(`Hardware Mentor proxy on :${PORT} (origin ${ORIGIN}, model ${MODEL})`));
