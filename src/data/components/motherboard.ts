import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'motherboard',
  name: { th: 'เมนบอร์ด', en: 'Motherboard' },
  abbr: 'MB',
  category: 'core',
  overview: {
    th: 'เมนบอร์ด (motherboard) คือแผ่นวงจรพิมพ์หลักที่ชิ้นส่วนทุกชิ้นของคอมพิวเตอร์มาเสียบหรือเชื่อมต่อ ทำหน้าที่ทั้งยึดชิ้นส่วน จ่ายไฟ และเป็นเส้นทางให้ข้อมูลวิ่งถึงกัน ในโมเดล 3 มิติเป็นบอร์ดขนาด ATX ที่มีซ็อกเก็ต CPU แบบ LGA สล็อต RAM 4 ช่อง สล็อต PCIe ช่อง M.2 และพอร์ต SATA',
    en: 'The motherboard is the main printed circuit board that every other part of the computer plugs into or connects to. It holds the parts, distributes power to them and provides the paths their data travels on. In the 3D model it is an ATX board with an LGA CPU socket, four RAM slots, PCIe slots, an M.2 socket and SATA ports.',
  },
  mainFunction: {
    th: 'เชื่อมต่อ CPU หน่วยความจำ ที่เก็บข้อมูล การ์ดขยาย และอุปกรณ์ภายนอกเข้าด้วยกัน พร้อมแปลงและกระจายไฟจาก PSU ให้แต่ละส่วนในแรงดันที่เหมาะสม',
    en: 'Links the CPU, memory, storage, expansion cards and external devices together, and converts and distributes PSU power to each of them at the right voltage.',
  },
  howItWorks: {
    beginner: {
      th: 'เมนบอร์ดเปรียบเหมือนผังเมือง มีถนน (ลายทองแดง) เชื่อมอาคารสำคัญเข้าด้วยกัน CPU คือศาลากลาง RAM คือโต๊ะทำงานที่อยู่ติดกัน ส่วนชิปเซ็ตคือสถานีขนส่งที่รวมเส้นทางจากย่านรอบนอก เช่น พอร์ต USB และ SATA แล้วส่งต่อเข้าศาลากลาง เมืองยังมีระบบไฟฟ้า (วงจร VRM) ที่แปลงไฟจากโรงไฟฟ้า (PSU) ให้เหมาะกับแต่ละอาคาร',
      en: 'Think of the motherboard as a city plan. Roads (copper traces) join the important buildings: the CPU is city hall, RAM is the desk right next door, and the chipset is the bus terminal that gathers routes from the outer districts, such as USB and SATA ports, and forwards them to city hall. The city also has its own electrical grid (the VRM) that converts power from the power plant (PSU) to suit each building.',
    },
    technical: {
      th: 'เมนบอร์ดเป็นแผ่นวงจรหลายชั้นที่เดินสัญญาณความเร็วสูงระหว่างซ็อกเก็ต CPU กับสล็อต DIMM สล็อต PCIe และช่อง M.2 บนแพลตฟอร์มปัจจุบัน CPU ควบคุมหน่วยความจำและเลน PCIe หลัก (สล็อต x16 ตัวแรกและ M.2 ตัวหลัก) โดยตรง ส่วนชิปเซ็ต (PCH) ซึ่งต่อกับ CPU ผ่านลิงก์ความเร็วสูง ทำหน้าที่ขยายจำนวนพอร์ต ได้แก่ SATA, USB, เลน PCIe เพิ่มเติม เครือข่าย และเสียง วงจรควบคุมแรงดัน (VRM) แปลงไฟ +12 V จากขั้ว EPS ให้เป็นแรงดันต่ำราว 1 V กระแสสูงสำหรับ CPU โดยแบ่งเป็นหลายเฟสเพื่อลดความร้อนและแรงดันกระเพื่อม เฟิร์มแวร์ UEFI ในชิปแฟลชบนบอร์ดเป็นผู้ตรวจและตั้งค่าฮาร์ดแวร์ทั้งหมด (POST) ก่อนส่งต่อให้ระบบปฏิบัติการ',
      en: 'The motherboard is a multilayer PCB that routes high-speed signals between the CPU socket and the DIMM slots, PCIe slots and M.2 sockets. On current platforms the CPU drives memory and the primary PCIe lanes (the first x16 slot and the main M.2 socket) directly, while the chipset (PCH), attached to the CPU by a high-speed link, multiplies connectivity: SATA, USB, extra PCIe lanes, networking and audio. The voltage regulator module (VRM) converts +12 V from the EPS connector into the low-voltage, high-current supply of roughly 1 V the CPU needs, using several phases to cut heat and ripple. UEFI firmware stored in a flash chip on the board tests and configures all hardware (POST) before handing control to the operating system.',
    },
  },
  structure: [
    {
      name: { th: 'ซ็อกเก็ต CPU', en: 'CPU socket' },
      desc: {
        th: 'ฐานแบบ LGA ที่มีขาสปริงจำนวนมากและคานล็อก รองรับ CPU เฉพาะตระกูลที่ซ็อกเก็ตตรงกัน เช่น AM5 หรือ LGA1700',
        en: 'An LGA seat with a field of spring pins and a retention lever. It accepts only CPUs of the matching family, such as AM5 or LGA1700.',
      },
    },
    {
      name: { th: 'สล็อตหน่วยความจำ (DIMM)', en: 'Memory (DIMM) slots' },
      desc: {
        th: 'สล็อตยาว 4 ช่องทางขวาของซ็อกเก็ต แบ่งเป็น 2 แชนเนล (A และ B) ในโมเดลติดตั้ง RAM 2 แถวที่ช่อง A2 และ B2 ตามคำแนะนำทั่วไปของผู้ผลิตบอร์ด',
        en: 'Four long slots to the right of the socket, split into two channels (A and B). The model has two modules in A2 and B2, the placement board makers usually recommend.',
      },
    },
    {
      name: { th: 'สล็อตขยาย PCIe (x16 และ x1)', en: 'PCIe expansion slots (x16 and x1)' },
      desc: {
        th: 'สล็อต x16 ตัวบนสุดต่อตรงกับ CPU ใช้กับการ์ดจอ ส่วนสล็อต x1 ขนาดสั้นใช้กับการ์ดเครือข่าย การ์ด Wi-Fi หรือการ์ดเสียง',
        en: 'The top x16 slot is wired straight to the CPU and takes the graphics card; the short x1 slots take network, Wi-Fi or sound cards.',
      },
    },
    {
      name: { th: 'ช่อง M.2 และพอร์ต SATA', en: 'M.2 socket and SATA ports' },
      desc: {
        th: 'ช่อง M.2 รับ SSD แบบแผ่นที่ขันยึดแนบกับบอร์ด ส่วนพอร์ต SATA 4 ช่องที่ขอบขวาใช้สายต่อไปยัง HDD, SSD ขนาด 2.5 นิ้ว และออปติคัลไดรฟ์',
        en: 'The M.2 socket takes a card-style SSD screwed flat to the board; the four SATA ports on the right edge connect by cable to HDDs, 2.5-inch SSDs and optical drives.',
      },
    },
    {
      name: { th: 'วงจร VRM และขั้วไฟ (ATX 24 พิน, EPS 8 พิน)', en: 'VRM and power connectors (24-pin ATX, 8-pin EPS)' },
      desc: {
        th: 'ขั้ว 24 พินจ่ายไฟให้บอร์ดโดยรวม ขั้ว EPS 8 พินมุมบนซ้ายจ่ายไฟให้ CPU ผ่านวงจร VRM ซึ่งอยู่ใต้ฮีตซิงก์ด้านซ้ายและด้านบนของซ็อกเก็ต',
        en: 'The 24-pin connector powers the board in general; the 8-pin EPS connector at the top-left feeds the CPU through the VRM, which sits under the heatsinks left of and above the socket.',
      },
    },
    {
      name: { th: 'ชิปเซ็ต เฮดเดอร์ และพอร์ตด้านหลัง', en: 'Chipset, headers and rear I/O' },
      desc: {
        th: 'ชิปเซ็ตอยู่ใต้ฮีตซิงก์ด้านล่างขวา เฮดเดอร์ตามขอบบอร์ดใช้ต่อพัดลม USB หน้าเคส ปุ่มเปิดเครื่อง และเสียงหน้าเคส ส่วนแผงพอร์ตด้านหลังรวม USB, HDMI, DisplayPort, RJ-45 และช่องเสียง',
        en: 'The chipset sits under the lower-right heatsink. Headers along the board edges connect fans, front USB, the power button and front audio, and the rear I/O block gathers USB, HDMI, DisplayPort, RJ-45 and audio jacks.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'ฟอร์มแฟกเตอร์', en: 'Form factor' },
      value: {
        th: 'ATX 305 × 244 มม. · micro-ATX 244 × 244 มม. · mini-ITX 170 × 170 มม.',
        en: 'ATX 305 × 244 mm · micro-ATX 244 × 244 mm · mini-ITX 170 × 170 mm',
      },
      note: { th: 'เป็นขนาดสูงสุดตามมาตรฐาน บอร์ดเล็กกว่ามีสล็อตขยายน้อยกว่า', en: 'Maximum sizes per the standards; smaller boards have fewer expansion slots.' },
    },
    {
      label: { th: 'ซ็อกเก็ต CPU', en: 'CPU socket' },
      value: { th: 'เช่น AM5, LGA1700, LGA1851', en: 'e.g. AM5, LGA1700, LGA1851' },
      note: { th: 'กำหนดตระกูล CPU ที่ใช้ได้', en: 'Determines which CPU families can be used.' },
    },
    {
      label: { th: 'ชิปเซ็ต', en: 'Chipset' },
      value: { th: 'แบ่งเป็นระดับเริ่มต้น กลาง และสูง', en: 'Offered in entry, mid-range and high-end tiers' },
      note: {
        th: 'เช่น ตระกูล AMD ซีรีส์ A/B/X และ Intel ซีรีส์ H/B/Z; ระดับสูงมีพอร์ตและเลน PCIe มากกว่า และมักรองรับการโอเวอร์คล็อก',
        en: 'e.g. the AMD A/B/X series and Intel H/B/Z series; higher tiers add ports and PCIe lanes and usually allow overclocking.',
      },
    },
    {
      label: { th: 'หน่วยความจำที่รองรับ', en: 'Memory support' },
      value: { th: 'DIMM 2 หรือ 4 สล็อต ชนิด DDR4 หรือ DDR5 แบบดูอัลแชนเนล', en: '2 or 4 DIMM slots, DDR4 or DDR5, dual-channel' },
      note: {
        th: 'บอร์ดหนึ่งรุ่นรองรับ DDR เพียงรุ่นเดียว ความจุสูงสุดขึ้นกับแพลตฟอร์มและเวอร์ชัน UEFI',
        en: 'One board supports a single DDR generation; maximum capacity depends on the platform and UEFI version.',
      },
    },
    {
      label: { th: 'สล็อตขยาย', en: 'Expansion slots' },
      value: { th: 'PCIe x16 จำนวน 1–2 สล็อต และ x1 อีกหลายสล็อต (บอร์ด ATX)', en: '1–2 PCIe x16 slots plus several x1 slots (ATX boards)' },
      note: {
        th: 'เวอร์ชัน PCIe 3.0/4.0/5.0 ขึ้นกับรุ่นของ CPU และชิปเซ็ต และใช้งานข้ามเวอร์ชันได้ที่ความเร็วของฝั่งที่ช้ากว่า',
        en: 'The PCIe version (3.0/4.0/5.0) depends on the CPU and chipset generation; versions interoperate at the speed of the slower side.',
      },
    },
    {
      label: { th: 'การเชื่อมต่อที่เก็บข้อมูล', en: 'Storage connections' },
      value: { th: 'M.2 จำนวน 1–5 ช่อง และ SATA III (6 Gb/s) 2–8 พอร์ต', en: '1–5 M.2 sockets and 2–8 SATA III (6 Gb/s) ports' },
      note: {
        th: 'บอร์ด ATX มักมี SATA 4–8 พอร์ต ส่วนบอร์ด mini-ITX มักมีเพียง 2 พอร์ต ช่อง M.2 อาจรองรับเฉพาะ NVMe เฉพาะ SATA หรือทั้งสองแบบ ต้องดูคู่มือบอร์ด',
        en: 'ATX boards usually have 4–8 SATA ports, while mini-ITX boards often have only 2. An M.2 socket may accept NVMe only, SATA only, or both; check the board manual.',
      },
    },
    {
      label: { th: 'ขั้วรับไฟ', en: 'Power inputs' },
      value: { th: 'ATX 24 พิน และ EPS 8 พิน (4+4)', en: '24-pin ATX and 8-pin (4+4) EPS' },
      note: {
        th: 'บอร์ดระดับสูงบางรุ่นมีขั้ว EPS เพิ่มอีกหนึ่งชุดสำหรับ CPU ที่กินไฟมาก',
        en: 'Some high-end boards add a second EPS connector for power-hungry CPUs.',
      },
    },
  ],
  connects: {
    th: 'ทางกายภาพ เมนบอร์ดขันยึดกับเสารอง (standoff) บนถาดของเคส CPU วางในซ็อกเก็ต RAM เสียบสล็อต DIMM การ์ดจอและการ์ดขยายเสียบสล็อต PCIe SSD เสียบช่อง M.2 ส่วน HDD และออปติคัลไดรฟ์ต่อด้วยสาย SATA โดย PSU จ่ายไฟผ่านขั้ว 24 พินและ EPS ทางตรรกะ ข้อมูลทุกอย่างวิ่งบนบัสของบอร์ด: CPU คุยกับ RAM และสล็อต PCIe หลักโดยตรง และคุยกับอุปกรณ์อื่นผ่านชิปเซ็ต โดยเฟิร์มแวร์ UEFI เป็นผู้เริ่มต้นระบบและแบตเตอรี่ CMOS รักษาเวลาของนาฬิกาไว้',
    en: 'Physically the board is screwed to standoffs on the case tray; the CPU sits in the socket, RAM in the DIMM slots, the graphics card and other cards in PCIe slots, the SSD in the M.2 socket, while HDDs and optical drives attach by SATA cable and the PSU feeds the 24-pin and EPS connectors. Logically all data rides on the buses of the board: the CPU talks to RAM and the main PCIe slot directly and to everything else through the chipset, with UEFI firmware starting the system and the CMOS battery keeping the clock running.',
  },
  related: ['cpu', 'ram', 'gpu', 'ssd', 'psu', 'case', 'firmware', 'cmos', 'ports', 'expansion'],
  compatibility: [
    {
      th: 'ซ็อกเก็ตและชิปเซ็ตต้องรองรับ CPU ที่เลือก และบางครั้งต้องอัปเดต UEFI ก่อนใช้ CPU รุ่นที่ออกทีหลังบอร์ด',
      en: 'The socket and chipset must support the chosen CPU, and a UEFI update is sometimes required before a CPU released after the board will work.',
    },
    {
      th: 'ชนิด RAM ต้องตรงกับบอร์ด: บอร์ด AM5 ใช้ DDR5 เท่านั้น บอร์ด LGA1700 ถูกสร้างมาสำหรับ DDR4 หรือ DDR5 อย่างใดอย่างหนึ่ง และ DIMM สองรุ่นนี้มีร่องบากคนละตำแหน่ง',
      en: 'RAM type must match the board: AM5 boards are DDR5-only, LGA1700 boards are built for either DDR4 or DDR5, and the two DIMM types are keyed differently.',
    },
    {
      th: 'ฟอร์มแฟกเตอร์ของบอร์ดต้องเป็นขนาดที่เคสรองรับ เคส mid-tower แบบ ATX มักใส่ micro-ATX และ mini-ITX ได้ด้วย แต่เคส mini-ITX ใส่บอร์ด ATX ไม่ได้',
      en: 'The board form factor must be one the case supports. A mid-tower ATX case usually also takes micro-ATX and mini-ITX, but a mini-ITX case cannot take an ATX board.',
    },
    {
      th: 'ตรวจช่อง M.2 ว่ารองรับ SSD แบบ SATA หรือ NVMe (คีย์ M หรือ B+M) และ PSU ต้องมีขั้ว 24 พินกับ EPS 4+4 พินครบ',
      en: 'Check whether the M.2 socket accepts SATA or NVMe drives (M key or B+M key), and make sure the PSU provides both the 24-pin and 4+4-pin EPS connectors.',
    },
  ],
  useCases: [
    {
      th: 'เครื่องเดสก์ท็อปทั่วไปและเครื่องเล่นเกม: บอร์ด ATX ชิปเซ็ตระดับกลาง มีสล็อตและพอร์ตเพียงพอสำหรับการ์ดจอหนึ่งใบและ SSD หลายตัว',
      en: 'General desktops and gaming PCs: a mid-range ATX board offers enough slots and ports for one graphics card and several SSDs.',
    },
    {
      th: 'เครื่องขนาดเล็กสำหรับห้องนั่งเล่นหรือโต๊ะแคบ: บอร์ด mini-ITX ที่มีสล็อต PCIe เพียงช่องเดียวและ RAM 2 สล็อต',
      en: 'Compact living-room or small-desk builds: a mini-ITX board with a single PCIe slot and two RAM slots.',
    },
    {
      th: 'เวิร์กสเตชันสำหรับงานตัดต่อหรืองานวิจัย: บอร์ดชิปเซ็ตระดับสูงที่มี VRM แข็งแรง ช่อง M.2 หลายช่อง และพอร์ตความเร็วสูงจำนวนมาก',
      en: 'Workstations for editing or research: a high-end chipset board with a strong VRM, multiple M.2 sockets and plenty of fast ports.',
    },
  ],
  problems: [
    {
      symptom: { th: 'กดปุ่มเปิดเครื่องแล้วเงียบสนิท ไม่มีไฟ ไม่มีพัดลมหมุน', en: 'Pressing the power button does nothing: no lights, no fans.' },
      check: {
        th: 'ตรวจสวิตช์หลัง PSU และสายไฟ AC ตรวจว่าขั้ว 24 พินเสียบสุด และสายปุ่ม Power จากหน้าเคสเสียบถูกขาบนเฮดเดอร์ front panel',
        en: 'Check the PSU rear switch and AC cord, confirm the 24-pin plug is fully seated, and verify the case power-button lead is on the correct pins of the front-panel header.',
      },
    },
    {
      symptom: { th: 'พัดลมหมุนแต่ไม่มีภาพและเครื่องไม่บูต', en: 'Fans spin but there is no picture and the PC does not boot.' },
      check: {
        th: 'อ่านไฟ debug LED หรือเสียงบี๊บเพื่อดูว่าติดที่ CPU, DRAM, VGA หรือ BOOT เสียบ RAM ใหม่ ตรวจสาย EPS 8 พิน และตรวจว่าสายจอต่อกับการ์ดจอ ไม่ใช่พอร์ตบนเมนบอร์ด',
        en: 'Read the debug LEDs or beep codes to see whether it stops at CPU, DRAM, VGA or BOOT; reseat the RAM, check the 8-pin EPS cable, and confirm the monitor cable goes to the graphics card rather than the board outputs.',
      },
    },
    {
      symptom: { th: 'วันที่และเวลาผิด หรือค่าที่ตั้งใน UEFI หายทุกครั้งที่ถอดปลั๊ก', en: 'Date and time are wrong, or UEFI settings are lost whenever the PC is unplugged.' },
      check: {
        th: 'แบตเตอรี่ CMOS (CR2032) น่าจะหมด ให้วัดแรงดัน (ควรใกล้ 3 V) หรือเปลี่ยนก้อนใหม่ แล้วตั้งค่าอีกครั้ง',
        en: 'The CMOS battery (CR2032) is probably flat: measure it (it should read close to 3 V) or replace it, then re-enter the settings.',
      },
    },
    {
      symptom: { th: 'พอร์ต USB หน้าเคสหรืออุปกรณ์บางพอร์ตไม่ทำงาน', en: 'Front USB ports or devices on certain ports do not work.' },
      check: {
        th: 'ตรวจว่าสายจากหน้าเคสเสียบเฮดเดอร์ USB แน่นและไม่มีขางอ ลองพอร์ตด้านหลังเพื่อเทียบ แล้วตรวจการตั้งค่าใน UEFI และไดรเวอร์ชิปเซ็ต',
        en: 'Make sure the front-panel cable is firmly on the USB header with no bent pins, compare against a rear port, then check UEFI settings and chipset drivers.',
      },
    },
  ],
  safety: [
    {
      th: 'ถอดปลั๊กไฟและคายประจุไฟฟ้าสถิต (ESD) ก่อนจับบอร์ดทุกครั้ง จับที่ขอบบอร์ด ไม่แตะลายวงจรหรือขาชิป',
      en: 'Unplug the PC and discharge static (ESD) before touching the board; hold it by the edges and keep fingers off the traces and chip leads.',
    },
    {
      th: 'วางบอร์ดบนพื้นผิวไม่นำไฟฟ้า เช่น กล่องของบอร์ดเอง และติดตั้งเสารอง (standoff) ให้ตรงกับรูยึดเท่านั้น เสารองเกินตำแหน่งอาจทำให้ด้านหลังบอร์ดลัดวงจร',
      en: 'Rest the board on a non-conductive surface such as its own box, and fit standoffs only where the board has mounting holes; a stray standoff can short the back of the board.',
    },
    {
      th: 'ห้ามเสียบหรือถอด RAM การ์ดขยาย และสายไฟภายในขณะเครื่องยังมีไฟเลี้ยง และอย่าใช้แรงงัดขั้วต่อหรือคานล็อกซ็อกเก็ต',
      en: 'Never insert or remove RAM, expansion cards or internal power cables while the system has power, and never force a connector or the socket lever.',
    },
  ],
  vocab: [
    {
      en: 'Chipset',
      th: 'ชิปเซ็ต',
      meaning: {
        th: 'ชิปบนเมนบอร์ดที่เพิ่มพอร์ตและเลนเชื่อมต่อ (USB, SATA, PCIe) ให้ CPU และกำหนดฟีเจอร์ของบอร์ด',
        en: 'The chip on the board that adds ports and lanes (USB, SATA, PCIe) for the CPU and defines the feature set of the board.',
      },
    },
    {
      en: 'Socket',
      th: 'ซ็อกเก็ต',
      meaning: {
        th: 'ฐานเสียบ CPU ที่กำหนดรูปแบบและจำนวนหน้าสัมผัส จึงกำหนดว่าใช้ CPU ตระกูลใดได้',
        en: 'The CPU seat that defines the contact layout and count, and therefore which CPU families fit.',
      },
    },
    {
      en: 'Form factor',
      th: 'ฟอร์มแฟกเตอร์',
      meaning: {
        th: 'มาตรฐานขนาด ตำแหน่งรูยึด และตำแหน่งพอร์ตของบอร์ด เช่น ATX, micro-ATX, mini-ITX',
        en: 'The standard for board size, mounting-hole positions and port placement, such as ATX, micro-ATX and mini-ITX.',
      },
    },
    {
      en: 'Voltage regulator module (VRM)',
      th: 'วงจรควบคุมแรงดัน',
      meaning: {
        th: 'วงจรที่แปลงไฟ 12 V เป็นแรงดันต่ำกระแสสูงที่เสถียรสำหรับ CPU',
        en: 'The circuit that turns 12 V into the stable low-voltage, high-current supply the CPU needs.',
      },
    },
    {
      en: 'PCI Express (PCIe)',
      th: 'พีซีไอเอกซ์เพรส',
      meaning: {
        th: 'มาตรฐานเชื่อมต่อความเร็วสูงแบบอนุกรมที่แบ่งเป็นเลน (x1, x4, x16) ใช้กับการ์ดจอ SSD และการ์ดขยาย',
        en: 'A high-speed serial interconnect organised in lanes (x1, x4, x16), used by graphics cards, SSDs and expansion cards.',
      },
    },
    {
      en: 'Header',
      th: 'เฮดเดอร์',
      meaning: {
        th: 'ชุดขาเสียบบนบอร์ดสำหรับต่อสายภายใน เช่น พัดลม USB หน้าเคส ปุ่มเปิดเครื่อง และเสียงหน้าเคส',
        en: 'A group of pins on the board for internal cables such as fans, front USB, the power button and front audio.',
      },
    },
  ],
  facts: [
    {
      th: 'เมนบอร์ดเดสก์ท็อปเป็นแผ่นวงจรหลายชั้น โดยทั่วไปมีชั้นทองแดง 4–8 ชั้นหรือมากกว่า บางชั้นใช้เป็นระนาบกราวด์และไฟเลี้ยงเพื่อลดสัญญาณรบกวน',
      en: 'A desktop motherboard is a multilayer PCB, typically with 4–8 or more copper layers, some of them dedicated ground and power planes that reduce noise.',
    },
    {
      th: 'ลายทองแดงที่คดเคี้ยวไปมาใกล้สล็อต RAM ไม่ใช่การตกแต่ง แต่เป็นการปรับความยาวเส้นสัญญาณให้เท่ากัน เพื่อให้สัญญาณความถี่ระดับกิกะเฮิรตซ์ไปถึงพร้อมกัน',
      en: 'The wiggly copper traces near the RAM slots are not decoration: they equalise trace lengths so that gigahertz-rate signals arrive at the same moment.',
    },
    {
      th: 'มาตรฐาน ATX ถูกประกาศโดย Intel ในปี ค.ศ. 1995 และรูปแบบรูยึดของมันยังคงใช้อยู่ บอร์ด ATX รุ่นใหม่จึงยังขันยึดกับเคส ATX รุ่นเก่าได้',
      en: 'The ATX standard was published by Intel in 1995, and its mounting-hole pattern is still in use, so a new ATX board still screws into an old ATX case.',
    },
  ],
  review: [
    {
      q: { th: 'ชิปเซ็ตทำหน้าที่อะไร', en: 'What does the chipset do?' },
      a: {
        th: 'เป็นตัวกลางที่เพิ่มการเชื่อมต่อให้ CPU เช่น USB, SATA และเลน PCIe เพิ่มเติม และกำหนดฟีเจอร์ที่บอร์ดรองรับ',
        en: 'It acts as a hub that adds connectivity for the CPU, such as USB, SATA and extra PCIe lanes, and determines which features the board supports.',
      },
    },
    {
      q: { th: 'ขั้ว ATX 24 พินและ EPS 8 พินต่างกันอย่างไร', en: 'How do the 24-pin ATX and 8-pin EPS connectors differ?' },
      a: {
        th: '24 พินจ่ายไฟหลายแรงดันให้บอร์ดโดยรวม ส่วน EPS 8 พินจ่ายไฟ +12 V ให้ CPU โดยเฉพาะผ่านวงจร VRM',
        en: 'The 24-pin supplies several voltages to the board as a whole, while the 8-pin EPS delivers +12 V specifically for the CPU through the VRM.',
      },
    },
    {
      q: { th: 'ทำไมการ์ดจอจึงควรเสียบสล็อต PCIe x16 ตัวบนสุด', en: 'Why should the graphics card go in the top PCIe x16 slot?' },
      a: {
        th: 'เพราะสล็อตนั้นต่อตรงกับ CPU และได้เลนครบ 16 เลน สล็อต x16 ตัวล่างมักต่อผ่านชิปเซ็ตหรือเดินสายจริงเพียง x4',
        en: 'That slot is wired directly to the CPU with all 16 lanes; a lower x16-length slot is often routed through the chipset or wired for only x4.',
      },
    },
  ],
};
