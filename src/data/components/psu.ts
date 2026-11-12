import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'psu',
  name: { th: 'แหล่งจ่ายไฟ (เพาเวอร์ซัพพลาย)', en: 'Power Supply Unit' },
  abbr: 'PSU',
  category: 'power-cooling',
  overview: {
    th: 'แหล่งจ่ายไฟ (PSU) แปลงไฟฟ้ากระแสสลับ (AC) จากเต้ารับให้เป็นไฟฟ้ากระแสตรง (DC) แรงดันต่ำที่ชิ้นส่วนคอมพิวเตอร์ใช้ได้ แล้วจ่ายผ่านสายและขั้วต่อชนิดต่าง ๆ คุณภาพของ PSU มีผลต่อความเสถียรและอายุของทั้งเครื่อง ในโมเดล 3 มิติเป็นกล่อง ATX ที่มุมล่างด้านหลังของเคส ใต้แผ่นครอบ PSU',
    en: 'The power supply unit (PSU) converts alternating current (AC) from the wall outlet into the low-voltage direct current (DC) that computer parts can use, and delivers it through a set of cables and connectors. Its quality affects the stability and lifespan of the whole machine. In the 3D model it is the ATX box at the bottom rear of the case, under the PSU shroud.',
  },
  mainFunction: {
    th: 'แปลงไฟ AC เป็นไฟ DC แรงดัน +12 V, +5 V และ +3.3 V ที่เสถียร จ่ายให้ทุกชิ้นส่วน และตัดการทำงานเมื่อเกิดความผิดปกติทางไฟฟ้า',
    en: 'Converts AC into stable +12 V, +5 V and +3.3 V DC for every part, and shuts down when an electrical fault occurs.',
  },
  howItWorks: {
    beginner: {
      th: 'ไฟจากเต้ารับเปรียบเหมือนน้ำแรงดันสูงจากท่อประปาหลักที่ไหลสลับทิศไปมา ซึ่งแรงเกินกว่าจะใช้รดต้นไม้ในกระถาง PSU ทำหน้าที่เหมือนสถานีลดแรงดันที่ปรับน้ำให้ไหลทางเดียวอย่างนุ่มนวล แล้วแยกท่อออกเป็นหลายขนาด ท่อใหญ่ (+12 V) ไปเลี้ยงอุปกรณ์กินไฟมากอย่าง CPU และการ์ดจอ ท่อเล็ก (+5 V และ +3.3 V) ไปเลี้ยงวงจรขนาดเล็ก',
      en: 'Wall power is like high-pressure water from the mains that surges back and forth, far too strong for watering a pot plant. The PSU acts as a pressure-reducing station that makes the flow gentle and one-directional, then splits it into pipes of different sizes: the big pipe (+12 V) feeds hungry parts such as the CPU and graphics card, while the small pipes (+5 V and +3.3 V) feed the smaller circuits.',
    },
    technical: {
      th: 'PSU ของพีซีเป็นแหล่งจ่ายไฟแบบสวิตชิง ไฟ AC ผ่านวงจรกรองสัญญาณรบกวน (EMI filter) และวงจรเรียงกระแสแบบบริดจ์ จากนั้นวงจรแก้ตัวประกอบกำลังแบบแอ็กทีฟ (Active PFC) ยกแรงดันเป็นไฟ DC ราว 380–400 V เก็บไว้ในตัวเก็บประจุขนาดใหญ่ ทรานซิสเตอร์สวิตชิงตัดต่อไฟนี้ด้วยความถี่หลายสิบถึงหลายร้อยกิโลเฮิรตซ์เข้าสู่หม้อแปลงความถี่สูง ซึ่งทั้งลดแรงดันและแยกฝั่งไฟบ้านออกจากฝั่งแรงดันต่ำ ด้านทุติยภูมิเรียงกระแสและกรองจนได้ราง +12 V ส่วน PSU รุ่นใหม่สร้างราง +5 V และ +3.3 V จาก +12 V ด้วยวงจร DC-DC โดยมีวงจรป้อนกลับคอยปรับให้แรงดันคงที่เมื่อโหลดเปลี่ยน ราง +5VSB จ่ายไฟสแตนด์บายตลอดเวลาที่เสียบปลั๊ก เมนบอร์ดสั่งเปิด PSU ด้วยสัญญาณ PS_ON# และ PSU ตอบกลับด้วยสัญญาณ Power Good เมื่อแรงดันนิ่งแล้ว นอกจากนี้ยังมีวงจรป้องกัน เช่น OVP, OCP, OPP, SCP และ OTP ที่ตัดการทำงานเมื่อพบความผิดปกติ',
      en: 'A PC power supply is a switch-mode design. AC passes through an EMI filter and a bridge rectifier, then an active power factor correction (PFC) stage boosts it to roughly 380–400 V DC held on a large bulk capacitor. Switching transistors chop this at tens to hundreds of kilohertz into a high-frequency transformer, which both steps the voltage down and isolates the mains side from the low-voltage side. The secondary side is rectified and filtered into the +12 V rail, and modern units derive +5 V and +3.3 V from +12 V with DC-DC converters, while a feedback loop holds the voltages steady as load changes. The +5VSB rail supplies standby power whenever the unit is plugged in; the motherboard turns the PSU on with the PS_ON# signal and the PSU answers with Power Good once its outputs are stable. Protection circuits such as OVP, OCP, OPP, SCP and OTP shut the unit down when something goes wrong.',
    },
  },
  structure: [
    {
      name: { th: 'พัดลมและตะแกรง', en: 'Fan and grille' },
      desc: {
        th: 'พัดลมขนาด 120–140 มม. ดูดอากาศเข้ามาระบายความร้อนให้ชิ้นส่วนภายใน แล้วเป่าออกทางตะแกรงด้านหลังเคส หลายรุ่นหยุดพัดลมเมื่อโหลดต่ำเพื่อความเงียบ',
        en: 'A 120–140 mm fan draws air across the internal parts and pushes it out through the rear grille. Many units stop the fan at low load for silence.',
      },
    },
    {
      name: { th: 'ช่องเสียบไฟ AC และสวิตช์', en: 'AC inlet and switch' },
      desc: {
        th: 'ช่องเสียบสายไฟแบบ IEC C14 และสวิตช์เปิดปิดหลักที่ด้านหลัง เป็นจุดที่ไฟบ้านเข้าสู่เครื่อง',
        en: 'The IEC C14 socket for the power cord and the main rocker switch on the rear face; this is where mains power enters the PC.',
      },
    },
    {
      name: { th: 'ชุดสายไฟและขั้วต่อ', en: 'Cables and connectors' },
      desc: {
        th: 'สายที่ออกจากด้านในของ PSU ไปยังเมนบอร์ด (24 พิน, EPS) การ์ดจอ (PCIe) และไดรฟ์ (SATA) รุ่นโมดูลาร์ถอดสายได้ จึงเสียบเฉพาะเส้นที่ใช้',
        en: 'The leads running from the inner face of the PSU to the motherboard (24-pin, EPS), graphics card (PCIe) and drives (SATA). Modular units have detachable cables, so only the needed ones are fitted.',
      },
    },
    {
      name: { th: 'ฉลากข้อมูลจำเพาะ', en: 'Rating label' },
      desc: {
        th: 'ตารางด้านข้างที่ระบุกำลังวัตต์รวม กระแสสูงสุดของแต่ละราง แรงดันขาเข้า และระดับ 80 PLUS ใช้ตรวจว่า PSU จ่ายไฟได้พอหรือไม่',
        en: 'The table on the side listing total wattage, maximum current per rail, input voltage and 80 PLUS level; use it to judge whether the PSU can power a build.',
      },
    },
    {
      name: { th: 'ตัวถังเหล็กและจุดยึดสกรู', en: 'Steel housing and mounting points' },
      desc: {
        th: 'กล่องเหล็กที่ต่อลงกราวด์ ปิดกั้นแรงดันสูงและสัญญาณรบกวนไว้ภายใน ยึดกับด้านหลังเคสด้วยสกรู 4 ตัวตามมาตรฐาน ATX',
        en: 'An earthed steel box that contains the high voltage and electrical noise inside, fixed to the rear of the case with four screws in the ATX pattern.',
      },
    },
    {
      name: { th: 'ชิ้นส่วนภายใน (ห้ามเปิด)', en: 'Internal parts (never open)' },
      desc: {
        th: 'ภายในมีหม้อแปลงความถี่สูง ตัวเก็บประจุขนาดใหญ่ ขดลวด และฮีตซิงก์ของทรานซิสเตอร์สวิตชิง ส่วนนี้มีแรงดันอันตราย ผู้ใช้ไม่ควรเปิดดูเอง',
        en: 'Inside are the high-frequency transformer, the bulk capacitor, inductors and the heatsinks of the switching transistors. This area carries dangerous voltage and is not user-serviceable.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'กำลังไฟรวม', en: 'Rated wattage' },
      value: { th: '450–1000 W (ทั่วไป) สูงสุดราว 1600 W ขึ้นไป', en: '450–1000 W (common), up to about 1600 W and beyond' },
      note: {
        th: 'เป็นกำลังไฟ DC ที่จ่ายออกได้ต่อเนื่อง ควรเผื่อไว้ให้โหลดสูงสุดของเครื่องอยู่ราว 50–80% ของค่านี้ ตั้งแต่ปี 2024 มี PSU ATX 3.1 สำหรับผู้ใช้ทั่วไปขนาด 2000–2200 W ซึ่งส่วนใหญ่จ่ายกำลังเต็มได้เมื่อใช้ไฟ 230 V',
        en: 'The continuous DC output. Size it so that the peak load of the system falls at roughly 50–80% of this figure. Since 2024 there are consumer ATX 3.1 units rated at 2000–2200 W, most of which reach full output only on 230 V mains.',
      },
    },
    {
      label: { th: 'ระดับประสิทธิภาพ', en: 'Efficiency rating' },
      value: { th: '80 PLUS ระดับ Standard, Bronze, Silver, Gold, Platinum, Titanium', en: '80 PLUS Standard, Bronze, Silver, Gold, Platinum, Titanium' },
      note: {
        th: 'ระดับพื้นฐานต้องมีประสิทธิภาพไม่ต่ำกว่า 80% ที่โหลด 20%, 50% และ 100%; ระดับ Gold อยู่ราว 90% ที่โหลด 50%',
        en: 'The base level requires at least 80% efficiency at 20%, 50% and 100% load; Gold reaches about 90% at 50% load.',
      },
    },
    {
      label: { th: 'รางแรงดันขาออก', en: 'Output rails' },
      value: { th: '+12 V, +5 V, +3.3 V, +5VSB (สแตนด์บาย), −12 V', en: '+12 V, +5 V, +3.3 V, +5VSB (standby), −12 V' },
      note: {
        th: 'กำลังไฟเกือบทั้งหมดอยู่ที่ราง +12 V ซึ่งเลี้ยง CPU และการ์ดจอ',
        en: 'Almost all the capacity is on the +12 V rail, which feeds the CPU and graphics card.',
      },
    },
    {
      label: { th: 'ขั้วต่อ', en: 'Connectors' },
      value: {
        th: 'ATX 24 พิน · EPS 4+4 พิน · PCIe 6+2 พิน · 12VHPWR / 12V-2x6 (16 พิน) · SATA · Molex',
        en: '24-pin ATX · 4+4-pin EPS · 6+2-pin PCIe · 12VHPWR / 12V-2x6 (16-pin) · SATA · Molex',
      },
      note: { th: 'ขั้ว 12VHPWR / 12V-2x6 (16 พิน) มีใน PSU มาตรฐาน ATX 3.x', en: 'The 12VHPWR / 12V-2x6 (16-pin) connector appears on ATX 3.x units.' },
    },
    {
      label: { th: 'แรงดันขาเข้า', en: 'Input voltage' },
      value: { th: '100–240 V AC, 50/60 Hz', en: '100–240 V AC, 50/60 Hz' },
      note: {
        th: 'PSU ที่ออกแบบแบบ full-range (ซึ่งมักมาพร้อม Active PFC) รับแรงดันได้ทั้งช่วงโดยอัตโนมัติ ไฟบ้านในประเทศไทยคือ 220–230 V 50 Hz',
        en: 'Full-range designs (which usually come with active PFC) accept the whole range automatically; mains power in Thailand is 220–230 V at 50 Hz.',
      },
    },
    {
      label: { th: 'ฟอร์มแฟกเตอร์', en: 'Form factor' },
      value: { th: 'ATX (กว้าง 150 มม. สูง 86 มม. ลึกราว 140–200 มม.) · SFX', en: 'ATX (150 mm wide, 86 mm tall, about 140–200 mm deep) · SFX' },
      note: { th: 'SFX เล็กกว่า ใช้ในเคสขนาดเล็ก', en: 'SFX is smaller and used in compact cases.' },
    },
    {
      label: { th: 'รูปแบบสาย', en: 'Cabling' },
      value: { th: 'สายติดตาย · กึ่งโมดูลาร์ · โมดูลาร์เต็มรูปแบบ', en: 'Fixed · semi-modular · fully modular' },
      note: {
        th: 'สายโมดูลาร์ของต่างยี่ห้อหรือต่างรุ่นมีการเรียงขาฝั่ง PSU ไม่เหมือนกัน ห้ามใช้สลับกัน',
        en: 'Modular cables from different brands or models are wired differently at the PSU end and must not be swapped.',
      },
    },
  ],
  connects: {
    th: 'ทางกายภาพ PSU ขันยึดที่มุมล่างด้านหลังของเคส รับไฟ AC จากสายไฟที่เสียบเต้ารับ แล้วเดินสายไปยังขั้ว ATX 24 พินและ EPS 8 พินของเมนบอร์ด ขั้ว PCIe ของการ์ดจอ และขั้วไฟ SATA ของ HDD, SSD ขนาด 2.5 นิ้ว และออปติคัลไดรฟ์ ทางตรรกะ เมื่อกดปุ่มเปิดเครื่อง เมนบอร์ดจะดึงสัญญาณ PS_ON# บนขั้ว 24 พินเพื่อสั่งให้ PSU เริ่มทำงาน และรอสัญญาณ Power Good ก่อนปล่อยให้ CPU เริ่มทำงาน ชิ้นส่วนอื่นที่ไม่ได้ต่อสายตรงกับ PSU เช่น RAM, SSD แบบ M.2 และพัดลม ได้รับไฟต่อจากเมนบอร์ด',
    en: 'Physically the PSU is screwed into the bottom rear of the case, takes AC from a cord plugged into the wall, and runs cables to the 24-pin ATX and 8-pin EPS connectors of the motherboard, the PCIe connectors of the graphics card and the SATA power plugs of the HDD, 2.5-inch SSDs and optical drive. Logically, pressing the power button makes the motherboard pull the PS_ON# line on the 24-pin connector to start the PSU, then wait for Power Good before releasing the CPU. Parts with no direct PSU cable, such as RAM, M.2 SSDs and fans, are powered through the motherboard.',
  },
  related: ['motherboard', 'cpu', 'gpu', 'hdd', 'case', 'optical'],
  compatibility: [
    {
      th: 'กำลังวัตต์ต้องมากกว่าการใช้ไฟรวมของเครื่องพร้อมส่วนเผื่อ โดยดูที่กำลังของราง +12 V เป็นหลัก เพราะ CPU และการ์ดจอใช้ไฟจากรางนี้',
      en: 'Wattage must exceed the total system draw with headroom, judged mainly on the +12 V rail because the CPU and graphics card draw from it.',
    },
    {
      th: 'ต้องมีขั้วต่อครบตามที่ชิ้นส่วนต้องการ: ATX 24 พิน, EPS 4+4 พิน (บางบอร์ดต้องการสองชุด), PCIe 6+2 พิน หรือ 12VHPWR / 12V-2x6 (16 พิน) ตามจำนวนที่การ์ดจอใช้ และขั้วไฟ SATA',
      en: 'It must offer every connector the parts need: 24-pin ATX, 4+4-pin EPS (two sets on some boards), as many 6+2-pin PCIe or 12VHPWR / 12V-2x6 (16-pin) connectors as the graphics card uses, and SATA power.',
    },
    {
      th: 'ฟอร์มแฟกเตอร์และความลึกของ PSU ต้องเข้ากับเคส เคส ATX ใช้ PSU แบบ ATX เคสขนาดเล็กอาจต้องใช้ SFX และต้องดูความยาว PSU สูงสุดที่เคสรองรับ',
      en: 'The PSU form factor and depth must suit the case: ATX cases take ATX units, compact cases may need SFX, and the maximum PSU length of the case must be respected.',
    },
    {
      th: 'ใช้เฉพาะสายโมดูลาร์ที่มากับ PSU รุ่นนั้น สายจากรุ่นอื่นแม้เสียบได้พอดีก็อาจเรียงขาต่างกันและทำให้อุปกรณ์เสียหายทันที',
      en: 'Use only the modular cables supplied with that PSU; a cable from another model may fit yet be wired differently and destroy hardware instantly.',
    },
  ],
  useCases: [
    {
      th: 'เครื่องสำนักงานที่ใช้กราฟิกในตัว: PSU 400–500 W ที่ได้ระดับ 80 PLUS ก็เพียงพอ',
      en: 'Office PC with integrated graphics: a 400–500 W unit with an 80 PLUS rating is ample.',
    },
    {
      th: 'เครื่องเล่นเกมที่มีการ์ดจอระดับกลางถึงสูง: PSU 650–850 W ระดับ Gold พร้อมขั้ว PCIe หรือ 12VHPWR / 12V-2x6 (16 พิน) ตามที่การ์ดต้องการ',
      en: 'Gaming PC with a mid-range to high-end graphics card: a 650–850 W Gold unit with the PCIe or 12VHPWR / 12V-2x6 (16-pin) connectors the card requires.',
    },
    {
      th: 'เวิร์กสเตชันที่ทำงานโหลดเต็มต่อเนื่องหรือมีการ์ดจอกำลังสูง: PSU 1000 W ขึ้นไปที่มีประสิทธิภาพสูง เพื่อลดความร้อนและค่าไฟในระยะยาว',
      en: 'Workstation under sustained full load or with a high-power graphics card: 1000 W or more at high efficiency, to cut heat and long-term electricity cost.',
    },
  ],
  problems: [
    {
      symptom: { th: 'เครื่องไม่ติดเลย ไม่มีไฟและไม่มีพัดลมหมุน', en: 'The PC is completely dead: no lights and no fans.' },
      check: {
        th: 'ตรวจเต้ารับ สายไฟ และสวิตช์หลัง PSU (ต้องอยู่ที่ I) ตรวจขั้ว 24 พินและสายปุ่มเปิดเครื่อง ถ้ายังไม่ติดให้ทดสอบด้วยเครื่องทดสอบ PSU หรือสลับกับ PSU ที่รู้ว่าใช้งานได้',
        en: 'Check the outlet, the cord and the PSU rear switch (it must be at I), then the 24-pin plug and the power-button lead. If it is still dead, use a PSU tester or swap in a known-good unit.',
      },
    },
    {
      symptom: { th: 'เครื่องดับหรือรีสตาร์ตเองเมื่อเล่นเกมหรือทำงานหนัก', en: 'The PC shuts off or restarts during games or heavy work.' },
      check: {
        th: 'เทียบกำลังวัตต์และกระแสของราง +12 V บนฉลากกับการใช้ไฟของ CPU และการ์ดจอ ตรวจว่าขั้ว PCIe และ EPS เสียบสุด และเป่าฝุ่นที่ตะแกรงพัดลมของ PSU เพราะอาจตัดจากความร้อนเกิน',
        en: 'Compare the wattage and +12 V current on the label with what the CPU and graphics card draw, confirm the PCIe and EPS plugs are fully seated, and clear dust from the PSU fan grille since it may be tripping on over-temperature.',
      },
    },
    {
      symptom: { th: 'เครื่องค้างหรือจอฟ้าแบบสุ่ม อุปกรณ์ USB หลุดบ่อย', en: 'Random freezes or blue screens, and USB devices dropping out.' },
      check: {
        th: 'ดูค่าแรงดัน +12 V, +5 V และ +3.3 V ใน UEFI ว่าอยู่ในช่วงประมาณ ±5% หรือไม่ ลองถอดอุปกรณ์ที่ไม่จำเป็นออก แล้วทดสอบด้วย PSU ตัวอื่นเพื่อยืนยัน',
        en: 'Read the +12 V, +5 V and +3.3 V values in UEFI and see whether they stay within about ±5%, disconnect non-essential devices, then confirm by testing with another PSU.',
      },
    },
    {
      symptom: { th: 'มีกลิ่นไหม้ เสียงแตกเปรี๊ยะ หรือเสียงพัดลมครืดคราดจาก PSU', en: 'Burning smell, crackling, or a rattling fan from the PSU.' },
      check: {
        th: 'ปิดสวิตช์และถอดปลั๊กทันที ห้ามเปิดฝาตรวจเอง ให้เปลี่ยน PSU ทั้งตัวหรือส่งเคลม',
        en: 'Switch off and unplug immediately. Do not open the unit to investigate; replace the whole PSU or send it for warranty service.',
      },
    },
  ],
  safety: [
    {
      th: 'ห้ามเปิดฝา PSU โดยเด็ดขาด ตัวเก็บประจุภายในเก็บแรงดันสูงระดับหลายร้อยโวลต์ไว้ได้แม้ถอดปลั๊กแล้ว และอาจทำให้ไฟดูดถึงชีวิต PSU ที่เสียให้เปลี่ยนทั้งตัว',
      en: 'Never open a PSU. Its internal capacitors can hold several hundred volts even after it is unplugged and can deliver a lethal shock. Replace a faulty unit as a whole.',
    },
    {
      th: 'ปิดสวิตช์ที่ PSU และถอดสายไฟ AC ทุกครั้งก่อนต่อหรือถอดสายภายในเครื่อง แล้วกดปุ่มเปิดเครื่องค้างสักครู่เพื่อคายประจุที่ค้างอยู่',
      en: 'Switch the PSU off and pull the AC cord before connecting or disconnecting any internal cable, then hold the power button for a moment to drain residual charge.',
    },
    {
      th: 'ใช้สายไฟและเต้ารับที่มีขากราวด์ ห้ามเสียบวัตถุใด ๆ เข้าช่องระบายอากาศ ห้ามบังช่องลมของ PSU และห้ามใช้สายโมดูลาร์ข้ามรุ่น',
      en: 'Use an earthed power cord and outlet, never push anything through the vents, keep the PSU air path clear, and never mix modular cables between models.',
    },
  ],
  vocab: [
    {
      en: 'Rail',
      th: 'รางจ่ายไฟ',
      meaning: {
        th: 'เส้นทางจ่ายไฟ DC ที่มีแรงดันค่าหนึ่งคงที่ เช่น ราง +12 V',
        en: 'A DC output path held at one fixed voltage, such as the +12 V rail.',
      },
    },
    {
      en: '80 PLUS',
      th: 'มาตรฐาน 80 PLUS',
      meaning: {
        th: 'โครงการรับรองประสิทธิภาพของ PSU ซึ่งรับรองว่าแปลงไฟได้อย่างน้อย 80% ที่ระดับโหลดที่กำหนด',
        en: 'A certification programme for PSU efficiency, confirming at least 80% conversion at defined load levels.',
      },
    },
    {
      en: 'Efficiency',
      th: 'ประสิทธิภาพ',
      meaning: {
        th: 'อัตราส่วนของกำลังไฟ DC ที่จ่ายออกต่อกำลังไฟ AC ที่ดึงเข้า ส่วนที่หายไปกลายเป็นความร้อน',
        en: 'The ratio of DC power delivered to AC power drawn; the difference is lost as heat.',
      },
    },
    {
      en: 'Modular PSU',
      th: 'เพาเวอร์ซัพพลายแบบโมดูลาร์',
      meaning: {
        th: 'PSU ที่ถอดสายได้ ผู้ใช้เสียบเฉพาะสายที่ต้องการ ทำให้จัดสายง่ายและลมไหลดีขึ้น',
        en: 'A PSU with detachable cables, so only the needed leads are fitted, easing cable management and airflow.',
      },
    },
    {
      en: 'Power factor correction (PFC)',
      th: 'การแก้ตัวประกอบกำลัง',
      meaning: {
        th: 'วงจรที่ทำให้กระแสที่ดึงจากไฟบ้านมีรูปคลื่นสอดคล้องกับแรงดัน ลดการสูญเสียในระบบจ่ายไฟ',
        en: 'Circuitry that makes the current drawn from the mains follow the voltage waveform, reducing losses in the supply network.',
      },
    },
    {
      en: 'Standby power (+5VSB)',
      th: 'ไฟสแตนด์บาย',
      meaning: {
        th: 'ไฟ +5 V ที่จ่ายตลอดเวลาที่เสียบปลั๊กแม้เครื่องปิดอยู่ ใช้กับวงจรปุ่มเปิดเครื่องและการปลุกเครื่อง',
        en: 'A +5 V supply present whenever the unit is plugged in, even with the PC off; it powers the power-button circuit and wake functions.',
      },
    },
  ],
  facts: [
    {
      th: 'ประสิทธิภาพบอกว่าพลังงานหายไปเป็นความร้อนเท่าใด PSU ที่มีประสิทธิภาพ 90% เมื่อจ่ายไฟ DC 450 W จะดึงไฟจากเต้ารับ 500 W และปล่อยอีก 50 W ออกมาเป็นความร้อน',
      en: 'Efficiency tells you how much energy is lost as heat: a 90% efficient PSU delivering 450 W of DC draws 500 W from the wall and releases the other 50 W as heat.',
    },
    {
      th: 'PSU สวิตชิงทำงานที่ความถี่หลายหมื่นเฮิรตซ์ขึ้นไป แทนที่จะเป็น 50 Hz ของไฟบ้าน จึงใช้หม้อแปลงที่เล็กและเบากว่าหม้อแปลงความถี่ต่ำที่กำลังเท่ากันมาก',
      en: 'A switch-mode PSU operates at tens of kilohertz or more instead of the 50 Hz of the mains, which lets it use a transformer far smaller and lighter than a low-frequency one of the same power.',
    },
    {
      th: 'ตัวเลขวัตต์บนฉลากคือกำลังสูงสุดที่จ่ายได้ ไม่ใช่ไฟที่ใช้ตลอดเวลา PSU 750 W ในเครื่องที่ต้องการ 200 W ก็จ่ายเพียงราว 200 W เท่านั้น',
      en: 'The wattage on the label is the maximum the unit can supply, not what it always uses: a 750 W PSU in a system needing 200 W delivers only about 200 W.',
    },
  ],
  review: [
    {
      q: { th: 'หน้าที่หลักของ PSU คืออะไร', en: 'What is the main job of the PSU?' },
      a: {
        th: 'แปลงไฟ AC จากเต้ารับเป็นไฟ DC แรงดันต่ำที่เสถียร (+12 V, +5 V, +3.3 V) แล้วจ่ายให้ทุกชิ้นส่วน',
        en: 'To convert AC from the outlet into stable low-voltage DC (+12 V, +5 V, +3.3 V) and deliver it to every part.',
      },
    },
    {
      q: { th: 'ราง +12 V สำคัญอย่างไร', en: 'Why does the +12 V rail matter most?' },
      a: {
        th: 'เพราะ CPU (ผ่านขั้ว EPS) และการ์ดจอ (ผ่านขั้ว PCIe) ซึ่งกินไฟมากที่สุดในเครื่องใช้ไฟจากรางนี้',
        en: 'Because the CPU (through EPS) and the graphics card (through PCIe), the biggest consumers in the PC, draw from it.',
      },
    },
    {
      q: { th: 'ทำไมจึงห้ามเปิดฝา PSU', en: 'Why must a PSU never be opened?' },
      a: {
        th: 'เพราะตัวเก็บประจุภายในยังเก็บแรงดันสูงระดับหลายร้อยโวลต์ไว้ได้แม้ถอดปลั๊กแล้ว ซึ่งอันตรายถึงชีวิต',
        en: 'Its capacitors can still hold several hundred volts after it is unplugged, which can be fatal.',
      },
    },
  ],
};
