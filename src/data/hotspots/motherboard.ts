import type { Hotspot } from '../types';

/** Hotspots on the ATX motherboard (17). Ids, parts and positions follow docs/CONTENT_BRIEF.md. */
export const motherboardHotspots: Hotspot[] = [
  {
    id: 'mb-socket', part: 'motherboard', pos: [-0.25, 0.75, 0.08], lesson: 'l05',
    name: { th: 'ซ็อกเก็ตซีพียู (CPU Socket)', en: 'CPU socket' },
    brief: { th: 'ฐานรองแบบ LGA ที่ยึดซีพียูและเชื่อมหน้าสัมผัสทุกจุดเข้ากับเมนบอร์ด', en: 'The LGA-style seat that holds the CPU and connects every contact to the board.' },
    detail: {
      th: 'ซ็อกเก็ตแบบ LGA (Land Grid Array) มีขาสปริงขนาดเล็กจำนวนมากอยู่บนเมนบอร์ด ส่วนตัวซีพียูมีเพียงแผ่นหน้าสัมผัสเรียบ เมื่อวางซีพียูแล้วกดคานล็อก แผ่นกด (load plate) จะกดซีพียูให้แนบกับขาทุกขาด้วยแรงสม่ำเสมอ สัญญาณข้อมูลและไฟเลี้ยงทั้งหมดของซีพียูเดินผ่านจุดนี้',
      en: 'In an LGA (Land Grid Array) socket the tiny spring pins live on the motherboard, while the CPU only has flat contact pads. After the CPU is lowered in, the lever and load plate press it evenly onto every pin. All of the CPU data signals and power pass through this interface.',
    },
    significance: {
      th: 'ชนิดของซ็อกเก็ต (เช่น AM5 หรือ LGA1700) เป็นเงื่อนไขแรกของความเข้ากันได้ระหว่างซีพียูกับเมนบอร์ด ขาในซ็อกเก็ตงอได้ง่ายมาก จึงต้องวางซีพียูลงตรง ๆ โดยไม่ไถหรือกด',
      en: 'The socket type (for example AM5 or LGA1700) is the first CPU-to-board compatibility condition. Socket pins bend very easily, so the CPU must be lowered straight down, never slid or forced.',
    },
  },
  {
    id: 'mb-ram-slots', part: 'motherboard', pos: [0.63, 0.75, 0.1], lesson: 'l04',
    name: { th: 'สล็อตแรม (DIMM Slots)', en: 'DIMM slots' },
    brief: { th: 'สล็อตสี่ช่องสำหรับเสียบแผงหน่วยความจำหลัก (RAM)', en: 'Four slots that accept the main memory (RAM) modules.' },
    detail: {
      th: 'เมนบอร์ดนี้มีสล็อต DIMM สี่ช่อง แบ่งเป็นสองแชนเนล (A และ B) แชนเนลละสองช่อง ในโมเดลเสียบแรมสองแผงไว้ที่ A2 และ B2 เพื่อให้ซีพียูอ่านเขียนผ่านทั้งสองแชนเนลพร้อมกัน (dual channel) ในกรณีของ DDR5 แต่ละแผงยังแบ่งภายในเป็นซับแชนเนล 32 บิตอีก 2 ชุด สลักที่ปลายสล็อตจะดีดล็อกเมื่อกดแผงลงจนสุด',
      en: 'This board has four DIMM slots arranged as two channels (A and B) with two slots each. The model has two modules in A2 and B2 so the CPU can use both channels at once (dual channel). With DDR5, each module is further split internally into two 32-bit sub-channels. The latch at the end of the slot clicks shut when the module is fully seated.',
    },
    significance: {
      th: 'การเสียบสองแผงในแชนเนลเดียวกันทำให้เสียแบนด์วิดท์ของหน่วยความจำไปโดยเปล่าประโยชน์ ควรดูคู่มือเมนบอร์ดว่าช่องใดควรใช้ก่อน และสล็อตรองรับเฉพาะ DDR รุ่นที่บอร์ดออกแบบมาเท่านั้น',
      en: 'Putting two modules in the same channel wastes memory bandwidth, so check the board manual for which slots to fill first. The slots only accept the DDR generation the board was designed for.',
    },
  },
  {
    id: 'mb-pcie-x16', part: 'motherboard', pos: [-0.45, -0.25, 0.1], lesson: 'l06',
    name: { th: 'สล็อต PCIe x16', en: 'PCIe x16 slot' },
    brief: { th: 'สล็อตขยายยาวที่สุดบนบอร์ด ใช้ติดตั้งการ์ดจอเป็นหลัก', en: 'The longest expansion slot on the board, mainly used for the graphics card.' },
    detail: {
      th: 'PCI Express ส่งข้อมูลแบบอนุกรมผ่านเลน (lane) โดยสล็อต x16 มีได้สูงสุด 16 เลน สล็อต x16 ช่องแรกมักต่อเลนตรงเข้าซีพียูเพื่อให้การ์ดจอได้แบนด์วิดท์เต็มที่ ปลายสล็อตมีสลักล็อกการ์ดซึ่งต้องปลดก่อนถอดทุกครั้ง',
      en: 'PCI Express carries data serially over lanes, and an x16 slot provides up to 16 of them. The first x16 slot is normally wired directly to the CPU so the graphics card gets full bandwidth. A retention latch at the end of the slot must be released before removing a card.',
    },
    significance: {
      th: 'PCIe เข้ากันได้ข้ามรุ่น การ์ดรุ่นใหม่ทำงานในสล็อตรุ่นเก่าได้โดยลดความเร็วลงตามฝั่งที่ช้ากว่า แต่สล็อต x16 ช่องที่สองของหลายบอร์ดเดินสายไฟฟ้าจริงเพียง x4 หรือ x8',
      en: 'PCIe is cross-generation compatible: a newer card runs in an older slot at the slower side\'s speed. On many boards, however, the second x16-length slot is electrically only x4 or x8.',
    },
  },
  {
    id: 'mb-pcie-x1', part: 'motherboard', pos: [-0.78, -0.55, 0.1], lesson: 'l05',
    name: { th: 'สล็อต PCIe x1', en: 'PCIe x1 slot' },
    brief: { th: 'สล็อตขยายสั้นหนึ่งเลน สำหรับการ์ดที่ไม่ต้องการแบนด์วิดท์สูง', en: 'A short one-lane expansion slot for cards that need little bandwidth.' },
    detail: {
      th: 'สล็อต x1 มีเลน PCIe เพียงเลนเดียว ซึ่งเพียงพอสำหรับการ์ดเครือข่าย การ์ด Wi-Fi การ์ดเสียง หรือการ์ดเพิ่มพอร์ต USB เลนของสล็อตเหล่านี้มักมาจากชิปเซ็ต ไม่ได้ต่อตรงกับซีพียู ในโมเดลนี้การ์ดขยายขนาดเล็กจะติดตั้งอยู่ในสล็อตช่วงล่างของบอร์ด',
      en: 'An x1 slot has a single PCIe lane, which is enough for a network card, Wi-Fi card, sound card or USB add-in card. These lanes usually come from the chipset rather than directly from the CPU. In this model the small expansion cards sit in the lower slots.',
    },
    significance: {
      th: 'การ์ด x1 เสียบในสล็อตที่ยาวกว่า (x4, x8, x16) ได้และทำงานปกติ ก่อนซื้อการ์ดขยายควรตรวจว่าสล็อตไม่ถูกการ์ดจอที่หนาหลายสล็อตบังไว้',
      en: 'An x1 card also works in any longer slot (x4, x8, x16). Before buying an expansion card, check that the slot is not covered by a thick multi-slot graphics card.',
    },
  },
  {
    id: 'mb-m2', part: 'motherboard', pos: [0.1, 0.05, 0.06], lesson: 'l04',
    name: { th: 'ซ็อกเก็ต M.2', en: 'M.2 socket' },
    brief: { th: 'ขั้วต่อแนวราบสำหรับ SSD แบบ M.2 ที่ยึดกับบอร์ดโดยตรงโดยไม่ใช้สาย', en: 'A flat connector for M.2 SSDs that mount directly on the board with no cables.' },
    detail: {
      th: 'SSD แบบ M.2 เสียบเข้าซ็อกเก็ตในแนวเฉียงแล้วกดลงให้ราบ จากนั้นยึดปลายอีกด้านด้วยสกรูหรือสลักบนเสารอง ตัวเลข 2280 หมายถึงกว้าง 22 มม. ยาว 80 มม. เมื่อใช้ไดรฟ์ NVMe ซ็อกเก็ตจะส่งข้อมูลผ่าน PCIe ได้สูงสุดสี่เลน',
      en: 'An M.2 SSD slides into the socket at an angle, is pressed flat, and is then secured at the far end by a screw or latch on a standoff. The size code 2280 means 22 mm wide and 80 mm long. With an NVMe drive the socket carries data over up to four PCIe lanes.',
    },
    significance: {
      th: 'ซ็อกเก็ต M.2 แต่ละบอร์ดอาจรองรับเฉพาะ SATA เฉพาะ NVMe หรือทั้งสองแบบ จึงต้องตรวจคู่มือก่อนซื้อไดรฟ์ บางบอร์ดจะปิดพอร์ต SATA บางช่องเมื่อมีการใช้ซ็อกเก็ต M.2',
      en: 'Depending on the board, an M.2 socket may be SATA-only, NVMe-only or both, so check the manual before buying a drive. Some boards disable certain SATA ports when an M.2 socket is in use.',
    },
  },
  {
    id: 'mb-sata', part: 'motherboard', pos: [1.12, -0.7, 0.1], lesson: 'l04',
    name: { th: 'พอร์ต SATA', en: 'SATA ports' },
    brief: { th: 'พอร์ตข้อมูลสี่ช่องสำหรับฮาร์ดดิสก์ SSD ขนาด 2.5 นิ้ว และออปติคัลไดรฟ์', en: 'Four data ports for hard drives, 2.5-inch SSDs and optical drives.' },
    detail: {
      th: 'พอร์ต SATA แต่ละช่องต่อกับไดรฟ์ได้หนึ่งตัวด้วยสายข้อมูลเจ็ดขา หัวต่อเป็นรูปตัว L จึงเสียบกลับด้านไม่ได้ มาตรฐาน SATA III มีอัตราส่งข้อมูลสูงสุด 6 Gb/s ส่วนไฟเลี้ยงของไดรฟ์มาจากสาย SATA power ของพาวเวอร์ซัพพลายแยกต่างหาก',
      en: 'Each SATA port connects one drive through a seven-pin data cable, and the L-shaped connector cannot be inserted upside down. The SATA III standard tops out at 6 Gb/s. Drive power comes separately from a SATA power cable on the power supply.',
    },
    significance: {
      th: 'ไดรฟ์ที่ BIOS มองไม่เห็นมักเกิดจากสายข้อมูลหรือสายไฟหลวม จึงเป็นจุดแรกที่ควรตรวจ ความเร็วของ SATA ถูกจำกัดโดยตัวอินเทอร์เฟซ จึงช้ากว่า NVMe อย่างชัดเจน',
      en: 'A drive that the firmware cannot see is often just a loose data or power cable, so check here first. SATA speed is capped by the interface itself, which is why it is clearly slower than NVMe.',
    },
  },
  {
    id: 'mb-atx24', part: 'motherboard', pos: [1.12, 0.7, 0.15], lesson: 'l07',
    name: { th: 'ขั้วไฟ ATX 24 พิน', en: '24-pin ATX power connector' },
    brief: { th: 'ขั้วจ่ายไฟหลักจากพาวเวอร์ซัพพลายเข้าสู่เมนบอร์ด', en: 'The main power feed from the power supply to the motherboard.' },
    detail: {
      th: 'ขั้ว 24 พินนำแรงดัน +3.3 V, +5 V และ +12 V เข้าสู่บอร์ด รวมถึงไฟสแตนด์บาย +5 VSB ที่มีอยู่ตลอดเมื่อเสียบปลั๊ก นอกจากนี้ยังมีสาย PS_ON ที่เมนบอร์ดใช้สั่งให้พาวเวอร์ซัพพลายเริ่มทำงานเมื่อกดปุ่มเปิดเครื่อง',
      en: 'The 24-pin connector brings +3.3 V, +5 V and +12 V onto the board, along with the +5 VSB standby rail that is live whenever the unit is plugged in. It also carries the PS_ON signal the board uses to tell the power supply to start when the power button is pressed.',
    },
    significance: {
      th: 'หากเสียบไม่สุดจนสลักไม่ล็อก เครื่องอาจไม่ติดหรือดับเป็นช่วง ๆ หัวต่อมีรูปทรงบังคับด้านและต้องใช้แรงกดพอสมควร จึงควรประคองขอบบอร์ดขณะเสียบ',
      en: 'If it is not pushed in until the clip locks, the PC may fail to start or shut off intermittently. The plug is keyed and needs firm pressure, so support the board edge while inserting it.',
    },
  },
  {
    id: 'mb-eps8', part: 'motherboard', pos: [-0.85, 1.43, 0.15], lesson: 'l07',
    name: { th: 'ขั้วไฟซีพียู EPS 8 พิน', en: '8-pin EPS CPU power connector' },
    brief: { th: 'ขั้วจ่ายไฟ +12 V เฉพาะสำหรับวงจรเลี้ยงซีพียู', en: 'A dedicated +12 V feed for the CPU power circuitry.' },
    detail: {
      th: 'ขั้ว EPS (มักเป็นหัวแบบ 4+4 พิน) ส่งไฟ +12 V ไปยังวงจร VRM ที่อยู่รอบซ็อกเก็ต ซึ่งจะแปลงลงเป็นแรงดันต่ำสำหรับซีพียู ขั้วนี้อยู่มุมบนซ้ายของบอร์ดเพื่อให้ใกล้ VRM ที่สุด',
      en: 'The EPS connector (usually a 4+4-pin plug) delivers +12 V to the VRM around the socket, which steps it down to the low voltage the CPU needs. It sits at the top-left corner of the board to be as close to the VRM as possible.',
    },
    significance: {
      th: 'ถ้าลืมเสียบสายนี้ พัดลมอาจหมุนแต่เครื่องจะไม่บูตและไม่มีภาพ หัว EPS กับหัว PCIe 8 พินของการ์ดจอมีรูปทรงบังคับต่างกันและเรียงขั้วไฟไม่เหมือนกัน ห้ามฝืนเสียบสลับ',
      en: 'If this cable is forgotten, fans may spin but the PC will not boot or show a picture. EPS and PCIe 8-pin plugs are keyed differently and wired differently, so never force one into the other.',
    },
  },
  {
    id: 'mb-vrm', part: 'motherboard', pos: [-0.72, 0.75, 0.28], lesson: 'l07',
    name: { th: 'ภาคจ่ายไฟซีพียู (VRM)', en: 'Voltage regulator module (VRM)' },
    brief: { th: 'วงจรแปลงไฟ +12 V ให้เป็นแรงดันต่ำที่เสถียรสำหรับซีพียู ซ่อนอยู่ใต้ฮีตซิงก์', en: 'The circuit under these heatsinks that converts +12 V into a stable low voltage for the CPU.' },
    detail: {
      th: 'VRM เป็นวงจรสวิตชิงแบบลดแรงดัน (buck converter) หลายเฟส แต่ละเฟสประกอบด้วยมอสเฟต ขดลวดโช้ก และตัวเก็บประจุ ทำงานสลับจังหวะกันเพื่อจ่ายกระแสสูงที่แรงดันราวหนึ่งโวลต์ให้ซีพียู ฮีตซิงก์ด้านซ้ายและด้านบนของซ็อกเก็ตช่วยระบายความร้อนจากมอสเฟต',
      en: 'The VRM is a multi-phase buck (step-down) switching converter. Each phase has MOSFETs, an inductor (choke) and capacitors, and the phases take turns to deliver high current at roughly one volt to the CPU. The heatsinks to the left of and above the socket cool the MOSFETs.',
    },
    significance: {
      th: 'ซีพียูที่กินไฟสูงต้องการ VRM ที่มีจำนวนเฟสและการระบายความร้อนเพียงพอ มิฉะนั้นแรงดันจะไม่นิ่งหรือบอร์ดจะลดความเร็วซีพียูลง ลมจากพัดลมในเคสที่พัดผ่านบริเวณนี้จึงมีความสำคัญ',
      en: 'A power-hungry CPU needs a VRM with enough phases and cooling; otherwise voltage becomes unstable or the board throttles the CPU. Case airflow across this area therefore matters.',
    },
  },
  {
    id: 'mb-chipset', part: 'motherboard', pos: [0.6, -0.6, 0.12], lesson: 'l05',
    name: { th: 'ชิปเซ็ต (Chipset)', en: 'Chipset' },
    brief: { th: 'ชิปใต้ฮีตซิงก์ที่ทำหน้าที่เป็นศูนย์กลางของพอร์ตและอุปกรณ์ความเร็วรอง', en: 'The chip under this heatsink that acts as a hub for ports and lower-speed devices.' },
    detail: {
      th: 'ชิปเซ็ตเชื่อมกับซีพียูผ่านลิงก์ความเร็วสูงเพียงเส้นทางเดียว แล้วกระจายต่อไปยังพอร์ต USB พอร์ต SATA สล็อต PCIe เพิ่มเติม ระบบเสียง และเครือข่าย อุปกรณ์ที่ต้องการความเร็วสูงสุด เช่น การ์ดจอและแรม จะต่อกับซีพียูโดยตรงไม่ผ่านชิปเซ็ต',
      en: 'The chipset connects to the CPU through a single high-speed link and fans out to USB ports, SATA ports, extra PCIe slots, audio and networking. The most demanding devices, such as the graphics card and RAM, connect directly to the CPU and bypass the chipset.',
    },
    significance: {
      th: 'รุ่นของชิปเซ็ตเป็นตัวกำหนดจำนวนพอร์ต จำนวนเลน PCIe และฟีเจอร์อย่างการโอเวอร์คล็อก รวมทั้งรุ่นของซีพียูที่บอร์ดรองรับ ซ็อกเก็ตตรงกันจึงยังไม่พอ ต้องตรวจชิปเซ็ตและเฟิร์มแวร์ด้วย',
      en: 'The chipset model determines how many ports and PCIe lanes a board offers, features such as overclocking, and which CPU generations are supported. A matching socket alone is not enough; chipset and firmware must be checked too.',
    },
  },
  {
    id: 'mb-uefi', part: 'motherboard', pos: [0.95, -1.1, 0.06], lesson: 'l10',
    name: { th: 'ชิปแฟลชเฟิร์มแวร์ UEFI', en: 'UEFI firmware flash chip' },
    brief: { th: 'ชิปหน่วยความจำแฟลชแบบ SPI ขนาดเล็กที่เก็บเฟิร์มแวร์ UEFI ของเมนบอร์ด', en: 'A small SPI flash memory chip that stores the motherboard UEFI firmware.' },
    detail: {
      th: 'เมื่อเปิดเครื่อง ซีพียูจะเริ่มทำงานจากโค้ดในชิปนี้ (ในแพลตฟอร์มรุ่นใหม่ ตัวประมวลผลความปลอดภัยภายในชิป เช่น AMD PSP หรือ Intel CSME จะทำงานและตรวจเฟิร์มแวร์ก่อนคอร์ของซีพียูเริ่ม) เฟิร์มแวร์ UEFI จะตั้งค่าเริ่มต้นและทดสอบฮาร์ดแวร์ (POST) แล้วจึงค้นหาตัวบูตของระบบปฏิบัติการในไดรฟ์ ข้อมูลในชิปไม่หายเมื่อไม่มีไฟ และเขียนทับใหม่ได้เมื่ออัปเดตเฟิร์มแวร์',
      en: 'At power-on the CPU runs code from this chip (on current platforms a built-in security processor, such as AMD PSP or Intel CSME, runs first and checks the firmware before the CPU cores start). The UEFI firmware initialises and tests the hardware (POST) and then looks for an operating system boot loader on a drive. The chip keeps its contents without power and can be rewritten by a firmware update.',
    },
    significance: {
      th: 'ซีพียูรุ่นใหม่บนบอร์ดรุ่นเก่าอาจต้องอัปเดตเฟิร์มแวร์ก่อนจึงจะบูตได้ ระหว่างอัปเดตห้ามให้ไฟดับ เพราะเฟิร์มแวร์ที่เขียนไม่สมบูรณ์อาจทำให้บอร์ดเปิดไม่ติด',
      en: 'A newer CPU on an older board may need a firmware update before it will boot. Power must not be interrupted during an update, because an incomplete write can leave the board unable to start.',
    },
  },
  {
    id: 'mb-fan-header', part: 'motherboard', pos: [0.1, 1.42, 0.1], lesson: 'l07',
    name: { th: 'ขั้วต่อพัดลม (Fan Header)', en: 'Fan header' },
    brief: { th: 'ขั้ว 4 พินที่จ่ายไฟและควบคุมความเร็วพัดลม', en: 'A 4-pin header that powers a fan and controls its speed.' },
    detail: {
      th: 'ขั้วพัดลมแบบ 4 พินประกอบด้วยกราวด์ ไฟ +12 V สัญญาณวัดรอบ (tach) และสัญญาณ PWM ที่ใช้สั่งความเร็ว เมนบอร์ดอ่านอุณหภูมิจากเซนเซอร์แล้วปรับรอบพัดลมตามเส้นโค้งที่ตั้งไว้ในเฟิร์มแวร์ พัดลมแบบ 3 พินก็เสียบได้ โดยควบคุมความเร็วด้วยการปรับแรงดันแทน',
      en: 'A 4-pin fan header has ground, +12 V, a tachometer (speed sense) signal and a PWM signal that sets the speed. The board reads temperature sensors and adjusts fan speed according to the curve set in firmware. A 3-pin fan also fits and is controlled by varying voltage instead.',
    },
    significance: {
      th: 'พัดลมของชุดระบายความร้อนซีพียูต้องเสียบที่ขั้ว CPU_FAN เพราะหลายบอร์ดจะแจ้งข้อผิดพลาดตอนบูตหากไม่พบสัญญาณรอบจากขั้วนี้ ขั้วแต่ละขั้วจ่ายกระแสได้จำกัด จึงไม่ควรพ่วงพัดลมหลายตัวเกินกำหนด',
      en: 'The CPU cooler fan belongs on the CPU_FAN header, because many boards raise a boot error if no speed signal is seen there. Each header has a current limit, so do not chain too many fans onto one.',
    },
  },
  {
    id: 'mb-usb-header', part: 'motherboard', pos: [0.3, -1.45, 0.1], lesson: 'l08',
    name: { th: 'ขั้วต่อ USB ภายใน (USB Header)', en: 'Internal USB header' },
    brief: { th: 'ขั้วต่อบนบอร์ดที่ส่งสัญญาณ USB ไปยังพอร์ตด้านหน้าเคส', en: 'An on-board header that feeds USB to the ports on the front of the case.' },
    detail: {
      th: 'พอร์ต USB ด้านหน้าเคสไม่มีวงจรควบคุมของตัวเอง แต่ต่อสายมายังขั้วบนเมนบอร์ด ขั้ว USB 2.0 เป็นแบบ 9 พิน ส่วนขั้ว USB 3.x เป็นหัวขนาดใหญ่กว่าแบบ 19 พิน และมีขั้วอีกแบบสำหรับพอร์ต Type-C ด้านหน้า แต่ละแบบมีรูปทรงบังคับด้าน',
      en: 'Front-panel USB ports have no controller of their own; they are cabled to headers on the motherboard. The USB 2.0 header has 9 pins, the USB 3.x header is a larger 19-pin block, and there is a separate header type for a front Type-C port. Each is keyed.',
    },
    significance: {
      th: 'ต้องจับคู่ชนิดของสายจากเคสกับชนิดของขั้วบนบอร์ดให้ตรงกัน ขาของขั้ว USB 3.x งอได้ง่ายหากเสียบเอียงหรือดึงสายออกแรง ๆ',
      en: 'The case cable type must match the header type on the board. The pins of a USB 3.x header bend easily if the plug goes in crooked or is yanked out.',
    },
  },
  {
    id: 'mb-front-panel', part: 'motherboard', pos: [1.0, -1.45, 0.1], lesson: 'l08',
    name: { th: 'ขั้วต่อแผงหน้าเคส (Front Panel Header)', en: 'Front-panel header' },
    brief: { th: 'ชุดขาสำหรับสายปุ่มเปิดเครื่อง ปุ่มรีเซ็ต และไฟแสดงสถานะของเคส', en: 'The pin block for the case power button, reset button and status LEDs.' },
    detail: {
      th: 'สายเส้นเล็กจากเคสจะต่อเข้าที่นี่ ได้แก่ สวิตช์เปิดเครื่อง (PWR_SW) สวิตช์รีเซ็ต ไฟแสดงการเปิดเครื่อง และไฟแสดงการทำงานของไดรฟ์ ปุ่มเปิดเครื่องเป็นเพียงสวิตช์กดติดปล่อยดับที่ทำให้ขาสองขาแตะกันชั่วขณะ แล้วเมนบอร์ดจึงสั่งพาวเวอร์ซัพพลายให้ทำงาน',
      en: 'The thin case leads plug in here: power switch (PWR_SW), reset switch, power LED and drive-activity LED. The power button is only a momentary switch that briefly bridges two pins; the motherboard then tells the power supply to start.',
    },
    significance: {
      th: 'สาย LED มีขั้วบวกลบ หากเสียบกลับไฟจะไม่ติด ส่วนสายสวิตช์เสียบด้านใดก็ได้ เมื่อเครื่องไม่ตอบสนองต่อปุ่มเปิด ควรตรวจว่าสาย PWR_SW อยู่บนขาที่ถูกต้องตามคู่มือ',
      en: 'LED leads are polarised and will not light if reversed, while switch leads work either way round. If the PC ignores the power button, check that the PWR_SW lead sits on the correct pins per the manual.',
    },
  },
  {
    id: 'mb-rear-io', part: 'motherboard', pos: [-1.1, 1.0, 0.4], lesson: 'l05',
    name: { th: 'แผงพอร์ตด้านหลัง (Rear I/O)', en: 'Rear I/O panel' },
    brief: { th: 'กลุ่มพอร์ตที่บัดกรีติดกับเมนบอร์ดและโผล่ออกทางด้านหลังเคส', en: 'The block of ports soldered to the board that faces out of the back of the case.' },
    detail: {
      th: 'แผงนี้รวมพอร์ต USB พอร์ตแสดงผล พอร์ตเครือข่าย RJ-45 และช่องเสียงไว้ด้วยกัน โดยมีแผ่นโลหะ I/O shield ปิดช่องว่างระหว่างพอร์ตกับตัวเคส พอร์ตแต่ละชนิดต่อกับตัวควบคุมคนละตัว เช่น USB ต่อกับชิปเซ็ตหรือซีพียู ส่วนช่องเสียงต่อกับชิปเสียงบนบอร์ด',
      en: 'This panel groups the USB, display, RJ-45 network and audio jacks, with a metal I/O shield closing the gap between the ports and the case. Each port type is served by a different controller: USB by the chipset or CPU, audio by the on-board audio codec.',
    },
    significance: {
      th: 'ถ้า I/O shield เป็นแผ่นแยก ต้องใส่เข้ากับเคสก่อนวางเมนบอร์ด พอร์ตแสดงผลตรงนี้ใช้ได้ต่อเมื่อซีพียูมีกราฟิกในตัว หากมีการ์ดจอแยกควรต่อจอเข้ากับการ์ดจอแทน',
      en: 'If the I/O shield is a separate plate it must be fitted to the case before the motherboard goes in. The display outputs here only work when the CPU has integrated graphics; with a discrete graphics card, connect the monitor to the card instead.',
    },
  },
  {
    id: 'mb-cmos', part: 'motherboard', pos: [0.15, -0.55, 0.06], lesson: 'l10',
    name: { th: 'แบตเตอรี่ CMOS (CR2032)', en: 'CMOS battery (CR2032)' },
    brief: { th: 'ถ่านกระดุมลิเทียม 3 V ในฐานยึด ที่เลี้ยงนาฬิกาของเครื่องขณะไม่ได้เสียบปลั๊ก', en: 'A 3 V lithium coin cell in a holder that keeps the system clock alive while unplugged.' },
    detail: {
      th: 'ฐานยึดนี้ใส่ถ่าน CR2032 ซึ่งจ่ายไฟให้วงจรนาฬิกาเวลาจริง (RTC) และหน่วยความจำขนาดเล็กที่เก็บค่าตั้งของเฟิร์มแวร์ในหลายบอร์ด ถ่านกินกระแสน้อยมากจึงมักใช้ได้หลายปี เมื่อถอดปลั๊กแล้วถอดถ่านออกไว้ราว 1–5 นาที หรือใช้จัมเปอร์/ปุ่ม Clear CMOS ตามคู่มือ ค่าตั้งจะกลับเป็นค่าเริ่มต้น',
      en: 'The holder takes a CR2032 cell that powers the real-time clock (RTC) and, on many boards, the small memory that holds firmware settings. It draws very little current, so it usually lasts for years. With the PC unplugged, removing it for about 1–5 minutes, or using the Clear CMOS jumper/button per the manual, returns the settings to defaults.',
    },
    significance: {
      th: 'อาการที่บ่งว่าถ่านอ่อนคือวันที่และเวลารีเซ็ตทุกครั้งที่ถอดปลั๊ก หรือค่าตั้ง BIOS หายเอง การล้างค่า CMOS เป็นวิธีแก้ที่ใช้บ่อยเมื่อเครื่องไม่บูตหลังปรับค่าผิด',
      en: 'A weak cell shows up as the date and time resetting whenever the PC is unplugged, or firmware settings being lost. Clearing CMOS is a common fix when a PC will not boot after a bad setting change.',
    },
  },
  {
    id: 'mb-audio', part: 'motherboard', pos: [-1.0, -1.4, 0.08], lesson: 'l08',
    name: { th: 'ขั้วต่อเสียงหน้าเคส (Front Audio Header)', en: 'Front-panel audio header' },
    brief: { th: 'ขั้วต่อที่ส่งสัญญาณเสียงไปยังช่องหูฟังและไมโครโฟนด้านหน้าเคส', en: 'The header that routes audio to the headphone and microphone jacks on the front of the case.' },
    detail: {
      th: 'ขั้วนี้ (มักพิมพ์กำกับว่า AAFP หรือ HD_AUDIO) ต่อกับชิปเสียง (audio codec) บนเมนบอร์ด ซึ่งแปลงข้อมูลดิจิทัลเป็นสัญญาณแอนะล็อกสำหรับหูฟัง และแปลงเสียงจากไมโครโฟนกลับเป็นดิจิทัล หัวต่อมีช่องที่ไม่มีขาหนึ่งตำแหน่งเพื่อป้องกันการเสียบกลับด้าน',
      en: 'This header (often labelled AAFP or HD_AUDIO) connects to the on-board audio codec, which converts digital data to an analogue signal for headphones and converts microphone input back to digital. One pin position is blanked to stop the plug going in the wrong way.',
    },
    significance: {
      th: 'ขั้วนี้อยู่มุมล่างซ้ายซึ่งไกลจากด้านหน้าเคส จึงควรเดินสายก่อนติดตั้งการ์ดจอ หากช่องหูฟังด้านหน้าไม่มีเสียงแต่ช่องด้านหลังใช้ได้ ให้ตรวจสายเส้นนี้ก่อน',
      en: 'It sits at the bottom-left corner, far from the case front, so route the cable before installing the graphics card. If the front headphone jack is silent but the rear jacks work, check this cable first.',
    },
  },
];
