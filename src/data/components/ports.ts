import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'ports',
  name: { th: 'พอร์ตและขั้วต่อภายนอก', en: 'External Connectors and Ports' },
  abbr: 'I/O',
  category: 'peripheral',
  overview: {
    th: 'พอร์ตภายนอก (rear I/O) คือกลุ่มขั้วต่อด้านหลังเคสที่ติดอยู่กับเมนบอร์ด ใช้เชื่อมคอมพิวเตอร์กับอุปกรณ์ภายนอก เช่น เมาส์ คีย์บอร์ด จอภาพ เครือข่าย และลำโพง พอร์ตแต่ละชนิดออกแบบมาสำหรับสัญญาณเฉพาะ จึงมีรูปทรง สี และความเร็วต่างกัน',
    en: 'The rear I/O is the cluster of connectors at the back of the case, mounted on the motherboard, that links the computer to external devices such as the mouse, keyboard, monitor, network and speakers. Each port is designed for a specific kind of signal, so they differ in shape, colour and speed.',
  },
  mainFunction: {
    th: 'เป็นจุดเชื่อมทางกายภาพและทางไฟฟ้าระหว่างตัวควบคุมบนเมนบอร์ด (USB, เสียง, เครือข่าย, กราฟิกในตัว) กับสายของอุปกรณ์ภายนอก',
    en: 'Provides the physical and electrical connection between controllers on the motherboard (USB, audio, network, integrated graphics) and the cables of external devices.',
  },
  howItWorks: {
    beginner: {
      th: 'ลองนึกถึงพอร์ตเป็นประตูหลายบานที่แต่ละบานมีรูปร่างเฉพาะ เพื่อให้ "แขก" ที่ถูกต้องเข้าได้เท่านั้น เช่น สาย LAN เข้าได้เฉพาะช่อง RJ-45 สายจอเข้าได้เฉพาะ HDMI หรือ DisplayPort รูปทรงที่ต่างกันช่วยป้องกันการเสียบผิด และสีช่วยให้หาง่าย เช่น ช่องเสียงสีเขียวคือหูฟัง/ลำโพง',
      en: 'Think of the ports as a row of doors, each shaped so only the right "guest" can enter: a LAN cable fits only RJ-45, a display cable only HDMI or DisplayPort. The different shapes prevent wrong connections, and colours make them easy to find, for example the green audio jack is for headphones or speakers.',
    },
    technical: {
      th: 'USB เป็นบัสอนุกรมแบบโฮสต์-อุปกรณ์ USB 2.0 ส่งได้ 480 Mb/s USB 3.2 Gen 1 = 5 Gb/s, Gen 2 = 10 Gb/s, Gen 2x2 = 20 Gb/s และ USB4 สูงสุด 40–80 Gb/s ผ่านขั้ว USB-C ซึ่งเป็นรูปทรงขั้วต่อ ไม่ได้บอกความเร็วเสมอไป HDMI และ DisplayPort ส่งภาพดิจิทัลแบบ TMDS/FRL หรือแพ็กเก็ตไมโคร พร้อมเสียง RJ-45 ใช้สายคู่บิดเกลียว 4 คู่ (Cat5e/Cat6 และ Cat6a สำหรับ 10 Gb/s ที่ 100 ม.) สำหรับอีเทอร์เน็ต 1–10 Gb/s ส่วนแจ็ก 3.5 มม. เป็นสัญญาณแอนะล็อกจาก codec เสียงบนบอร์ด (เขียว = เอาต์พุต, ชมพู = ไมค์, ฟ้า = line-in) หมายเหตุ: พอร์ตแสดงผลบนเมนบอร์ดใช้กราฟิกในตัว CPU เท่านั้น',
      en: 'USB is a host-device serial bus: USB 2.0 carries 480 Mb/s, USB 3.2 Gen 1 = 5 Gb/s, Gen 2 = 10 Gb/s, Gen 2x2 = 20 Gb/s, and USB4 up to 40–80 Gb/s over USB-C — and USB-C is a connector shape, not a guaranteed speed. HDMI and DisplayPort carry digital video (TMDS/FRL or micro-packets) plus audio. RJ-45 uses four twisted pairs (Cat5e/Cat6, and Cat6a for 10 Gb/s at 100 m) for 1–10 Gb/s Ethernet. The 3.5 mm jacks carry analogue audio from the onboard codec (green = output, pink = microphone, blue = line-in). Note that the board\'s video outputs only work with the CPU\'s integrated graphics.',
    },
  },
  structure: [
    { name: { th: 'พอร์ต USB-A และ USB-C', en: 'USB-A and USB-C ports' }, desc: { th: 'ช่องสีดำมักเป็น USB 2.0 ช่องสีน้ำเงินหรือแดงมักเป็น USB 3.x สำหรับอุปกรณ์ความเร็วสูง สีเป็นธรรมเนียมของผู้ผลิต ไม่ใช่ข้อบังคับ ตั้งแต่ปี 2022 USB-IF แนะนำให้เรียกตามความเร็ว เช่น USB 5Gbps, 10Gbps, 20Gbps', en: 'Black ports are usually USB 2.0; blue or red ones are usually USB 3.x for faster devices. The colours are a maker convention, not a requirement; since 2022 USB-IF recommends speed-based names such as USB 5Gbps, 10Gbps and 20Gbps.' } },
    { name: { th: 'HDMI และ DisplayPort', en: 'HDMI and DisplayPort' }, desc: { th: 'เอาต์พุตภาพจากกราฟิกในตัว CPU DisplayPort มีมุมเฉียงด้านเดียวและสลักล็อก', en: 'Video outputs from the CPU\'s integrated graphics; DisplayPort has one bevelled corner and a latch.' } },
    { name: { th: 'พอร์ตเครือข่าย RJ-45', en: 'RJ-45 network port' }, desc: { th: 'ช่องเสียบสาย LAN พร้อมไฟ LED แสดงสถานะการเชื่อมต่อและการรับส่งข้อมูล', en: 'Takes the LAN cable, with LEDs showing link status and activity.' } },
    { name: { th: 'แจ็กเสียง 3.5 มม.', en: '3.5 mm audio jacks' }, desc: { th: 'ใช้รหัสสีมาตรฐาน: เขียว = ลำโพง/หูฟัง, ชมพู = ไมโครโฟน, ฟ้า = line-in', en: 'Colour-coded: green = speakers/headphones, pink = microphone, blue = line-in.' } },
    { name: { th: 'แผ่นปิด I/O (I/O shield)', en: 'I/O shield' }, desc: { th: 'แผ่นโลหะที่ปิดช่องหลังเคสรอบพอร์ต บางเมนบอร์ดติดมาในตัว', en: 'The metal plate that fills the case opening around the ports; some boards have it pre-installed.' } },
  ],
  specs: [
    { label: { th: 'USB 2.0', en: 'USB 2.0' }, value: { th: '480 Mb/s', en: '480 Mb/s' } },
    { label: { th: 'USB 3.2 Gen 1 / Gen 2 / Gen 2x2', en: 'USB 3.2 Gen 1 / Gen 2 / Gen 2x2' }, value: { th: '5 / 10 / 20 Gb/s', en: '5 / 10 / 20 Gb/s' }, note: { th: 'ชื่อการตลาดเปลี่ยนหลายครั้ง ให้ดูตัวเลขความเร็ว', en: 'Marketing names changed several times; go by the speed figure' } },
    { label: { th: 'HDMI', en: 'HDMI' }, value: { th: 'HDMI 2.0 ≈ 18 Gb/s (4K60), HDMI 2.1 สูงสุด 48 Gb/s', en: 'HDMI 2.0 ≈ 18 Gb/s (4K60); HDMI 2.1 up to 48 Gb/s' } },
    { label: { th: 'DisplayPort', en: 'DisplayPort' }, value: { th: 'DP 1.4 ≈ 32.4 Gb/s, DP 2.1 สูงสุด 80 Gb/s', en: 'DP 1.4 ≈ 32.4 Gb/s; DP 2.1 up to 80 Gb/s' } },
    { label: { th: 'อีเทอร์เน็ต RJ-45', en: 'Ethernet RJ-45' }, value: { th: '1 GbE ทั่วไป, 2.5 GbE ในบอร์ดรุ่นใหม่, 10 GbE ในรุ่นสูง', en: '1 GbE common, 2.5 GbE on newer boards, 10 GbE on high-end' } },
    { label: { th: 'เสียงแอนะล็อก', en: 'Analogue audio' }, value: { th: 'แจ็ก 3.5 มม. 3–6 ช่อง บางรุ่นมี S/PDIF ออปติคัล', en: '3–6 × 3.5 mm jacks; some boards add optical S/PDIF' } },
  ],
  connects: {
    th: 'พอร์ตด้านหลังบัดกรีอยู่บนขอบเมนบอร์ดและโผล่ออกทางช่อง I/O ของเคส แต่ละกลุ่มต่อกับตัวควบคุมของตัวเอง: USB ต่อกับชิปเซ็ตหรือ CPU, RJ-45 ต่อกับชิป Ethernet, แจ็กเสียงต่อกับ codec เสียง และพอร์ตจอต่อกับ iGPU ใน CPU ถ้าติดตั้งการ์ดจอแยก พอร์ตภาพที่ควรใช้จะอยู่บนแผ่นยึดของการ์ดจอแทน',
    en: 'The rear ports are soldered along the motherboard edge and protrude through the case I/O opening. Each group connects to its own controller: USB to the chipset or CPU, RJ-45 to the Ethernet chip, audio jacks to the audio codec, and video outputs to the CPU\'s iGPU. With a discrete graphics card, the video outputs to use are on the card\'s bracket instead.',
  },
  related: ['motherboard', 'gpu', 'nic', 'soundcard', 'keyboard', 'mouse', 'monitor'],
  compatibility: [
    { th: 'อุปกรณ์ USB 3.x ทำงานในพอร์ต USB 2.0 ได้แต่ช้าลงเหลือ 480 Mb/s เพราะ USB เข้ากันได้ย้อนหลัง', en: 'A USB 3.x device works in a USB 2.0 port, but only at 480 Mb/s, because USB is backward compatible.' },
    { th: 'ขั้ว USB-C บอกแค่รูปทรง ต้องดูสเปกว่ารองรับความเร็ว การจ่ายไฟ (USB PD) หรือภาพ (DP Alt Mode) หรือไม่', en: 'A USB-C connector only defines the shape; check whether it supports a given speed, USB Power Delivery or DisplayPort Alt Mode.' },
    { th: 'พอร์ต HDMI/DP บนเมนบอร์ดไม่มีภาพถ้า CPU ไม่มีกราฟิกในตัว', en: 'Motherboard HDMI/DP outputs give no picture if the CPU lacks integrated graphics.' },
  ],
  useCases: [
    { th: 'ต่อเมาส์ คีย์บอร์ด เว็บแคม และไดรฟ์ภายนอกผ่าน USB', en: 'Connecting a mouse, keyboard, webcam and external drives via USB.' },
    { th: 'ต่อเครือข่ายแบบมีสายที่เสถียรกว่า Wi-Fi สำหรับเกมออนไลน์หรือโอนไฟล์ขนาดใหญ่', en: 'A wired network connection that is more stable than Wi-Fi for online gaming or large transfers.' },
    { th: 'ต่อลำโพง หูฟัง และไมโครโฟนสำหรับเรียนออนไลน์', en: 'Connecting speakers, headphones and a microphone for online classes.' },
  ],
  problems: [
    { symptom: { th: 'อุปกรณ์ USB ไม่ถูกตรวจพบ', en: 'USB device not detected' }, check: { th: 'ลองพอร์ตอื่นโดยเฉพาะพอร์ตด้านหลังที่ต่อตรงกับเมนบอร์ด ตรวจ Device Manager และว่าอุปกรณ์กินไฟเกินพอร์ตหรือไม่', en: 'Try another port, ideally a rear one wired directly to the board, check Device Manager, and whether the device draws more power than the port supplies.' } },
    { symptom: { th: 'ไม่มีเสียงจากลำโพง', en: 'No sound from speakers' }, check: { th: 'ตรวจว่าเสียบแจ็กสีเขียว เลือกอุปกรณ์เล่นเสียงที่ถูกต้องในระบบปฏิบัติการ และลองหูฟังตัวอื่น', en: 'Check the plug is in the green jack, the right playback device is selected in the OS, and try other headphones.' } },
    { symptom: { th: 'ไฟ LED ที่พอร์ต LAN ไม่ติด', en: 'No LEDs on the LAN port' }, check: { th: 'ไม่มีการเชื่อมต่อทางกายภาพ ลองสายเส้นอื่นและพอร์ตอื่นบนเราเตอร์', en: 'There is no physical link; try another cable and another port on the router.' } },
  ],
  safety: [
    { th: 'เสียบและถอดขั้วต่อตรง ๆ อย่างงัดหรือบิด โดยเฉพาะ USB-C และ HDMI ซึ่งขาภายในบางและหักง่าย', en: 'Insert and remove connectors straight; never lever or twist them, especially USB-C and HDMI whose internal tongues are thin and break easily.' },
    { th: 'อย่าดันขั้วต่อเข้าด้วยแรงหากเสียบไม่เข้า ให้ตรวจทิศทางและชนิดพอร์ตก่อน', en: 'Never force a plug that will not go in; check its orientation and port type first.' },
  ],
  vocab: [
    { en: 'Rear I/O', th: 'พอร์ตด้านหลัง', meaning: { th: 'กลุ่มขั้วต่อด้านหลังเคสที่อยู่บนเมนบอร์ด', en: 'The connector cluster at the back of the case, on the motherboard.' } },
    { en: 'Backward compatibility', th: 'ความเข้ากันได้ย้อนหลัง', meaning: { th: 'อุปกรณ์รุ่นใหม่ใช้กับพอร์ตรุ่นเก่าได้ที่ความเร็วของรุ่นเก่า', en: 'Newer devices working in older ports at the older speed.' } },
    { en: 'DisplayPort Alt Mode', th: 'โหมดส่งภาพผ่าน USB-C', meaning: { th: 'การส่งสัญญาณ DisplayPort ผ่านขั้ว USB-C', en: 'Carrying DisplayPort video over a USB-C connector.' } },
    { en: 'RJ-45', th: 'ขั้วต่อสาย LAN', meaning: { th: 'ขั้วต่อ 8 ขาสำหรับสายอีเทอร์เน็ตแบบคู่บิดเกลียว', en: 'The 8-pin connector for twisted-pair Ethernet cable.' } },
    { en: 'Codec', th: 'ตัวแปลงสัญญาณเสียง', meaning: { th: 'ชิปที่แปลงเสียงดิจิทัลเป็นแอนะล็อกและกลับกัน', en: 'The chip converting digital audio to analogue and back.' } },
  ],
  facts: [
    { th: 'ขั้ว USB-C เสียบได้ทั้งสองด้านเพราะขาสัญญาณถูกจัดวางแบบสมมาตร', en: 'USB-C plugs in either way up because its contacts are laid out symmetrically.' },
    { th: 'ระบบรหัสสีพอร์ตบนพีซีมาจากข้อกำหนด PC 99 ที่ Microsoft และ Intel เผยแพร่ในปี 1998', en: 'The PC port colour scheme comes from the PC 99 guidelines published by Microsoft and Intel in 1998.' },
  ],
  review: [
    { q: { th: 'แจ็กเสียงสีชมพูใช้สำหรับอะไร?', en: 'What is the pink audio jack for?' }, a: { th: 'ไมโครโฟน', en: 'The microphone.' } },
    { q: { th: 'ขั้ว USB-C รับประกันความเร็ว USB4 หรือไม่?', en: 'Does a USB-C connector guarantee USB4 speed?' }, a: { th: 'ไม่ USB-C เป็นแค่รูปทรงขั้วต่อ ความเร็วขึ้นกับตัวควบคุมและสเปกของพอร์ต', en: 'No. USB-C is only a connector shape; speed depends on the controller and port spec.' } },
    { q: { th: 'ทำไมพอร์ต HDMI บนเมนบอร์ดบางเครื่องไม่มีภาพ?', en: 'Why might a motherboard HDMI port show no picture?' }, a: { th: 'CPU ไม่มีกราฟิกในตัว หรือมีการ์ดจอแยกที่ควรต่อแทน', en: 'The CPU has no integrated graphics, or a discrete card is installed and should be used instead.' } },
  ],
};
