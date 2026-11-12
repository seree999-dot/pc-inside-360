import { useMemo, useState } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { categories, components } from '../data';
import type { Category, ComponentId } from '../data/types';
import { Icon } from '../components/Icon';
import { PartGlyph } from '../components/PartGlyph';

function matches(id: ComponentId, q: string): boolean {
  if (!q) return true;
  const c = components.find((x) => x.id === id);
  if (!c) return false;
  const hay = `${c.name.th} ${c.name.en} ${c.abbr} ${c.vocab.map((v) => `${v.en} ${v.th}`).join(' ')}`.toLowerCase();
  return hay.includes(q.toLowerCase().trim());
}

/** Left panel: searchable, filterable component hierarchy with thumbnails. */
export function ComponentList() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const selected = useApp((s) => s.selected);
  const explored = useProgress((s) => s.explored);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<Category | 'all'>('all');

  const groups = useMemo(
    () =>
      categories
        .filter((g) => cat === 'all' || g.id === cat)
        .map((g) => ({ ...g, items: components.filter((c) => c.category === g.id && matches(c.id, q)) }))
        .filter((g) => g.items.length > 0),
    [q, cat],
  );

  return (
    <nav className="clist" aria-label={t('components')}>
      <div className="clist__head">
        <h2 className="panel-title">{t('components')}</h2>
        <span className="clist__count">{explored.length}/{components.length} {t('explored')}</span>
      </div>
      <label className="search">
        <Icon name="search" size={16} />
        <input type="search" value={q} placeholder={t('search')} aria-label={t('search')} onChange={(e) => setQ(e.target.value)} />
      </label>
      <div className="filters" role="group" aria-label="Filter">
        <button type="button" className={`chip${cat === 'all' ? ' is-on' : ''}`} aria-pressed={cat === 'all'} onClick={() => setCat('all')}>{t('all')}</button>
        {categories.map((g) => (
          <button key={g.id} type="button" className={`chip${cat === g.id ? ' is-on' : ''}`} aria-pressed={cat === g.id} onClick={() => setCat(g.id)}>
            {g.name[lang].split(' · ')[0]}
          </button>
        ))}
      </div>
      <div className="clist__scroll">
        {groups.length === 0 && <p className="muted">{t('noResults')}</p>}
        {groups.map((g) => (
          <section key={g.id} className="clist__group">
            <h3>{g.name[lang]}</h3>
            <ul>
              {g.items.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`citem${selected === c.id ? ' is-on' : ''}`}
                    aria-current={selected === c.id ? 'true' : undefined}
                    onClick={() => useApp.getState().select(c.id)}
                  >
                    <PartGlyph id={c.id} />
                    <span className="citem__text">
                      <b>{c.name[lang]}</b>
                      <small>{lang === 'th' ? c.name.en : c.abbr}</small>
                    </span>
                    {explored.includes(c.id) && <span className="citem__done" aria-label={t('explored')}><Icon name="check" size={14} /></span>}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
