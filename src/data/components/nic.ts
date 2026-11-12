import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'nic',
  name: { th: 'การ์ดเครือข่ายแบบใช้สาย', en: 'Network Interface Card' },
  abbr: 'NIC',
  category: 'expansion',
  overview: {
    th: 'การ์ดเครือข่าย (NIC) เป็นวงจรที่ทำให้คอมพิวเตอร์เชื่อมต่อกับเครือข่ายอีเทอร์เน็ต (Ethernet) ผ่านสายทองแดงหัว RJ-45 เมนบอร์ดเกือบทุกรุ่นมีวงจรนี้ติดมาอยู่แล้ว ส่วนการ์ดแยกแบบ PCIe ใช้เมื่อต้องการความเร็วสูงขึ้นหรือพอร์ตเพิ่ม ในโมเดล 3D จะเห็นเป็นการ์ดขนาดเล็กเสียบอยู่ในสล็อต PCIe x1 ด้านล่าง',
    en: 'A network interface card (NIC) lets the computer join an Ethernet network over copper cable with an RJ-45 plug. Almost every motherboard already has one built in; a separate PCIe card is added when a faster link or extra ports are needed. In the 3D model it is a small card in a lower PCIe x1 slot.',
  },
  mainFunction: {
    th: 'แปลงข้อมูลจากระบบปฏิบัติการให้เป็นเฟรมอีเทอร์เน็ตและสัญญาณไฟฟ้าบนสาย LAN และแปลงกลับเมื่อรับข้อมูลเข้า โดยระบุตัวตนของเครื่องบนเครือข่ายท้องถิ่นด้วยที่อยู่ MAC',
    en: 'Turns data from the operating system into Ethernet frames and electrical signals on the LAN cable, and reverses the process for incoming data, identifying the machine on the local network by its MAC address.',
  },
  howItWorks: {
    beginner: {
      th: 'ลองนึกถึงที่ทำการไปรษณีย์ประจำบ้าน: NIC นำข้อมูลใส่ซอง เขียนที่อยู่ผู้ส่งและผู้รับ (ที่อยู่ MAC) แล้วส่งออกไปตามสาย LAN เมื่อมีซองส่งมา NIC จะดูว่าจ่าหน้าถึงเครื่องนี้หรือไม่ ถ้าใช่ก็แกะซองแล้วส่งข้อมูลต่อให้ระบบปฏิบัติการ',
      en: 'Think of a post room for your PC: the NIC puts data in an envelope, writes the sender and receiver addresses (MAC addresses) on it and sends it down the LAN cable. When an envelope arrives, the NIC checks whether it is addressed to this machine and, if so, opens it and hands the data to the operating system.',
    },
    technical: {
      th: 'NIC ทำงานที่ชั้น Data Link และ Physical ของแบบจำลอง OSI ส่วน MAC ประกอบเฟรมอีเทอร์เน็ต ใส่ที่อยู่ MAC ต้นทาง/ปลายทางขนาด 48 บิต และคำนวณ CRC-32 (FCS) เพื่อตรวจความผิดพลาด ส่วน PHY เข้ารหัสบิตเป็นสัญญาณหลายระดับบนสายคู่บิดเกลียว เช่น 1000BASE-T ใช้ทั้ง 4 คู่สายพร้อมกันแบบสองทิศทาง เมื่อเสียบสาย ทั้งสองฝั่งจะเจรจาความเร็วและโหมดดูเพล็กซ์อัตโนมัติ (auto-negotiation) และ NIC ส่งข้อมูลกับ CPU ผ่านบัส PCIe โดยใช้ DMA และอินเทอร์รัปต์',
      en: 'A NIC works at the Data Link and Physical layers of the OSI model. Its MAC block builds Ethernet frames, adds 48-bit source and destination MAC addresses and computes a CRC-32 frame check sequence for error detection. Its PHY encodes the bits as multi-level signals on twisted pairs; 1000BASE-T, for example, uses all four pairs in both directions at once. When a cable is connected the two ends auto-negotiate speed and duplex, and the NIC exchanges data with the CPU over PCIe using DMA and interrupts.',
    },
  },
  structure: [
    {
      name: { th: 'พอร์ต RJ-45 พร้อมไฟสถานะ', en: 'RJ-45 jack with status LEDs' },
      desc: { th: 'ช่องเสียบ 8 ขา (8P8C) สำหรับสาย LAN ไฟ Link แสดงว่าเชื่อมต่อได้ ไฟ Activity กะพริบเมื่อมีการรับส่งข้อมูล สีของไฟมักบอกความเร็วที่เจรจาได้', en: 'An 8-contact (8P8C) socket for the LAN cable. The link LED shows a connection exists, the activity LED blinks with traffic, and LED colour often indicates the negotiated speed.' },
    },
    {
      name: { th: 'ชิปควบคุมอีเทอร์เน็ต (MAC + PHY)', en: 'Ethernet controller chip (MAC + PHY)' },
      desc: { th: 'ชิปหลักของการ์ด รวมส่วนจัดการเฟรม (MAC) และส่วนรับส่งสัญญาณทางไฟฟ้า (PHY) ไว้ด้วยกัน', en: 'The main chip on the card, combining frame handling (MAC) with the electrical transceiver (PHY).' },
    },
    {
      name: { th: 'หม้อแปลงแยกสัญญาณ (magnetics)', en: 'Isolation transformers (magnetics)' },
      desc: { th: 'หม้อแปลงขนาดเล็กระหว่างชิปกับพอร์ต แยกวงจรของเครื่องออกจากสายทางไฟฟ้าและลดสัญญาณรบกวน', en: 'Small transformers between the chip and the jack that electrically isolate the PC from the cable and reject noise.' },
    },
    {
      name: { th: 'แถบหน้าสัมผัส PCIe x1', en: 'PCIe x1 edge connector' },
      desc: { th: 'แถบทองด้านล่างที่เสียบลงสล็อต รับไฟเลี้ยงและส่งข้อมูลผ่านเลน PCIe หนึ่งเลน', en: 'The gold fingers that plug into the slot, carrying power and one PCIe lane of data.' },
    },
    {
      name: { th: 'แผ่นยึดท้ายเครื่อง (bracket)', en: 'Rear bracket' },
      desc: { th: 'แผ่นโลหะที่ขันสกรูเข้ากับช่องสล็อตของเคส ยึดการ์ดให้มั่นคงและต่อกราวด์เข้ากับตัวถัง', en: 'The metal plate screwed to a case slot opening; it holds the card steady and grounds it to the chassis.' },
    },
  ],
  specs: [
    {
      label: { th: 'ความเร็วลิงก์', en: 'Link speed' },
      value: { th: '1 / 2.5 / 5 / 10 Gbit/s', en: '1 / 2.5 / 5 / 10 Gbit/s' },
      note: { th: '1000BASE-T (1 GbE), 2.5GBASE-T, 5GBASE-T, 10GBASE-T — เมนบอร์ดเดสก์ท็อปช่วงปี 2020 เป็นต้นมานิยมให้ 2.5 GbE', en: '1000BASE-T (1 GbE), 2.5GBASE-T, 5GBASE-T, 10GBASE-T — desktop boards from about 2020 onward commonly ship with 2.5 GbE.' },
    },
    {
      label: { th: 'หัวต่อและสาย', en: 'Connector and cable' },
      value: { th: 'RJ-45 (8P8C) กับสายคู่บิดเกลียว Cat 5e / Cat 6 / Cat 6a', en: 'RJ-45 (8P8C) with Cat 5e / Cat 6 / Cat 6a twisted pair' },
      note: { th: 'Cat 5e รองรับ 1 และ 2.5 GbE ได้ถึง 100 ม.; 10GBASE-T ต้องใช้ Cat 6a สำหรับ 100 ม. (Cat 6 ได้ราว 55 ม.)', en: 'Cat 5e carries 1 and 2.5 GbE up to 100 m; 10GBASE-T needs Cat 6a for 100 m (Cat 6 reaches about 55 m).' },
    },
    {
      label: { th: 'การเชื่อมต่อกับเมนบอร์ด', en: 'Host interface' },
      value: { th: 'PCIe x1 (การ์ด 1–2.5 GbE); x2–x4 สำหรับ 10 GbE หลายรุ่น', en: 'PCIe x1 (1–2.5 GbE cards); x2–x4 on many 10 GbE cards' },
      note: { th: 'เลน PCIe 3.0 หนึ่งเลนส่งได้ราว 8 Gbit/s จึงไม่พอสำหรับ 10 GbE เต็มความเร็ว', en: 'One PCIe 3.0 lane carries about 8 Gbit/s, which is not enough for full-rate 10 GbE.' },
    },
    {
      label: { th: 'ที่อยู่ MAC', en: 'MAC address' },
      value: { th: '48 บิต เขียนเป็นเลขฐานสิบหก 6 ไบต์', en: '48 bits, written as six hexadecimal bytes' },
      note: { th: '24 บิตแรกคือรหัสผู้ผลิต (OUI) ที่ IEEE จัดสรร', en: 'The first 24 bits are the manufacturer identifier (OUI) assigned by the IEEE.' },
    },
    {
      label: { th: 'ขนาดเฟรมข้อมูลสูงสุด (MTU)', en: 'Maximum transmission unit (MTU)' },
      value: { th: '1500 ไบต์ตามมาตรฐาน; jumbo frame ได้ราว 9000 ไบต์', en: '1500 bytes standard; jumbo frames up to about 9000 bytes' },
    },
    {
      label: { th: 'ฟังก์ชันเสริม', en: 'Extra functions' },
      value: { th: 'Wake-on-LAN, PXE boot, checksum offload', en: 'Wake-on-LAN, PXE boot, checksum offload' },
    },
  ],
  connects: {
    th: 'เสียบในสล็อต PCIe x1 ของเมนบอร์ด (หรือสล็อตที่ยาวกว่า) และต่อสาย LAN จากพอร์ต RJ-45 ไปยังสวิตช์หรือเราเตอร์ วงจร NIC บนเมนบอร์ดจะมีพอร์ต RJ-45 อยู่ที่แผงพอร์ตด้านหลังและเชื่อมกับชิปเซ็ตผ่านเลน PCIe เช่นกัน',
    en: 'It plugs into a PCIe x1 slot on the motherboard (or any longer slot), and a LAN cable runs from its RJ-45 jack to a switch or router. An onboard NIC exposes its RJ-45 jack on the rear I/O block and also reaches the chipset through a PCIe lane.',
  },
  related: ['motherboard', 'expansion', 'ports', 'wifi', 'firmware'],
  compatibility: [
    {
      th: 'การ์ด PCIe x1 เสียบในสล็อต x1, x4, x8 หรือ x16 ได้ทั้งหมด และ PCIe ต่างรุ่นทำงานร่วมกันได้โดยใช้ความเร็วของฝั่งที่ต่ำกว่า',
      en: 'A PCIe x1 card fits x1, x4, x8 and x16 slots alike, and different PCIe generations interoperate at the speed of the slower side.',
    },
    {
      th: 'ความเร็วจริงเท่ากับจุดที่ช้าที่สุดในเส้นทาง: การ์ด 2.5 GbE ที่ต่อกับสวิตช์ 1 GbE จะทำงานที่ 1 Gbit/s',
      en: 'The real speed is set by the slowest link in the path: a 2.5 GbE card plugged into a 1 GbE switch runs at 1 Gbit/s.',
    },
    {
      th: 'ระบบปฏิบัติการต้องมีไดรเวอร์ของชิปควบคุม ชิปรุ่นใหม่อาจยังไม่มีไดรเวอร์ในตัวติดตั้งระบบรุ่นเก่า',
      en: 'The operating system needs a driver for the controller chip; a very new chip may lack a built-in driver in an older OS installer.',
    },
  ],
  useCases: [
    { th: 'เพิ่มพอร์ต 2.5 หรือ 10 GbE ให้เครื่องที่เมนบอร์ดมีเพียง 1 GbE เพื่อโอนไฟล์ขนาดใหญ่กับ NAS', en: 'Adding a 2.5 or 10 GbE port to a PC whose board only has 1 GbE, for large file transfers to a NAS.' },
    { th: 'ทดแทนพอร์ต LAN บนเมนบอร์ดที่เสียหายจากไฟกระชากหรือฟ้าผ่า', en: 'Replacing an onboard LAN port damaged by a surge or lightning strike.' },
    { th: 'เครื่องที่ต้องการการเชื่อมต่อเสถียรและหน่วงต่ำ เช่น เกมออนไลน์ การประชุมทางวิดีโอ หรือเซิร์ฟเวอร์ในห้องปฏิบัติการ', en: 'Machines that need a stable, low-latency link, such as online gaming, video conferencing or a lab server.' },
  ],
  problems: [
    {
      symptom: { th: 'ระบบแจ้งว่า "ไม่ได้เสียบสายเครือข่าย" และไฟ Link ที่พอร์ตดับ', en: 'The OS reports "network cable unplugged" and the link LED is off.' },
      check: { th: 'เสียบสายให้แน่นทั้งสองปลาย ลองเปลี่ยนสายและเปลี่ยนพอร์ตบนสวิตช์ แล้วตรวจว่าอุปกรณ์ปลายทางเปิดอยู่', en: 'Reseat both ends of the cable, try another cable and another switch port, and confirm the device at the other end is powered on.' },
    },
    {
      symptom: { th: 'เชื่อมต่อได้แต่ความเร็วลิงก์ขึ้นเพียง 100 Mbit/s', en: 'The link works but negotiates only 100 Mbit/s.' },
      check: { th: 'มักเกิดจากสายที่ตัวนำขาดบางคู่หรือเป็นสายเก่า (กิกะบิตต้องใช้ครบ 4 คู่) ให้เปลี่ยนเป็นสาย Cat 5e ขึ้นไปและดูความเร็วลิงก์ในหน้าสถานะของอะแดปเตอร์', en: 'Usually a cable with a broken pair or an old cable (gigabit needs all four pairs). Swap in a Cat 5e or better cable and read the link speed in the adapter status page.' },
    },
    {
      symptom: { th: 'ไม่พบการ์ดในระบบปฏิบัติการเลย', en: 'The card does not appear in the operating system at all.' },
      check: { th: 'ปิดเครื่อง ถอดปลั๊ก แล้วเสียบการ์ดใหม่ให้สุด ลองสล็อตอื่น จากนั้นตรวจใน Device Manager ว่ามีอุปกรณ์ที่ยังไม่มีไดรเวอร์หรือไม่ และติดตั้งไดรเวอร์จากผู้ผลิตชิป', en: 'Power off, unplug, reseat the card fully and try another slot; then look in Device Manager for an unknown device and install the chip vendor driver.' },
    },
  ],
  safety: [
    { th: 'ปิดเครื่องและถอดสายไฟก่อนเสียบหรือถอดการ์ด คายประจุไฟฟ้าสถิตโดยแตะโครงโลหะของเคส และจับการ์ดที่ขอบ ไม่แตะแถบทองหรือชิป', en: 'Shut down and unplug the power cord before fitting or removing the card, discharge static by touching the bare metal case, and hold the card by its edges without touching the gold fingers or chips.' },
    { th: 'ช่วงพายุฝนฟ้าคะนอง สาย LAN ที่เดินนอกอาคารอาจนำไฟกระชากเข้าเครื่องได้ ควรใช้อุปกรณ์ป้องกันไฟกระชากหรือถอดสายออก', en: 'During thunderstorms a LAN cable that runs outdoors can carry a surge into the PC; use surge protection or unplug the cable.' },
  ],
  vocab: [
    { en: 'Ethernet', th: 'อีเทอร์เน็ต', meaning: { th: 'กลุ่มมาตรฐาน IEEE 802.3 สำหรับเครือข่ายท้องถิ่นแบบใช้สาย', en: 'The IEEE 802.3 family of standards for wired local area networks.' } },
    { en: 'MAC address', th: 'ที่อยู่ MAC', meaning: { th: 'หมายเลขประจำตัวฮาร์ดแวร์ 48 บิตของอินเทอร์เฟซเครือข่าย ใช้ส่งเฟรมภายในเครือข่ายท้องถิ่น', en: 'A 48-bit hardware identifier of a network interface, used to deliver frames within a local network.' } },
    { en: 'RJ-45 (8P8C)', th: 'หัวต่อ RJ-45', meaning: { th: 'หัวต่อแบบโมดูลาร์ 8 ขาที่ใช้กับสาย LAN คู่บิดเกลียว', en: 'The 8-contact modular connector used on twisted-pair LAN cables.' } },
    { en: 'Auto-negotiation', th: 'การเจรจาอัตโนมัติ', meaning: { th: 'กระบวนการที่อุปกรณ์สองฝั่งตกลงความเร็วและโหมดดูเพล็กซ์สูงสุดที่รองรับร่วมกัน', en: 'The process by which two link partners agree on the highest speed and duplex mode both support.' } },
    { en: 'Frame', th: 'เฟรม', meaning: { th: 'หน่วยข้อมูลของชั้น Data Link ประกอบด้วยส่วนหัว ที่อยู่ MAC ข้อมูล และรหัสตรวจสอบความผิดพลาด', en: 'The Data Link layer unit of data: header, MAC addresses, payload and an error-check code.' } },
  ],
  facts: [
    { th: 'อีเทอร์เน็ตรุ่นแรกในทศวรรษ 1970 ใช้สายโคแอกเชียลเส้นเดียวร่วมกันทุกเครื่องและทำงานที่ประมาณ 3 Mbit/s', en: 'The first Ethernet in the 1970s shared a single coaxial cable among all machines and ran at roughly 3 Mbit/s.' },
    { th: 'มาตรฐาน 2.5GBASE-T และ 5GBASE-T (IEEE 802.3bz) ถูกออกแบบมาเพื่อให้เร็วกว่ากิกะบิตโดยยังใช้สาย Cat 5e/Cat 6 เดิมในอาคารได้', en: 'The 2.5GBASE-T and 5GBASE-T standards (IEEE 802.3bz) were created to beat gigabit speed while reusing the Cat 5e/Cat 6 cabling already in buildings.' },
  ],
  review: [
    {
      q: { th: 'ที่อยู่ MAC มีกี่บิต และใช้ทำอะไร', en: 'How many bits is a MAC address and what is it for?' },
      a: { th: '48 บิต ใช้ระบุอินเทอร์เฟซเครือข่ายแต่ละตัวเพื่อส่งเฟรมภายในเครือข่ายท้องถิ่น', en: '48 bits; it identifies each network interface so frames can be delivered within the local network.' },
    },
    {
      q: { th: 'เหตุใดการ์ด 2.5 GbE จึงอาจทำงานได้เพียง 1 Gbit/s', en: 'Why might a 2.5 GbE card run at only 1 Gbit/s?' },
      a: { th: 'เพราะอุปกรณ์อีกฝั่ง (สวิตช์หรือเราเตอร์) รองรับสูงสุดเพียง 1 GbE ลิงก์จึงเจรจาที่ความเร็วร่วมสูงสุด', en: 'Because the device at the other end (switch or router) supports only 1 GbE, so the link negotiates the highest common speed.' },
    },
    {
      q: { th: 'การ์ด NIC แบบ PCIe x1 เสียบในสล็อต x16 ได้หรือไม่', en: 'Can a PCIe x1 NIC be installed in an x16 slot?' },
      a: { th: 'ได้ การ์ดที่สั้นกว่าเสียบในสล็อตที่ยาวกว่าได้ และจะใช้เพียงหนึ่งเลน', en: 'Yes. A shorter card works in a longer slot and simply uses one lane.' },
    },
  ],
};
