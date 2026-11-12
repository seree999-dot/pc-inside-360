import type { QHotspot, QIdentify, QMatch, QOrder } from '../types';

/** 25 interactive questions: i01–i08 identify, h01–h08 hotspot, m01–m05 match, o01–o04 order. */
export const interactiveQuestions: (QIdentify | QHotspot | QMatch | QOrder)[] = [
  /* ---------- Identify the highlighted part ---------- */
  {
    id: 'i01', type: 'identify', topic: 'cooling', target: 'cooler', part: 'cooler', lesson: 'l02',
    choices: ['psu', 'cooler', 'cpu', 'case', 'gpu'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์ซึ่งติดตั้งอยู่เหนือซ็อกเก็ตซีพียูคืออะไร?', en: 'Which component is highlighted, sitting directly above the CPU socket?' },
    explain: { th: 'นี่คือชุดระบายความร้อนซีพียูแบบทาวเวอร์ ประกอบด้วยฐานทองแดง ท่อนำความร้อน ครีบอะลูมิเนียม และพัดลม 120 มม. ตัวซีพียูเองถูกบังอยู่ใต้ฐานของชุดระบายความร้อนจึงมองไม่เห็นจนกว่าจะถอดออก', en: 'This is the tower CPU cooler: a copper base, heat pipes, an aluminium fin stack and a 120 mm fan. The CPU itself is hidden beneath the cooler base and cannot be seen until the cooler is removed.' },
  },
  {
    id: 'i02', type: 'identify', topic: 'memory', target: 'ram', part: 'ram', lesson: 'l02',
    choices: ['ssd', 'soundcard', 'wifi', 'ram', 'nic'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์เป็นพื้นที่ทำงานชั่วคราวของโปรแกรมที่กำลังรัน มันคืออะไร?', en: 'The highlighted part is the temporary working space for running programs. What is it?' },
    explain: { th: 'โมดูลแรม (DIMM) เป็นแผงยาวที่เสียบตั้งฉากในสล็อตข้างซ็อกเก็ตซีพียูและล็อกด้วยสลัก ต่างจาก M.2 SSD ที่วางราบแนบบอร์ด และต่างจากการ์ดขยายที่เสียบในสล็อต PCIe ด้านล่าง', en: 'RAM modules (DIMMs) are long boards standing upright in latched slots beside the CPU socket. An M.2 SSD lies flat on the board, and expansion cards sit in the PCIe slots lower down.' },
  },
  {
    id: 'i03', type: 'identify', topic: 'graphics', target: 'gpu', part: 'gpu', lesson: 'l02',
    choices: ['gpu', 'soundcard', 'nic', 'wifi', 'motherboard'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์คืออะไร?', en: 'Which component is highlighted?' },
    explain: { th: 'การ์ดจอเป็นการ์ดที่ใหญ่ที่สุดในเครื่อง มีพัดลมสามตัว เสียบในสล็อต PCIe x16 ช่องแรก และมีขั้วไฟ 8 พินของตัวเอง การ์ดเสียง การ์ดเครือข่าย และการ์ด Wi-Fi เป็นการ์ดขนาดเล็กในสล็อตล่างและไม่ต้องใช้ไฟเสริม', en: 'The graphics card is the largest card in the system: three fans, seated in the first PCIe x16 slot, with its own 8-pin power connector. The sound, network and Wi-Fi cards are small cards in the lower slots with no extra power.' },
  },
  {
    id: 'i04', type: 'identify', topic: 'storage', target: 'ssd', part: 'ssd', lesson: 'l04',
    choices: ['ram', 'hdd', 'optical', 'firmware', 'ssd'],
    prompt: { th: 'แผงวงจรขนาดเล็กที่ไฮไลต์ซึ่งขันยึดราบแนบกับเมนบอร์ดคือชิ้นส่วนใด?', en: 'Which component is the small highlighted board screwed flat against the motherboard?' },
    explain: { th: 'นี่คือ SSD แบบ M.2 2280 (กว้าง 22 มม. ยาว 80 มม.) ที่ใช้โปรโตคอล NVMe เสียบเฉียงเข้าซ็อกเก็ตแล้วขันสกรูยึดปลาย จึงไม่ต้องใช้สายข้อมูลหรือสายไฟ ต่างจากแรมที่เสียบตั้งและฮาร์ดดิสก์ที่อยู่ในช่องใส่ไดรฟ์', en: 'This is the M.2 2280 SSD (22 mm wide, 80 mm long) using NVMe. It slides into the socket at an angle and is held by one screw, needing no data or power cable, unlike upright RAM or a hard disk in a drive bay.' },
  },
  {
    id: 'i05', type: 'identify', topic: 'storage', target: 'hdd', part: 'hdd', lesson: 'l04',
    choices: ['ssd', 'optical', 'hdd', 'psu', 'case'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์ในช่องใส่ไดรฟ์ด้านล่างเก็บข้อมูลบนจานแม่เหล็กที่หมุนอยู่ มันคืออะไร?', en: 'The highlighted part in the lower drive bay stores data on spinning magnetic platters. What is it?' },
    explain: { th: 'ฮาร์ดดิสก์ 3.5 นิ้วเป็นกล่องโลหะปิดผนึกที่ภายในมีจานแม่เหล็กและแขนหัวอ่าน ต่อกับเมนบอร์ดด้วยสายข้อมูล SATA และรับไฟจากขั้ว SATA ของ PSU ไดรฟ์ออปติคัลอยู่ในช่อง 5.25 นิ้วด้านบนและมีถาดใส่แผ่น', en: 'The 3.5-inch hard disk is a sealed metal box containing magnetic platters and an actuator arm, linked to the board by a SATA data cable and powered by a SATA plug from the PSU. The optical drive sits in the upper 5.25-inch bay and has a disc tray.' },
  },
  {
    id: 'i06', type: 'identify', topic: 'power', target: 'psu', part: 'psu', lesson: 'l07',
    choices: ['hdd', 'case', 'optical', 'psu', 'cooler'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์อยู่บริเวณด้านล่างท้ายเคสคืออะไร?', en: 'Which component is highlighted at the bottom rear of the case?' },
    explain: { th: 'เพาเวอร์ซัพพลายแบบ ATX อยู่ใต้แผ่นครอบด้านล่างของเคส มีช่องเสียบสายไฟ AC ที่ด้านหลังและพัดลมของตัวเอง ห้ามเปิดฝา PSU ไม่ว่ากรณีใด เพราะภายในมีแรงดันอันตรายค้างอยู่ได้แม้ถอดปลั๊กแล้ว', en: 'The ATX power supply sits under the shroud at the bottom of the case, with an AC inlet at the rear and its own fan. Never open a PSU under any circumstances, as dangerous voltage can remain inside even when unplugged.' },
  },
  {
    id: 'i07', type: 'identify', topic: 'motherboard', target: 'motherboard', part: 'motherboard', lesson: 'l05',
    choices: ['case', 'expansion', 'ports', 'firmware', 'motherboard'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์เป็นแผงวงจรหลักที่ชิ้นส่วนอื่นทั้งหมดเสียบหรือต่อสายเข้ามา ชื่อว่าอะไร?', en: 'The highlighted part is the main circuit board that every other component plugs into or cables to. What is it called?' },
    explain: { th: 'เมนบอร์ดขนาด ATX รวมซ็อกเก็ตซีพียู สล็อตแรม สล็อต PCIe ซ็อกเก็ต M.2 พอร์ต SATA และขั้วไฟไว้บนแผงเดียว แล้วเชื่อมถึงกันด้วยลายทองแดง แผงพอร์ตด้านหลังและชิปเฟิร์มแวร์เป็นเพียงส่วนหนึ่งของบอร์ดนี้', en: 'The ATX motherboard carries the CPU socket, RAM slots, PCIe slots, M.2 socket, SATA ports and power connectors on one board, joined by copper traces. The rear I/O block and firmware chip are only parts of it.' },
  },
  {
    id: 'i08', type: 'identify', topic: 'storage', target: 'optical', part: 'optical', lesson: 'l02',
    choices: ['hdd', 'optical', 'psu', 'ssd', 'case'],
    prompt: { th: 'ชิ้นส่วนที่ไฮไลต์ในช่อง 5.25 นิ้วด้านบนหน้าเคสคืออะไร?', en: 'Which component is highlighted in the 5.25-inch bay at the top front of the case?' },
    explain: { th: 'ไดรฟ์ออปติคัลอ่านและเขียนแผ่น CD, DVD หรือ Blu-ray ด้วยแสงเลเซอร์ ต้องอยู่ชิดหน้าเคสเพื่อให้ถาดเลื่อนออกมาได้ ใช้สายข้อมูลและสายไฟ SATA เหมือนฮาร์ดดิสก์ แต่ขนาดช่องและวิธีเก็บข้อมูลต่างกัน', en: 'An optical drive reads and writes CD, DVD or Blu-ray discs with a laser and must sit at the front so its tray can eject. It uses SATA data and power like a hard disk, but its bay size and storage method differ.' },
  },

  /* ---------- Click the motherboard hotspot ---------- */
  {
    id: 'h01', type: 'hotspot', topic: 'cpu', target: 'mb-socket', part: 'motherboard', lesson: 'l05',
    prompt: { th: 'คลิกตำแหน่งบนเมนบอร์ดที่ใช้ติดตั้งหน่วยประมวลผลกลาง', en: 'Click the place on the motherboard where the central processing unit is installed.' },
    explain: { th: 'ซ็อกเก็ตแบบ LGA มีขาสปริงอยู่บนบอร์ดและมีโครงกดล็อกซีพียู ต้องวางซีพียูให้เครื่องหมายสามเหลี่ยมตรงกับมุมของซ็อกเก็ตโดยไม่ออกแรงกด ขาในซ็อกเก็ตงอได้ง่ายมาก จึงห้ามสัมผัส', en: 'An LGA socket has spring pins on the board and a retention frame that clamps the CPU. Lower the CPU with its triangle marker aligned to the socket corner, without force; the socket pins bend very easily and must not be touched.' },
  },
  {
    id: 'h02', type: 'hotspot', topic: 'memory', target: 'mb-ram-slots', part: 'motherboard', lesson: 'l05',
    prompt: { th: 'คลิกตำแหน่งที่ใช้เสียบโมดูลหน่วยความจำหลัก', en: 'Click where the main memory modules are inserted.' },
    explain: { th: 'สล็อต DIMM ทั้งสี่ช่องอยู่ทางขวาของซ็อกเก็ตซีพียู เพื่อให้ลายวงจรไปยังซีพียูสั้นที่สุด รอยบากของโมดูลต้องตรงกับสันในสล็อต แล้วกดจนสลักล็อกดังคลิก', en: 'The four DIMM slots sit to the right of the CPU socket to keep the traces to the CPU as short as possible. The module notch must line up with the ridge in the slot before pressing until the latch clicks.' },
  },
  {
    id: 'h03', type: 'hotspot', topic: 'graphics', target: 'mb-pcie-x16', part: 'motherboard', lesson: 'l05',
    prompt: { th: 'คลิกสล็อตขยายที่ยาวที่สุดและมีแบนด์วิดท์มากที่สุด ซึ่งใช้ติดตั้งการ์ดจอหลัก', en: 'Click the longest, highest-bandwidth expansion slot, where the main graphics card is installed.' },
    explain: { th: 'สล็อต PCIe x16 เป็นสล็อตขยายที่ยาวที่สุดและมี 16 เลนข้อมูล ช่องบนสุดที่ใกล้ซีพียูมักต่อเลนตรงกับซีพียู จึงเป็นตำแหน่งหลักของการ์ดจอ ปลายสล็อตมีสลักล็อกที่ต้องปลดก่อนถอดการ์ด', en: 'The PCIe x16 slot is the longest expansion slot, with 16 data lanes. The top one nearest the CPU usually connects directly to the CPU, making it the primary graphics position, and its end latch must be released before removing a card.' },
  },
  {
    id: 'h04', type: 'hotspot', topic: 'storage', target: 'mb-m2', part: 'motherboard', lesson: 'l05',
    prompt: { th: 'คลิกตำแหน่งที่ SSD ขนาดเท่าแผ่นหมากฝรั่งถูกขันยึดราบกับบอร์ดโดยไม่ใช้สาย', en: 'Click where a gum-stick-sized SSD is screwed flat onto the board with no cables.' },
    explain: { th: 'ซ็อกเก็ต M.2 รับทั้งข้อมูลและไฟผ่านขั้วเดียว ไดรฟ์จึงไม่ต้องใช้สาย ซ็อกเก็ตแต่ละบอร์ดอาจรองรับ SATA, NVMe หรือทั้งสองแบบ จึงต้องตรวจคู่มือก่อนเลือกไดรฟ์', en: 'The M.2 socket carries both data and power through one connector, so the drive needs no cables. Depending on the board a socket may support SATA, NVMe or both, so check the manual before choosing a drive.' },
  },
  {
    id: 'h05', type: 'hotspot', topic: 'power', target: 'mb-atx24', part: 'motherboard', lesson: 'l07',
    prompt: { th: 'คลิกขั้วที่รับไฟหลักของเมนบอร์ดจากเพาเวอร์ซัพพลาย ซึ่งเป็นขั้วไฟที่ใหญ่ที่สุดบนบอร์ด', en: 'Click the connector that receives the motherboard\'s main power from the PSU, the largest power connector on the board.' },
    explain: { th: 'ขั้ว ATX 24 พินอยู่ที่ขอบขวาของบอร์ด จ่ายไฟ +12 V, +5 V, +3.3 V และไฟสแตนด์บาย พร้อมสัญญาณควบคุมการเปิดเครื่อง ตัวขั้วมีเขี้ยวล็อกและเสียบได้ทิศเดียว', en: 'The 24-pin ATX connector on the right edge delivers +12 V, +5 V, +3.3 V and standby power, plus the power-on control signals. It has a locking clip and fits in only one orientation.' },
  },
  {
    id: 'h06', type: 'hotspot', topic: 'power', target: 'mb-eps8', part: 'motherboard', lesson: 'l07',
    prompt: { th: 'คลิกขั้วสำหรับเสียบสายไฟจาก PSU ที่จ่ายไฟให้ซีพียูโดยเฉพาะ (คลิกที่ขั้วเสียบสาย ไม่ใช่วงจรควบคุมแรงดันรอบซ็อกเก็ต)', en: 'Click the socket where the PSU cable that powers only the CPU plugs in (the cable connector itself, not the voltage-regulator circuitry around the socket).' },
    explain: { th: 'ขั้ว EPS 8 พิน (4+4) ที่มุมบนซ้ายจ่ายไฟ 12 V ให้ VRM แปลงเป็นแรงดันของซีพียู ถ้าลืมเสียบ เครื่องอาจมีไฟและพัดลมหมุนแต่ไม่ผ่าน POST ขั้วนี้ดูคล้ายขั้ว PCIe 8 พินแต่จัดขาต่างกัน ห้ามสลับ', en: 'The 8-pin (4+4) EPS connector at the top-left supplies 12 V for the VRM to convert to CPU voltage. If it is left unplugged, fans may spin but the system will not POST. It resembles an 8-pin PCIe plug but is wired differently and must not be swapped.' },
  },
  {
    id: 'h07', type: 'hotspot', topic: 'trouble', target: 'mb-cmos', part: 'motherboard', lesson: 'l10',
    prompt: { th: 'คลิกแหล่งพลังงานสำรองบนบอร์ดที่ทำให้นาฬิกาของระบบเดินต่อได้แม้ถอดปลั๊กไฟ (ไม่ใช่ชิปเซ็ตหรือช่อง M.2 ที่อยู่ใกล้กัน)', en: 'Click the on-board backup power source that keeps the system clock running even when the PC is unplugged (not the nearby chipset or M.2 slot).' },
    explain: { th: 'ถ่านกระดุม CR2032 ขนาด 3 V เลี้ยงนาฬิกาเวลาจริง (RTC) และการตั้งค่าบางส่วนของเฟิร์มแวร์ขณะไม่มีไฟ เมื่อถ่านอ่อน วันที่และเวลาจะรีเซ็ตทุกครั้งที่ถอดปลั๊ก ซึ่งเป็นอาการที่ใช้วินิจฉัยได้', en: 'The 3 V CR2032 coin cell powers the real-time clock (RTC) and some firmware settings while the PC has no power. When it runs down, date and time reset every time the PC is unplugged, a useful diagnostic sign.' },
  },
  {
    id: 'h08', type: 'hotspot', topic: 'assembly', target: 'mb-front-panel', part: 'motherboard', lesson: 'l08',
    prompt: { th: 'คลิกตำแหน่งที่ต่อสายปุ่มเปิดเครื่อง ปุ่มรีเซ็ต และไฟสถานะจากหน้าเคส', en: 'Click where the wires for the power button, reset button and status LEDs from the case front are attached.' },
    explain: { th: 'หัวต่อแผงหน้า (Front-panel header) ที่มุมล่างขวาเป็นแถวขาเล็ก ๆ สำหรับสายปุ่มและไฟ LED ของเคส ถ้าสายปุ่มเปิดเครื่องเสียบผิดขา การกดปุ่มจะไม่มีผลใด ๆ ส่วนสาย LED มีขั้วบวกลบที่ต้องเสียบให้ถูก', en: 'The front-panel header at the bottom-right is a row of small pins for the case button and LED wires. If the power-switch lead is on the wrong pins, pressing the button does nothing, and the LED leads are polarised.' },
  },

  /* ---------- Matching ---------- */
  {
    id: 'm01', type: 'match', topic: 'assembly', lesson: 'l01',
    prompt: { th: 'จับคู่ชิ้นส่วนกับหน้าที่หลัก', en: 'Match each component to its main purpose.' },
    left: [
      { th: 'ซีพียู (CPU)', en: 'CPU' },
      { th: 'แรม (RAM)', en: 'RAM' },
      { th: 'SSD', en: 'SSD' },
      { th: 'การ์ดจอ (GPU)', en: 'Graphics card (GPU)' },
      { th: 'เพาเวอร์ซัพพลาย (PSU)', en: 'Power supply (PSU)' },
    ],
    right: [
      { th: 'ประมวลผลคำสั่งของโปรแกรมและควบคุมการทำงานของระบบ', en: 'Executes program instructions and coordinates the system' },
      { th: 'เก็บข้อมูลของโปรแกรมที่กำลังรันไว้ชั่วคราว หายเมื่อปิดเครื่อง', en: 'Holds the data of running programs temporarily; lost at power-off' },
      { th: 'เก็บระบบปฏิบัติการและไฟล์ไว้ถาวรแม้ไม่มีไฟ', en: 'Keeps the operating system and files permanently, without power' },
      { th: 'คำนวณภาพแบบขนานและส่งสัญญาณออกจอ', en: 'Computes images in parallel and outputs the display signal' },
      { th: 'แปลงไฟ AC เป็นไฟ DC จ่ายให้ทุกชิ้นส่วน', en: 'Converts AC mains into DC for every component' },
    ],
    explain: { th: 'แต่ละชิ้นส่วนมีบทบาทเฉพาะ ได้แก่ ประมวลผล หน่วยความจำชั่วคราว หน่วยเก็บข้อมูลถาวร กราฟิก และพลังงาน การแยกแรมกับ SSD ให้ออกเป็นพื้นฐานสำคัญ เพราะแรมเร็วแต่ลบเลือน ส่วน SSD ช้ากว่าแต่เก็บข้อมูลถาวร', en: 'Each part has a distinct role: processing, temporary memory, permanent storage, graphics and power. Telling RAM from SSD is fundamental, because RAM is fast but volatile while an SSD is slower but persistent.' },
  },
  {
    id: 'm02', type: 'match', topic: 'power', part: 'psu', lesson: 'l07',
    prompt: { th: 'จับคู่ขั้วต่อกับปลายทางที่ต้องเสียบ', en: 'Match each connector to where it plugs in.' },
    left: [
      { th: 'ATX 24 พิน', en: '24-pin ATX' },
      { th: 'EPS 4+4 พิน', en: '4+4-pin EPS' },
      { th: 'PCIe 6+2 พิน', en: '6+2-pin PCIe' },
      { th: 'ขั้วไฟ SATA', en: 'SATA power' },
      { th: 'สายแผงหน้าของเคส', en: 'Case front-panel leads' },
    ],
    right: [
      { th: 'ขั้วไฟหลักที่ขอบขวาของเมนบอร์ด', en: 'Main power connector on the right edge of the motherboard' },
      { th: 'ขั้วไฟซีพียูใกล้ VRM ที่มุมบนของเมนบอร์ด', en: 'CPU power connector near the VRM at the top of the motherboard' },
      { th: 'ขั้วไฟเสริมบนการ์ดจอ', en: 'Auxiliary power socket on the graphics card' },
      { th: 'ฮาร์ดดิสก์ 3.5 นิ้ว SSD 2.5 นิ้ว และไดรฟ์ออปติคัล', en: '3.5-inch hard disks, 2.5-inch SSDs and optical drives' },
      { th: 'หัวต่อขาเล็กสำหรับปุ่มเปิดเครื่องและไฟ LED ที่ขอบล่างของบอร์ด', en: 'Small pin header for the power button and LEDs on the bottom edge of the board' },
    ],
    explain: { th: 'ขั้วไฟแต่ละชนิดมีรูปทรงและเขี้ยวล็อกเฉพาะเพื่อกันการเสียบผิด ขั้ว EPS กับ PCIe 8 พินดูคล้ายกันแต่จัดขาต่างกัน จึงต้องอ่านป้ายบนสายก่อนเสียบและไม่ฝืนออกแรง', en: 'Each power connector has its own shape and latch to prevent mistakes. EPS and 8-pin PCIe plugs look alike but are wired differently, so read the cable label first and never force a plug.' },
  },
  {
    id: 'm03', type: 'match', topic: 'peripheral', part: 'ports', lesson: 'l05',
    prompt: { th: 'จับคู่พอร์ตด้านหลังเครื่องกับสัญญาณที่ส่งผ่าน', en: 'Match each rear port to the signal it carries.' },
    left: [
      { th: 'RJ-45', en: 'RJ-45' },
      { th: 'DisplayPort', en: 'DisplayPort' },
      { th: 'แจ็ก 3.5 มม.', en: '3.5 mm jack' },
      { th: 'USB Type-A', en: 'USB Type-A' },
    ],
    right: [
      { th: 'ข้อมูลเครือข่าย Ethernet ผ่านสายคู่บิดเกลียว', en: 'Ethernet network data over twisted-pair cable' },
      { th: 'ภาพและเสียงแบบดิจิทัลไปยังจอภาพ', en: 'Digital video and audio to a monitor' },
      { th: 'เสียงแบบแอนะล็อกไปยังลำโพง หูฟัง หรือจากไมโครโฟน', en: 'Analogue audio to speakers or headphones, or from a microphone' },
      { th: 'ข้อมูลอนุกรมทั่วไปพร้อมไฟ 5 V สำหรับคีย์บอร์ด เมาส์ และไดรฟ์ภายนอก', en: 'General serial data plus 5 V power for keyboards, mice and external drives' },
    ],
    explain: { th: 'รูปทรงของพอร์ตบอกชนิดสัญญาณ RJ-45 สำหรับเครือข่าย DisplayPort สำหรับจอภาพ แจ็ก 3.5 มม. สำหรับเสียงแอนะล็อก และ USB สำหรับอุปกรณ์ทั่วไป การรู้จักพอร์ตช่วยให้ตรวจสอบได้เร็วเมื่ออุปกรณ์ไม่ทำงาน', en: 'A port\'s shape reveals its signal: RJ-45 for networking, DisplayPort for displays, 3.5 mm jacks for analogue audio and USB for general devices. Recognising them speeds up checks when a device does not respond.' },
  },
  {
    id: 'm04', type: 'match', topic: 'storage', part: 'ssd', lesson: 'l04',
    prompt: { th: 'จับคู่อุปกรณ์เก็บข้อมูลกับการเชื่อมต่อที่ใช้', en: 'Match each storage device to the connection it uses.' },
    left: [
      { th: 'ฮาร์ดดิสก์ 3.5 นิ้ว', en: '3.5-inch hard disk' },
      { th: 'M.2 NVMe SSD', en: 'M.2 NVMe SSD' },
      { th: 'M.2 SATA SSD', en: 'M.2 SATA SSD' },
      { th: 'SSD พกพาภายนอก', en: 'External portable SSD' },
    ],
    right: [
      { th: 'สายข้อมูล SATA ไปเมนบอร์ด และสายไฟ SATA จาก PSU', en: 'SATA data cable to the board plus SATA power cable from the PSU' },
      { th: 'ซ็อกเก็ต M.2 ที่ใช้เลน PCIe (คีย์ M)', en: 'M.2 socket using PCIe lanes (M key)' },
      { th: 'ซ็อกเก็ต M.2 ที่ใช้โปรโตคอล SATA (คีย์ B+M)', en: 'M.2 socket using the SATA protocol (B+M key)' },
      { th: 'พอร์ต USB ที่แผงหลังหรือหน้าเคส', en: 'USB port on the rear panel or case front' },
    ],
    explain: { th: 'รูปทรงของไดรฟ์ไม่ได้บอกโปรโตคอลเสมอไป ไดรฟ์ M.2 สองตัวที่ขนาดเท่ากันอาจใช้ SATA หรือ NVMe ซึ่งสังเกตได้จากรอยบากที่ขั้วและฉลาก ฮาร์ดดิสก์ 3.5 นิ้วต้องใช้สายสองเส้นแยกกันสำหรับข้อมูลและไฟ', en: 'A drive\'s shape does not always reveal its protocol: two M.2 drives of the same size may use SATA or NVMe, distinguishable by the connector notches and label. A 3.5-inch hard disk needs two separate cables, one for data and one for power.' },
  },
  {
    id: 'm05', type: 'match', topic: 'trouble', lesson: 'l10',
    prompt: { th: 'จับคู่คำศัพท์กับความหมาย', en: 'Match each term to its definition.' },
    left: [
      { th: 'POST', en: 'POST' },
      { th: 'VRM', en: 'VRM' },
      { th: 'IHS', en: 'IHS' },
      { th: 'ESD', en: 'ESD' },
      { th: 'ฟอร์มแฟกเตอร์ (Form factor)', en: 'Form factor' },
    ],
    right: [
      { th: 'การทดสอบฮาร์ดแวร์พื้นฐานที่เฟิร์มแวร์ทำทันทีหลังเปิดเครื่อง', en: 'Basic hardware self-test run by the firmware right after power-on' },
      { th: 'วงจรบนเมนบอร์ดที่ลดไฟ 12 V เป็นแรงดันของซีพียู', en: 'Motherboard circuit that steps 12 V down to CPU voltage' },
      { th: 'ฝาโลหะบนซีพียูที่กระจายความร้อนจากดายไปยังฮีตซิงก์', en: 'Metal lid on the CPU that spreads heat from the die to the cooler' },
      { th: 'การคายประจุไฟฟ้าสถิตที่ทำให้ชิ้นส่วนอิเล็กทรอนิกส์เสียหายได้', en: 'Static electricity discharge that can damage electronic parts' },
      { th: 'มาตรฐานขนาดและตำแหน่งยึดของชิ้นส่วน เช่น ATX หรือ mini-ITX', en: 'Standard for a part\'s size and mounting layout, such as ATX or mini-ITX' },
    ],
    explain: { th: 'คำย่อเหล่านี้พบบ่อยในคู่มือและการวินิจฉัยปัญหา เช่น "ไม่ผ่าน POST" หมายถึงเครื่องหยุดก่อนจะเริ่มโหลดระบบปฏิบัติการ การป้องกัน ESD ทำได้ด้วยการแตะโลหะที่ต่อลงดินหรือสวมสายรัดข้อมือกันไฟฟ้าสถิตก่อนจับชิ้นส่วน', en: 'These abbreviations appear constantly in manuals and troubleshooting; "no POST", for example, means the PC stops before loading the operating system. Guard against ESD by touching grounded metal or wearing an anti-static wrist strap before handling parts.' },
  },

  /* ---------- Ordering ---------- */
  {
    id: 'o01', type: 'order', topic: 'assembly', part: 'case', lesson: 'l08',
    prompt: { th: 'เรียงลำดับขั้นตอนการประกอบคอมพิวเตอร์ตามที่ใช้ในห้องปฏิบัติการประกอบเครื่อง', en: 'Put the PC assembly steps in the order used in the Assembly Lab.' },
    items: [
      { th: 'เตรียมเคสและยึดเมนบอร์ดบนแท่นรอง', en: 'Prepare the case and mount the motherboard on its standoffs' },
      { th: 'วางซีพียูลงซ็อกเก็ตแล้วล็อกโครงกด', en: 'Seat the CPU in the socket and lock the retention frame' },
      { th: 'เสียบแรมในสล็อตที่คู่มือแนะนำ', en: 'Insert the RAM into the slots the manual recommends' },
      { th: 'ติดตั้ง M.2 SSD และไดรฟ์อื่น', en: 'Install the M.2 SSD and other drives' },
      { th: 'ทาสารนำความร้อนและติดตั้งชุดระบายความร้อนซีพียู', en: 'Apply thermal paste and fit the CPU cooler' },
      { th: 'เสียบการ์ดจอในสล็อต PCIe x16', en: 'Seat the graphics card in the PCIe x16 slot' },
      { th: 'ติดตั้ง PSU ต่อสายไฟและสายข้อมูลทั้งหมด แล้วทดสอบเปิดเครื่อง', en: 'Install the PSU, connect all power and data cables, then power on to test' },
    ],
    explain: { th: 'ลำดับนี้ติดตั้งชิ้นส่วนที่อยู่ชิดบอร์ดก่อนชิ้นส่วนที่ใหญ่และบังพื้นที่ เช่น ฮีตซิงก์และการ์ดจอ และต่อสายไฟเป็นขั้นสุดท้ายเพื่อไม่ให้มีไฟเข้าระบบระหว่างประกอบ ช่างบางคนประกอบซีพียูกับแรมลงบอร์ดก่อนใส่เคส ซึ่งใช้หลักคิดเดียวกัน', en: 'This order fits parts that sit close to the board before large ones that block access, such as the cooler and graphics card, and leaves power cabling to last so nothing is live during assembly. Some builders fit the CPU and RAM before the board goes in the case, following the same logic.' },
  },
  {
    id: 'o02', type: 'order', topic: 'cpu', part: 'cpu', lesson: 'l03',
    prompt: { th: 'เรียงลำดับขั้นตอนของวงรอบคำสั่ง (Fetch–Decode–Execute) สำหรับหนึ่งคำสั่ง', en: 'Put the steps of the fetch–decode–execute cycle for one instruction in order.' },
    items: [
      { th: 'Fetch: อ่านคำสั่งจากหน่วยความจำตามตำแหน่งในตัวนับโปรแกรม (Program counter) แล้วเลื่อนตัวนับไปยังคำสั่งถัดไป', en: 'Fetch: read the instruction from memory at the address in the program counter, then advance the counter to the next instruction' },
      { th: 'Decode: หน่วยควบคุมตีความว่าคำสั่งนั้นให้ทำอะไรกับข้อมูลใด', en: 'Decode: the control unit works out what operation to do on which data' },
      { th: 'Execute: หน่วยคำนวณ (ALU) หรือวงจรที่เกี่ยวข้องทำงานตามคำสั่ง', en: 'Execute: the ALU or other circuitry carries out the operation' },
      { th: 'เขียนผลลัพธ์กลับลงรีจิสเตอร์หรือหน่วยความจำ', en: 'Write the result back to a register or to memory' },
    ],
    explain: { th: 'ซีพียูทำวงรอบนี้ซ้ำหลายพันล้านครั้งต่อวินาที โดยต้องอ่านคำสั่งก่อนจึงจะตีความได้ และต้องตีความก่อนจึงจะทำงานได้ ซีพียูสมัยใหม่ซ้อนขั้นตอนของหลายคำสั่งด้วยไปป์ไลน์ แต่ลำดับเชิงตรรกะของแต่ละคำสั่งยังเป็นเช่นนี้', en: 'A CPU repeats this cycle billions of times per second: an instruction must be fetched before it can be decoded, and decoded before it can be executed. Modern CPUs overlap the stages of many instructions in a pipeline, but each instruction still follows this logical order.' },
  },
  {
    id: 'o03', type: 'order', topic: 'trouble', part: 'firmware', lesson: 'l10',
    prompt: { th: 'เรียงลำดับเหตุการณ์ตั้งแต่กดปุ่มเปิดเครื่องจนระบบปฏิบัติการเริ่มทำงาน', en: 'Order the events from pressing the power button until the operating system starts.' },
    items: [
      { th: 'PSU จ่ายไฟจนแรงดันนิ่งแล้วส่งสัญญาณ Power Good', en: 'The PSU stabilises its voltages and asserts the Power Good signal' },
      { th: 'ซีพียูเริ่มรันโค้ดเฟิร์มแวร์ UEFI จากชิปแฟลช', en: 'The CPU begins running UEFI firmware code from the flash chip' },
      { th: 'POST ตรวจซีพียู แรม และกราฟิก', en: 'POST checks the CPU, RAM and graphics' },
      { th: 'เฟิร์มแวร์เตรียมอุปกรณ์และค้นหาไดรฟ์บูตตามลำดับที่ตั้งไว้', en: 'Firmware initialises devices and finds a boot drive in the configured order' },
      { th: 'โหลดบูตโหลดเดอร์จากไดรฟ์บูต', en: 'The boot loader is loaded from the boot drive' },
      { th: 'เคอร์เนลของระบบปฏิบัติการถูกโหลดและเข้าควบคุมเครื่อง', en: 'The operating-system kernel loads and takes control' },
    ],
    explain: { th: 'การรู้ลำดับนี้ช่วยระบุจุดที่เครื่องหยุดได้ เช่น ไม่มีภาพและไม่ผ่าน POST ชี้ไปที่ไฟ ซีพียู แรม หรือกราฟิก ส่วนข้อความว่าไม่พบอุปกรณ์บูตแปลว่าฮาร์ดแวร์หลักผ่านแล้ว แต่ปัญหาอยู่ที่ไดรฟ์หรือลำดับการบูต', en: 'Knowing this order shows where a PC stalls: no picture and no POST points to power, CPU, RAM or graphics, whereas a "no boot device" message means core hardware passed and the problem lies with the drive or boot order.' },
  },
  {
    id: 'o04', type: 'order', topic: 'cooling', part: 'cooler', lesson: 'l07',
    prompt: { th: 'เรียงลำดับเส้นทางที่ความร้อนเดินทางจากซีพียูออกสู่อากาศ', en: 'Order the path heat takes from the CPU out into the air.' },
    items: [
      { th: 'ดายซิลิคอนของซีพียู', en: 'CPU silicon die' },
      { th: 'ฝากระจายความร้อน (IHS)', en: 'Integrated heat spreader (IHS)' },
      { th: 'สารนำความร้อน', en: 'Thermal paste' },
      { th: 'ฐานทองแดงของชุดระบายความร้อน', en: 'Copper base of the cooler' },
      { th: 'ท่อนำความร้อน (Heat pipe)', en: 'Heat pipes' },
      { th: 'ครีบอะลูมิเนียม', en: 'Aluminium fins' },
      { th: 'กระแสลมจากพัดลมพาออกนอกเคส', en: 'Airflow from the fans carries it out of the case' },
    ],
    explain: { th: 'ความร้อนไหลจากจุดร้อนไปจุดเย็นผ่านวัสดุที่สัมผัสกันทีละชั้น ท่อนำความร้อนพาความร้อนจากฐานขึ้นไปยังครีบซึ่งมีพื้นที่ผิวมาก แล้วลมจึงพาออกไป ถ้าชั้นใดสัมผัสไม่ดี เช่น สารนำความร้อนแห้งหรือฮีตซิงก์ยึดไม่แน่น อุณหภูมิซีพียูจะสูงขึ้นทั้งระบบ', en: 'Heat flows from hot to cold through each layer in contact. Heat pipes carry it from the base up to the fins, whose large surface area hands it to the moving air. If any layer makes poor contact, such as dried paste or a loose cooler, CPU temperature rises.' },
  },
];
