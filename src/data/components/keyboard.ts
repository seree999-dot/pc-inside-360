import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'keyboard',
  name: { th: 'คีย์บอร์ด', en: 'Keyboard' },
  abbr: 'KB',
  category: 'peripheral',
  overview: {
    th: 'คีย์บอร์ดเป็นอุปกรณ์รับข้อมูลหลักสำหรับพิมพ์ตัวอักษรและสั่งงานคอมพิวเตอร์ ภายในมีสวิตช์ใต้ปุ่มแต่ละปุ่มและไมโครคอนโทรลเลอร์ที่ตรวจว่าปุ่มใดถูกกด แล้วรายงานไปยังเครื่องผ่าน USB ตามมาตรฐาน HID คีย์บอร์ดแตกต่างกันที่ชนิดของสวิตช์เป็นหลัก ได้แก่ เมมเบรน แมคคานิคอล และออปติคัล',
    en: 'The keyboard is the main input device for typing text and issuing commands. Inside, a switch sits under each key and a microcontroller detects which keys are pressed and reports them to the PC over USB using the HID standard. Keyboards differ mainly in switch type: membrane, mechanical or optical.',
  },
  mainFunction: {
    th: 'แปลงการกดปุ่มทางกายภาพให้เป็นรหัสดิจิทัลที่ระบุตำแหน่งปุ่ม แล้วส่งให้ระบบปฏิบัติการซึ่งจะแปลรหัสนั้นเป็นตัวอักษรหรือคำสั่งตามผังแป้นพิมพ์ที่เลือก',
    en: 'Turns physical key presses into digital codes identifying the key position and sends them to the operating system, which translates them into characters or commands according to the selected layout.',
  },
  howItWorks: {
    beginner: {
      th: 'ใต้ปุ่มแต่ละปุ่มมีสวิตช์เล็ก ๆ คล้ายสวิตช์กริ่งประตู เมื่อกด วงจรจะครบ "สมองจิ๋ว" ในคีย์บอร์ดคอยเดินตรวจสวิตช์ทุกตัวอย่างรวดเร็วมากหลายร้อยรอบต่อวินาที แล้วบอกคอมพิวเตอร์ว่า "ปุ่มตำแหน่งนี้ถูกกด" คีย์บอร์ดไม่รู้ว่าปุ่มนั้นคือตัวอักษรไทยหรืออังกฤษ ระบบปฏิบัติการเป็นผู้ตัดสินจากภาษาที่ตั้งไว้',
      en: 'Under each key is a tiny switch, rather like a doorbell button: pressing it completes a circuit. A "mini brain" in the keyboard checks every switch very quickly, hundreds of times a second, and tells the computer "the key at this position is down". The keyboard does not know whether that key means a Thai or an English letter; the operating system decides from the chosen language.',
    },
    technical: {
      th: 'สวิตช์ถูกจัดเรียงเป็นเมทริกซ์ของแถวและคอลัมน์เพื่อลดจำนวนขาสัญญาณ ไมโครคอนโทรลเลอร์จ่ายสัญญาณทีละคอลัมน์แล้วอ่านทุกแถวเพื่อหาจุดตัดที่วงจรปิด จากนั้นหน่วงเวลาเพื่อกำจัดสัญญาณกระเด้งของหน้าสัมผัส (debounce) ราวไม่กี่มิลลิวินาที ไดโอดที่ต่ออนุกรมกับสวิตช์แต่ละตัวป้องกันกระแสย้อนที่ทำให้เกิดปุ่มผี (ghosting) จึงรองรับการกดพร้อมกันได้ไม่จำกัด (NKRO) คีย์บอร์ดรายงานรหัสการใช้งาน (usage code) ของ HID ผ่าน interrupt endpoint ของ USB เมื่อเครื่องสอบถามตามอัตราโพลลิง โดยรายงานแบบ boot protocol มาตรฐานบรรจุได้ 6 ปุ่มพร้อมปุ่มปรับแต่ง (6KRO)',
      en: 'Switches are wired as a matrix of rows and columns to reduce the number of signal pins. The microcontroller drives one column at a time and reads every row to find closed intersections, then applies a debounce delay of a few milliseconds to ignore contact bounce. A diode in series with each switch blocks reverse current that would cause ghost keys, allowing unlimited simultaneous keys (NKRO). The keyboard reports HID usage codes over a USB interrupt endpoint when the host polls it at the polling rate; the standard boot-protocol report holds six keys plus modifiers (6KRO).',
    },
  },
  structure: [
    {
      name: { th: 'ฝาปุ่ม (keycap)', en: 'Keycaps' },
      desc: { th: 'ชิ้นพลาสติกที่นิ้วสัมผัส มักทำจาก ABS หรือ PBT ตัวอักษรพิมพ์ เลเซอร์ หรือฉีดสองชั้น (double-shot) เพื่อให้ทนการสึก', en: 'The plastic tops the fingers touch, usually ABS or PBT, with legends printed, laser-etched or double-shot moulded for wear resistance.' },
    },
    {
      name: { th: 'สวิตช์', en: 'Switches' },
      desc: { th: 'กลไกใต้ปุ่มที่ตรวจจับการกด แบบเมมเบรนใช้โดมยางกดแผ่นฟิล์มนำไฟฟ้า แบบแมคคานิคอลมีสปริงและหน้าสัมผัสโลหะแยกแต่ละปุ่ม แบบออปติคัลใช้การตัดลำแสงอินฟราเรด', en: 'The mechanism under each key that senses a press. Membrane types use a rubber dome pressing conductive film layers, mechanical types have an individual spring and metal contacts per key, and optical types interrupt an infrared beam.' },
    },
    {
      name: { th: 'แผงวงจรและเมทริกซ์ปุ่ม', en: 'Circuit board and key matrix' },
      desc: { th: 'แผงวงจร (หรือแผ่นฟิล์มสามชั้นในแบบเมมเบรน) ที่เดินลายเส้นแถวและคอลัมน์ไปยังสวิตช์ทุกตัว', en: 'The PCB (or three-layer film sheet in a membrane board) carrying the row and column traces to every switch.' },
    },
    {
      name: { th: 'ไมโครคอนโทรลเลอร์', en: 'Microcontroller' },
      desc: { th: 'ชิปที่สแกนเมทริกซ์ ตัดสัญญาณกระเด้ง ควบคุมไฟแบ็กไลต์ และสื่อสารกับคอมพิวเตอร์ผ่าน USB', en: 'The chip that scans the matrix, debounces, drives the backlight and talks to the computer over USB.' },
    },
    {
      name: { th: 'สายหรือตัวรับส่งสัญญาณ', en: 'Cable or wireless link' },
      desc: { th: 'สาย USB (มักถอดได้แบบ USB-C) หรือการเชื่อมต่อไร้สายผ่านตัวรับ 2.4 GHz หรือบลูทูธ', en: 'A USB cable (often detachable USB-C) or a wireless link via a 2.4 GHz receiver or Bluetooth.' },
    },
  ],
  specs: [
    {
      label: { th: 'ชนิดสวิตช์', en: 'Switch type' },
      value: { th: 'เมมเบรน (โดมยาง), แมคคานิคอล, ออปติคัล', en: 'Membrane (rubber dome), mechanical, optical' },
      note: { th: 'สวิตช์แมคคานิคอลแบ่งตามสัมผัสเป็น linear, tactile และ clicky', en: 'Mechanical switches are grouped by feel into linear, tactile and clicky.' },
    },
    {
      label: { th: 'ระยะกดและแรงกด', en: 'Travel and actuation force' },
      value: { th: 'ระยะกดรวมราว 3.5–4 มม. จุดทำงานราว 1.2–2 มม. แรงกดราว 45–60 gf', en: 'Total travel about 3.5–4 mm, actuation at about 1.2–2 mm, force about 45–60 gf' },
      note: { th: 'ค่าทั่วไปของสวิตช์แมคคานิคอลเดสก์ท็อป; คีย์บอร์ดแบบบางมีระยะกดสั้นกว่า', en: 'Typical figures for desktop mechanical switches; low-profile keyboards have shorter travel.' },
    },
    {
      label: { th: 'อัตราโพลลิง', en: 'Polling rate' },
      value: { th: '125 Hz (ทั่วไป) ถึง 1000 Hz (เกมมิ่ง)', en: '125 Hz (standard) to 1000 Hz (gaming)' },
      note: { th: '125 Hz = รายงานทุก 8 ms, 1000 Hz = ทุก 1 ms; บางรุ่นสำหรับเกมรองรับสูงถึง 8000 Hz', en: '125 Hz = a report every 8 ms, 1000 Hz = every 1 ms; some gaming models go up to 8000 Hz.' },
    },
    {
      label: { th: 'การกดปุ่มพร้อมกัน (rollover)', en: 'Key rollover' },
      value: { th: '2KRO ถึง 6KRO หรือ NKRO', en: '2KRO to 6KRO or NKRO' },
      note: { th: '6KRO คือขีดจำกัดของรายงาน HID แบบ boot protocol; NKRO ต้องใช้ไดโอดทุกปุ่มและรูปแบบรายงานที่ขยาย', en: '6KRO is the limit of the HID boot-protocol report; NKRO needs a diode per key and an extended report format.' },
    },
    {
      label: { th: 'ขนาดและผังปุ่ม', en: 'Size and layout' },
      value: { th: 'เต็มขนาด (ราว 104 ปุ่ม), TKL (ราว 87 ปุ่ม), 75%, 60%', en: 'Full-size (about 104 keys), TKL (about 87 keys), 75 %, 60 %' },
    },
    {
      label: { th: 'การเชื่อมต่อ', en: 'Connection' },
      value: { th: 'USB HID แบบมีสาย, ไร้สาย 2.4 GHz, บลูทูธ', en: 'Wired USB HID, 2.4 GHz wireless, Bluetooth' },
    },
  ],
  connects: {
    th: 'เสียบเข้ากับพอร์ต USB ที่แผงพอร์ตด้านหลังของเมนบอร์ดหรือพอร์ตหน้าเคส คีย์บอร์ดความเร็วต่ำใช้เพียงพอร์ต USB 2.0 ก็เพียงพอ รุ่นไร้สายเสียบตัวรับสัญญาณ USB หรือจับคู่ผ่านบลูทูธกับการ์ดไร้สายของเครื่อง',
    en: 'It plugs into a USB port on the motherboard rear I/O block or the case front panel; a keyboard is a low-speed device, so a USB 2.0 port is entirely sufficient. Wireless models use a USB receiver or pair over Bluetooth with the PC wireless card.',
  },
  related: ['ports', 'mouse', 'motherboard', 'firmware', 'wifi'],
  compatibility: [
    {
      th: 'คีย์บอร์ด USB HID ทำงานได้กับระบบปฏิบัติการหลักทุกระบบโดยไม่ต้องติดตั้งไดรเวอร์ และใช้ในหน้าตั้งค่า UEFI ได้ ส่วนคีย์บอร์ดบลูทูธมักใช้ในหน้า UEFI ไม่ได้เพราะยังไม่มีการโหลดไดรเวอร์บลูทูธ',
      en: 'A USB HID keyboard works with every major operating system without a driver and can be used in UEFI setup. A Bluetooth keyboard usually cannot be used in UEFI setup because no Bluetooth stack is loaded yet.',
    },
    {
      th: 'ผังแป้นพิมพ์เป็นการตั้งค่าของระบบปฏิบัติการ ไม่ใช่ของตัวคีย์บอร์ด จึงต้องเลือกผังให้ตรงกับตัวอักษรที่พิมพ์บนปุ่ม เช่น ไทยเกษมณี',
      en: 'The layout is an operating system setting, not a property of the keyboard itself, so the selected layout must match the legends on the keys, for example Thai Kedmanee.',
    },
    {
      th: 'ฝาปุ่มและสวิตช์เปลี่ยนข้ามกันได้เฉพาะรุ่นที่ใช้แกนและขาแบบเดียวกัน และบอร์ดต้องเป็นแบบ hot-swap จึงจะถอดสวิตช์ได้โดยไม่ต้องบัดกรี',
      en: 'Keycaps and switches are interchangeable only between models sharing the same stem and pin pattern, and the board must be hot-swap for switches to be removed without soldering.',
    },
  ],
  useCases: [
    { th: 'งานพิมพ์เอกสารและเขียนโปรแกรมที่ต้องการสัมผัสชัดเจนและความทนทาน', en: 'Document typing and programming, where clear feedback and durability matter.' },
    { th: 'เล่นเกมที่ต้องกดหลายปุ่มพร้อมกันและต้องการความหน่วงต่ำ', en: 'Gaming, which needs many simultaneous keys and low latency.' },
    { th: 'ห้องปฏิบัติการคอมพิวเตอร์ที่ต้องการคีย์บอร์ดเมมเบรนราคาประหยัด เงียบ และเปลี่ยนทดแทนง่าย', en: 'Computer labs that want inexpensive, quiet, easily replaced membrane keyboards.' },
  ],
  problems: [
    {
      symptom: { th: 'คีย์บอร์ดไม่ตอบสนองเลย', en: 'The keyboard does not respond at all.' },
      check: { th: 'ลองเสียบพอร์ต USB อื่นโดยตรงที่ด้านหลังเครื่อง (ไม่ผ่านฮับ) ดูว่าไฟ Num Lock สลับได้หรือไม่ และลองกับคอมพิวเตอร์อีกเครื่องเพื่อแยกว่าปัญหาอยู่ที่คีย์บอร์ดหรือพอร์ต', en: 'Try a different USB port directly on the rear of the PC (not through a hub), see whether the Num Lock LED toggles, and test on another computer to separate a keyboard fault from a port fault.' },
    },
    {
      symptom: { th: 'บางปุ่มกดไม่ติดหรือพิมพ์ซ้ำสองครั้ง', en: 'Some keys do not register or type twice.' },
      check: { th: 'ถอดฝาปุ่มแล้วเป่าฝุ่นและเศษสิ่งสกปรกออก สำหรับบอร์ด hot-swap ให้ลองสลับสวิตช์กับปุ่มอื่นเพื่อดูว่าอาการตามสวิตช์ไปหรือไม่', en: 'Remove the keycap and blow out dust and debris; on a hot-swap board, swap the switch with another key to see whether the fault follows the switch.' },
    },
    {
      symptom: { th: 'กดหลายปุ่มพร้อมกันแล้วบางปุ่มไม่ขึ้น', en: 'When several keys are held together, some are missed.' },
      check: { th: 'เป็นข้อจำกัดด้าน rollover ของเมทริกซ์ที่ไม่มีไดโอด ทดสอบด้วยเครื่องมือตรวจปุ่มบนเว็บ หากจำเป็นต้องใช้ ให้เลือกคีย์บอร์ดที่ระบุ NKRO', en: 'This is a rollover limit of a diode-less matrix. Test with an online key tester and, if needed, choose a keyboard specified as NKRO.' },
    },
  ],
  safety: [
    { th: 'ถอดสายคีย์บอร์ดก่อนทำความสะอาด หากของเหลวหก ให้ถอดสายทันที คว่ำคีย์บอร์ดให้ของเหลวไหลออก และปล่อยให้แห้งสนิทก่อนใช้งานอีกครั้ง', en: 'Unplug the keyboard before cleaning. If liquid is spilled, unplug at once, turn the keyboard upside down to drain and let it dry completely before reuse.' },
    { th: 'จัดท่าทางการพิมพ์ให้ข้อมือตรง ไหล่ผ่อนคลาย และพักมือเป็นระยะ เพื่อลดความเสี่ยงการบาดเจ็บจากการใช้งานซ้ำ ๆ (RSI)', en: 'Type with straight wrists and relaxed shoulders and take regular breaks to reduce the risk of repetitive strain injury (RSI).' },
  ],
  vocab: [
    { en: 'Key matrix', th: 'เมทริกซ์ปุ่ม', meaning: { th: 'การต่อสวิตช์เป็นตารางแถวและคอลัมน์ เพื่อให้ตรวจปุ่มจำนวนมากได้ด้วยขาสัญญาณจำนวนน้อย', en: 'Wiring switches as a grid of rows and columns so many keys can be read with few signal pins.' } },
    { en: 'USB HID', th: 'อุปกรณ์ติดต่อกับมนุษย์ผ่าน USB', meaning: { th: 'คลาสอุปกรณ์มาตรฐานของ USB สำหรับคีย์บอร์ด เมาส์ และจอยเกม ซึ่งระบบปฏิบัติการมีไดรเวอร์ในตัว', en: 'The standard USB device class for keyboards, mice and controllers, for which operating systems have built-in drivers.' } },
    { en: 'Debounce', th: 'การตัดสัญญาณกระเด้ง', meaning: { th: 'การกรองสัญญาณเปิดปิดถี่ ๆ ที่เกิดจากหน้าสัมผัสกระเด้งขณะกด เพื่อให้นับเป็นการกดครั้งเดียว', en: 'Filtering the rapid on-off chatter of bouncing contacts so that one press is counted once.' } },
    { en: 'Key rollover', th: 'การกดปุ่มซ้อน', meaning: { th: 'จำนวนปุ่มที่กดพร้อมกันแล้วคีย์บอร์ดยังรายงานได้ถูกต้อง', en: 'How many keys can be held at once and still be reported correctly.' } },
    { en: 'Actuation point', th: 'จุดทำงานของสวิตช์', meaning: { th: 'ระยะกดที่สวิตช์เริ่มส่งสัญญาณว่าปุ่มถูกกด', en: 'The depth of travel at which the switch registers a key press.' } },
  ],
  facts: [
    { th: 'ผังปุ่ม QWERTY ถูกออกแบบสำหรับเครื่องพิมพ์ดีดในทศวรรษ 1870 และยังใช้กันทั่วไปจนถึงปัจจุบัน', en: 'The QWERTY layout was designed for typewriters in the 1870s and is still in general use today.' },
    { th: 'ผังแป้นพิมพ์ภาษาไทยมาตรฐานที่ใช้กันทั่วไปคือแบบเกษมณี ส่วนแบบปัตตะโชติเป็นผังทางเลือกที่ออกแบบให้ใช้มือทั้งสองข้างสมดุลกว่า', en: 'The standard Thai layout in common use is Kedmanee; Pattachote is an alternative designed to balance the load between both hands.' },
  ],
  review: [
    {
      q: { th: 'คีย์บอร์ดรู้ได้อย่างไรว่าปุ่มใดถูกกด', en: 'How does a keyboard know which key is pressed?' },
      a: { th: 'ไมโครคอนโทรลเลอร์สแกนเมทริกซ์แถวและคอลัมน์ทีละเส้นเพื่อหาจุดตัดที่สวิตช์ปิดวงจร', en: 'Its microcontroller scans the row-and-column matrix line by line to find intersections where a switch has closed.' },
    },
    {
      q: { th: 'สวิตช์เมมเบรนและแมคคานิคอลต่างกันอย่างไร', en: 'How do membrane and mechanical switches differ?' },
      a: { th: 'เมมเบรนใช้โดมยางกดแผ่นฟิล์มที่ใช้ร่วมกันทั้งแผง ส่วนแมคคานิคอลมีสวิตช์แยกแต่ละปุ่มที่มีสปริงและหน้าสัมผัสโลหะ จึงทนกว่าและสัมผัสชัดกว่า', en: 'Membrane boards use rubber domes pressing shared film layers, while mechanical boards have a separate switch with a spring and metal contacts per key, which is more durable and precise.' },
    },
    {
      q: { th: 'NKRO หมายถึงอะไร', en: 'What does NKRO mean?' },
      a: { th: 'N-key rollover คือคีย์บอร์ดรายงานการกดได้ถูกต้องไม่ว่าจะกดพร้อมกันกี่ปุ่ม', en: 'N-key rollover: the keyboard reports correctly however many keys are held at once.' },
    },
  ],
};
