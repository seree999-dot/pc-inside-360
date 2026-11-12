import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'mouse',
  name: { th: 'เมาส์', en: 'Mouse' },
  abbr: 'Mouse',
  category: 'peripheral',
  overview: {
    th: 'เมาส์เป็นอุปกรณ์ชี้ตำแหน่ง (pointing device) ที่แปลงการเลื่อนมือบนโต๊ะให้เป็นการเคลื่อนที่ของตัวชี้บนจอ เมาส์ยุคปัจจุบันเกือบทั้งหมดเป็นเมาส์ออปติคัลที่ใช้กล้องขนาดจิ๋วถ่ายภาพพื้นผิวใต้ตัวเมาส์ แล้วรายงานการเคลื่อนที่และการกดปุ่มไปยังเครื่องผ่าน USB ตามมาตรฐาน HID',
    en: 'The mouse is a pointing device that turns hand movement across a desk into pointer movement on the screen. Almost every modern mouse is optical: a tiny camera images the surface beneath it, and the mouse reports movement and button presses to the PC over USB using the HID standard.',
  },
  mainFunction: {
    th: 'วัดระยะและทิศทางที่เมาส์เคลื่อนที่ (ค่า Δx, Δy) รวมถึงสถานะปุ่มและล้อเลื่อน แล้วส่งให้ระบบปฏิบัติการนำไปเลื่อนตัวชี้ เลือก ลาก และเลื่อนหน้าจอ',
    en: 'Measures how far and in which direction the mouse moves (Δx, Δy), plus button and scroll-wheel state, and sends it to the operating system to move the pointer, select, drag and scroll.',
  },
  howItWorks: {
    beginner: {
      th: 'ใต้เมาส์มีไฟส่องพื้นโต๊ะและกล้องจิ๋วที่ถ่ายภาพพื้นผิวหลายพันภาพต่อวินาที เหมือนเรามองลายไม้บนโต๊ะแล้วรู้ว่าตัวเองขยับไปทางไหน ชิปในเมาส์เปรียบเทียบภาพต่อเนื่องกันเพื่อหาว่าลายเลื่อนไปเท่าไร แล้วบอกคอมพิวเตอร์ว่า "ขยับขวา 5 หน่วย ขึ้น 2 หน่วย"',
      en: 'Under the mouse a light illuminates the desk and a tiny camera takes thousands of pictures of the surface per second, much like watching the wood grain to tell which way you moved. A chip compares consecutive images to see how far the texture shifted, then tells the computer "moved 5 units right, 2 units up".',
    },
    technical: {
      th: 'เซนเซอร์ออปติคัลประกอบด้วยแหล่งแสง (LED สีแดงหรืออินฟราเรด หรือเลเซอร์) เลนส์ และเซนเซอร์ภาพ CMOS ความละเอียดต่ำที่มี DSP ในตัว DSP คำนวณความสัมพันธ์ (cross-correlation) ระหว่างภาพต่อเนื่องเพื่อหาการเลื่อนของลวดลายพื้นผิว แล้วแปลงเป็นจำนวน "count" ตามความละเอียด CPI/DPI ไมโครคอนโทรลเลอร์สะสมค่าเหล่านี้และส่งรายงาน HID ทุกครั้งที่เครื่องโพล (125 Hz = ทุก 8 ms, 1000 Hz = ทุก 1 ms) ปุ่มคลิกเป็นไมโครสวิตช์ ส่วนล้อเลื่อนใช้ตัวเข้ารหัส (encoder) แบบกลไกหรือออปติคัลเพื่อนับจังหวะการหมุน',
      en: 'An optical sensor combines a light source (red or infrared LED, or a laser), a lens and a low-resolution CMOS image sensor with an on-chip DSP. The DSP cross-correlates successive frames to find how far the surface texture shifted and converts that into counts according to the CPI/DPI setting. The microcontroller accumulates the counts and sends an HID report each time the host polls (125 Hz = every 8 ms, 1000 Hz = every 1 ms). Buttons are microswitches, and the scroll wheel uses a mechanical or optical encoder to count detents.',
    },
  },
  structure: [
    { name: { th: 'เปลือกและปุ่มซ้าย/ขวา', en: 'Shell and left/right buttons' }, desc: { th: 'ตัวเรือนที่รับกับฝ่ามือ ใต้ปุ่มแต่ละปุ่มมีไมโครสวิตช์ที่ให้เสียงและแรงกดเป็นจังหวะชัดเจน', en: 'The palm-shaped housing; each button presses a microswitch that gives a crisp click and actuation point.' } },
    { name: { th: 'ล้อเลื่อน (scroll wheel)', en: 'Scroll wheel' }, desc: { th: 'หมุนเพื่อเลื่อนหน้าจอ ตัวเข้ารหัสด้านในนับจังหวะการหมุน และกดลงได้เป็นปุ่มกลาง', en: 'Rolls to scroll; an encoder inside counts each notch, and it can be pressed as the middle button.' } },
    { name: { th: 'หน้าต่างเซนเซอร์ใต้เมาส์', en: 'Underside sensor window' }, desc: { th: 'ช่องที่แสงส่องลงพื้นและเลนส์รับภาพกลับเข้าสู่เซนเซอร์ CMOS', en: 'The opening where light shines onto the surface and the lens focuses the image back onto the CMOS sensor.' } },
    { name: { th: 'แผ่นรองลื่น (feet)', en: 'Glide feet' }, desc: { th: 'แผ่น PTFE ช่วยให้เลื่อนลื่นและรักษาระยะห่างระหว่างเซนเซอร์กับพื้น (lift-off distance)', en: 'PTFE pads that reduce friction and hold the sensor at the correct height above the surface (lift-off distance).' } },
    { name: { th: 'สายหรือภาครับส่งไร้สาย', en: 'Cable or wireless radio' }, desc: { th: 'เชื่อมต่อผ่าน USB หรือคลื่นวิทยุ 2.4 GHz/Bluetooth พร้อมแบตเตอรี่สำหรับรุ่นไร้สาย', en: 'Connects via USB cable, or by 2.4 GHz radio / Bluetooth with a battery in wireless models.' } },
  ],
  specs: [
    { label: { th: 'ชนิดเซนเซอร์', en: 'Sensor type' }, value: { th: 'ออปติคัล LED / อินฟราเรด หรือเลเซอร์', en: 'Optical LED / infrared, or laser' } },
    { label: { th: 'ความละเอียด (CPI/DPI)', en: 'Resolution (CPI/DPI)' }, value: { th: 'ใช้งานทั่วไป 800–3,200 ปรับได้ถึงหลายหมื่น', en: 'Typical use 800–3,200; adjustable to tens of thousands' }, note: { th: 'ค่าสูงสุดสูงไม่ได้แปลว่าแม่นยำกว่าเสมอไป', en: 'A higher maximum does not automatically mean more accuracy' } },
    { label: { th: 'อัตราโพลลิง', en: 'Polling rate' }, value: { th: '125–1,000 Hz (รุ่นเกมบางรุ่นสูงถึง 4,000–8,000 Hz)', en: '125–1,000 Hz (some gaming models 4,000–8,000 Hz)' } },
    { label: { th: 'การเชื่อมต่อ', en: 'Connection' }, value: { th: 'USB (HID), ไร้สาย 2.4 GHz, Bluetooth', en: 'USB (HID), 2.4 GHz wireless, Bluetooth' } },
    { label: { th: 'จำนวนปุ่ม', en: 'Buttons' }, value: { th: '3 ปุ่มพื้นฐาน + ปุ่มข้าง 2 ปุ่มในรุ่นทั่วไป', en: '3 basic buttons, plus 2 side buttons on many models' } },
  ],
  connects: {
    th: 'เมาส์ต่อเข้าพอร์ต USB ด้านหลังเคส (หรือด้านหน้าผ่านหัวต่อ USB บนเมนบอร์ด) ทางตรรกะ ตัวควบคุม USB ในชิปเซ็ตหรือ CPU รับรายงาน HID แล้วส่งให้ไดรเวอร์ของระบบปฏิบัติการ ซึ่งนำค่า Δx, Δy ไปคูณกับการตั้งค่าความเร็วตัวชี้ก่อนวาดตัวชี้ใหม่บนจอผ่าน GPU',
    en: 'The mouse plugs into a USB port on the rear I/O (or the front panel, wired to a motherboard USB header). Logically, the USB controller in the chipset or CPU receives its HID reports and hands them to the OS driver, which scales Δx, Δy by the pointer-speed setting before the GPU redraws the pointer on screen.',
  },
  related: ['ports', 'keyboard', 'monitor', 'motherboard'],
  compatibility: [
    { th: 'เมาส์ USB HID ใช้งานได้ทันทีโดยไม่ต้องติดตั้งไดรเวอร์เพิ่มบนระบบปฏิบัติการหลัก ซอฟต์แวร์ของผู้ผลิตจำเป็นเฉพาะการตั้งค่าขั้นสูง', en: 'A USB HID mouse works without extra drivers on mainstream operating systems; vendor software is only needed for advanced settings.' },
    { th: 'เมาส์ Bluetooth ต้องการเครื่องที่มีตัวรับ Bluetooth (มักมาพร้อมการ์ด Wi-Fi) ส่วนรุ่น 2.4 GHz ใช้ดองเกิล USB ของตัวเอง', en: 'A Bluetooth mouse needs a Bluetooth receiver in the PC (often on the Wi-Fi card); 2.4 GHz models use their own USB dongle.' },
    { th: 'พอร์ต PS/2 สีเขียวยังมีบนบางเมนบอร์ด แต่เมาส์ปัจจุบันส่วนใหญ่ใช้ USB', en: 'Some boards still have a green PS/2 port, but nearly all current mice use USB.' },
  ],
  useCases: [
    { th: 'งานสำนักงานและการท่องเว็บ ซึ่งเมาส์ 800–1,600 CPI ที่โพล 125–500 Hz เพียงพอ', en: 'Office work and browsing, where 800–1,600 CPI at 125–500 Hz polling is plenty.' },
    { th: 'งานออกแบบ CAD และกราฟิก ที่ต้องการการชี้ตำแหน่งละเอียดและปุ่มเพิ่มเติมสำหรับคำสั่งลัด', en: 'CAD and graphic design, which need precise pointing and extra buttons for shortcuts.' },
    { th: 'เกมแข่งขันที่ต้องการอัตราโพลลิงสูงและเซนเซอร์ไม่มีการเร่งความเร็วเทียม', en: 'Competitive gaming, which benefits from high polling rates and sensors without artificial acceleration.' },
  ],
  problems: [
    { symptom: { th: 'ตัวชี้กระตุกหรือกระโดด', en: 'Pointer jitters or jumps' }, check: { th: 'ทำความสะอาดหน้าต่างเซนเซอร์ ลองใช้แผ่นรองเมาส์ที่มีลวดลาย (กระจกและพื้นมันเงาทำให้เซนเซอร์อ่านยาก) และตรวจแบตเตอรี่ของรุ่นไร้สาย', en: 'Clean the sensor window, try a textured mouse pad (glass and glossy surfaces are hard to track) and check the battery on wireless models.' } },
    { symptom: { th: 'เมาส์ไม่ตอบสนองเลย', en: 'Mouse does not respond at all' }, check: { th: 'ลองเสียบพอร์ต USB อื่นและเครื่องอื่นเพื่อแยกว่าเสียที่เมาส์หรือพอร์ต สังเกตว่าไฟเซนเซอร์ติดหรือไม่ และดูใน Device Manager', en: 'Try another USB port and another PC to isolate mouse vs port, check whether the sensor light is on, and look in Device Manager.' } },
    { symptom: { th: 'คลิกเดียวกลายเป็นดับเบิลคลิก', en: 'Single clicks register as double clicks' }, check: { th: 'มักเป็นอาการไมโครสวิตช์สึก (contact bounce) ทดสอบด้วยเว็บทดสอบการคลิก หากยืนยันแล้วให้เปลี่ยนเมาส์หรือสวิตช์', en: 'Usually a worn microswitch (contact bounce). Confirm with a click-test page, then replace the mouse or the switch.' } },
  ],
  safety: [
    { th: 'ทำความสะอาดด้วยผ้าแห้งหรือผ้าชุบแอลกอฮอล์ไอโซโพรพิลบิดหมาด ห้ามให้ของเหลวไหลเข้าช่องปุ่มหรือเซนเซอร์', en: 'Clean with a dry cloth or one lightly dampened with isopropyl alcohol; never let liquid run into the button gaps or sensor.' },
    { th: 'อย่ามองตรงเข้าไปในเซนเซอร์เลเซอร์ แม้กำลังจะต่ำมากก็ตาม', en: 'Do not stare directly into a laser sensor, even though its power is very low.' },
  ],
  vocab: [
    { en: 'CPI / DPI', th: 'ความละเอียดเซนเซอร์', meaning: { th: 'จำนวนหน่วยการเคลื่อนที่ที่เมาส์รายงานต่อการเลื่อนหนึ่งนิ้ว', en: 'Number of movement counts reported per inch of travel.' } },
    { en: 'Polling rate', th: 'อัตราโพลลิง', meaning: { th: 'จำนวนครั้งต่อวินาทีที่เครื่องขอข้อมูลจากเมาส์', en: 'How many times per second the host asks the mouse for data.' } },
    { en: 'HID', th: 'อุปกรณ์ติดต่อผู้ใช้', meaning: { th: 'Human Interface Device มาตรฐาน USB สำหรับเมาส์ คีย์บอร์ด และจอยสติ๊ก', en: 'Human Interface Device, the USB standard class for mice, keyboards and game controllers.' } },
    { en: 'Lift-off distance', th: 'ระยะยกเมาส์', meaning: { th: 'ความสูงที่เซนเซอร์หยุดติดตามเมื่อยกเมาส์ขึ้น', en: 'The height at which the sensor stops tracking when the mouse is lifted.' } },
    { en: 'Encoder', th: 'ตัวเข้ารหัส', meaning: { th: 'กลไกที่แปลงการหมุนของล้อเลื่อนเป็นสัญญาณนับจังหวะ', en: 'The part that converts scroll-wheel rotation into countable pulses.' } },
  ],
  facts: [
    { th: 'เมาส์ตัวแรกที่ Douglas Engelbart สาธิตในปี 1968 ทำจากไม้และใช้ล้อโลหะสองล้อตั้งฉากกันวัดการเคลื่อนที่', en: 'The first mouse, demonstrated by Douglas Engelbart in 1968, was carved from wood and used two perpendicular metal wheels to measure movement.' },
    { th: 'เซนเซอร์ออปติคัลสมัยใหม่ประมวลผลภาพได้หลายพันถึงหลายหมื่นเฟรมต่อวินาที ซึ่งเร็วกว่ากล้องวิดีโอทั่วไปมาก', en: 'Modern optical sensors process thousands to tens of thousands of frames per second, far faster than an ordinary video camera.' },
  ],
  review: [
    { q: { th: 'เซนเซอร์ออปติคัลรู้ได้อย่างไรว่าเมาส์ขยับ?', en: 'How does an optical sensor know the mouse moved?' }, a: { th: 'เปรียบเทียบภาพพื้นผิวที่ถ่ายต่อเนื่องกันเพื่อหาระยะที่ลวดลายเลื่อนไป', en: 'It compares consecutive images of the surface to measure how far the texture shifted.' } },
    { q: { th: 'อัตราโพลลิง 1,000 Hz หมายถึงอะไร?', en: 'What does a 1,000 Hz polling rate mean?' }, a: { th: 'เครื่องรับรายงานจากเมาส์ทุก 1 มิลลิวินาที', en: 'The PC receives a report from the mouse every 1 millisecond.' } },
    { q: { th: 'ทำไมเมาส์ออปติคัลทำงานไม่ดีบนกระจก?', en: 'Why do optical mice track poorly on glass?' }, a: { th: 'กระจกใสและเรียบไม่มีลวดลายให้เซนเซอร์เปรียบเทียบ', en: 'Clear, smooth glass has no texture for the sensor to compare.' } },
  ],
};
