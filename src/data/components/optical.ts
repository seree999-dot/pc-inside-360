import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'optical',
  name: { th: 'ออปติคัลไดรฟ์', en: 'Optical Disc Drive' },
  abbr: 'ODD',
  category: 'storage',
  overview: {
    th: 'ออปติคัลไดรฟ์ (ODD) อ่านและเขียนข้อมูลบนแผ่น CD, DVD และ Blu-ray ด้วยแสงเลเซอร์ ในเครื่องเดสก์ท็อปติดตั้งในช่อง 5.25 นิ้วด้านหน้าบนของเคส แม้เครื่องรุ่นใหม่จำนวนมากไม่มีแล้วเพราะใช้การดาวน์โหลดและแฟลชไดรฟ์แทน แต่ยังจำเป็นสำหรับสื่อเก่า การสำรองข้อมูลระยะยาว และภาพยนตร์แบบแผ่น',
    en: 'An optical disc drive (ODD) reads and writes CD, DVD and Blu-ray discs with laser light. In a desktop it sits in the 5.25-inch bay at the top front of the case. Many new PCs omit it in favour of downloads and flash drives, yet it remains necessary for legacy media, long-term archiving and disc-based films.',
  },
  mainFunction: {
    th: 'อ่านข้อมูลจากแผ่นออปติคัลโดยตรวจจับแสงเลเซอร์ที่สะท้อนจากผิวแผ่น และในรุ่นที่เขียนได้จะใช้เลเซอร์กำลังสูงขึ้นบันทึกข้อมูลลงแผ่นชนิดบันทึกได้',
    en: 'Reads data from optical discs by detecting laser light reflected from the disc surface and, on writer models, uses a higher-power beam to record onto recordable discs.',
  },
  howItWorks: {
    beginner: {
      th: 'ลองนึกถึงการใช้ไฟฉายส่องถนนที่มีหลุมเล็ก ๆ เรียงกันเป็นแถว แผ่นดิสก์มีร่องเกลียวยาวต่อเนื่องที่มีหลุม (pit) และพื้นเรียบ (land) สลับกัน ไดรฟ์หมุนแผ่นแล้วยิงเลเซอร์ไปตามร่อง แสงที่สะท้อนกลับจะสว่างหรือมืดต่างกันเมื่อผ่านขอบหลุม ไดรฟ์จึงอ่านการเปลี่ยนแปลงนี้เป็นเลข 0 และ 1',
      en: 'Imagine shining a torch along a road with a row of tiny potholes. A disc carries one long spiral track of alternating pits and flat lands. The drive spins the disc and follows the track with a laser; the reflected light gets brighter or dimmer at the edge of each pit, and the drive reads those changes as 0s and 1s.',
    },
    technical: {
      th: 'หัวอ่าน (optical pickup) โฟกัสลำแสงเลเซอร์ผ่านเลนส์ลงบนชั้นข้อมูล หลุมมีความลึกประมาณหนึ่งในสี่ของความยาวคลื่น ทำให้แสงสะท้อนจากหลุมกับพื้นหักล้างกันและความเข้มที่โฟโตไดโอดลดลง การเปลี่ยนสถานะระหว่างหลุมกับพื้นแทนบิต 1 โดยใช้การเข้ารหัสแบบ EFM (CD) หรือ EFMPlus (DVD) ความยาวคลื่นที่สั้นลงและค่า NA ของเลนส์ที่สูงขึ้นทำให้จุดโฟกัสเล็กลง จึงบรรจุข้อมูลได้หนาแน่นขึ้นจาก CD (780 nm) สู่ DVD (650 nm) และ Blu-ray (405 nm) ระบบเซอร์โวควบคุมโฟกัสและการตามร่องตลอดเวลา และใช้รหัสแก้ไขข้อผิดพลาดแบบรีด-โซโลมอนชดเชยรอยขีดข่วน',
      en: 'The optical pickup focuses a laser beam through a lens onto the data layer. Pits are about a quarter of a wavelength deep, so light reflected from a pit and from the surrounding land interferes destructively and the intensity at the photodiode drops. Transitions between pit and land represent 1 bits, using EFM (CD) or EFMPlus (DVD) modulation. A shorter wavelength and a higher lens numerical aperture give a smaller spot, raising density from CD (780 nm) to DVD (650 nm) to Blu-ray (405 nm). Servo loops hold focus and tracking continuously, and Reed-Solomon error correction compensates for scratches.',
    },
  },
  structure: [
    {
      name: { th: 'ถาดใส่แผ่นและกลไกเลื่อนถาด', en: 'Disc tray and loading mechanism' },
      desc: { th: 'ถาดเลื่อนเข้าออกด้วยมอเตอร์และสายพานขนาดเล็ก เมื่อปิดถาด แผ่นจะถูกยกขึ้นไปยึดกับแกนหมุน', en: 'The tray slides in and out on a small motor and belt; when it closes the disc is lifted and clamped onto the spindle.' },
    },
    {
      name: { th: 'มอเตอร์แกนหมุน (spindle motor)', en: 'Spindle motor' },
      desc: { th: 'หมุนแผ่นด้วยความเร็วที่ปรับตามตำแหน่งที่อ่าน ตั้งแต่ไม่กี่ร้อยจนถึงราว 10,000 รอบต่อนาทีที่ความเร็วสูงสุด', en: 'Spins the disc at a speed adjusted to the position being read, from a few hundred up to roughly 10,000 rpm at top speed.' },
    },
    {
      name: { th: 'หัวอ่านเลเซอร์ (optical pickup unit)', en: 'Optical pickup unit' },
      desc: { th: 'ประกอบด้วยเลเซอร์ไดโอด เลนส์โฟกัสที่ขยับได้ และโฟโตไดโอดรับแสงสะท้อน ไดรฟ์ที่รองรับหลายรูปแบบจะมีเลเซอร์หลายความยาวคลื่น', en: 'Contains the laser diodes, a movable objective lens and photodiodes that receive the reflection. Multi-format drives carry lasers of several wavelengths.' },
    },
    {
      name: { th: 'กลไกเลื่อนหัวอ่าน (sled)', en: 'Sled mechanism' },
      desc: { th: 'รางและมอเตอร์ที่เลื่อนหัวอ่านในแนวรัศมีจากด้านในสู่ขอบนอกของแผ่น', en: 'Rails and a motor that move the pickup radially from the inside of the disc to the outer edge.' },
    },
    {
      name: { th: 'ขั้วต่อ SATA และปุ่มนำแผ่นออก', en: 'SATA connectors and eject controls' },
      desc: { th: 'ด้านหลังมีขั้วข้อมูล SATA 7 ขาและขั้วไฟ SATA 15 ขา ด้านหน้ามีปุ่ม eject และรูเข็มสำหรับนำแผ่นออกฉุกเฉิน', en: 'The rear has a 7-pin SATA data connector and a 15-pin SATA power connector; the front has the eject button and an emergency-eject pinhole.' },
    },
  ],
  specs: [
    {
      label: { th: 'ความยาวคลื่นเลเซอร์', en: 'Laser wavelength' },
      value: { th: 'CD 780 nm (อินฟราเรด) · DVD 650 nm (แดง) · Blu-ray 405 nm (น้ำเงิน-ม่วง)', en: 'CD 780 nm (infrared) · DVD 650 nm (red) · Blu-ray 405 nm (blue-violet)' },
    },
    {
      label: { th: 'ความจุแผ่น 12 ซม.', en: 'Capacity of a 12 cm disc' },
      value: { th: 'CD ราว 700 MB · DVD 4.7 GB ต่อชั้น · Blu-ray 25 GB ต่อชั้น', en: 'CD about 700 MB · DVD 4.7 GB per layer · Blu-ray 25 GB per layer' },
      note: { th: 'แผ่นสองชั้น: DVD 8.5 GB, Blu-ray 50 GB; รูปแบบ BDXL มี 100 GB ขึ้นไป', en: 'Dual-layer discs: DVD 8.5 GB, Blu-ray 50 GB; the BDXL format offers 100 GB and more.' },
    },
    {
      label: { th: 'ระยะห่างระหว่างร่อง (track pitch)', en: 'Track pitch' },
      value: { th: 'CD 1.6 µm · DVD 0.74 µm · Blu-ray 0.32 µm', en: 'CD 1.6 µm · DVD 0.74 µm · Blu-ray 0.32 µm' },
    },
    {
      label: { th: 'อัตราถ่ายโอนที่ความเร็ว 1×', en: 'Transfer rate at 1× speed' },
      value: { th: 'CD 150 kB/s · DVD ราว 1.39 MB/s · Blu-ray 4.5 MB/s', en: 'CD 150 kB/s · DVD about 1.39 MB/s · Blu-ray 4.5 MB/s' },
      note: { th: 'ค่า "×" บนไดรฟ์เป็นตัวคูณของค่าพื้นฐานแต่ละรูปแบบ จึงเทียบข้ามรูปแบบโดยตรงไม่ได้', en: 'The "×" rating multiplies each format base rate, so ratings cannot be compared directly across formats.' },
    },
    {
      label: { th: 'อินเทอร์เฟซ', en: 'Interface' },
      value: { th: 'SATA (ข้อมูล 7 ขา + ไฟ 15 ขา)', en: 'SATA (7-pin data + 15-pin power)' },
      note: { th: 'ไดรฟ์ภายนอกใช้ USB; ไดรฟ์รุ่นเก่าก่อนราวปี 2005 ใช้ IDE/PATA', en: 'External drives use USB; older drives from before about 2005 used IDE/PATA.' },
    },
    {
      label: { th: 'รูปแบบตัวถัง', en: 'Form factor' },
      value: { th: 'ครึ่งความสูง 5.25 นิ้ว (เดสก์ท็อป) หรือแบบบาง 9.5/12.7 มม. (โน้ตบุ๊ก)', en: '5.25-inch half-height (desktop) or 9.5/12.7 mm slim (laptop)' },
    },
  ],
  connects: {
    th: 'ต่อสายข้อมูล SATA จากด้านหลังไดรฟ์ไปยังพอร์ต SATA บนเมนบอร์ด และต่อสายไฟ SATA จากแหล่งจ่ายไฟ ตัวไดรฟ์ยึดกับช่อง 5.25 นิ้วของเคสด้วยสกรูหรือตัวล็อกแบบไม่ใช้เครื่องมือ',
    en: 'A SATA data cable runs from the back of the drive to a SATA port on the motherboard, and a SATA power cable comes from the power supply. The drive is fixed in a 5.25-inch case bay with screws or tool-less latches.',
  },
  related: ['motherboard', 'psu', 'case', 'hdd', 'firmware'],
  compatibility: [
    {
      th: 'ไดรฟ์รองรับย้อนหลังแต่ไม่รองรับไปข้างหน้า: ไดรฟ์ Blu-ray อ่าน DVD และ CD ได้ แต่ไดรฟ์ DVD อ่านแผ่น Blu-ray ไม่ได้เพราะไม่มีเลเซอร์ 405 nm',
      en: 'Drives are backward but not forward compatible: a Blu-ray drive reads DVDs and CDs, but a DVD drive cannot read Blu-ray discs because it lacks a 405 nm laser.',
    },
    {
      th: 'เคสต้องมีช่อง 5.25 นิ้วแบบเปิดด้านหน้า ซึ่งเคสรุ่นใหม่จำนวนมากตัดออกแล้ว หากไม่มีต้องใช้ไดรฟ์ภายนอกแบบ USB',
      en: 'The case must have an externally accessible 5.25-inch bay, which many modern cases have dropped; without one, use an external USB drive.',
    },
    {
      th: 'ต้องมีพอร์ต SATA ว่างบนเมนบอร์ดและขั้วไฟ SATA ว่างจากแหล่งจ่ายไฟ และการเล่นภาพยนตร์ Blu-ray ต้องใช้ซอฟต์แวร์ที่มีสิทธิ์ถอดรหัส',
      en: 'A free SATA port on the board and a free SATA power plug from the PSU are required, and Blu-ray film playback needs licensed decoding software.',
    },
  ],
  useCases: [
    { th: 'อ่านซอฟต์แวร์ เพลง หรือข้อมูลเก่าที่เก็บไว้บนแผ่น CD/DVD', en: 'Reading old software, music or data kept on CD/DVD.' },
    { th: 'สำรองข้อมูลระยะยาวลงแผ่นชนิดบันทึกครั้งเดียว ซึ่งไม่ถูกแก้ไขหรือลบโดยมัลแวร์ได้', en: 'Long-term archiving to write-once discs, which malware cannot alter or erase.' },
    { th: 'เล่นหรือแปลงภาพยนตร์ DVD/Blu-ray และติดตั้งระบบปฏิบัติการจากแผ่น', en: 'Playing or ripping DVD/Blu-ray films and installing an operating system from disc.' },
  ],
  problems: [
    {
      symptom: { th: 'ไดรฟ์อ่านแผ่นไม่ได้หรืออ่านแล้วค้าง', en: 'The drive cannot read a disc or stalls while reading.' },
      check: { th: 'ตรวจว่าแผ่นไม่สกปรกหรือมีรอยขีด เช็ดจากกลางแผ่นออกสู่ขอบเป็นเส้นตรง ลองแผ่นอื่น และตรวจว่าไดรฟ์รองรับชนิดแผ่นนั้น', en: 'Check the disc for dirt and scratches, wipe it in straight lines from the centre outward, try another disc and confirm the drive supports that disc type.' },
    },
    {
      symptom: { th: 'ถาดไม่เลื่อนออกเมื่อกดปุ่ม', en: 'The tray does not open when the button is pressed.' },
      check: { th: 'ตรวจว่าเสียบสายไฟ SATA แล้ว ลองสั่ง eject จากระบบปฏิบัติการ หากยังไม่ออกให้ปิดเครื่องแล้วใช้คลิปหนีบกระดาษดัดตรงดันรูนำแผ่นออกฉุกเฉิน', en: 'Check the SATA power cable, try ejecting from the operating system, and if that fails power off and push a straightened paper clip into the emergency-eject hole.' },
    },
    {
      symptom: { th: 'ไม่พบไดรฟ์ใน UEFI หรือระบบปฏิบัติการ', en: 'The drive is not listed in UEFI or the operating system.' },
      check: { th: 'เสียบสายข้อมูลและสายไฟ SATA ใหม่ทั้งสองปลาย ลองพอร์ต SATA หรือสายเส้นอื่น และตรวจว่าพอร์ตนั้นไม่ได้ถูกปิดในการตั้งค่าเฟิร์มแวร์', en: 'Reseat both ends of the SATA data and power cables, try another port or cable, and make sure that port is not disabled in firmware setup.' },
    },
  ],
  safety: [
    { th: 'ห้ามเปิดฝาไดรฟ์ขณะจ่ายไฟหรือมองเข้าไปในเลนส์ เลเซอร์ภายในเป็นอันตรายต่อดวงตา (เลเซอร์อินฟราเรดของ CD มองไม่เห็นด้วยตาเปล่า) ไดรฟ์ที่ปิดฝาครบจัดเป็นผลิตภัณฑ์เลเซอร์ Class 1 ที่ปลอดภัย', en: 'Never open the drive while powered or look into the lens: the laser inside can injure the eye, and the CD infrared beam is invisible. With its cover on, the drive is a safe Class 1 laser product.' },
    { th: 'ปิดเครื่องและถอดสายไฟก่อนต่อสาย SATA และอย่าใส่แผ่นที่ร้าวหรือบิ่น เพราะอาจแตกกระจายเมื่อหมุนด้วยความเร็วสูง', en: 'Shut down and unplug before connecting SATA cables, and never insert a cracked or chipped disc, which can shatter at high rotational speed.' },
  ],
  vocab: [
    { en: 'Pit and land', th: 'หลุมและพื้นเรียบ', meaning: { th: 'หลุมขนาดจิ๋วและพื้นที่เรียบระหว่างหลุมบนร่องข้อมูล การเปลี่ยนจากแบบหนึ่งเป็นอีกแบบหนึ่งแทนบิตข้อมูล', en: 'The microscopic depressions and the flat areas between them along the data track; transitions between the two encode bits.' } },
    { en: 'Wavelength', th: 'ความยาวคลื่น', meaning: { th: 'ระยะของหนึ่งรอบคลื่นแสง ยิ่งสั้นยิ่งโฟกัสเป็นจุดเล็กได้ จึงอ่านข้อมูลที่หนาแน่นกว่าได้', en: 'The length of one light-wave cycle; shorter wavelengths focus to a smaller spot and can read denser data.' } },
    { en: 'Optical pickup', th: 'หัวอ่านเลเซอร์', meaning: { th: 'ชุดเลเซอร์ เลนส์ และตัวรับแสงที่เคลื่อนที่ใต้แผ่นเพื่ออ่านและเขียนข้อมูล', en: 'The assembly of laser, lens and photodetector that moves under the disc to read and write data.' } },
    { en: 'Recordable / rewritable disc', th: 'แผ่นบันทึกได้ / แผ่นเขียนซ้ำได้', meaning: { th: 'แผ่น -R บันทึกได้ครั้งเดียวด้วยชั้นสีย้อม ส่วนแผ่น -RW/-RE ใช้วัสดุเปลี่ยนสถานะจึงลบแล้วเขียนใหม่ได้', en: '-R discs record once in a dye layer, while -RW/-RE discs use a phase-change material that can be erased and rewritten.' } },
    { en: 'Constant linear velocity (CLV)', th: 'ความเร็วเชิงเส้นคงที่', meaning: { th: 'วิธีปรับรอบหมุนให้ร่องข้อมูลผ่านหัวอ่านด้วยความเร็วเท่ากันทั้งแผ่น แผ่นจึงหมุนช้าลงเมื่ออ่านบริเวณขอบนอก', en: 'Varying the rotation so the track passes the pickup at the same speed everywhere; the disc turns more slowly near the outer edge.' } },
  ],
  facts: [
    { th: 'ร่องข้อมูลบนแผ่น CD เป็นเกลียวเส้นเดียวจากด้านในออกสู่ขอบ หากคลี่ออกจะยาวประมาณ 5 กิโลเมตร', en: 'The data track on a CD is a single spiral running from the inside outward; unrolled, it would be about 5 kilometres long.' },
    { th: 'ชื่อ Blu-ray มาจากเลเซอร์สีน้ำเงิน-ม่วงที่ใช้อ่านแผ่น', en: 'The name Blu-ray comes from the blue-violet laser used to read the disc.' },
  ],
  review: [
    {
      q: { th: 'เหตุใด Blu-ray จึงเก็บข้อมูลได้มากกว่า DVD บนแผ่นขนาดเท่ากัน', en: 'Why does Blu-ray hold more data than DVD on a disc of the same size?' },
      a: { th: 'เพราะใช้เลเซอร์ความยาวคลื่นสั้นกว่า (405 nm เทียบกับ 650 nm) จุดโฟกัสจึงเล็กลง หลุมและระยะห่างร่องจึงเล็กและถี่ขึ้นได้', en: 'It uses a shorter-wavelength laser (405 nm versus 650 nm), giving a smaller spot so pits and track pitch can be smaller and closer together.' },
    },
    {
      q: { th: 'ออปติคัลไดรฟ์ภายในเครื่องเดสก์ท็อปต้องต่อสายอะไรบ้าง', en: 'Which cables does an internal desktop optical drive need?' },
      a: { th: 'สายข้อมูล SATA ไปยังเมนบอร์ด และสายไฟ SATA จากแหล่งจ่ายไฟ', en: 'A SATA data cable to the motherboard and a SATA power cable from the power supply.' },
    },
    {
      q: { th: 'ไดรฟ์ DVD อ่านแผ่น Blu-ray ได้หรือไม่', en: 'Can a DVD drive read a Blu-ray disc?' },
      a: { th: 'ไม่ได้ เพราะไม่มีเลเซอร์ 405 nm และเลนส์ที่จำเป็น', en: 'No, it lacks the 405 nm laser and the optics required.' },
    },
  ],
};
