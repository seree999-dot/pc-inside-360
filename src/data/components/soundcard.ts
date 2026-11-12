import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'soundcard',
  name: { th: 'การ์ดเสียง', en: 'Sound Card' },
  abbr: 'Audio',
  category: 'expansion',
  overview: {
    th: 'การ์ดเสียงแปลงข้อมูลเสียงดิจิทัลเป็นสัญญาณแอนะล็อกสำหรับลำโพงและหูฟัง และแปลงสัญญาณจากไมโครโฟนหรือเครื่องเล่นกลับเป็นดิจิทัล เมนบอร์ดเดสก์ท็อปเกือบทุกรุ่นในปัจจุบันมีชิปเสียง (audio codec) ติดมาอยู่แล้ว ส่วนการ์ดแยกแบบ PCIe ให้วงจรแอนะล็อกที่ดีกว่าและสัญญาณรบกวนต่ำกว่า',
    en: 'A sound card converts digital audio data into analogue signals for speakers and headphones, and converts microphone or line signals back into digital form. Almost every current desktop motherboard already carries an audio codec chip; a dedicated PCIe card offers better analogue circuitry and lower noise.',
  },
  mainFunction: {
    th: 'ทำหน้าที่แปลงสัญญาณเสียงสองทิศทาง: ดิจิทัลเป็นแอนะล็อก (DAC) เพื่อเล่นเสียง และแอนะล็อกเป็นดิจิทัล (ADC) เพื่อบันทึกเสียง พร้อมขยายสัญญาณให้เหมาะกับหูฟังหรือลำโพง',
    en: 'Performs two-way audio conversion: digital to analogue (DAC) for playback and analogue to digital (ADC) for recording, and amplifies the signal to suit headphones or speakers.',
  },
  howItWorks: {
    beginner: {
      th: 'เสียงในคอมพิวเตอร์เป็นเพียงชุดตัวเลขยาว ๆ การ์ดเสียงเปรียบเหมือนล่ามสองภาษา: ตอนเล่นเพลงจะแปลตัวเลขเป็นแรงดันไฟฟ้าที่ขึ้นลงอย่างราบรื่นเพื่อขับลำโพง ตอนอัดเสียงก็วัดแรงดันจากไมโครโฟนหลายหมื่นครั้งต่อวินาทีแล้วจดเป็นตัวเลข คล้ายการต่อจุดให้เป็นเส้นโค้ง ยิ่งจุดถี่และละเอียด เส้นยิ่งเหมือนของจริง',
      en: 'Sound inside a computer is just a long list of numbers. The sound card is a two-way interpreter: for playback it turns the numbers into a smoothly varying voltage that drives the speakers; for recording it measures the microphone voltage tens of thousands of times per second and writes down the numbers. It is like joining dots into a curve: the more frequent and precise the dots, the closer the curve is to the original.',
    },
    technical: {
      th: 'เสียงดิจิทัลแบบ PCM กำหนดด้วยอัตราสุ่มตัวอย่าง (sample rate) และความลึกบิต (bit depth) ตามทฤษฎีบทไนควิสต์ อัตราสุ่มต้องมากกว่าสองเท่าของความถี่สูงสุดที่ต้องการ ดังนั้น 44.1 kHz จึงครอบคลุมช่วงการได้ยินถึงราว 20 kHz ส่วนแต่ละบิตเพิ่มช่วงไดนามิกประมาณ 6 dB (16 บิต ≈ 96 dB) DAC แบบเดลตา-ซิกมาสร้างสัญญาณแอนะล็อกแล้วผ่านตัวกรองความถี่ต่ำและวงจรขยาย ส่วน ADC ทำกระบวนการย้อนกลับ ชิปเสียงบนเมนบอร์ดเชื่อมกับชิปเซ็ตผ่านบัส HD Audio ขณะที่การ์ดแยกใช้ PCIe และวางวงจรแอนะล็อกห่างจากแหล่งสัญญาณรบกวน',
      en: 'PCM digital audio is defined by its sample rate and bit depth. By the Nyquist theorem the sample rate must exceed twice the highest frequency wanted, so 44.1 kHz covers hearing up to about 20 kHz, and each bit adds roughly 6 dB of dynamic range (16 bits ≈ 96 dB). A delta-sigma DAC reconstructs the analogue signal, which then passes through a low-pass filter and an amplifier stage; the ADC performs the reverse. An onboard codec reaches the chipset over the HD Audio bus, while a dedicated card uses PCIe and keeps its analogue stage away from noise sources.',
    },
  },
  structure: [
    {
      name: { th: 'ชิป DAC/ADC หรือ audio codec', en: 'DAC/ADC or audio codec chip' },
      desc: { th: 'ชิปที่ทำการแปลงสัญญาณ บนเมนบอร์ดเป็นชิปเดี่ยวขนาดเล็กใกล้มุมล่างซ้าย ส่วนการ์ดแยกมักใช้ชิป DAC และ ADC คนละตัว', en: 'The chip that does the conversion. On a motherboard it is one small chip near the lower-left corner; dedicated cards often use separate DAC and ADC chips.' },
    },
    {
      name: { th: 'วงจรขยายสัญญาณ (op-amp / headphone amp)', en: 'Amplifier stage (op-amp / headphone amp)' },
      desc: { th: 'ขยายสัญญาณระดับต่ำจาก DAC ให้มีกำลังพอขับหูฟัง โดยเฉพาะหูฟังที่มีอิมพีแดนซ์สูง', en: 'Boosts the low-level DAC output enough to drive headphones, especially high-impedance ones.' },
    },
    {
      name: { th: 'ตัวเก็บประจุเกรดเสียงและฝาครอบกันสัญญาณรบกวน', en: 'Audio capacitors and EMI shield' },
      desc: { th: 'กรองไฟเลี้ยงให้เรียบและกันคลื่นแม่เหล็กไฟฟ้าจากการ์ดจอและแหล่งจ่ายไฟ ซึ่งเป็นต้นเหตุของเสียงซ่าและเสียงฮัม', en: 'Smooth the supply and block electromagnetic interference from the GPU and power supply, the usual sources of hiss and hum.' },
    },
    {
      name: { th: 'ช่องเสียบ 3.5 มม. และช่องออปติคัล', en: '3.5 mm jacks and optical output' },
      desc: { th: 'ช่องแอนะล็อก Line Out, Line In, Mic และช่องลำโพงรอบทิศทาง รวมถึงช่อง S/PDIF แบบออปติคัล (TOSLINK) สำหรับส่งเสียงดิจิทัล', en: 'Analogue Line Out, Line In, Mic and surround jacks, plus an optical S/PDIF (TOSLINK) socket for digital output.' },
    },
    {
      name: { th: 'เฮดเดอร์เสียงหน้าเคสและแถบ PCIe x1', en: 'Front-panel audio header and PCIe x1 edge' },
      desc: { th: 'เฮดเดอร์ HD Audio ต่อไปยังช่องหูฟังหน้าเคส ส่วนแถบ PCIe เชื่อมการ์ดกับเมนบอร์ด', en: 'The HD Audio header feeds the case front headphone jack; the PCIe edge connects the card to the motherboard.' },
    },
  ],
  specs: [
    {
      label: { th: 'อัตราสุ่มตัวอย่าง', en: 'Sample rate' },
      value: { th: '44.1 / 48 / 96 / 192 kHz', en: '44.1 / 48 / 96 / 192 kHz' },
      note: { th: '44.1 kHz คือมาตรฐาน CD; 48 kHz ใช้กับวิดีโอและเกม', en: '44.1 kHz is the CD standard; 48 kHz is used for video and games.' },
    },
    {
      label: { th: 'ความลึกบิต', en: 'Bit depth' },
      value: { th: '16 หรือ 24 บิต (บางรุ่น 32 บิต)', en: '16 or 24 bit (some 32 bit)' },
      note: { th: '16 บิตให้ช่วงไดนามิกทางทฤษฎีราว 96 dB, 24 บิตราว 144 dB', en: '16 bit gives a theoretical dynamic range of about 96 dB, 24 bit about 144 dB.' },
    },
    {
      label: { th: 'อัตราส่วนสัญญาณต่อสัญญาณรบกวน (SNR)', en: 'Signal-to-noise ratio (SNR)' },
      value: { th: 'ชิปเสียงบนเมนบอร์ด: ราว 90–120 dB; การ์ดแยก: ราว 110–127 dB', en: 'Onboard codecs: about 90–120 dB; dedicated cards: about 110–127 dB' },
      note: { th: 'เป็นช่วงโดยประมาณของผลิตภัณฑ์ทั่วไป ค่าที่วัดจริงขึ้นกับการออกแบบแผงวงจรด้วย', en: 'Approximate ranges for typical products; measured results also depend on board layout.' },
    },
    {
      label: { th: 'จำนวนช่องเสียง', en: 'Channels' },
      value: { th: 'สเตอริโอ 2.0 ถึงรอบทิศทาง 5.1 / 7.1', en: 'Stereo 2.0 up to 5.1 / 7.1 surround' },
    },
    {
      label: { th: 'ระดับสัญญาณ line', en: 'Line level' },
      value: { th: 'มาตรฐานผู้บริโภค −10 dBV (≈0.32 V RMS) · งานมืออาชีพ +4 dBu (≈1.23 V RMS)', en: 'Consumer −10 dBV (≈0.32 V RMS) · professional +4 dBu (≈1.23 V RMS)' },
      note: { th: 'เอาต์พุตของการ์ดเสียงพีซีหรือ DAC ส่วนใหญ่ให้ได้สูงสุดราว 1–2 V RMS ส่วนสัญญาณไมโครโฟนมีระดับเพียงไม่กี่มิลลิโวลต์ จึงต้องมีวงจรขยายก่อนเข้า ADC', en: 'Most PC sound card or DAC outputs reach about 1–2 V RMS at maximum. Microphone signals are only a few millivolts, so they need a preamplifier before the ADC.' },
    },
    {
      label: { th: 'การเชื่อมต่อกับระบบ', en: 'Host interface' },
      value: { th: 'HD Audio (ชิปบนเมนบอร์ด), PCIe x1 (การ์ดแยก), USB (อินเทอร์เฟซเสียงภายนอก)', en: 'HD Audio (onboard codec), PCIe x1 (dedicated card), USB (external audio interface)' },
    },
  ],
  connects: {
    th: 'การ์ดแยกเสียบในสล็อต PCIe x1 และมีช่อง 3.5 มม. ที่ท้ายเคสสำหรับลำโพง หูฟัง และไมโครโฟน ชิปเสียงบนเมนบอร์ดส่งสัญญาณออกทางช่องเสียงที่แผงพอร์ตด้านหลัง และผ่านเฮดเดอร์ AAFP ไปยังช่องหูฟังหน้าเคส',
    en: 'A dedicated card sits in a PCIe x1 slot and offers 3.5 mm jacks at the rear of the case for speakers, headphones and a microphone. The onboard codec outputs through the audio jacks on the rear I/O block and, via the AAFP header, to the front-panel headphone jack.',
  },
  related: ['motherboard', 'expansion', 'ports', 'gpu', 'case'],
  compatibility: [
    {
      th: 'การ์ดเสียง PCIe x1 เสียบในสล็อต PCIe ใดก็ได้ แต่ควรเลี่ยงสล็อตที่ชิดกับการ์ดจอเพื่อลดความร้อนและสัญญาณรบกวน',
      en: 'A PCIe x1 sound card works in any PCIe slot, but avoid the slot right next to the graphics card to reduce heat and interference.',
    },
    {
      th: 'สายเสียงหน้าเคสต้องเป็นแบบ HD Audio ตรงกับเฮดเดอร์ของการ์ดหรือเมนบอร์ด (มาตรฐาน AC\'97 รุ่นเก่าใช้ขาสัญญาณต่างกัน)',
      en: 'The case front-audio cable must be the HD Audio type to match the header on the card or board (the older AC\'97 standard uses different signalling).',
    },
    {
      th: 'เสียงที่ส่งผ่าน HDMI หรือ DisplayPort มาจากการ์ดจอ ไม่ได้ผ่านการ์ดเสียง จึงต้องเลือกอุปกรณ์เล่นเสียงให้ถูกในระบบปฏิบัติการ',
      en: 'Audio sent over HDMI or DisplayPort comes from the graphics card, not the sound card, so the correct playback device must be chosen in the operating system.',
    },
  ],
  useCases: [
    { th: 'ฟังเพลงหรือทำงานเสียงที่ต้องการสัญญาณรบกวนต่ำและกำลังขับหูฟังอิมพีแดนซ์สูง', en: 'Music listening or audio work that needs a low noise floor and enough drive for high-impedance headphones.' },
    { th: 'บันทึกเสียงพากย์ ดนตรี หรือพอดแคสต์ที่ต้องการ ADC คุณภาพดีและช่องสัญญาณเข้าหลายแบบ', en: 'Recording voice-over, music or podcasts where a good ADC and several input types are needed.' },
    { th: 'ทดแทนวงจรเสียงบนเมนบอร์ดที่เสียหรือมีเสียงรบกวน', en: 'Replacing a faulty or noisy onboard audio circuit.' },
  ],
  problems: [
    {
      symptom: { th: 'ไม่มีเสียงออกลำโพงเลย', en: 'No sound from the speakers at all.' },
      check: { th: 'ตรวจว่าเสียบแจ็กที่ช่องสีเขียว (Line Out) ดูว่าเลือกอุปกรณ์เล่นเสียงถูกตัวและไม่ได้ปิดเสียง แล้วตรวจไดรเวอร์เสียงใน Device Manager', en: 'Check the plug is in the green (Line Out) jack, that the correct playback device is selected and not muted, then check the audio driver in Device Manager.' },
    },
    {
      symptom: { th: 'มีเสียงซ่า เสียงจี่ หรือเสียงรบกวนที่เปลี่ยนตามการขยับเมาส์หรือภาระของการ์ดจอ', en: 'Hiss, buzz or noise that changes with mouse movement or GPU load.' },
      check: { th: 'ลองใช้ช่องเสียงด้านหลังแทนหน้าเคส ย้ายการ์ดเสียงให้ห่างการ์ดจอ และทดสอบด้วยหูฟังอีกชุดเพื่อแยกว่าปัญหาอยู่ที่สายหรือวงจร', en: 'Try the rear jack instead of the front panel, move the sound card away from the GPU, and test with another headset to separate cable faults from circuit noise.' },
    },
    {
      symptom: { th: 'ไมโครโฟนเบามากหรือไม่มีสัญญาณ', en: 'The microphone is very quiet or silent.' },
      check: { th: 'ตรวจว่าเสียบช่องสีชมพู (Mic In) ไม่ใช่ช่องสีฟ้า (Line In) เพิ่มระดับและ mic boost ในการตั้งค่า และตรวจสิทธิ์การใช้ไมโครโฟนของแอป', en: 'Make sure it is in the pink (Mic In) jack rather than the blue (Line In) one, raise the level and mic boost in settings, and check the app microphone permission.' },
    },
  ],
  safety: [
    { th: 'ปิดเครื่อง ถอดสายไฟ และคายประจุไฟฟ้าสถิตก่อนติดตั้งการ์ด จับที่ขอบแผงวงจรเท่านั้น', en: 'Shut down, unplug and discharge static before installing the card; hold it only by the board edges.' },
    { th: 'ลดระดับเสียงก่อนเสียบหรือถอดแจ็กและก่อนสวมหูฟัง เพื่อป้องกันเสียงดังฉับพลันที่ทำอันตรายต่อการได้ยินและลำโพง', en: 'Turn the volume down before plugging or unplugging jacks and before putting on headphones, to avoid sudden loud sound that can harm hearing and speakers.' },
  ],
  vocab: [
    { en: 'DAC (Digital-to-Analogue Converter)', th: 'ตัวแปลงดิจิทัลเป็นแอนะล็อก', meaning: { th: 'วงจรที่แปลงค่าตัวอย่างเสียงดิจิทัลเป็นแรงดันไฟฟ้าต่อเนื่อง', en: 'A circuit that turns digital audio samples into a continuous voltage.' } },
    { en: 'ADC (Analogue-to-Digital Converter)', th: 'ตัวแปลงแอนะล็อกเป็นดิจิทัล', meaning: { th: 'วงจรที่วัดแรงดันสัญญาณเสียงเป็นระยะแล้วบันทึกเป็นตัวเลข', en: 'A circuit that measures an audio voltage at regular intervals and records it as numbers.' } },
    { en: 'Sample rate', th: 'อัตราสุ่มตัวอย่าง', meaning: { th: 'จำนวนครั้งต่อวินาทีที่วัดค่าสัญญาณเสียง มีหน่วยเป็นเฮิรตซ์', en: 'How many times per second the audio signal is measured, in hertz.' } },
    { en: 'Bit depth', th: 'ความลึกบิต', meaning: { th: 'จำนวนบิตที่ใช้เก็บค่าตัวอย่างแต่ละค่า กำหนดความละเอียดของระดับเสียงและช่วงไดนามิก', en: 'The number of bits stored per sample, which sets amplitude resolution and dynamic range.' } },
    { en: 'SNR (Signal-to-Noise Ratio)', th: 'อัตราส่วนสัญญาณต่อสัญญาณรบกวน', meaning: { th: 'ความแตกต่างระหว่างระดับสัญญาณที่ต้องการกับสัญญาณรบกวนพื้นหลัง มีหน่วยเป็น dB ยิ่งสูงยิ่งดี', en: 'The gap between the wanted signal level and the background noise, in dB; higher is better.' } },
  ],
  facts: [
    { th: 'คอมพิวเตอร์ส่วนบุคคลยุคแรกมีเพียงลำโพงบี๊บตัวเล็ก การ์ดเสียงแบบเสียบเพิ่มจึงเป็นอุปกรณ์จำเป็นสำหรับเกมและมัลติมีเดียในช่วงปลายทศวรรษ 1980 ถึง 1990', en: 'Early personal computers had only a small beeper, which made add-in sound cards essential for games and multimedia in the late 1980s and 1990s.' },
    { th: 'อัตรา 44.1 kHz ของ CD ถูกเลือกส่วนหนึ่งเพราะเข้ากับอุปกรณ์บันทึกวิดีโอเทปที่ใช้เก็บเสียงดิจิทัลในยุคแรก', en: 'The CD rate of 44.1 kHz was chosen partly because it fitted the video tape equipment used to store early digital audio.' },
  ],
  review: [
    {
      q: { th: 'DAC และ ADC ต่างกันอย่างไร', en: 'What is the difference between a DAC and an ADC?' },
      a: { th: 'DAC แปลงดิจิทัลเป็นแอนะล็อกเพื่อเล่นเสียง ส่วน ADC แปลงแอนะล็อกเป็นดิจิทัลเพื่อบันทึกเสียง', en: 'A DAC converts digital to analogue for playback; an ADC converts analogue to digital for recording.' },
    },
    {
      q: { th: 'เหตุใดอัตราสุ่มตัวอย่าง 44.1 kHz จึงเพียงพอสำหรับการได้ยินของมนุษย์', en: 'Why is a 44.1 kHz sample rate enough for human hearing?' },
      a: { th: 'เพราะตามทฤษฎีบทไนควิสต์ อัตราสุ่มต้องมากกว่าสองเท่าของความถี่สูงสุด และมนุษย์ได้ยินถึงราว 20 kHz', en: 'By the Nyquist theorem the rate must exceed twice the highest frequency, and humans hear up to about 20 kHz.' },
    },
    {
      q: { th: 'ข้อได้เปรียบหลักของการ์ดเสียงแยกเมื่อเทียบกับชิปเสียงบนเมนบอร์ดคืออะไร', en: 'What is the main advantage of a dedicated sound card over an onboard codec?' },
      a: { th: 'วงจรแอนะล็อกแยกห่างจากสัญญาณรบกวน ให้ SNR สูงกว่าและขับหูฟังได้แรงกว่า', en: 'Its analogue stage is isolated from interference, giving higher SNR and stronger headphone drive.' },
    },
  ],
};
