import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { lessons, quizBank } from '../data';
import type { L } from '../data/types';

/**
 * Clearly labelled DEMONSTRATION dataset. There is no backend in this build, so real class
 * analytics cannot exist yet; these numbers only illustrate what the dashboard will show.
 */
const DEMO = {
  students: 42,
  completion: [95, 88, 81, 74, 69, 62, 55, 40, 33, 21],
  distribution: [1, 3, 6, 11, 14, 7],
  misconceptions: [
    { th: 'คิดว่า RAM เก็บข้อมูลได้ถาวรเมื่อปิดเครื่อง', en: 'Believing RAM keeps data after power-off', pct: 38 },
    { th: 'สับสนระหว่างรูปทรง M.2 กับโปรโตคอล NVMe', en: 'Confusing the M.2 form factor with the NVMe protocol', pct: 33 },
    { th: 'ต่อสายจอเข้าพอร์ตเมนบอร์ดทั้งที่มีการ์ดจอแยก', en: 'Plugging the monitor into the motherboard when a GPU is installed', pct: 27 },
    { th: 'คิดว่าซ็อกเก็ตตรงกันแปลว่าเข้ากันได้เสมอ (ลืมเรื่องเฟิร์มแวร์)', en: 'Assuming a matching socket guarantees compatibility (forgetting firmware)', pct: 24 },
  ] as (L & { pct: number })[],
};
const BINS = ['0–19', '20–39', '40–59', '60–69', '70–84', '85–100'];

/** Screen 10: optional instructor dashboard — demonstration data, explicitly marked. */
export function InstructorView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const p = useProgress();
  const maxBin = Math.max(...DEMO.distribution);
  const myMissed = Object.entries(p.missed).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="page instructor">
      <header className="page__head">
        <div>
          <p className="eyebrow">{t('navInstructor')}</p>
          <h1>{lang === 'th' ? 'แดชบอร์ดผู้สอน' : 'Instructor dashboard'}</h1>
          <p>{lang === 'th' ? 'ตัวอย่างหน้าจอสำหรับผู้สอน การเก็บข้อมูลทั้งชั้นเรียนต้องมีระบบหลังบ้านพร้อมการยืนยันตัวตนและสิทธิ์การเข้าถึง ซึ่งยังไม่ได้เชื่อมต่อในเวอร์ชันนี้' : 'A preview of the instructor view. Class-wide data needs an authenticated backend with access control, which is not connected in this build.'}</p>
        </div>
      </header>
      <div className="demo-banner" role="note">
        <b>{t('demoData')}</b> — {lang === 'th' ? 'ตัวเลขในส่วนนี้เป็นข้อมูลสมมุติเพื่อสาธิตเท่านั้น ไม่ใช่ข้อมูลของนักศึกษาจริง' : 'figures in this section are invented for demonstration only and are not real student data.'}
      </div>
      <div className="bento">
        <div className="stat card is-demo"><span>{lang === 'th' ? 'นักศึกษาที่เข้าร่วม' : 'Participating students'}</span><b>{DEMO.students}</b><em>{t('demoData')}</em></div>
        <div className="stat card is-demo"><span>{lang === 'th' ? 'คะแนนแบบทดสอบเฉลี่ย' : 'Mean quiz score'}</span><b>68<small>%</small></b><em>{t('demoData')}</em></div>
        <div className="stat card is-demo"><span>{lang === 'th' ? 'ประกอบเครื่องผ่าน POST' : 'Builds passing POST'}</span><b>31<small>/{DEMO.students}</small></b><em>{t('demoData')}</em></div>
        <div className="card bento__wide is-demo">
          <h3>{lang === 'th' ? 'อัตราการเรียนจบรายบท' : 'Module completion'}</h3>
          <ul className="bars">
            {lessons.map((l, i) => (
              <li key={l.id}><span title={l.title[lang]}>{l.id.toUpperCase()}</span><div className="bar"><i style={{ width: `${DEMO.completion[i]}%` }} /></div><b>{DEMO.completion[i]}%</b></li>
            ))}
          </ul>
        </div>
        <div className="card is-demo">
          <h3>{lang === 'th' ? 'การกระจายคะแนนแบบทดสอบ' : 'Quiz score distribution'}</h3>
          <div className="histo" role="img" aria-label={DEMO.distribution.map((n, i) => `${BINS[i]}: ${n}`).join(', ')}>
            {DEMO.distribution.map((n, i) => (
              <div key={i} className="histo__col"><i style={{ height: `${(n / maxBin) * 100}%` }} /><b>{n}</b><span>{BINS[i]}</span></div>
            ))}
          </div>
        </div>
        <div className="card bento__wide is-demo">
          <h3>{lang === 'th' ? 'ความเข้าใจคลาดเคลื่อนที่พบบ่อย' : 'Common misconceptions'}</h3>
          <ul className="bars bars--wide">
            {DEMO.misconceptions.map((m, i) => (
              <li key={i}><span>{m[lang]}</span><div className="bar"><i className="is-low" style={{ width: `${m.pct}%` }} /></div><b>{m.pct}%</b></li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>{lang === 'th' ? 'ข้อที่พลาดบ่อย (ข้อมูลจริงในเบราว์เซอร์นี้)' : 'Frequently missed (real data, this browser)'}</h3>
          {myMissed.length === 0 ? <p className="muted">{lang === 'th' ? 'ยังไม่มีข้อมูลจากเบราว์เซอร์นี้' : 'No data from this browser yet.'}</p> : (
            <ol className="improve">
              {myMissed.map(([id, n]) => <li key={id}>{quizBank.find((q) => q.id === id)?.prompt[lang] ?? id} <small className="muted">×{n}</small></li>)}
            </ol>
          )}
        </div>
      </div>
      <section className="card integration">
        <h3>{lang === 'th' ? 'การเชื่อมต่อระบบหลังบ้าน (ยังไม่ได้ตั้งค่า)' : 'Backend integration (not configured)'}</h3>
        <p>{lang === 'th' ? 'เมื่อเชื่อมต่อฐานข้อมูลที่มีการยืนยันตัวตน (เช่น Supabase) หน้านี้จะแสดงข้อมูลจริงของชั้นเรียนได้ โดยผู้สอนเห็นเฉพาะนักศึกษาในรายวิชาของตน ดูขั้นตอนใน README หัวข้อ "Backend"' : 'Once an authenticated database (e.g. Supabase) is connected, this page can show real class data, with instructors seeing only students in their own courses. See the README "Backend" section.'}</p>
      </section>
    </div>
  );
}
