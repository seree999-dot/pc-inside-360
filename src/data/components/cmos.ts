import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'cmos',
  name: { th: 'แบตเตอรี่ CMOS', en: 'CMOS Battery' },
  abbr: 'CMOS',
  category: 'firmware',
  overview: {
    th: 'แบตเตอรี่ CMOS คือถ่านกระดุมลิเทียม CR2032 ขนาด 3 โวลต์บนเมนบอร์ด ทำหน้าที่จ่ายไฟให้นาฬิกาเวลาจริง (RTC) เดินต่อเมื่อปิดเครื่องและถอดปลั๊ก ในเครื่องรุ่นเก่ายังใช้รักษาค่าตั้งของ BIOS ที่เก็บในหน่วยความจำ CMOS ด้วย ส่วนเมนบอร์ดรุ่นใหม่เก็บค่าตั้งส่วนใหญ่ไว้ใน NVRAM ของชิปแฟลช แต่ RTC ยังต้องพึ่งถ่านก้อนนี้',
    en: 'The CMOS battery is a 3-volt CR2032 lithium coin cell on the motherboard. It keeps the real-time clock (RTC) running when the PC is off and unplugged. On older machines it also preserved BIOS settings held in CMOS memory; modern boards store most settings in flash NVRAM, but the RTC still depends on this cell.',
  },
  mainFunction: {
    th: 'จ่ายไฟสำรองกระแสต่ำมากให้วงจรนาฬิกาเวลาจริงและหน่วยความจำ CMOS ขนาดเล็ก เพื่อให้วันที่ เวลา และค่าตั้งบางส่วนไม่หายเมื่อไม่มีไฟจากแหล่งจ่ายไฟ',
    en: 'Supplies a tiny standby current to the real-time clock and the small CMOS memory so that the date, time and certain settings survive when no power comes from the PSU.',
  },
  howItWorks: {
    beginner: {
      th: 'เปรียบเหมือนถ่านในนาฬิกาแขวนผนัง แม้ไฟบ้านดับ นาฬิกาก็ยังเดินต่อ เมื่อเปิดคอมพิวเตอร์อีกครั้ง เครื่องจึงรู้วันและเวลาที่ถูกต้องทันที หากถ่านหมด นาฬิกาของเครื่องจะกลับไปเริ่มที่วันที่ตั้งต้นทุกครั้งที่ถอดปลั๊ก',
      en: 'It is like the battery in a wall clock: the clock keeps ticking through a power cut. When the computer is switched on again it already knows the correct date and time. If the cell is flat, the PC clock falls back to a default date every time it is unplugged.',
    },
    technical: {
      th: 'วงจร RTC ซึ่งปัจจุบันรวมอยู่ในชิปเซ็ต นับเวลาจากผลึกควอตซ์ความถี่ 32.768 kHz (2 ยกกำลัง 15 จึงหารสองได้ลงตัวเป็น 1 Hz) เมื่อเครื่องต่อไฟอยู่ วงจรใช้ไฟสแตนด์บายจากแหล่งจ่ายไฟ และจะสลับมาใช้ถ่านผ่านไดโอดเมื่อไฟหลักหายไป โดยกินกระแสเพียงระดับไมโครแอมแปร์ ถ่านจึงอยู่ได้หลายปี หน่วยความจำ CMOS แบบดั้งเดิมเป็น RAM กินไฟต่ำที่ข้อมูลหายเมื่อไม่มีไฟ การ "เคลียร์ CMOS" จึงทำได้โดยตัดไฟจากถ่านหรือลัดวงจรขาจัมเปอร์ ในระบบ UEFI การกระทำเดียวกันนี้ยังสั่งให้เฟิร์มแวร์คืนค่าตั้งใน NVRAM เป็นค่าเริ่มต้นด้วย',
      en: 'The RTC, now integrated in the chipset, counts time from a 32.768 kHz quartz crystal (2 to the power 15, so it divides evenly down to 1 Hz). While the PC is plugged in the circuit runs from PSU standby power; it switches to the cell through a diode when mains power disappears, drawing only microamps, which is why the cell lasts years. Traditional CMOS memory is low-power RAM that loses its contents without power, so "clearing CMOS" is done by removing the cell or shorting a jumper. On UEFI systems the same action also tells the firmware to restore its NVRAM settings to defaults.',
    },
  },
  structure: [
    {
      name: { th: 'ถ่านกระดุม CR2032', en: 'CR2032 coin cell' },
      desc: { th: 'ถ่านลิเทียมแมงกานีสไดออกไซด์ เส้นผ่านศูนย์กลาง 20 มม. หนา 3.2 มม. ด้านที่มีตัวอักษรคือขั้วบวก', en: 'A lithium manganese dioxide cell 20 mm in diameter and 3.2 mm thick; the side with the markings is the positive terminal.' },
    },
    {
      name: { th: 'เบ้าใส่ถ่านและคลิปล็อก', en: 'Battery holder and retaining clip' },
      desc: { th: 'เบ้าบนเมนบอร์ดที่มีคลิปสปริงยึดถ่าน ดันคลิปออกด้านข้างเพื่อให้ถ่านดีดขึ้น ในโมเดล 3D อยู่ใกล้กลางเมนบอร์ดใต้สล็อต PCIe ตัวแรก', en: 'A socket on the board with a spring clip; push the clip sideways and the cell pops up. In the 3D model it sits near the middle of the board below the first PCIe slot.' },
    },
    {
      name: { th: 'วงจรนาฬิกาเวลาจริงและผลึกควอตซ์', en: 'Real-time clock and quartz crystal' },
      desc: { th: 'วงจรนับเวลาในชิปเซ็ตกับผลึก 32.768 kHz ทรงกระบอกหรือสี่เหลี่ยมเล็ก ๆ ที่อยู่ใกล้กัน', en: 'The timekeeping circuit in the chipset and the small cylindrical or rectangular 32.768 kHz crystal next to it.' },
    },
    {
      name: { th: 'จัมเปอร์หรือปุ่ม Clear CMOS', en: 'Clear CMOS jumper or button' },
      desc: { th: 'ขาสองหรือสามขาบนเมนบอร์ด (มักพิมพ์ว่า CLR_CMOS หรือ JBAT1) หรือปุ่มที่แผงด้านหลัง ใช้คืนค่าตั้งเฟิร์มแวร์เป็นค่าเริ่มต้น', en: 'Two or three pins on the board (often labelled CLR_CMOS or JBAT1) or a rear-panel button, used to reset firmware settings to defaults.' },
    },
  ],
  specs: [
    {
      label: { th: 'ชนิดถ่าน', en: 'Cell type' },
      value: { th: 'CR2032 ลิเทียมแมงกานีสไดออกไซด์ (ชาร์จไม่ได้)', en: 'CR2032 lithium manganese dioxide (non-rechargeable)' },
      note: { th: 'ชื่อตามมาตรฐาน IEC: C = เคมีลิเทียม-แมงกานีสไดออกไซด์, R = ทรงกลม, 20 = เส้นผ่านศูนย์กลาง 20 มม., 32 = หนา 3.2 มม.', en: 'IEC naming: C = lithium manganese dioxide chemistry, R = round, 20 = 20 mm diameter, 32 = 3.2 mm thick.' },
    },
    {
      label: { th: 'แรงดันระบุ', en: 'Nominal voltage' },
      value: { th: '3 V', en: '3 V' },
      note: { th: 'ถ่านใหม่วัดได้ราว 3.0–3.3 V; ควรเปลี่ยนเมื่อต่ำกว่าประมาณ 2.7 V', en: 'A fresh cell measures about 3.0–3.3 V; replace it when it falls below roughly 2.7 V.' },
    },
    {
      label: { th: 'ความจุ', en: 'Capacity' },
      value: { th: 'ประมาณ 210–240 mAh', en: 'About 210–240 mAh' },
    },
    {
      label: { th: 'อายุการใช้งานโดยทั่วไป', en: 'Typical service life' },
      value: { th: 'ราว 3–10 ปี', en: 'Roughly 3–10 years' },
      note: { th: 'เครื่องที่ถอดปลั๊กไว้นานจะใช้ถ่านเร็วกว่า เพราะ RTC ไม่ได้รับไฟสแตนด์บาย', en: 'A PC left unplugged for long periods drains the cell faster, because the RTC gets no standby power.' },
    },
    {
      label: { th: 'ความถี่ผลึกของ RTC', en: 'RTC crystal frequency' },
      value: { th: '32.768 kHz', en: '32.768 kHz' },
    },
  ],
  connects: {
    th: 'เสียบอยู่ในเบ้าบนเมนบอร์ดและจ่ายไฟให้วงจร RTC/CMOS ในชิปเซ็ตโดยตรง ไม่ได้ต่อกับแหล่งจ่ายไฟและไม่ได้จ่ายไฟให้ชิ้นส่วนอื่น ทำงานคู่กับเฟิร์มแวร์ UEFI ซึ่งอ่านเวลาจาก RTC ทุกครั้งที่บูต',
    en: 'It sits in a holder on the motherboard and feeds the RTC/CMOS circuit in the chipset directly. It is not connected to the PSU and powers nothing else. It works alongside the UEFI firmware, which reads the time from the RTC at every boot.',
  },
  related: ['motherboard', 'firmware', 'psu'],
  compatibility: [
    {
      th: 'เมนบอร์ดเดสก์ท็อปเกือบทั้งหมดใช้ CR2032 ถ่านที่เส้นผ่านศูนย์กลางเท่ากันแต่บางกว่า เช่น CR2025 หรือ CR2016 มีความจุน้อยกว่าและอาจหลวมในเบ้า จึงไม่ควรใช้แทน',
      en: 'Almost all desktop boards use a CR2032. Cells of the same diameter but thinner, such as CR2025 or CR2016, hold less charge and may sit loosely in the holder, so they are not suitable substitutes.',
    },
    {
      th: 'โน้ตบุ๊กและเครื่องขนาดเล็กบางรุ่นใช้ถ่าน CR2032 ที่มีสายและขั้วต่อสองขาแทนเบ้า ต้องใช้แบบที่ขั้วต่อตรงกัน',
      en: 'Some laptops and small-form-factor PCs use a CR2032 with a lead and two-pin plug instead of a holder; the plug type must match.',
    },
  ],
  useCases: [
    { th: 'รักษาวันที่และเวลาให้ถูกต้อง ซึ่งจำเป็นต่อการตรวจสอบใบรับรองความปลอดภัยของเว็บไซต์และการบันทึกเวลาของไฟล์', en: 'Keeping the date and time correct, which is necessary for validating website security certificates and for file timestamps.' },
    { th: 'เคลียร์ CMOS เพื่อกู้เครื่องที่บูตไม่ขึ้นหลังตั้งค่าโอเวอร์คล็อกหรือค่าหน่วยความจำผิดพลาด', en: 'Clearing CMOS to recover a PC that will not boot after a bad overclock or memory setting.' },
  ],
  problems: [
    {
      symptom: { th: 'วันที่และเวลากลับเป็นค่าเริ่มต้นทุกครั้งที่ถอดปลั๊ก หรือมีข้อความแจ้งให้ตั้งเวลาใหม่ตอนบูต', en: 'Date and time reset to defaults whenever the PC is unplugged, or a boot message asks for the time to be set.' },
      check: { th: 'ถอดถ่านออกมาวัดด้วยมัลติมิเตอร์ หากต่ำกว่าราว 2.7 V ให้เปลี่ยน CR2032 ก้อนใหม่ แล้วตั้งเวลาและตรวจค่าตั้งในเฟิร์มแวร์อีกครั้ง', en: 'Remove the cell and measure it with a multimeter; if it reads below about 2.7 V, fit a new CR2032, then set the clock and review firmware settings.' },
    },
    {
      symptom: { th: 'เว็บไซต์ขึ้นข้อผิดพลาดใบรับรองความปลอดภัยทั้งที่อินเทอร์เน็ตใช้งานได้', en: 'Websites show certificate errors although the internet connection works.' },
      check: { th: 'ตรวจวันที่ของเครื่อง หากย้อนไปหลายปีแสดงว่า RTC เสียค่า ให้ตั้งเวลาใหม่และตรวจถ่าน CMOS', en: 'Check the system date; if it is years in the past the RTC has lost its value. Reset the clock and test the CMOS cell.' },
    },
    {
      symptom: { th: 'เครื่องไม่ผ่าน POST หลังเปลี่ยนค่าตั้งในเฟิร์มแวร์', en: 'The PC fails POST after a firmware setting was changed.' },
      check: { th: 'ปิดเครื่อง ถอดปลั๊ก แล้วเคลียร์ CMOS ด้วยจัมเปอร์หรือปุ่มตามคู่มือเมนบอร์ด หรือถอดถ่านออกไว้ราว 1–5 นาที (บางบอร์ดต้องกดปุ่มเปิดเครื่องค้างไว้เพื่อคายประจุที่ค้าง) แล้วใส่กลับ', en: 'Power off, unplug, then clear CMOS with the jumper or button as described in the board manual, or remove the cell for about 1–5 minutes (on some boards, also hold the power button to drain residual charge) and refit it.' },
    },
  ],
  safety: [
    { th: 'ปิดเครื่องและถอดสายไฟก่อนถอดถ่าน คายประจุไฟฟ้าสถิต ใส่ถ่านโดยหันขั้วบวก (+) ขึ้น และอย่าใช้เครื่องมือโลหะงัดจนลัดวงจรหรือขูดเมนบอร์ด', en: 'Shut down and unplug before removing the cell, discharge static, fit the cell with the positive (+) side up, and do not lever it out with a metal tool that could short it or scratch the board.' },
    { th: 'เก็บถ่านกระดุมให้พ้นมือเด็ก หากกลืนเข้าไปจะทำให้ทางเดินอาหารไหม้รุนแรงภายในไม่กี่ชั่วโมง ห้ามชาร์จ ทุบ หรือเผา และทิ้งที่จุดรับขยะอันตราย', en: 'Keep coin cells away from children: a swallowed cell can cause severe internal burns within hours. Never recharge, crush or burn one, and dispose of it at a hazardous-waste collection point.' },
  ],
  vocab: [
    { en: 'RTC (Real-Time Clock)', th: 'นาฬิกาเวลาจริง', meaning: { th: 'วงจรที่นับวันและเวลาอย่างต่อเนื่องแม้เครื่องปิดอยู่', en: 'A circuit that keeps counting the date and time even while the computer is off.' } },
    { en: 'CMOS', th: 'ซีมอส', meaning: { th: 'เทคโนโลยีผลิตชิปที่กินไฟต่ำ ในบริบทของพีซีหมายถึงหน่วยความจำขนาดเล็กที่เก็บค่าตั้ง BIOS โดยอาศัยไฟจากถ่าน', en: 'A low-power chip technology; in PC usage it means the small memory that held BIOS settings on battery power.' } },
    { en: 'Clear CMOS', th: 'การเคลียร์ CMOS', meaning: { th: 'การคืนค่าตั้งเฟิร์มแวร์ทั้งหมดเป็นค่าเริ่มต้นจากโรงงาน', en: 'Resetting all firmware settings to factory defaults.' } },
    { en: 'NVRAM', th: 'หน่วยความจำไม่ลบเลือน', meaning: { th: 'พื้นที่ในชิปแฟลชที่เก็บค่าตั้ง UEFI ได้โดยไม่ต้องมีไฟเลี้ยง', en: 'A region of the flash chip that stores UEFI settings without needing power.' } },
    { en: 'Coin cell', th: 'ถ่านกระดุม', meaning: { th: 'แบตเตอรี่ทรงแบนกลมขนาดเล็กคล้ายเหรียญ', en: 'A small, flat, round battery shaped like a coin.' } },
  ],
  facts: [
    { th: 'ความถี่ 32.768 kHz ถูกเลือกเพราะเท่ากับ 2 ยกกำลัง 15 พอดี วงจรจึงหารสองซ้ำ 15 ครั้งได้สัญญาณหนึ่งครั้งต่อวินาที เป็นผลึกชนิดเดียวกับในนาฬิกาข้อมือควอตซ์', en: 'The 32.768 kHz frequency was chosen because it equals 2 to the power 15, so halving it 15 times gives one pulse per second; it is the same crystal used in quartz wristwatches.' },
    { th: 'เครื่อง IBM PC/AT ในปี 1984 เป็นพีซีรุ่นแรก ๆ ที่มีนาฬิกาและหน่วยความจำ CMOS สำรองด้วยแบตเตอรี่ ก่อนหน้านั้นผู้ใช้ต้องพิมพ์วันที่และเวลาเองทุกครั้งที่เปิดเครื่อง', en: 'The IBM PC/AT of 1984 was among the first PCs with a battery-backed clock and CMOS memory; before that, users typed in the date and time at every start-up.' },
  ],
  review: [
    {
      q: { th: 'แบตเตอรี่ CMOS เป็นถ่านชนิดใดและมีแรงดันเท่าใด', en: 'What type of cell is the CMOS battery and what is its voltage?' },
      a: { th: 'ถ่านกระดุมลิเทียม CR2032 แรงดัน 3 V', en: 'A CR2032 lithium coin cell, 3 V.' },
    },
    {
      q: { th: 'ในเมนบอร์ด UEFI รุ่นใหม่ สิ่งใดยังต้องพึ่งแบตเตอรี่ CMOS', en: 'On a modern UEFI board, what still depends on the CMOS battery?' },
      a: { th: 'นาฬิกาเวลาจริง (RTC) ส่วนค่าตั้งส่วนใหญ่เก็บใน NVRAM ของชิปแฟลช', en: 'The real-time clock (RTC); most settings are kept in flash NVRAM.' },
    },
    {
      q: { th: 'อาการใดบ่งบอกว่าถ่าน CMOS ใกล้หมด', en: 'Which symptom suggests the CMOS cell is nearly flat?' },
      a: { th: 'วันที่และเวลาของเครื่องผิดหรือกลับเป็นค่าเริ่มต้นหลังถอดปลั๊ก', en: 'The system date and time are wrong or reset to defaults after the PC has been unplugged.' },
    },
  ],
};
