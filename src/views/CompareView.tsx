import { useMemo, useState } from 'react';
import { useApp } from '../store/appStore';
import { useT } from '../i18n';
import { comparisons } from '../data';
import { Viewer } from '../three/Viewer';
import { DualStage, syncDragHandlers } from '../three/ModelStage';

/** Screen 6: synchronized side-by-side 3D comparison with a structured table. */
export function CompareView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const [id, setId] = useState(comparisons[0].id);
  const c = comparisons.find((x) => x.id === id) ?? comparisons[0];
  const handlers = useMemo(() => syncDragHandlers(), []);

  return (
    <div className="page compare">
      <header className="page__head">
        <div>
          <p className="eyebrow">{t('navCompare')}</p>
          <h1>{lang === 'th' ? 'ห้องเปรียบเทียบฮาร์ดแวร์' : 'Comparison Lab'}</h1>
          <p>{lang === 'th' ? 'หมุนโมเดลทั้งสองพร้อมกันด้วยการลาก (หรือปุ่มลูกศร) เพื่อเปรียบเทียบจากมุมเดียวกัน' : 'Drag (or use the arrow keys) to rotate both models together and compare them from the same angle.'}</p>
        </div>
      </header>
      <div className="chips" role="tablist" aria-label={t('navCompare')}>
        {comparisons.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === id} className={`chip${x.id === id ? ' is-on' : ''}`} onClick={() => setId(x.id)}>
            {x.title[lang]}
          </button>
        ))}
      </div>
      <div className="compare__stage card" tabIndex={0} aria-label={`${c.a.label[lang]} / ${c.b.label[lang]}`} {...handlers}>
        <Viewer label={c.title[lang]} className="compare__viewer" camera={{ position: [0, 0.4, 7.2], fov: 38 }}>
          <DualStage key={c.id} a={c.a.model} b={c.b.model} />
        </Viewer>
        <div className="compare__labels" aria-hidden="true">
          <span>{c.a.label[lang]}</span>
          <span className="vs">VS</span>
          <span>{c.b.label[lang]}</span>
        </div>
      </div>
      <p className="lead compare__intro">{c.intro[lang]}</p>
      <div className="table-wrap">
        <table className="ctable">
          <thead>
            <tr>
              <th scope="col">{lang === 'th' ? 'ประเด็น' : 'Aspect'}</th>
              <th scope="col">{c.a.label[lang]}</th>
              <th scope="col">{c.b.label[lang]}</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r, i) => (
              <tr key={i}>
                <th scope="row">{r.aspect[lang]}</th>
                <td>{r.a[lang]}</td>
                <td>{r.b[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside className="verdict">
        <b>{lang === 'th' ? 'สรุป' : 'Verdict'}</b>
        <p>{c.verdict[lang]}</p>
      </aside>
    </div>
  );
}
