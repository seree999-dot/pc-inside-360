import type { Hotspot } from '../types';

/** Hotspots on the PSU, cooler, case, rear ports and peripherals (22). Ids, parts and positions follow docs/CONTENT_BRIEF.md. */
export const otherHotspots: Hotspot[] = [
  /* ---------- PSU ---------- */
  {
    id: 'psu-fan', part: 'psu', pos: [0, -0.45, 0], lesson: 'l07',
    name: { th: 'พัดลมพาวเวอร์ซัพพลาย', en: 'PSU fan' },
    brief: { th: 'พัดลมที่ดูดอากาศเย็นผ่านตะแกรงเข้าไประบายความร้อนให้วงจรภายใน', en: 'The fan behind the grille that draws cool air over the internal circuitry.' },
    detail: {
      th: 'การแปลงไฟ AC เป็น DC มีพลังงานส่วนหนึ่งสูญเสียเป็นความร้อน พัดลมจึงดูดอากาศผ่านตะแกรงเข้ามาแล้วเป่าออกทางด้านหลังเคส ในเคสที่มีช่องลมด้านล่าง มักติดตั้งโดยหันพัดลมลงเพื่อรับอากาศเย็นจากนอกเคสโดยตรง หลายรุ่นหยุดพัดลมเมื่อจ่ายไฟน้อย',
      en: 'Converting AC to DC loses some energy as heat, so the fan pulls air in through the grille and exhausts it out of the back of the case. In cases with a bottom vent the unit is usually mounted fan-down to take cool outside air directly. Many units stop the fan at low load.',
    },
    significance: {
      th: 'อย่าวางเคสบนพรมหนาหรือปล่อยให้ตะแกรงและแผ่นกรองฝุ่นอุดตัน เพราะจะปิดทางลมเข้า การทำความสะอาดให้ทำจากภายนอกผ่านตะแกรงเท่านั้น ห้ามเปิดฝาพาวเวอร์ซัพพลาย',
      en: 'Do not stand the case on thick carpet or let the grille and dust filter clog, as this blocks the intake. Clean it only from outside through the grille; never open the power supply casing.',
    },
  },
  {
    id: 'psu-ac-inlet', part: 'psu', pos: [-0.72, 0.1, 0.3], lesson: 'l07',
    name: { th: 'ช่องเสียบสายไฟ AC และสวิตช์', en: 'AC inlet and power switch' },
    brief: { th: 'จุดที่ไฟบ้านเข้าสู่เครื่องผ่านสายไฟ พร้อมสวิตช์ตัดไฟหลัก', en: 'Where mains power enters through the power cord, next to the master rocker switch.' },
    detail: {
      th: 'ช่องเสียบแบบสามขา (IEC C14) รับไฟ AC จากเต้ารับ โดยขากลางเป็นสายดินที่ต่อกับตัวถังโลหะของเครื่อง สวิตช์ข้างช่องเสียบใช้ตัดไฟเข้าพาวเวอร์ซัพพลายทั้งหมด รวมถึงไฟสแตนด์บายที่เลี้ยงเมนบอร์ดขณะปิดเครื่อง',
      en: 'The three-pin inlet (IEC C14) takes AC from the wall socket, and its centre pin is the earth connection bonded to the metal chassis. The switch beside it cuts all power to the unit, including the standby power that feeds the motherboard while the PC is off.',
    },
    significance: {
      th: 'ก่อนติดตั้งหรือถอดชิ้นส่วนใด ๆ ต้องปิดสวิตช์นี้และถอดสายไฟออกเสมอ เมื่อเครื่องเปิดไม่ติดเลย สวิตช์นี้และสายไฟเป็นจุดแรกที่ควรตรวจ และควรใช้เต้ารับที่มีสายดิน',
      en: 'Always switch this off and pull the cord before installing or removing any part. When a PC is completely dead, this switch and the cord are the first things to check, and an earthed outlet should be used.',
    },
  },
  {
    id: 'psu-cables', part: 'psu', pos: [0.72, 0, 0], lesson: 'l08',
    name: { th: 'สายจ่ายไฟ DC', en: 'DC output cables' },
    brief: { th: 'ชุดสายที่นำไฟ DC จากพาวเวอร์ซัพพลายไปยังเมนบอร์ด การ์ดจอ และไดรฟ์', en: 'The cable set that carries DC power to the motherboard, graphics card and drives.' },
    detail: {
      th: 'สายแต่ละชุดมีหัวต่อเฉพาะหน้าที่ ได้แก่ ATX 24 พินสำหรับเมนบอร์ด EPS 4+4 พินสำหรับซีพียู PCIe 6+2 พินหรือ 12VHPWR / 12V-2x6 (16 พิน) สำหรับการ์ดจอ และ SATA power สำหรับไดรฟ์ หัวต่อทุกแบบมีรูปทรงบังคับเพื่อกันการเสียบผิดตำแหน่ง พาวเวอร์ซัพพลายแบบโมดูลาร์ถอดสายที่ไม่ใช้ออกได้',
      en: 'Each cable has a purpose-specific plug: 24-pin ATX for the motherboard, 4+4-pin EPS for the CPU, 6+2-pin PCIe or 16-pin 12VHPWR / 12V-2x6 for the graphics card, and SATA power for drives. Every plug is keyed to prevent wrong connections. A modular unit lets unused cables be detached.',
    },
    significance: {
      th: 'สายโมดูลาร์ของพาวเวอร์ซัพพลายต่างรุ่นหรือต่างยี่ห้ออาจเรียงขั้วที่ฝั่งตัวเครื่องไม่เหมือนกัน จึงควรใช้เฉพาะสายที่มากับรุ่นนั้น การเดินสายไปด้านหลังถาดเมนบอร์ดช่วยให้ลมไหลผ่านได้สะดวก',
      en: 'Modular cables from a different model or brand may be wired differently at the PSU end, so use only the cables supplied with that unit. Routing cables behind the motherboard tray keeps the airflow path clear.',
    },
  },
  {
    id: 'psu-label', part: 'psu', pos: [0, 0, 0.76], lesson: 'l09',
    name: { th: 'ฉลากข้อมูลจำเพาะ', en: 'Specification label' },
    brief: { th: 'ฉลากที่ระบุกำลังวัตต์รวม กระแสของแต่ละแรงดัน และระดับประสิทธิภาพ', en: 'The label listing total wattage, the current available on each rail and the efficiency rating.' },
    detail: {
      th: 'ฉลากแสดงแรงดันขาออกแต่ละราง (+12 V, +5 V, +3.3 V, +5 VSB) พร้อมกระแสสูงสุดและกำลังวัตต์รวม ซีพียูและการ์ดจอใช้ไฟจากราง +12 V เป็นหลัก ตัวเลขของรางนี้จึงสำคัญที่สุด เครื่องหมาย 80 PLUS บอกระดับประสิทธิภาพการแปลงไฟ ไม่ได้บอกกำลังวัตต์',
      en: 'The label shows each output rail (+12 V, +5 V, +3.3 V, +5 VSB) with its maximum current and the total wattage. The CPU and graphics card draw mainly from +12 V, so that rail\'s figure matters most. An 80 PLUS mark states conversion efficiency, not wattage.',
    },
    significance: {
      th: 'ใช้ฉลากนี้ตรวจว่าพาวเวอร์ซัพพลายจ่ายไฟได้พอสำหรับชิ้นส่วนทั้งหมดโดยมีส่วนเผื่อ ฉลากยังมีคำเตือนว่าภายในมีแรงดันสูงและไม่มีชิ้นส่วนที่ผู้ใช้ซ่อมเองได้ จึงห้ามเปิดฝา',
      en: 'Use the label to confirm the unit can power all components with headroom. It also warns that there are hazardous voltages and no user-serviceable parts inside, so the casing must not be opened.',
    },
  },
  /* ---------- Cooler ---------- */
  {
    id: 'cooler-base', part: 'cooler', pos: [0, 0, 0.03], lesson: 'l07',
    name: { th: 'ฐานทองแดง (Cold Plate)', en: 'Copper base plate' },
    brief: { th: 'แผ่นทองแดงที่กดแนบกับฝา IHS ของซีพียูเพื่อรับความร้อน', en: 'The copper plate that presses against the CPU heat spreader to pick up heat.' },
    detail: {
      th: 'ทองแดงนำความร้อนได้ดี จึงใช้เป็นจุดรับความร้อนจากซีพียู ระหว่างฐานกับ IHS มีสารนำความร้อนชั้นบาง ๆ เติมช่องว่างอากาศขนาดเล็กที่มองไม่เห็น ชุดยึดจะกดฐานลงบนซีพียูด้วยแรงสม่ำเสมอทุกด้าน',
      en: 'Copper conducts heat well, so it is used as the contact point with the CPU. A thin layer of thermal paste between the base and the IHS fills microscopic air gaps. The mounting hardware presses the base onto the CPU with even force on all sides.',
    },
    significance: {
      th: 'ชุดระบายความร้อนใหม่มักมีแผ่นพลาสติกใสติดที่ฐาน ซึ่งต้องลอกออกก่อนติดตั้ง ควรขันสกรูยึดสลับมุมทีละน้อยเพื่อให้แรงกดเท่ากัน มิฉะนั้นฐานจะแนบไม่สนิทและซีพียูร้อนผิดปกติ',
      en: 'New coolers often have a clear protective film on the base that must be peeled off before fitting. Tighten the mounting screws a little at a time in a cross pattern for even pressure; otherwise contact is poor and the CPU overheats.',
    },
  },
  {
    id: 'cooler-heatpipes', part: 'cooler', pos: [0, -0.3, 0.25], lesson: 'l07',
    name: { th: 'ท่อนำความร้อน (Heat Pipes)', en: 'Heat pipes' },
    brief: { th: 'ท่อทองแดงปิดผนึกสี่เส้นที่พาความร้อนจากฐานขึ้นไปยังครีบ', en: 'Four sealed copper tubes that carry heat from the base up into the fins.' },
    detail: {
      th: 'ภายในท่อมีของเหลวปริมาณเล็กน้อยภายใต้ความดันต่ำ เมื่อปลายด้านฐานร้อน ของเหลวจะระเหยเป็นไอพาความร้อนไปยังปลายด้านครีบ แล้วควบแน่นคายความร้อนออก จากนั้นไหลกลับตามโครงสร้างซึมซับ (wick) ภายในท่อ วนเป็นวัฏจักรโดยไม่ใช้พลังงานไฟฟ้า',
      en: 'Each pipe holds a small amount of liquid at low pressure. At the hot base end the liquid evaporates and carries heat to the fin end, where it condenses and releases the heat, then returns through an internal wick structure. The cycle repeats without using any electrical power.',
    },
    significance: {
      th: 'การเปลี่ยนสถานะทำให้ท่อนำความร้อนพาความร้อนได้เร็วกว่าแท่งทองแดงตันขนาดเดียวกันมาก ท่อที่บุบหรือหักงอจะเสียประสิทธิภาพ จึงไม่ควรจับหรือกดที่ตัวท่อขณะติดตั้ง',
      en: 'Thanks to the phase change, a heat pipe moves heat far faster than a solid copper rod of the same size. A dented or kinked pipe loses effectiveness, so avoid gripping or pressing on the pipes during installation.',
    },
  },
  {
    id: 'cooler-fins', part: 'cooler', pos: [-0.1, 0.3, 1.2], lesson: 'l07',
    name: { th: 'ชุดครีบอะลูมิเนียม (Fin Stack)', en: 'Aluminium fin stack' },
    brief: { th: 'แผ่นอะลูมิเนียมบางจำนวนมากที่เพิ่มพื้นที่ผิวสำหรับถ่ายเทความร้อนสู่อากาศ', en: 'Many thin aluminium plates that multiply the surface area for passing heat to the air.' },
    detail: {
      th: 'ท่อนำความร้อนสอดทะลุครีบทุกแผ่น ความร้อนจึงกระจายไปทั่วทั้งชุดครีบ การถ่ายเทความร้อนสู่อากาศขึ้นกับพื้นที่ผิวสัมผัส การใช้แผ่นบางจำนวนมากจึงให้พื้นที่ผิวรวมมากในปริมาตรจำกัด อะลูมิเนียมถูกเลือกใช้เพราะเบาและราคาต่ำกว่าทองแดง',
      en: 'The heat pipes pass through every fin, spreading heat across the whole stack. Heat transfer to air depends on contact area, so many thin plates give a large total surface in a limited volume. Aluminium is used because it is lighter and cheaper than copper.',
    },
    significance: {
      th: 'ความสูงของชุดครีบแบบทาวเวอร์ต้องไม่เกินระยะที่เคสระบุว่ารองรับ และต้องไม่ชนกับแรมที่มีฮีตซิงก์สูง ฝุ่นที่อุดระหว่างครีบทำให้ลมผ่านไม่ได้และอุณหภูมิซีพียูสูงขึ้น',
      en: 'The tower height must not exceed the cooler clearance stated for the case, and it must not collide with tall RAM heatsinks. Dust packed between the fins blocks airflow and raises CPU temperature.',
    },
  },
  {
    id: 'cooler-fan', part: 'cooler', pos: [0.5, 0, 0.92], lesson: 'l07',
    name: { th: 'พัดลมชุดระบายความร้อน 120 มม.', en: '120 mm cooler fan' },
    brief: { th: 'พัดลมที่บังคับให้อากาศไหลผ่านชุดครีบเพื่อพาความร้อนออกไป', en: 'The fan that forces air through the fin stack to carry heat away.' },
    detail: {
      th: 'พัดลมเป่าลมผ่านช่องระหว่างครีบไปในทิศทางเดียว โดยทั่วไปหันให้ลมพุ่งไปทางพัดลมดูดออกด้านหลังเคส พัดลมแบบ PWM 4 พินให้เมนบอร์ดปรับรอบได้ตามอุณหภูมิซีพียู ลมจะออกทางด้านที่มีโครงยึดมอเตอร์ และมักมีลูกศรบอกทิศบนกรอบพัดลม',
      en: 'The fan pushes air through the gaps between the fins in one direction, normally aimed towards the rear exhaust fan of the case. A 4-pin PWM fan lets the motherboard vary speed with CPU temperature. Air exits on the side with the motor struts, and arrows on the frame usually show the direction.',
    },
    significance: {
      th: 'หากติดพัดลมกลับด้าน ลมจะสวนกับทิศทางการไหลของอากาศในเคสและระบายความร้อนได้แย่ลง สายพัดลมต้องเสียบที่ขั้ว CPU_FAN เพื่อให้เมนบอร์ดควบคุมและตรวจจับได้เมื่อพัดลมหยุดหมุน',
      en: 'A fan mounted backwards fights the case airflow and cools worse. Its cable must go to the CPU_FAN header so the motherboard can control it and detect a stalled fan.',
    },
  },
  /* ---------- Case ---------- */
  {
    id: 'case-front-fans', part: 'case', pos: [2.3, 0.4, 0], lesson: 'l07',
    name: { th: 'พัดลมหน้าเคส (ลมเข้า)', en: 'Front intake fans' },
    brief: { th: 'พัดลมสองตัวด้านหน้าที่ดูดอากาศเย็นจากภายนอกเข้าสู่เคส', en: 'Two fans at the front that draw cool room air into the case.' },
    detail: {
      th: 'พัดลมหน้าดูดอากาศผ่านแผงหน้าและแผ่นกรองฝุ่น แล้วส่งไปยังการ์ดจอ ชุดระบายความร้อนซีพียู และไดรฟ์ เมื่อรวมกับพัดลมดูดออกด้านหลัง จะเกิดทางลมจากหน้าไปหลัง ซึ่งดูได้จากมุมมองการไหลของอากาศในแอป',
      en: 'The front fans pull air through the front panel and dust filter and deliver it to the graphics card, CPU cooler and drives. Together with the rear exhaust they create a front-to-back airflow path, which the airflow overlay in the app visualises.',
    },
    significance: {
      th: 'เมื่อปริมาณลมเข้ามากกว่าลมออกเล็กน้อย ภายในเคสจะมีแรงดันบวก อากาศจึงเข้าผ่านแผ่นกรองเป็นหลักและฝุ่นสะสมน้อยลง แผงหน้าที่ทึบหรือแผ่นกรองที่ตันจะทำให้ทุกชิ้นส่วนร้อนขึ้น',
      en: 'With slightly more intake than exhaust, the case is at positive pressure, so air enters mainly through the filters and less dust builds up. A solid front panel or clogged filter makes every component run hotter.',
    },
  },
  {
    id: 'case-rear-fan', part: 'case', pos: [-2.3, 1.3, 0.15], lesson: 'l07',
    name: { th: 'พัดลมหลังเคส (ลมออก)', en: 'Rear exhaust fan' },
    brief: { th: 'พัดลมด้านหลังที่ดูดอากาศร้อนออกจากเคส', en: 'The fan at the back that removes warm air from the case.' },
    detail: {
      th: 'พัดลมตัวนี้อยู่ด้านหลังชุดระบายความร้อนซีพียูพอดี จึงรับลมร้อนที่ผ่านชุดครีบแล้วเป่าออกนอกเคสทันที อากาศร้อนลอยขึ้นด้านบนตามธรรมชาติ ตำแหน่งดูดออกที่ด้านหลังส่วนบนจึงช่วยเสริมการไหลเวียน',
      en: 'This fan sits directly behind the CPU cooler, so it takes the warm air leaving the fin stack and expels it straight out of the case. Warm air naturally rises, so an exhaust at the upper rear supports the circulation.',
    },
    significance: {
      th: 'หากไม่มีทางลมออก อากาศร้อนจะวนอยู่ในเคสและอุณหภูมิของทุกชิ้นส่วนจะค่อย ๆ สูงขึ้น ควรตรวจทิศทางลูกศรบนกรอบพัดลมให้เป่าออกนอกเคส ไม่ใช่เป่าเข้า',
      en: 'Without an exhaust path, warm air recirculates and every component gradually heats up. Check the arrow on the fan frame so it blows out of the case, not in.',
    },
  },
  {
    id: 'case-psu-shroud', part: 'case', pos: [0.3, -1.25, 0.5], lesson: 'l02',
    name: { th: 'แผ่นปิดช่องพาวเวอร์ซัพพลาย (PSU Shroud)', en: 'PSU shroud' },
    brief: { th: 'แผ่นเหล็กด้านล่างที่กั้นพาวเวอร์ซัพพลายและสายไฟออกจากห้องหลักของเคส', en: 'The steel cover at the bottom that separates the power supply and its cables from the main chamber.' },
    detail: {
      th: 'แผ่นปิดนี้แบ่งเคสเป็นสองห้อง ห้องล่างเป็นที่อยู่ของพาวเวอร์ซัพพลาย สายส่วนเกิน และช่องใส่ไดรฟ์ 3.5 นิ้ว ส่วนห้องบนเป็นของเมนบอร์ดและการ์ดจอ พาวเวอร์ซัพพลายจึงมีทางลมของตัวเองแยกจากชิ้นส่วนอื่น',
      en: 'The shroud divides the case into two chambers. The lower one houses the power supply, spare cable length and the 3.5-inch drive bay, while the upper one holds the motherboard and graphics card. The power supply therefore has its own airflow path, separate from the other parts.',
    },
    significance: {
      th: 'การซ่อนสายไว้ใต้แผ่นปิดทำให้ทางลมในห้องหลักโล่งและทำงานในเคสได้ง่ายขึ้น ช่องร้อยสายบนแผ่นปิดใช้เดินสายไฟการ์ดจอและสายแผงหน้าขึ้นไปยังเมนบอร์ด',
      en: 'Hiding cables under the shroud keeps the main chamber airflow clear and makes the case easier to work in. Cut-outs in the shroud route GPU power and front-panel cables up to the motherboard.',
    },
  },
  {
    id: 'case-standoffs', part: 'case', pos: [0.9, 0.6, -0.8], lesson: 'l08',
    name: { th: 'เสารองเมนบอร์ด (Standoffs)', en: 'Motherboard standoffs' },
    brief: { th: 'เสาโลหะเกลียวที่ยกเมนบอร์ดให้ลอยเหนือถาดเหล็กของเคส', en: 'Threaded metal posts that hold the motherboard clear of the steel tray.' },
    detail: {
      th: 'เสารองขันติดกับถาดเมนบอร์ดในตำแหน่งที่ตรงกับรูยึดของบอร์ด แล้วสกรูยึดบอร์ดจะขันลงบนเสาเหล่านี้ ช่องว่างที่เกิดขึ้นกันไม่ให้จุดบัดกรีใต้บอร์ดแตะกับเหล็กของเคส รอบรูยึดมีวงโลหะที่ต่อกราวด์ของบอร์ดเข้ากับตัวถัง',
      en: 'Standoffs screw into the motherboard tray at positions matching the board mounting holes, and the board screws then thread into them. The gap keeps the solder joints under the board from touching the steel. The metal rings around the holes bond board ground to the chassis.',
    },
    significance: {
      th: 'เสารองที่อยู่ผิดตำแหน่งหรือเกินมาอาจแตะลายวงจรใต้บอร์ดจนลัดวงจรและเครื่องไม่ติด เคสรองรับบอร์ดหลายขนาด จึงต้องย้ายเสาให้ตรงกับรูของบอร์ด ATX, micro-ATX หรือ mini-ITX ที่ใช้',
      en: 'A misplaced or extra standoff can touch traces under the board, causing a short and a PC that will not start. Cases accept several board sizes, so move the standoffs to match the holes of the ATX, micro-ATX or mini-ITX board in use.',
    },
  },
  {
    id: 'case-expansion-slots', part: 'case', pos: [-2.35, -0.5, -0.3], lesson: 'l08',
    name: { th: 'ช่องการ์ดขยายด้านหลัง', en: 'Rear expansion slots' },
    brief: { th: 'ช่องเปิดเจ็ดช่องด้านหลังเคส สำหรับแผ่นเหล็กท้ายการ์ดขยาย', en: 'Seven openings at the back of the case for the brackets of expansion cards.' },
    detail: {
      th: 'แต่ละช่องตรงกับตำแหน่งสล็อตขยายบนเมนบอร์ด ATX และมีแผ่นปิดโลหะที่ต้องถอดออกก่อนใส่การ์ด แผ่นเหล็กท้ายการ์ดจะเข้ามาแทนที่และยึดด้วยสกรู พอร์ตของการ์ดจึงโผล่ออกนอกเคส การ์ดจอขนาดใหญ่มักใช้สองถึงสามช่อง',
      en: 'Each opening lines up with an expansion slot position on an ATX motherboard and has a metal cover that is removed before a card goes in. The card bracket takes its place and is screwed down, so the card ports face outside. A large graphics card often occupies two or three openings.',
    },
    significance: {
      th: 'สกรูยึดแผ่นเหล็กท้ายการ์ดช่วยรับน้ำหนักการ์ดและกันไม่ให้การ์ดขยับเมื่อเสียบหรือถอดสาย ช่องที่ไม่ได้ใช้ควรปิดแผ่นไว้เพื่อคงทิศทางลมและกันฝุ่น',
      en: 'The bracket screw supports the card and stops it moving when cables are plugged or unplugged. Unused openings should keep their covers to preserve the airflow pattern and keep dust out.',
    },
  },
  /* ---------- Rear ports ---------- */
  {
    id: 'port-usb', part: 'ports', pos: [-0.15, -0.05, 0], lesson: 'l05',
    name: { th: 'พอร์ต USB', en: 'USB ports' },
    brief: { th: 'พอร์ตอเนกประสงค์สำหรับคีย์บอร์ด เมาส์ แฟลชไดรฟ์ และอุปกรณ์ภายนอกอื่น ๆ', en: 'General-purpose ports for keyboards, mice, flash drives and other external devices.' },
    detail: {
      th: 'USB ส่งทั้งข้อมูลและไฟเลี้ยงในสายเดียว และรองรับการเสียบถอดขณะเครื่องเปิดอยู่ USB 2.0 มีความเร็วสูงสุด 480 Mb/s ส่วน USB 3.x เริ่มต้นที่ 5 Gb/s โดยพอร์ต USB 3.x แบบ Type-A มักมีแกนพลาสติกสีฟ้าให้สังเกต (สีเป็นธรรมเนียมของผู้ผลิต ไม่ใช่ข้อบังคับ และ USB-IF แนะนำให้เรียกตามความเร็ว เช่น USB 5Gbps, 10Gbps)',
      en: 'USB carries both data and power in one cable and supports hot-plugging. USB 2.0 tops out at 480 Mb/s, while USB 3.x starts at 5 Gb/s; Type-A USB 3.x ports usually have a blue insert to tell them apart (a maker convention, not a requirement; USB-IF now recommends speed-based names such as USB 5Gbps or 10Gbps).',
    },
    significance: {
      th: 'USB เข้ากันได้ย้อนหลัง แต่ความเร็วจะเท่ากับฝั่งที่ช้ากว่า ไดรฟ์ภายนอกความเร็วสูงจึงควรเสียบพอร์ต USB 3.x ส่วนคีย์บอร์ดและเมาส์ใช้พอร์ต USB 2.0 ก็เพียงพอ',
      en: 'USB is backward compatible, but the link runs at the slower side\'s speed. Fast external drives belong on USB 3.x ports, while a keyboard and mouse are fine on USB 2.0.',
    },
  },
  {
    id: 'port-dp', part: 'ports', pos: [-0.15, 0.25, 0], lesson: 'l06',
    name: { th: 'พอร์ต DisplayPort', en: 'DisplayPort' },
    brief: { th: 'พอร์ตส่งภาพและเสียงแบบดิจิทัลที่ใช้กันมากกับจอคอมพิวเตอร์', en: 'A digital video and audio output widely used with computer monitors.' },
    detail: {
      th: 'DisplayPort ส่งข้อมูลเป็นแพ็กเก็ตผ่านเลนข้อมูลความเร็วสูง หัวต่อมีมุมตัดหนึ่งด้าน และสายจำนวนมากมีสลักล็อกที่ต้องกดปุ่มก่อนดึงออก ความละเอียดและอัตรารีเฟรชที่ได้ขึ้นกับเวอร์ชันของมาตรฐานที่ทั้งต้นทางและจอรองรับ',
      en: 'DisplayPort sends packetised data over high-speed lanes. The plug has one chamfered corner, and many cables have a latch whose button must be pressed before pulling. The achievable resolution and refresh rate depend on the standard version both the source and the monitor support.',
    },
    significance: {
      th: 'พอร์ตแสดงผลบนเมนบอร์ดใช้กราฟิกในตัวของซีพียู หากซีพียูไม่มีกราฟิกในตัว หรือเครื่องมีการ์ดจอแยก ให้ต่อจอเข้ากับการ์ดจอแทน',
      en: 'Display outputs on the motherboard use the CPU\'s integrated graphics. If the CPU has none, or the PC has a discrete card, connect the monitor to the graphics card instead.',
    },
  },
  {
    id: 'port-hdmi', part: 'ports', pos: [-0.15, 0.1, 0], lesson: 'l06',
    name: { th: 'พอร์ต HDMI', en: 'HDMI port' },
    brief: { th: 'พอร์ตส่งภาพและเสียงแบบดิจิทัลที่พบทั้งในจอคอมพิวเตอร์ โทรทัศน์ และโปรเจกเตอร์', en: 'A digital video and audio output found on monitors, televisions and projectors.' },
    detail: {
      th: 'HDMI ส่งภาพและเสียงหลายช่องในสายเส้นเดียว หัวต่อเป็นทรงสี่เหลี่ยมคางหมูจึงเสียบได้ด้านเดียว เวอร์ชันที่ใหม่กว่ามีแบนด์วิดท์สูงขึ้น รองรับความละเอียดและอัตรารีเฟรชที่สูงขึ้นได้ แต่ต้องใช้สายที่รองรับความเร็วระดับเดียวกัน',
      en: 'HDMI carries video and multi-channel audio in one cable. The trapezoid plug fits only one way. Newer versions have more bandwidth and so support higher resolutions and refresh rates, but they need a cable rated for the same speed.',
    },
    significance: {
      th: 'HDMI เหมาะกับการต่อโทรทัศน์และโปรเจกเตอร์ในห้องเรียน หากได้ภาพแต่อัตรารีเฟรชต่ำกว่าที่จอทำได้ ให้ตรวจเวอร์ชันของพอร์ตและสาย',
      en: 'HDMI is the practical choice for televisions and classroom projectors. If there is a picture but the refresh rate is lower than the monitor can do, check the port and cable versions.',
    },
  },
  {
    id: 'port-rj45', part: 'ports', pos: [-0.15, -0.22, 0], lesson: 'l05',
    name: { th: 'พอร์ตเครือข่าย RJ-45', en: 'RJ-45 Ethernet port' },
    brief: { th: 'พอร์ตสำหรับสาย LAN ที่เชื่อมเครื่องเข้ากับเครือข่ายแบบใช้สาย', en: 'The socket for a LAN cable that joins the PC to a wired network.' },
    detail: {
      th: 'พอร์ตนี้รับหัวต่อแบบ 8 ขาของสายคู่บิดเกลียว และต่อกับตัวควบคุมอีเทอร์เน็ตบนเมนบอร์ด อุปกรณ์สองฝั่งจะเจรจาความเร็วกันโดยอัตโนมัติ โดย 1 Gb/s เป็นความเร็วที่พบทั่วไป ไฟ LED ข้างพอร์ตแสดงสถานะการเชื่อมต่อและการรับส่งข้อมูล',
      en: 'The port takes the 8-pin plug of a twisted-pair cable and connects to the Ethernet controller on the motherboard. Both ends negotiate speed automatically, with 1 Gb/s being common. LEDs beside the port show link status and activity.',
    },
    significance: {
      th: 'การเชื่อมต่อแบบใช้สายมีความหน่วงต่ำและเสถียรกว่า Wi-Fi เมื่อเครือข่ายใช้ไม่ได้ ให้ดูไฟ LED ที่พอร์ตก่อน หากไม่ติดเลยมักเป็นปัญหาที่สายหรืออุปกรณ์ปลายทาง',
      en: 'A wired link has lower latency and is more stable than Wi-Fi. When the network is down, look at the port LEDs first: no light at all usually points to the cable or the device at the other end.',
    },
  },
  {
    id: 'port-audio', part: 'ports', pos: [-0.15, -0.42, 0], lesson: 'l05',
    name: { th: 'ช่องเสียง 3.5 มม.', en: '3.5 mm audio jacks' },
    brief: { th: 'ช่องเสียงแอนะล็อกสำหรับลำโพง หูฟัง และไมโครโฟน', en: 'Analogue audio sockets for speakers, headphones and a microphone.' },
    detail: {
      th: 'ชิปเสียงบนเมนบอร์ดแปลงข้อมูลเสียงดิจิทัลเป็นสัญญาณแอนะล็อกส่งออกทางช่องเหล่านี้ และแปลงสัญญาณจากไมโครโฟนกลับเป็นดิจิทัล ตามธรรมเนียมการใช้สี ช่องสีเขียวคือเสียงออก สีชมพูคือไมโครโฟน และสีฟ้าคือเสียงเข้า (line in)',
      en: 'The on-board audio codec converts digital audio to an analogue signal for these jacks and converts microphone input back to digital. By colour convention, green is line out, pink is microphone and blue is line in.',
    },
    significance: {
      th: 'อาการไม่มีเสียงมักเกิดจากเสียบผิดช่องหรือเลือกอุปกรณ์เสียงออกในระบบปฏิบัติการไม่ถูก เนื่องจากเป็นสัญญาณแอนะล็อก จึงรับสัญญาณรบกวนทางไฟฟ้าจากภายในเคสได้ง่ายกว่าเสียงแบบดิจิทัล',
      en: 'No sound is often just the wrong jack or the wrong output device selected in the operating system. Being analogue, these signals pick up electrical noise from inside the case more easily than digital audio.',
    },
  },
  /* ---------- Peripherals ---------- */
  {
    id: 'mon-panel', part: 'monitor', pos: [0, 0, 0.05], lesson: 'l06',
    name: { th: 'แผงจอภาพ (Display Panel)', en: 'Display panel' },
    brief: { th: 'พื้นผิวที่สร้างภาพจากพิกเซลนับล้านจุด', en: 'The surface that forms the image from millions of pixels.' },
    detail: {
      th: 'แต่ละพิกเซลประกอบด้วยพิกเซลย่อยสีแดง เขียว และน้ำเงิน ในจอ LCD ชั้นผลึกเหลวทำหน้าที่ควบคุมปริมาณแสงจากไฟ LED ด้านหลังที่ผ่านออกมาในแต่ละพิกเซลย่อย ส่วนจอ OLED แต่ละพิกเซลเปล่งแสงเอง ภาพทั้งจอถูกวาดใหม่หลายสิบถึงหลายร้อยครั้งต่อวินาทีตามอัตรารีเฟรช (Hz)',
      en: 'Each pixel is made of red, green and blue sub-pixels. In an LCD, a liquid-crystal layer controls how much of the LED backlight passes through each sub-pixel, whereas in an OLED each pixel emits its own light. The whole image is redrawn tens to hundreds of times per second, as given by the refresh rate (Hz).',
    },
    significance: {
      th: 'ความละเอียดและอัตรารีเฟรชของจอเป็นตัวกำหนดปริมาณงานที่การ์ดจอต้องทำในแต่ละวินาที จอความละเอียดสูงและรีเฟรชสูงจึงต้องการการ์ดจอที่แรงพอจึงจะใช้ประโยชน์ได้เต็มที่',
      en: 'The monitor resolution and refresh rate set how much work the graphics card must do every second. A high-resolution, high-refresh display therefore needs a sufficiently powerful graphics card to be used fully.',
    },
  },
  {
    id: 'mon-inputs', part: 'monitor', pos: [0, -0.9, -0.2], lesson: 'l06',
    name: { th: 'พอร์ตรับสัญญาณของจอ', en: 'Monitor inputs' },
    brief: { th: 'พอร์ตด้านหลังจอสำหรับรับสัญญาณภาพจากคอมพิวเตอร์และไฟเลี้ยง', en: 'The connectors at the back of the monitor for the video signal from the PC and for power.' },
    detail: {
      th: 'จอทั่วไปมีพอร์ต HDMI และ DisplayPort อย่างละหนึ่งช่องขึ้นไป วงจรภายในจอจะรับสัญญาณดิจิทัลแล้วแปลงเป็นคำสั่งขับแต่ละพิกเซลบนแผง ผู้ใช้เลือกแหล่งสัญญาณที่ต้องการแสดงได้จากเมนูของจอ',
      en: 'A typical monitor has at least one HDMI and one DisplayPort input. Its internal electronics take the digital signal and turn it into drive commands for every pixel on the panel. The source to display is chosen in the monitor\'s on-screen menu.',
    },
    significance: {
      th: 'หากจอขึ้นข้อความว่าไม่มีสัญญาณ ให้ตรวจว่าเลือกอินพุตตรงกับพอร์ตที่เสียบสาย และสายเสียบแน่นทั้งสองด้าน พอร์ตบางช่องของจออาจรองรับอัตรารีเฟรชสูงสุดไม่เท่ากัน',
      en: 'If the monitor reports no signal, check that the selected input matches the port in use and that the cable is firmly seated at both ends. Different inputs on the same monitor may support different maximum refresh rates.',
    },
  },
  {
    id: 'kb-switch', part: 'keyboard', pos: [0, 0.1, 0], lesson: 'l01',
    name: { th: 'สวิตช์ปุ่มกด (Key Switch)', en: 'Key switch' },
    brief: { th: 'กลไกใต้ปุ่มแต่ละปุ่มที่เปลี่ยนการกดให้เป็นสัญญาณไฟฟ้า', en: 'The mechanism under each key that turns a press into an electrical signal.' },
    detail: {
      th: 'เมื่อกดปุ่ม หน้าสัมผัสของสวิตช์จะปิดวงจรที่จุดตัดของแถวและคอลัมน์ในเมทริกซ์ของคีย์บอร์ด ไมโครคอนโทรลเลอร์ในคีย์บอร์ดสแกนเมทริกซ์นี้อย่างต่อเนื่อง แล้วส่งรหัสของปุ่มที่ถูกกดไปยังคอมพิวเตอร์ผ่าน USB คีย์บอร์ดแบบเมมเบรนใช้แผ่นยางและแผ่นวงจรแทนสวิตช์กลไกแยกแต่ละปุ่ม',
      en: 'Pressing a key closes the switch contact at one row-and-column crossing of the keyboard matrix. A microcontroller in the keyboard scans the matrix continuously and sends the code of the pressed key to the computer over USB. Membrane keyboards use rubber domes and a printed membrane instead of individual mechanical switches.',
    },
    significance: {
      th: 'คีย์บอร์ดเป็นอุปกรณ์รับข้อมูลเข้าพื้นฐานที่ต้องใช้ตั้งแต่การเข้าเมนูเฟิร์มแวร์ตอนเปิดเครื่อง หากปุ่มเดียวไม่ทำงานมักเป็นปัญหาที่สวิตช์ของปุ่มนั้น แต่ถ้าปุ่มกลุ่มหนึ่งเสียพร้อมกันมักเป็นปัญหาที่เมทริกซ์หรือสาย (แถวทางไฟฟ้าของเมทริกซ์ไม่จำเป็นต้องตรงกับแถวปุ่มที่มองเห็น)',
      en: 'The keyboard is a basic input device needed from the very start, for example to enter firmware setup. One dead key usually means that switch has failed, while a group of keys failing together points to the matrix or cable (the electrical rows of the matrix need not match the visible rows of keys).',
    },
  },
  {
    id: 'mouse-sensor', part: 'mouse', pos: [0, -0.05, 0], lesson: 'l01',
    name: { th: 'เซนเซอร์ออปติคัล', en: 'Optical sensor' },
    brief: { th: 'เซนเซอร์ใต้เมาส์ที่ตรวจจับการเคลื่อนที่จากภาพของพื้นผิว', en: 'The sensor under the mouse that detects movement from images of the surface.' },
    detail: {
      th: 'ไฟ LED หรือเลเซอร์ส่องพื้นผิวใต้เมาส์ แล้วเซนเซอร์ภาพขนาดเล็กถ่ายภาพพื้นผิวนั้นหลายพันครั้งต่อวินาที ชิปประมวลผลเปรียบเทียบภาพที่ต่อเนื่องกันเพื่อคำนวณทิศทางและระยะที่เมาส์เคลื่อน แล้วส่งค่าไปยังคอมพิวเตอร์ ค่า DPI (หรือ CPI) บอกจำนวนหน่วยการเคลื่อนที่ที่รายงานต่อระยะหนึ่งนิ้ว',
      en: 'An LED or laser lights the surface beneath the mouse, and a tiny image sensor photographs it thousands of times per second. A processing chip compares successive images to work out direction and distance and reports them to the computer. The DPI (or CPI) value is the number of movement counts reported per inch travelled.',
    },
    significance: {
      th: 'เซนเซอร์ออปติคัลติดตามได้ไม่ดีบนกระจกใสหรือพื้นผิวมันวาว เพราะไม่มีลวดลายให้เปรียบเทียบ เมื่อเคอร์เซอร์กระตุก ควรทำความสะอาดช่องเซนเซอร์และลองเปลี่ยนพื้นผิวก่อนสรุปว่าเมาส์เสีย',
      en: 'Optical sensors track poorly on clear glass or glossy surfaces because there is no texture to compare. When the cursor jumps, clean the sensor window and try another surface before concluding that the mouse is faulty.',
    },
  },
];
