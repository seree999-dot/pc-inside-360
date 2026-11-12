import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'monitor',
  name: { th: 'จอภาพ', en: 'Monitor' },
  abbr: 'Display',
  category: 'peripheral',
  overview: {
    th: 'จอภาพเป็นอุปกรณ์แสดงผลที่เปลี่ยนสัญญาณภาพดิจิทัลจากการ์ดจอให้เป็นภาพที่มองเห็นได้ จอแต่ละรุ่นต่างกันที่ชนิดแผงจอ (IPS, VA, TN, OLED) ความละเอียด อัตรารีเฟรช และความแม่นยำของสี ซึ่งส่งผลโดยตรงต่อความคมชัด ความลื่นไหล และความเหมาะกับงานแต่ละประเภท',
    en: 'The monitor is the output device that turns the digital video signal from the graphics card into a visible image. Models differ in panel type (IPS, VA, TN, OLED), resolution, refresh rate and colour accuracy, which directly affect sharpness, motion smoothness and suitability for each kind of work.',
  },
  mainFunction: {
    th: 'รับเฟรมภาพผ่าน HDMI หรือ DisplayPort แล้วควบคุมพิกเซลแต่ละจุดให้เปล่งหรือปล่อยแสงสีแดง เขียว น้ำเงินในปริมาณที่ถูกต้อง หลายสิบถึงหลายร้อยครั้งต่อวินาที',
    en: 'Receives video frames over HDMI or DisplayPort and drives every pixel to emit or pass the right amounts of red, green and blue light, tens to hundreds of times per second.',
  },
  howItWorks: {
    beginner: {
      th: 'จอภาพคือตารางจุดเล็ก ๆ หลายล้านจุด (พิกเซล) แต่ละจุดมีไฟเล็ก ๆ สีแดง เขียว น้ำเงิน ผสมกันเป็นสีใดก็ได้ เหมือนป้ายไฟ LED ขนาดยักษ์ที่จุดเล็กมากจนตาเรามองเห็นเป็นภาพต่อเนื่อง การ์ดจอส่งภาพใหม่มาให้ซ้ำ ๆ เช่น 144 ภาพต่อวินาที ภาพจึงดูเคลื่อนไหวลื่นไหล',
      en: 'A monitor is a grid of millions of tiny dots (pixels). Each has small red, green and blue lights that mix into any colour, like a giant LED sign with dots so small our eyes see a smooth picture. The graphics card sends a new picture over and over, say 144 times a second, so motion looks smooth.',
    },
    technical: {
      th: 'ในจอ LCD แสงจากไฟพื้นหลัง (backlight) ผ่านโพลาไรเซอร์ ชั้นผลึกเหลว และฟิลเตอร์สี แรงดันที่ทรานซิสเตอร์ฟิล์มบาง (TFT) ของแต่ละซับพิกเซลบิดผลึกเหลวเพื่อควบคุมปริมาณแสงที่ผ่าน IPS ให้สีและมุมมองดี VA ให้คอนทราสต์สูง TN ตอบสนองเร็วแต่มุมมองแคบ ส่วน OLED แต่ละซับพิกเซลเปล่งแสงเองจึงดับสนิทได้และตอบสนองเร็วมาก แต่เสี่ยงภาพค้าง (burn-in) แบนด์วิดท์ที่ต้องใช้แปรผันตามความละเอียด × อัตรารีเฟรช × ความลึกสี จึงต้องเลือกพอร์ตและสายให้รองรับ และ Adaptive Sync (FreeSync/G-SYNC) ปรับรีเฟรชให้ตรงกับอัตราเฟรมของ GPU เพื่อลดภาพฉีก',
      en: 'In an LCD, light from the backlight passes through polarisers, a liquid-crystal layer and colour filters; a voltage on each sub-pixel\'s thin-film transistor (TFT) twists the crystals to control how much light passes. IPS gives good colour and viewing angles, VA high contrast, TN fast response but narrow angles. In OLED each sub-pixel emits its own light, so it can switch fully off and respond very fast, at the risk of burn-in. Required bandwidth scales with resolution × refresh rate × colour depth, so the port and cable must support it, and Adaptive Sync (FreeSync/G-SYNC) matches the refresh to the GPU frame rate to reduce tearing.',
    },
  },
  structure: [
    { name: { th: 'แผงจอ (panel)', en: 'Display panel' }, desc: { th: 'ชั้นที่สร้างภาพ ประกอบด้วยเมทริกซ์พิกเซลและซับพิกเซล RGB', en: 'The image-forming layer: a matrix of pixels made of RGB sub-pixels.' } },
    { name: { th: 'ไฟพื้นหลัง (LCD)', en: 'Backlight (LCD)' }, desc: { th: 'แถบ LED ด้านขอบหรือด้านหลังที่ให้แสงแก่ LCD จอ OLED ไม่มีชั้นนี้', en: 'Edge-lit or full-array LEDs that light an LCD; OLED has no backlight.' } },
    { name: { th: 'บอร์ดควบคุม (scaler/T-con)', en: 'Controller board (scaler / T-con)' }, desc: { th: 'รับสัญญาณจากพอร์ต แปลงสเกลภาพ และสั่งงานไดรเวอร์แถวและคอลัมน์ของแผง', en: 'Receives the input signal, scales the image and drives the panel\'s row and column drivers.' } },
    { name: { th: 'พอร์ตอินพุต', en: 'Input ports' }, desc: { th: 'HDMI และ DisplayPort ด้านหลังจอ บางรุ่นมี USB-C ที่รับภาพผ่าน DisplayPort Alt Mode', en: 'HDMI and DisplayPort on the back; some models add USB-C with DisplayPort Alt Mode.' } },
    { name: { th: 'ขาตั้งและแท่นยึด', en: 'Stand and mount' }, desc: { th: 'ปรับความสูง เอียง หมุน และรูยึด VESA สำหรับแขนจับจอ', en: 'Adjusts height, tilt and swivel; VESA holes accept a monitor arm.' } },
  ],
  specs: [
    { label: { th: 'ความละเอียด', en: 'Resolution' }, value: { th: '1920×1080 (FHD), 2560×1440 (QHD), 3840×2160 (4K UHD)', en: '1920×1080 (FHD), 2560×1440 (QHD), 3840×2160 (4K UHD)' } },
    { label: { th: 'อัตรารีเฟรช', en: 'Refresh rate' }, value: { th: '60 Hz งานทั่วไป, 144–240 Hz เกม, บางรุ่น 360 Hz ขึ้นไป', en: '60 Hz general use, 144–240 Hz gaming, some 360 Hz+' } },
    { label: { th: 'ชนิดแผงจอ', en: 'Panel type' }, value: { th: 'IPS, VA, TN, OLED', en: 'IPS, VA, TN, OLED' } },
    { label: { th: 'เวลาตอบสนอง', en: 'Response time' }, value: { th: 'LCD ราว 1–5 ms (GtG), OLED ต่ำกว่า 0.1 ms', en: 'LCD about 1–5 ms (GtG); OLED under 0.1 ms' }, note: { th: 'ตัวเลขผู้ผลิตวัดต่างวิธีกัน ควรดูผลทดสอบอิสระ', en: 'Vendors measure differently; prefer independent reviews' } },
    { label: { th: 'ขอบเขตสี', en: 'Colour gamut' }, value: { th: 'sRGB ~100% งานทั่วไป, DCI-P3 / Adobe RGB สำหรับงานสี', en: '~100% sRGB general; DCI-P3 / Adobe RGB for colour work' } },
    { label: { th: 'อินพุต', en: 'Inputs' }, value: { th: 'HDMI 2.0/2.1, DisplayPort 1.4/2.1, USB-C', en: 'HDMI 2.0/2.1, DisplayPort 1.4/2.1, USB-C' } },
  ],
  connects: {
    th: 'จอภาพเชื่อมกับพอร์ตแสดงผลบนแผ่นยึดของการ์ดจอด้วยสาย HDMI หรือ DisplayPort ถ้าเครื่องมีการ์ดจอแยก ต้องเสียบที่การ์ดจอ ไม่ใช่พอร์ตบนเมนบอร์ด เพราะพอร์ตบนเมนบอร์ดใช้กราฟิกในตัว CPU (iGPU) ซึ่งเฟิร์มแวร์หลายรุ่นปิดไว้เมื่อพบการ์ดจอ (บางบอร์ดตั้งให้เปิดค้างได้ แต่ภาพจากเกมและโปรแกรมหนัก ๆ ควรออกจากการ์ดจอ) ทางตรรกะ GPU เขียนเฟรมลงหน่วยความจำ VRAM แล้วส่งออกตามจังหวะรีเฟรชของจอ',
    en: 'The monitor connects to an output on the graphics card bracket with an HDMI or DisplayPort cable. With a discrete GPU installed, plug into the card, not the motherboard: the board\'s outputs use the CPU\'s integrated graphics, which much firmware disables when a card is detected (some boards can keep it enabled, but games and heavy applications should still output from the card). Logically, the GPU renders frames into VRAM and scans them out in step with the monitor\'s refresh.',
  },
  related: ['gpu', 'ports', 'cpu', 'motherboard'],
  compatibility: [
    { th: 'การจะได้ 4K 144 Hz ต้องใช้ HDMI 2.1 หรือ DisplayPort 1.4 (มักร่วมกับ DSC) ขึ้นไป ทั้งที่การ์ดจอ สาย และจอภาพ', en: '4K at 144 Hz needs HDMI 2.1 or DisplayPort 1.4 (often with DSC) or newer on the GPU, cable and monitor alike.' },
    { th: 'FreeSync และ G-SYNC Compatible ต้องให้การ์ดจอและไดรเวอร์รองรับมาตรฐานเดียวกันและเปิดใช้ทั้งที่จอและไดรเวอร์', en: 'FreeSync and G-SYNC Compatible need the GPU and driver to support the same standard and must be enabled in both the monitor and the driver.' },
    { th: 'เสียบจอเข้าพอร์ตเมนบอร์ดได้เฉพาะเมื่อ CPU มีกราฟิกในตัว CPU บางรุ่นไม่มี iGPU เลย', en: 'Motherboard video outputs only work if the CPU has integrated graphics; some CPUs have none.' },
  ],
  useCases: [
    { th: 'งานเอกสารและการเรียน: จอ IPS 24 นิ้ว FHD หรือ 27 นิ้ว QHD ที่ 60–75 Hz', en: 'Office and study: a 24-inch FHD or 27-inch QHD IPS panel at 60–75 Hz.' },
    { th: 'เกมแข่งขัน: อัตรารีเฟรช 144–240 Hz ขึ้นไป พร้อม Adaptive Sync', en: 'Competitive gaming: 144–240 Hz or more with Adaptive Sync.' },
    { th: 'งานตกแต่งภาพและวิดีโอ: จอที่ครอบคลุม DCI-P3 หรือ Adobe RGB และปรับเทียบสี (calibrate) ได้', en: 'Photo and video editing: a panel covering DCI-P3 or Adobe RGB that can be colour-calibrated.' },
  ],
  problems: [
    { symptom: { th: 'จอขึ้น "No signal"', en: 'Monitor shows "No signal"' }, check: { th: 'ตรวจว่าเสียบสายที่การ์ดจอ ไม่ใช่เมนบอร์ด เลือกแหล่งอินพุตบนจอให้ถูก ลองสายและพอร์ตอื่น', en: 'Check the cable is in the graphics card, not the motherboard, select the correct input source on the monitor, and try another cable and port.' } },
    { symptom: { th: 'จอรีเฟรชได้แค่ 60 Hz ทั้งที่รองรับ 144 Hz', en: 'Stuck at 60 Hz on a 144 Hz monitor' }, check: { th: 'ตั้งอัตรารีเฟรชในการตั้งค่าจอของระบบปฏิบัติการ ใช้ DisplayPort หรือสาย HDMI ที่รองรับแบนด์วิดท์พอ', en: 'Set the refresh rate in the OS display settings, and use DisplayPort or an HDMI cable rated for enough bandwidth.' } },
    { symptom: { th: 'มีจุดดำหรือจุดสว่างค้างบนจอ', en: 'Black or stuck bright dots on screen' }, check: { th: 'แสดงภาพสีเต็มจอเพื่อยืนยันพิกเซลเสีย (dead/stuck pixel) แล้วตรวจนโยบายรับประกันของผู้ผลิต', en: 'Display full-screen solid colours to confirm dead or stuck pixels, then check the manufacturer\'s pixel warranty policy.' } },
  ],
  safety: [
    { th: 'ภาคจ่ายไฟของจอต่อกับไฟบ้านและมีตัวเก็บประจุแรงดันสูง ส่วนวงจรขับไฟพื้นหลังก็มีแรงดันอันตราย (จอ LED ปัจจุบันหลายสิบถึงราว 200 V จอ CCFL รุ่นเก่าสูงถึงหลักพันโวลต์) ห้ามเปิดฝาหลังจอเพื่อซ่อมเอง', en: 'A monitor power supply runs from mains and holds high-voltage capacitors, and the backlight driver also carries dangerous voltages (tens to about 200 V in current LED monitors, up to around a thousand volts or more in older CCFL ones); never open the rear cover to repair it yourself.' },
    { th: 'ทำความสะอาดหน้าจอด้วยผ้าไมโครไฟเบอร์แห้งหรือชุบน้ำหมาด ห้ามฉีดน้ำยาลงบนจอโดยตรง', en: 'Clean the screen with a dry or slightly damp microfibre cloth; never spray cleaner directly on the panel.' },
  ],
  vocab: [
    { en: 'Refresh rate', th: 'อัตรารีเฟรช', meaning: { th: 'จำนวนครั้งต่อวินาทีที่จอวาดภาพใหม่ หน่วย Hz', en: 'How many times per second the display redraws, in hertz.' } },
    { en: 'Response time', th: 'เวลาตอบสนอง', meaning: { th: 'เวลาที่พิกเซลใช้เปลี่ยนจากสีหนึ่งไปอีกสีหนึ่ง', en: 'Time a pixel takes to change from one shade to another.' } },
    { en: 'Panel type', th: 'ชนิดแผงจอ', meaning: { th: 'เทคโนโลยีการสร้างภาพ เช่น IPS, VA, TN, OLED', en: 'The image technology, such as IPS, VA, TN or OLED.' } },
    { en: 'Colour gamut', th: 'ขอบเขตสี', meaning: { th: 'ช่วงสีที่จอแสดงได้ เทียบกับมาตรฐานเช่น sRGB', en: 'The range of colours a display can show, compared with a standard such as sRGB.' } },
    { en: 'Adaptive Sync', th: 'การซิงก์อัตรารีเฟรช', meaning: { th: 'ให้จอปรับรีเฟรชตามอัตราเฟรมของ GPU เพื่อลดภาพฉีก', en: 'Lets the display vary its refresh to match the GPU frame rate, reducing tearing.' } },
  ],
  facts: [
    { th: 'จอ 4K มีพิกเซลราว 8.3 ล้านจุด หรือสี่เท่าของจอ Full HD และแต่ละพิกเซลมีซับพิกเซลอีกสามจุด', en: 'A 4K display has about 8.3 million pixels, four times Full HD, and each pixel has three sub-pixels.' },
    { th: 'ผลึกเหลวในจอ LCD ไม่เปล่งแสงเอง มันทำหน้าที่เหมือนบานเกล็ดที่เปิดปิดให้แสงจากไฟพื้นหลังผ่าน', en: 'Liquid crystals in an LCD do not emit light; they act like shutters that let backlight through.' },
  ],
  review: [
    { q: { th: 'ถ้ามีการ์ดจอแยก ควรเสียบสายจอที่ใด?', en: 'With a discrete GPU, where should the monitor cable go?' }, a: { th: 'ที่พอร์ตบนการ์ดจอ ไม่ใช่พอร์ตบนเมนบอร์ด', en: 'Into the graphics card\'s outputs, not the motherboard\'s.' } },
    { q: { th: 'แผงจอชนิดใดดับพิกเซลได้สนิทจึงได้สีดำลึกที่สุด?', en: 'Which panel type can switch pixels fully off for the deepest black?' }, a: { th: 'OLED เพราะแต่ละพิกเซลเปล่งแสงเอง', en: 'OLED, because each pixel emits its own light.' } },
    { q: { th: 'อัตรารีเฟรช 144 Hz หมายถึงอะไร?', en: 'What does a 144 Hz refresh rate mean?' }, a: { th: 'จอวาดภาพใหม่ได้ 144 ครั้งต่อวินาที', en: 'The display can redraw the image 144 times per second.' } },
  ],
};
