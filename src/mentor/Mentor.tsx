import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useApp } from '../store/appStore';
import { componentById, hotspotById, lessonById, mentorQA } from '../data';
import type { L, MentorQA } from '../data/types';
import { Icon } from '../components/Icon';
import { findAnswer, suggestions } from './match';
import type { MentorContext } from './match';

/** Optional server-side proxy (holds the AI API key). Unset = curated offline mode. */
const ENDPOINT: string | undefined = import.meta.env.VITE_MENTOR_ENDPOINT;
const REQUEST_TIMEOUT_MS = 20_000;

interface Msg {
  from: 'me' | 'bot';
  text: string;
  entry?: MentorQA;
  source?: 'ai' | 'curated' | 'none';
}

async function askRemote(question: string, ctx: Record<string, string>, lang: string): Promise<string> {
  if (!ENDPOINT) throw new Error('no endpoint');
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question.slice(0, 800), context: ctx, lang }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    if (typeof data === 'object' && data && 'answer' in data && typeof (data as { answer: unknown }).answer === 'string') {
      return (data as { answer: string }).answer;
    }
    throw new Error('bad response');
  } finally {
    window.clearTimeout(timer);
  }
}

const NO_MATCH: L = {
  th: 'ขอโทษครับ ยังไม่มีคำตอบที่ตรวจสอบแล้วสำหรับคำถามนี้ในโหมดออฟไลน์ ลองถามด้วยคำสำคัญ เช่น "CPU", "แรม", "SATA กับ NVMe", "M.2 อยู่ตรงไหน" หรือเปิดแท็บข้อมูลของชิ้นส่วนที่เลือกอยู่',
  en: 'Sorry — there is no verified answer for that in offline mode yet. Try keywords such as "CPU", "RAM", "SATA vs NVMe", "where is the M.2 socket", or open the selected part\'s Inspector tabs.',
};

/** Floating "Hardware Mentor AI": context-aware help, honest about its mode. */
export function Mentor() {
  const lang = useApp((s) => s.lang);
  const open = useApp((s) => s.mentorOpen);
  const selected = useApp((s) => s.selected);
  const lessonId = useApp((s) => s.lessonId);
  const view = useApp((s) => s.view);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lessonFocus = lessonId ? lessonById[lessonId]?.steps.find((s) => s.focus)?.focus : undefined;
  const ctx: MentorContext = { selected, lessonTopic: lessonFocus };

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [msgs, busy]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') useApp.getState().setMentorOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setText('');
    setMsgs((m) => [...m, { from: 'me', text: q }]);
    const curated = findAnswer(mentorQA, q, ctx);
    if (ENDPOINT) {
      setBusy(true);
      try {
        const answer = await askRemote(q, { selected: selected ?? '', lesson: lessonId ?? '', view }, lang);
        setMsgs((m) => [...m, { from: 'bot', text: answer, source: 'ai', entry: curated ?? undefined }]);
        return;
      } catch {
        // Fall through to the curated answer and say so.
      } finally {
        setBusy(false);
      }
    }
    setMsgs((m) => [...m, curated ? { from: 'bot', text: curated.a[lang], entry: curated, source: 'curated' } : { from: 'bot', text: NO_MATCH[lang], source: 'none' }]);
  };
  const submit = (e: FormEvent) => { e.preventDefault(); void ask(text); };
  const show = (entry: MentorQA) => {
    if (!entry.point) return;
    const s = useApp.getState();
    if (s.view !== 'explore') s.go('explore');
    s.select(entry.point.part);
    if (entry.point.hotspot) s.setHotspot(entry.point.hotspot);
  };

  const chips = suggestions(mentorQA, ctx, 4);
  return (
    <>
      <button type="button" className={`mentor-fab${open ? ' is-open' : ''}`} aria-expanded={open} aria-controls="mentor-panel" onClick={() => useApp.getState().setMentorOpen(!open)}>
        <Icon name={open ? 'close' : 'chat'} size={22} />
        <span>Hardware Mentor</span>
      </button>
      {open && (
        <section id="mentor-panel" className="mentor" role="dialog" aria-label="Hardware Mentor AI">
          <header>
            <span className="mentor__avatar" aria-hidden="true"><Icon name="sparkle" size={18} /></span>
            <div>
              <b>Hardware Mentor AI</b>
              <small>{ENDPOINT ? (lang === 'th' ? 'เชื่อมต่อ AI ผ่านเซิร์ฟเวอร์' : 'AI via server proxy') : (lang === 'th' ? 'โหมดออฟไลน์ · คำตอบที่คัดสรรและตรวจสอบแล้ว' : 'Offline mode · curated, verified answers')}</small>
            </div>
          </header>
          {selected && <p className="mentor__ctx">{lang === 'th' ? 'กำลังดู:' : 'Viewing:'} <b>{componentById[selected].name[lang]}</b></p>}
          <div className="mentor__list" ref={listRef} aria-live="polite">
            {msgs.length === 0 && (
              <p className="mentor__hello">{lang === 'th' ? 'สวัสดีครับ ถามเรื่องฮาร์ดแวร์ได้ทั้งภาษาไทยและอังกฤษ ผมจะตอบโดยอ้างอิงชิ้นส่วนที่คุณกำลังดูอยู่' : 'Hi! Ask about hardware in Thai or English. I take the part you are viewing into account.'}</p>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`msg msg--${m.from}`}>
                <p>{m.text}</p>
                {m.entry?.point && (
                  <button type="button" className="linkish" onClick={() => show(m.entry as MentorQA)}>
                    <Icon name="cube" size={14} /> {lang === 'th' ? 'ดูในโมเดล 3 มิติ' : 'Show me in 3D'}{m.entry.point.hotspot ? `: ${hotspotById[m.entry.point.hotspot]?.name[lang] ?? ''}` : ''}
                  </button>
                )}
                {m.entry?.next && <p className="msg__next"><b>{lang === 'th' ? 'ขั้นต่อไป:' : 'Next:'}</b> {m.entry.next[lang]}</p>}
                {m.from === 'bot' && m.source === 'ai' && <small className="muted">{lang === 'th' ? 'คำตอบจาก AI — ตรวจสอบกับเนื้อหาบทเรียนเสมอ' : 'AI-generated — always check against the lesson content'}</small>}
              </div>
            ))}
            {busy && <div className="msg msg--bot"><span className="typing"><i /><i /><i /></span></div>}
          </div>
          <div className="mentor__chips">
            {chips.map((c) => <button key={c.id} type="button" className="chip" onClick={() => void ask(c.q[lang])}>{c.q[lang]}</button>)}
          </div>
          <form className="mentor__form" onSubmit={submit}>
            <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder={lang === 'th' ? 'พิมพ์คำถาม…' : 'Type a question…'} aria-label={lang === 'th' ? 'คำถาม' : 'Question'} maxLength={800} />
            <button type="submit" className="tool" aria-label={lang === 'th' ? 'ส่ง' : 'Send'} disabled={!text.trim() || busy}><Icon name="send" /></button>
          </form>
        </section>
      )}
    </>
  );
}
