import { useEffect } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import type { L } from '../data/types';
import { Icon } from '../components/Icon';

interface OnbStep {
  title: L;
  body: L;
  /** Advances automatically when true. */
  waitFor?: 'rotate' | 'cpu';
}

const STEPS: OnbStep[] = [
  { title: { th: 'ยินดีต้อนรับสู่ PC INSIDE 360°', en: 'Welcome to PC INSIDE 360°' }, body: { th: 'เป้าหมาย: รู้จักชิ้นส่วนหลักของคอมพิวเตอร์ หน้าที่ของแต่ละชิ้น และวิธีที่ทุกชิ้นทำงานร่วมกัน ผ่านโมเดล 3 มิติที่คุณควบคุมเองได้', en: 'Goal: learn the main parts of a computer, what each one does and how they work together, using a 3D model you control yourself.' } },
  { title: { th: 'วิธีควบคุมกล้อง', en: 'Camera controls' }, body: { th: 'ลากเมาส์ (หรือนิ้วเดียว) เพื่อหมุน · ล้อเมาส์ (หรือถ่างสองนิ้ว) เพื่อซูม · คลิกขวาหรือสองนิ้วลากเพื่อเลื่อน · ดับเบิลคลิกเพื่อโฟกัสจุดนั้น', en: 'Drag (or one finger) to rotate · scroll (or pinch) to zoom · right-drag or two fingers to pan · double-click to focus on a spot.' } },
  { title: { th: 'ลองหมุนคอมพิวเตอร์ดู', en: 'Try rotating the computer' }, body: { th: 'ลากบนโมเดลเพื่อหมุนดูรอบเครื่อง ขั้นตอนนี้จะไปต่อเองเมื่อคุณหมุนแล้ว', en: 'Drag on the model to look around it. This step continues automatically once you rotate.' }, waitFor: 'rotate' },
  { title: { th: 'คลิกเลือก CPU', en: 'Select the CPU' }, body: { th: 'ชุดระบายความร้อนถูกซ่อนไว้ชั่วคราวเพื่อให้เห็นซีพียู คลิกชิ้นสี่เหลี่ยมสีเงินกลางเมนบอร์ด (หรือเลือก "CPU" จากรายการด้านซ้าย)', en: 'The cooler is hidden for now so you can see the processor. Click the silver square in the middle of the motherboard (or pick "CPU" from the list on the left).' }, waitFor: 'cpu' },
  { title: { th: 'นี่คือหน่วยประมวลผลกลาง', en: 'This is the processor' }, body: { th: 'กล้องซูมเข้าหา CPU และแผงด้านขวาแสดงคำอธิบาย ลองกด "ดูโครงสร้างภายใน" เพื่อยกฝาครอบดูแผนภาพแกนประมวลผลเชิงแนวคิด', en: 'The camera zoomed to the CPU and the right panel explains it. Try "Reveal inside" to lift the heat spreader and see a conceptual core layout.' } },
  { title: { th: 'ซ็อกเก็ตและชิ้นส่วนที่เกี่ยวข้อง', en: 'The socket and related parts' }, body: { th: 'เส้นสีแสดงความสัมพันธ์เชิงแนวคิด: ฟ้า = ข้อมูล (RAM, GPU, SSD), เหลือง = ไฟเลี้ยงจาก PSU, แดง = ความร้อนไปยังชุดระบายความร้อน', en: 'The coloured paths show conceptual links: cyan = data (RAM, GPU, SSD), amber = power from the PSU, red = heat to the cooler.' } },
  { title: { th: 'พร้อมแล้ว!', en: 'You are ready!' }, body: { th: 'เลือกชิ้นส่วนอื่นสำรวจต่อได้อิสระ หรือเริ่มบทเรียนแบบมีผู้นำทาง เปิดคำแนะนำนี้ใหม่ได้ทุกเมื่อจากปุ่ม "แนะนำ"', en: 'Explore any other part freely, or start a guided lesson. You can replay this introduction any time from the "Intro" button.' } },
];

/** Optional, skippable, replayable first-time walkthrough. */
export function Onboarding() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const step = useApp((s) => s.onboarding);
  const rotated = useApp((s) => s.hasRotated);
  const selected = useApp((s) => s.selected);

  useEffect(() => {
    if (step === null) return;
    const s = useApp.getState();
    if (step === 0) { s.resetScene(); s.cam({ kind: 'reset' }); useApp.setState({ hasRotated: false }); }
    if (step === 2) s.set({ autoRotate: false });
    if (step === 3) { if (!s.hidden.includes('cooler')) s.toggleHidden('cooler'); s.select(null, false); s.cam({ kind: 'preset', preset: 'iso' }); }
    if (step === 5) s.set({ connections: true });
  }, [step]);

  useEffect(() => {
    if (step === 2 && rotated) useApp.getState().setOnboarding(3);
    if (step === 3 && selected === 'cpu') useApp.getState().setOnboarding(4);
  }, [step, rotated, selected]);

  if (step === null) return null;
  const cur = STEPS[step];
  const end = () => {
    const s = useApp.getState();
    s.setOnboarding(null);
    if (s.hidden.includes('cooler')) s.toggleHidden('cooler');
    s.set({ connections: false });
    useProgress.getState().setOnboardingDone();
  };
  const last = step === STEPS.length - 1;
  return (
    <div className="onb" role="dialog" aria-modal="false" aria-labelledby="onb-title">
      <div className="onb__dots" aria-hidden="true">{STEPS.map((_, i) => <span key={i} className={i === step ? 'is-on' : i < step ? 'is-done' : ''} />)}</div>
      <h2 id="onb-title">{cur.title[lang]}</h2>
      <p>{cur.body[lang]}</p>
      {step === 1 && (
        <div className="onb__gesture" aria-hidden="true">
          <span className="g g--drag">↻</span><span className="g g--zoom">±</span><span className="g g--tap">●</span>
        </div>
      )}
      {cur.waitFor && <p className="onb__wait"><span className="pulse" aria-hidden="true" /> {lang === 'th' ? 'รอการกระทำของคุณ…' : 'Waiting for you…'}</p>}
      <div className="row">
        <button type="button" className="btn btn--ghost btn--sm" onClick={end}>{t('skip')}</button>
        {step > 0 && !last && <button type="button" className="btn btn--ghost btn--sm" onClick={() => useApp.getState().setOnboarding(step - 1)}>{t('back')}</button>}
        {last ? (
          <>
            <button type="button" className="btn btn--sm" onClick={() => { end(); useApp.getState().startLesson('l01'); }}>{lang === 'th' ? 'เริ่มบทเรียนที่ 1' : 'Start lesson 1'}</button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={end}>{lang === 'th' ? 'สำรวจอิสระ' : 'Free exploration'}</button>
          </>
        ) : (
          <button type="button" className="btn btn--sm" onClick={() => useApp.getState().setOnboarding(step + 1)}>{cur.waitFor ? t('skip') : t('next')} <Icon name="chevron" size={14} /></button>
        )}
      </div>
    </div>
  );
}
