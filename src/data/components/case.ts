import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'case',
  name: { th: 'เคสคอมพิวเตอร์', en: 'Computer Case' },
  abbr: 'CASE',
  category: 'power-cooling',
  overview: {
    th: 'เคส (case หรือ chassis) คือโครงที่ยึดและปกป้องชิ้นส่วนทั้งหมดของคอมพิวเตอร์ และเป็นตัวกำหนดเส้นทางการไหลของอากาศที่ใช้ระบายความร้อน ขนาดของเคสกำหนดว่าใส่เมนบอร์ด การ์ดจอ และชุดระบายความร้อนขนาดใดได้ ในโมเดล 3 มิติเป็นเคส mid-tower แบบ ATX ที่มีฝาข้างกระจก พัดลมหน้า 2 ตัว พัดลมหลัง 1 ตัว แผ่นครอบ PSU ด้านล่าง และช่องสล็อตด้านหลัง 7 ช่อง',
    en: 'The case (or chassis) is the frame that holds and protects every part of the computer and sets the path of the air that cools them. Its size decides which motherboards, graphics cards and coolers will fit. In the 3D model it is an ATX mid-tower with a glass side panel, two front fans, one rear fan, a PSU shroud at the bottom and seven rear expansion slots.',
  },
  mainFunction: {
    th: 'ยึดชิ้นส่วนให้อยู่ในตำแหน่งมาตรฐาน ป้องกันฝุ่น แรงกระแทก และการสัมผัสวงจรโดยตรง และนำอากาศเย็นเข้าพร้อมพาอากาศร้อนออกอย่างเป็นระบบ',
    en: 'Holds parts in standard positions, shields them from dust, knocks and accidental contact, and guides cool air in and warm air out in an orderly way.',
  },
  howItWorks: {
    beginner: {
      th: 'เคสเปรียบเหมือนบ้านของคอมพิวเตอร์ มีโครงและผนังคอยปกป้องคนในบ้าน มีห้องและจุดยึดสำหรับเฟอร์นิเจอร์แต่ละชิ้น และมีหน้าต่างให้ลมพัดผ่าน ถ้าเปิดหน้าต่างด้านหน้าให้ลมเย็นเข้าและเปิดด้านหลังให้ลมร้อนออก บ้านจะเย็นสบาย แต่ถ้าปิดทึบหรือมีของขวางทางลม ความร้อนจะสะสมอยู่ข้างใน',
      en: 'The case is the house the computer lives in. Its frame and walls protect the occupants, it has rooms and fixing points for each piece of furniture, and it has windows for a breeze. Open the front window to let cool air in and the back window to let warm air out and the house stays comfortable; close everything or block the path and the heat builds up inside.',
    },
    technical: {
      th: 'มาตรฐานฟอร์มแฟกเตอร์ เช่น ATX กำหนดตำแหน่งรูยึดเมนบอร์ด ช่องแผงพอร์ตด้านหลัง ช่องสล็อตขยาย และจุดยึด PSU ทำให้ชิ้นส่วนจากผู้ผลิตต่างรายประกอบเข้ากันได้ เสารอง (standoff) ทองเหลืองบนถาดเมนบอร์ดยกบอร์ดให้ลอยจากแผ่นเหล็กเพื่อไม่ให้รอยบัดกรีด้านหลังลัดวงจร และเชื่อมกราวด์ของบอร์ดเข้ากับโครงเคสผ่านรูยึด ด้านความร้อน เคสทำงานเป็นท่อลม พัดลมหน้าดูดอากาศเย็นเข้าผ่านแผ่นกรองฝุ่น อากาศไหลผ่านการ์ดจอ ชุดระบายความร้อน CPU และวงจร VRM แล้วถูกพัดลมหลังและด้านบนดูดออก หากปริมาณลมเข้ามากกว่าลมออกจะเกิดแรงดันบวก อากาศรั่วออกทางช่องว่างต่าง ๆ ฝุ่นจึงเข้าได้เฉพาะทางที่มีแผ่นกรอง แต่หากลมออกมากกว่าจะเกิดแรงดันลบ ซึ่งดูดฝุ่นเข้าทางทุกช่องที่ไม่มีแผ่นกรอง นอกจากนี้ตัวถังเหล็กยังช่วยกันสัญญาณรบกวนแม่เหล็กไฟฟ้า (EMI) และแผ่นครอบ PSU ช่วยแยกความร้อนและซ่อนสายไฟออกจากห้องหลัก',
      en: 'Form-factor standards such as ATX fix the positions of the motherboard mounting holes, the rear I/O opening, the expansion slots and the PSU mount, which is why parts from different makers fit together. Brass standoffs on the motherboard tray lift the board clear of the steel so the solder joints on its back cannot short, and they bond the board ground to the chassis through the mounting holes. Thermally the case works as an air duct: front fans draw cool air in through dust filters, it passes over the graphics card, the CPU cooler and the VRM, and rear and top fans exhaust it. If intake volume exceeds exhaust the case runs at positive pressure, so air leaks outward through gaps and dust enters only through filtered openings; if exhaust exceeds intake it runs at negative pressure, which pulls dust in through every unfiltered gap. The steel shell also helps contain electromagnetic interference (EMI), and the PSU shroud separates PSU heat and hides cables from the main chamber.',
    },
  },
  structure: [
    {
      name: { th: 'โครงเหล็กและถาดเมนบอร์ดพร้อมเสารอง', en: 'Steel frame and motherboard tray with standoffs' },
      desc: {
        th: 'โครงหลักของเคสและแผ่นเหล็กแนวตั้งที่มีเสารองทองเหลืองตามตำแหน่งรูยึดมาตรฐาน ใช้ขันยึดเมนบอร์ด ด้านหลังถาดเป็นพื้นที่เดินสายไฟ',
        en: 'The main skeleton and the vertical steel plate fitted with brass standoffs at the standard hole positions, to which the motherboard is screwed. The space behind the tray is used for cable routing.',
      },
    },
    {
      name: { th: 'พัดลมดูดลมเข้าด้านหน้า 2 ตัว', en: 'Two front intake fans' },
      desc: {
        th: 'พัดลมที่แผงหน้า ดูดอากาศเย็นจากนอกเคสเข้ามาผ่านแผ่นกรองฝุ่น เป็นต้นทางของกระแสลมที่ไหลผ่านการ์ดจอและชุดระบายความร้อน CPU',
        en: 'Fans behind the front panel that pull cool outside air in through a dust filter, starting the airflow that passes the graphics card and CPU cooler.',
      },
    },
    {
      name: { th: 'พัดลมระบายลมออกด้านหลัง', en: 'Rear exhaust fan' },
      desc: {
        th: 'พัดลมที่ผนังด้านหลังใกล้แผงพอร์ต ดูดอากาศร้อนที่ออกจากชุดระบายความร้อน CPU ออกนอกเคส',
        en: 'The fan on the rear wall beside the I/O area that pulls the warm air leaving the CPU cooler out of the case.',
      },
    },
    {
      name: { th: 'แผ่นครอบ PSU', en: 'PSU shroud' },
      desc: {
        th: 'แผ่นปิดส่วนล่างของเคสที่คลุม PSU ช่องไดรฟ์ 3.5 นิ้ว และสายไฟส่วนเกิน ทำให้ห้องหลักโล่ง ลมไหลได้ดี และดูเรียบร้อย',
        en: 'The cover over the bottom section that hides the PSU, the 3.5-inch drive bay and spare cable, keeping the main chamber clear for airflow and tidy to look at.',
      },
    },
    {
      name: { th: 'ช่องสล็อตขยายด้านหลัง 7 ช่อง', en: 'Seven rear expansion slots' },
      desc: {
        th: 'ช่องเปิดแนวนอนที่ผนังด้านหลังซึ่งมีแผ่นปิดถอดได้ ใช้ขันยึดแผ่นท้ายของการ์ดจอและการ์ดขยาย และให้พอร์ตของการ์ดโผล่ออกนอกเคส',
        en: 'Horizontal openings in the rear wall with removable covers, where the brackets of the graphics card and other cards are screwed down and their ports reach the outside.',
      },
    },
    {
      name: { th: 'ฝาข้างกระจกนิรภัยและแผงหน้า', en: 'Tempered glass side panel and front panel' },
      desc: {
        th: 'ฝาข้างกระจกเทมเปอร์ให้มองเห็นชิ้นส่วนภายใน ส่วนแผงหน้ามีปุ่มเปิดเครื่อง พอร์ต USB และช่องเสียง ซึ่งต่อสายเข้ากับเฮดเดอร์บนเมนบอร์ด',
        en: 'The tempered glass side panel shows the parts inside, while the front panel carries the power button, USB ports and audio jacks, wired to headers on the motherboard.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'ขนาดเมนบอร์ดที่รองรับ', en: 'Motherboard support' },
      value: { th: 'ATX, micro-ATX, mini-ITX (เคส mid-tower)', en: 'ATX, micro-ATX, mini-ITX (mid-tower)' },
      note: {
        th: 'เคสใหญ่รองรับบอร์ดเล็กกว่าได้ แต่เคส mini-ITX ใส่บอร์ด ATX ไม่ได้',
        en: 'A larger case accepts smaller boards, but a mini-ITX case cannot take an ATX board.',
      },
    },
    {
      label: { th: 'ความยาวการ์ดจอสูงสุด', en: 'Maximum GPU length' },
      value: { th: 'ประมาณ 300–400 มม.', en: 'About 300–400 mm' },
      note: { th: 'ช่วงทั่วไปของเคส mid-tower อาจลดลงเมื่อติดพัดลมหรือหม้อน้ำด้านหน้า', en: 'Typical of mid-towers; it may shrink when front fans or a radiator are fitted.' },
    },
    {
      label: { th: 'ความสูงชุดระบายความร้อน CPU สูงสุด', en: 'Maximum CPU cooler height' },
      value: { th: 'ประมาณ 155–185 มม.', en: 'About 155–185 mm' },
      note: { th: 'วัดจากผิวเมนบอร์ดถึงฝาข้าง', en: 'Measured from the motherboard surface to the side panel.' },
    },
    {
      label: { th: 'ตำแหน่งพัดลมและหม้อน้ำ', en: 'Fan and radiator mounts' },
      value: { th: 'พัดลม 120/140 มม. หน้า บน และหลัง · หม้อน้ำสูงสุด 240–360 มม.', en: '120/140 mm fans at front, top and rear · radiators up to 240–360 mm' },
      note: { th: 'ขนาดหม้อน้ำที่รองรับต่างกันในแต่ละตำแหน่ง', en: 'Supported radiator size differs by position.' },
    },
    {
      label: { th: 'ช่องสล็อตขยาย', en: 'Expansion slots' },
      value: { th: '7 ช่อง (ATX) · 4 ช่อง (micro-ATX) · 1–2 ช่อง (mini-ITX)', en: '7 (ATX) · 4 (micro-ATX) · 1–2 (mini-ITX)' },
    },
    {
      label: { th: 'ช่องใส่ไดรฟ์', en: 'Drive bays' },
      value: { th: '3.5 นิ้ว ราว 2 ช่อง · 2.5 นิ้ว ราว 2–4 ช่อง', en: 'About two 3.5-inch · about two to four 2.5-inch' },
      note: {
        th: 'ช่อง 5.25 นิ้วสำหรับออปติคัลไดรฟ์มีในเคสบางรุ่นเท่านั้น',
        en: 'A 5.25-inch bay for an optical drive is found only on some cases.',
      },
    },
    {
      label: { th: 'PSU ที่รองรับ', en: 'PSU support' },
      value: { th: 'แบบ ATX ยาวไม่เกินราว 160–220 มม.', en: 'ATX, up to about 160–220 mm long' },
      note: { th: 'ความยาวที่ใส่ได้ลดลงถ้าติดตั้งโครงใส่ไดรฟ์ใต้แผ่นครอบ', en: 'Usable length drops if a drive cage is installed under the shroud.' },
    },
  ],
  connects: {
    th: 'ทางกายภาพ เคสเป็นที่ยึดของทุกชิ้นส่วน: เมนบอร์ดขันกับเสารอง PSU ยึดที่มุมล่างด้านหลัง ไดรฟ์อยู่ในช่องใส่ไดรฟ์ แผ่นท้ายของการ์ดจอและการ์ดขยายขันกับช่องสล็อตด้านหลัง ส่วนหม้อน้ำหรือพัดลมยึดกับแผงหน้า บน และหลัง ทางไฟฟ้า สายจากแผงหน้า (ปุ่ม Power, ปุ่ม Reset, ไฟ LED, USB, เสียง) เสียบเข้ากับเฮดเดอร์บนเมนบอร์ด และพัดลมเคสเสียบเฮดเดอร์พัดลมของบอร์ด ทางความร้อน เคสกำหนดว่าอากาศเย็นจะไปถึงการ์ดจอ ชุดระบายความร้อน CPU และ PSU ได้มากน้อยเพียงใด',
    en: 'Physically the case is the anchor for everything: the motherboard screws to the standoffs, the PSU mounts at the bottom rear, drives sit in the bays, the brackets of the graphics card and other cards screw to the rear slots, and radiators or fans attach to the front, top and rear. Electrically, the front-panel leads (power button, reset button, LEDs, USB, audio) plug into headers on the motherboard and the case fans into its fan headers. Thermally, the case decides how much cool air reaches the graphics card, the CPU cooler and the PSU.',
  },
  related: ['motherboard', 'psu', 'cooler', 'gpu', 'hdd', 'optical', 'ports'],
  compatibility: [
    {
      th: 'เคสต้องรองรับฟอร์มแฟกเตอร์ของเมนบอร์ด เคส mid-tower แบบ ATX มักใส่ micro-ATX และ mini-ITX ได้ด้วย แต่เคส mini-ITX ใส่บอร์ด ATX ไม่ได้',
      en: 'The case must support the motherboard form factor: an ATX mid-tower usually also takes micro-ATX and mini-ITX, but a mini-ITX case cannot take an ATX board.',
    },
    {
      th: 'ความยาวการ์ดจอต้องไม่เกินค่า GPU clearance และความสูงของชุดระบายความร้อน CPU ต้องไม่เกินค่า CPU cooler clearance ที่เคสระบุเป็นมิลลิเมตร',
      en: 'Graphics card length must not exceed the GPU clearance, and CPU cooler height must not exceed the CPU cooler clearance the case states in millimetres.',
    },
    {
      th: 'หม้อน้ำของชุด AIO ต้องมีตำแหน่งติดตั้งขนาดที่ตรงกัน (120/240/280/360 มม.) และต้องเผื่อความหนาของหม้อน้ำรวมพัดลมไม่ให้ชนกับ RAM หรือฮีตซิงก์ของเมนบอร์ด',
      en: 'An AIO radiator needs a mount of matching size (120/240/280/360 mm), with room for the thickness of radiator plus fans so that it clears the RAM and motherboard heatsinks.',
    },
    {
      th: 'ฟอร์มแฟกเตอร์และความยาวของ PSU ต้องเข้ากับเคส และถ้าจะใช้ HDD หรือออปติคัลไดรฟ์ ต้องตรวจว่าเคสมีช่อง 3.5 นิ้วหรือ 5.25 นิ้ว',
      en: 'The PSU form factor and length must suit the case, and if an HDD or optical drive is planned, check that the case actually has a 3.5-inch or 5.25-inch bay.',
    },
  ],
  useCases: [
    {
      th: 'เครื่องเล่นเกมและเครื่องทำงานทั่วไป: เคส mid-tower แบบ ATX ที่แผงหน้าเป็นตะแกรง ให้ลมไหลดีและมีที่สำหรับการ์ดจอขนาดใหญ่',
      en: 'Gaming and general-purpose PCs: an ATX mid-tower with a mesh front gives good airflow and room for a large graphics card.',
    },
    {
      th: 'เครื่องขนาดเล็กสำหรับโต๊ะแคบหรือพกพา: เคส mini-ITX ซึ่งประหยัดพื้นที่ แต่ต้องตรวจระยะของทุกชิ้นส่วนอย่างละเอียด',
      en: 'Compact builds for small desks or portability: a mini-ITX case saves space but demands careful clearance checks for every part.',
    },
    {
      th: 'เวิร์กสเตชันและเครื่องเก็บข้อมูล: เคส full-tower ที่มีช่องไดรฟ์จำนวนมาก รองรับหม้อน้ำขนาดใหญ่และเมนบอร์ดขนาดใหญ่กว่า ATX',
      en: 'Workstations and storage machines: a full-tower with many drive bays, room for large radiators and support for boards larger than ATX.',
    },
  ],
  problems: [
    {
      symptom: { th: 'ชิ้นส่วนทุกชิ้นร้อนกว่าปกติและพัดลมหมุนเร็วตลอดเวลา', en: 'Every part runs hotter than normal and the fans stay at high speed.' },
      check: {
        th: 'ดูลูกศรบนโครงพัดลมว่าทิศถูกต้อง คือหน้าดูดเข้าและหลังเป่าออก ถอดล้างแผ่นกรองฝุ่น จัดสายที่ขวางทางลม และเว้นระยะด้านหน้ากับด้านหลังเคสจากผนัง',
        en: 'Read the arrows on the fan frames to confirm direction (front in, rear out), wash the dust filters, tidy cables that block the path, and leave space between the case and the wall at front and back.',
      },
    },
    {
      symptom: { th: 'เครื่องไม่ติดหรือดับทันทีหลังติดตั้งเมนบอร์ดลงเคส', en: 'The PC will not start or cuts out immediately after the motherboard is fitted in the case.' },
      check: {
        th: 'ถอดบอร์ดออกมาตรวจว่ามีเสารองเกินในตำแหน่งที่บอร์ดไม่มีรูยึดหรือไม่ และดูว่าไม่มีสกรูหล่นค้างใต้บอร์ดหรือแผ่นโลหะของแผงพอร์ตไปแตะพอร์ต',
        en: 'Remove the board and look for an extra standoff where the board has no mounting hole, and check for a loose screw trapped underneath or an I/O shield tab touching a port.',
      },
    },
    {
      symptom: { th: 'ปุ่มเปิดเครื่อง พอร์ต USB หรือช่องเสียงที่หน้าเคสไม่ทำงาน', en: 'The front power button, USB ports or audio jacks do not work.' },
      check: {
        th: 'เทียบการเสียบสายแผงหน้ากับผังเฮดเดอร์ในคู่มือเมนบอร์ด (PWR_SW, USB, HD_AUDIO) ตรวจว่าเสียบแน่นและตรงขา',
        en: 'Compare the front-panel wiring with the header diagram in the motherboard manual (PWR_SW, USB, HD_AUDIO) and confirm each plug is firmly on the right pins.',
      },
    },
    {
      symptom: { th: 'มีเสียงสั่นหรือเสียงกระทบจากตัวเคส', en: 'Rattling or buzzing from the case.' },
      check: {
        th: 'ขันสกรูฝาข้าง พัดลม และไดรฟ์ให้แน่น ตรวจว่าไม่มีสายแตะใบพัด และดูว่า HDD ยึดกับถาดที่มียางกันสั่น',
        en: 'Tighten the screws of the side panels, fans and drives, make sure no cable touches a fan blade, and see that the HDD is mounted on a sled with rubber dampers.',
      },
    },
  ],
  safety: [
    {
      th: 'ปิดเครื่องและถอดปลั๊กก่อนเปิดฝาเคสทุกครั้ง และคายประจุไฟฟ้าสถิต (ESD) โดยแตะส่วนโลหะที่ไม่ได้พ่นสีของโครงเคสก่อนจับชิ้นส่วนภายใน',
      en: 'Shut down and unplug before opening the case, and discharge static (ESD) by touching unpainted chassis metal before handling any internal part.',
    },
    {
      th: 'ระวังขอบเหล็กด้านในเคสและแผ่นปิดสล็อตที่อาจคม ส่วนฝาข้างกระจกนิรภัยให้ถอดขณะเคสตั้งตรง แล้ววางราบบนผ้าหรือพื้นนุ่ม ห้ามวางมุมกระจกบนพื้นกระเบื้อง เพราะอาจแตกทั้งแผ่น',
      en: 'Watch for sharp steel edges inside the case and on slot covers. Remove the tempered glass panel with the case upright and lay it flat on cloth or a soft surface, never with a corner on a tiled floor, where it can shatter completely.',
    },
    {
      th: 'ติดตั้งเสารองเฉพาะตำแหน่งที่ตรงกับรูยึดของเมนบอร์ด เก็บสกรูที่หล่นให้ครบก่อนเปิดเครื่อง และอย่าให้นิ้วหรือสายเข้าไปในใบพัดลมขณะหมุน',
      en: 'Fit standoffs only where the motherboard has mounting holes, retrieve every dropped screw before powering on, and keep fingers and cables out of spinning fans.',
    },
  ],
  vocab: [
    {
      en: 'Form factor',
      th: 'ฟอร์มแฟกเตอร์',
      meaning: {
        th: 'มาตรฐานขนาดและตำแหน่งจุดยึดที่ทำให้เคส เมนบอร์ด และ PSU จากต่างผู้ผลิตประกอบเข้ากันได้',
        en: 'The standard of dimensions and mounting positions that lets cases, motherboards and PSUs from different makers fit together.',
      },
    },
    {
      en: 'Standoff',
      th: 'เสารอง (น็อตหกเหลี่ยมรองบอร์ด)',
      meaning: {
        th: 'เสาโลหะเล็ก ๆ ที่ยกเมนบอร์ดให้ลอยจากถาดเคสและเป็นจุดขันสกรูยึดบอร์ด',
        en: 'A small metal post that raises the motherboard off the tray and serves as its screw point.',
      },
    },
    {
      en: 'Intake / exhaust',
      th: 'ลมเข้า / ลมออก',
      meaning: {
        th: 'พัดลมที่ดูดอากาศเย็นเข้าเคส และพัดลมที่เป่าอากาศร้อนออกจากเคส',
        en: 'Fans that draw cool air into the case and fans that push warm air out of it.',
      },
    },
    {
      en: 'Positive / negative pressure',
      th: 'แรงดันบวก / แรงดันลบ',
      meaning: {
        th: 'แรงดันบวกเกิดเมื่อลมเข้ามากกว่าลมออก ช่วยลดฝุ่น ส่วนแรงดันลบเกิดเมื่อลมออกมากกว่า และดูดฝุ่นเข้าทางช่องที่ไม่มีแผ่นกรอง',
        en: 'Positive pressure means more intake than exhaust and helps limit dust; negative pressure means more exhaust and pulls dust in through unfiltered gaps.',
      },
    },
    {
      en: 'Clearance',
      th: 'ระยะที่รองรับ',
      meaning: {
        th: 'ขนาดสูงสุดของชิ้นส่วนที่เคสใส่ได้ เช่น ความยาวการ์ดจอและความสูงชุดระบายความร้อน ระบุเป็นมิลลิเมตร',
        en: 'The largest part dimension a case accepts, such as graphics card length or cooler height, given in millimetres.',
      },
    },
    {
      en: 'Cable management',
      th: 'การจัดสาย',
      meaning: {
        th: 'การเดินและรัดสายไว้หลังถาดเมนบอร์ดเพื่อไม่ให้ขวางทางลมและดูแลรักษาง่าย',
        en: 'Routing and tying cables behind the motherboard tray so they do not block airflow and servicing stays easy.',
      },
    },
  ],
  facts: [
    {
      th: 'รูปแบบรูยึดเมนบอร์ดและช่องสล็อตของมาตรฐาน ATX ถูกกำหนดตั้งแต่ปี ค.ศ. 1995 และยังใช้อยู่ เคส ATX รุ่นเก่าจึงยังใส่เมนบอร์ด ATX รุ่นใหม่ได้',
      en: 'The ATX mounting-hole and slot layout was defined in 1995 and is still in use, so an old ATX case can still take a new ATX motherboard.',
    },
    {
      th: 'กระจกนิรภัยแบบเทมเปอร์แข็งแรงกว่ากระจกธรรมดาหลายเท่า และเมื่อแตกจะแตกเป็นเม็ดเล็ก ๆ ไม่คม แต่ขอบและมุมเป็นจุดอ่อน การกระแทกที่มุมเพียงครั้งเดียวอาจทำให้แตกทั้งแผ่น',
      en: 'Tempered glass is several times stronger than ordinary glass and breaks into small blunt granules, but its edges and corners are weak points: one knock on a corner can shatter the whole panel.',
    },
    {
      th: 'อากาศร้อนลอยขึ้นตามธรรมชาติก็จริง แต่ในเคสที่มีพัดลม แรงลมจากพัดลมมีผลมากกว่าการลอยตัวของอากาศร้อนหลายเท่า ทิศทางและตำแหน่งของพัดลมจึงสำคัญที่สุด',
      en: 'Warm air does rise naturally, but inside a fan-cooled case the push of the fans outweighs buoyancy many times over, so fan direction and placement matter most.',
    },
  ],
  review: [
    {
      q: { th: 'เสารอง (standoff) มีหน้าที่อะไร', en: 'What are standoffs for?' },
      a: {
        th: 'ยกเมนบอร์ดให้ลอยจากถาดเหล็กเพื่อไม่ให้ด้านหลังบอร์ดลัดวงจร เป็นจุดขันสกรูยึด และเชื่อมกราวด์ของบอร์ดกับเคส',
        en: 'They lift the motherboard off the steel tray so its back cannot short, provide the screw points, and bond the board ground to the case.',
      },
    },
    {
      q: { th: 'แรงดันบวกในเคสคืออะไร และมีข้อดีอย่างไร', en: 'What is positive pressure in a case, and what is its benefit?' },
      a: {
        th: 'คือสภาวะที่ลมเข้ามากกว่าลมออก อากาศจึงรั่วออกทางช่องว่าง ฝุ่นเข้าได้เฉพาะทางพัดลมที่มีแผ่นกรอง ทำให้ฝุ่นสะสมน้อยลง',
        en: 'It is when intake exceeds exhaust, so air leaks outward through gaps and dust can enter only through filtered fans, which reduces dust build-up.',
      },
    },
    {
      q: { th: 'ก่อนซื้อการ์ดจอและชุดระบายความร้อน CPU ต้องตรวจค่าใดของเคส', en: 'Which case figures must be checked before buying a graphics card and a CPU cooler?' },
      a: {
        th: 'ความยาวการ์ดจอสูงสุด (GPU clearance) และความสูงชุดระบายความร้อนสูงสุด (CPU cooler clearance) ซึ่งระบุเป็นมิลลิเมตร',
        en: 'The maximum GPU length (GPU clearance) and the maximum cooler height (CPU cooler clearance), both stated in millimetres.',
      },
    },
  ],
};
