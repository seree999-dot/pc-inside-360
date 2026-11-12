import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'expansion',
  name: { th: 'การ์ดขยายและสล็อต PCIe', en: 'Expansion Cards and PCIe Slots' },
  abbr: 'PCIe',
  category: 'expansion',
  overview: {
    th: 'การ์ดขยายคือแผงวงจรที่เสียบลงสล็อต PCI Express (PCIe) ของเมนบอร์ดเพื่อเพิ่มความสามารถที่เครื่องไม่มีมาแต่เดิม ในโมเดล 3D กลุ่มนี้หมายถึงการ์ดขนาดเล็กสามใบในสล็อตด้านล่าง ได้แก่ การ์ดเครือข่าย การ์ด Wi-Fi และการ์ดเสียง การ์ดชนิดอื่นที่ใช้หลักการเดียวกัน เช่น การ์ดจับภาพวิดีโอ การ์ดควบคุม RAID และการ์ดเพิ่มพอร์ต USB',
    en: 'Expansion cards are circuit boards that plug into the motherboard PCI Express (PCIe) slots to add capabilities the PC did not originally have. In the 3D model this group is the three small cards in the lower slots: network, Wi-Fi and sound. Other cards built on the same principle include video capture cards, RAID controllers and USB port cards.',
  },
  mainFunction: {
    th: 'ให้ช่องทางมาตรฐานสำหรับเพิ่มหรืออัปเกรดฮาร์ดแวร์โดยไม่ต้องเปลี่ยนเมนบอร์ด สล็อต PCIe จ่ายไฟและให้เส้นทางข้อมูลความเร็วสูงแบบจุดต่อจุดระหว่างการ์ดกับ CPU หรือชิปเซ็ต',
    en: 'Provides a standard way to add or upgrade hardware without replacing the motherboard. A PCIe slot supplies power and a high-speed point-to-point data path between the card and the CPU or chipset.',
  },
  howItWorks: {
    beginner: {
      th: 'เปรียบสล็อต PCIe เป็นทางด่วน และ "เลน" (lane) คือช่องจราจร สล็อต x1 มีหนึ่งช่อง สล็อต x16 มีสิบหกช่อง การ์ดที่ต้องส่งข้อมูลมากอย่างการ์ดจอจึงใช้ x16 ส่วนการ์ดเสียงใช้ช่องเดียวก็พอ และแต่ละรุ่นของ PCIe ก็เหมือนการเพิ่มขีดจำกัดความเร็วของทุกช่องจราจรเป็นสองเท่า',
      en: 'Picture a PCIe slot as a motorway and each "lane" as a traffic lane. An x1 slot has one lane and an x16 slot has sixteen. A card that moves a lot of data, like a graphics card, uses x16, while a sound card manages with one. Each new PCIe generation is like doubling the speed limit on every lane.',
    },
    technical: {
      th: 'PCIe เป็นบัสอนุกรมแบบจุดต่อจุด แต่ละเลนประกอบด้วยคู่สายดิฟเฟอเรนเชียลสองคู่ คู่หนึ่งสำหรับส่งและอีกคู่สำหรับรับ ลิงก์รวมได้ 1, 2, 4, 8 หรือ 16 เลน เมื่อเริ่มระบบ การ์ดและสล็อตจะทำ link training เพื่อเจรจาจำนวนเลนและรุ่นความเร็วสูงสุดที่รองรับร่วมกัน PCIe 1.0 และ 2.0 ใช้การเข้ารหัส 8b/10b ซึ่งเสียแบนด์วิดท์ร้อยละ 20 ส่วนรุ่น 3.0 ถึง 5.0 ใช้ 128b/130b ที่เสียเพียงราวร้อยละ 1.5 สำหรับ PCIe 6.0 (ข้อกำหนดออกปี 2022, 64 GT/s) เปลี่ยนไปใช้สัญญาณ PAM4 และส่งข้อมูลเป็นหน่วย FLIT พร้อม FEC ปัจจุบันใช้ในเซิร์ฟเวอร์และศูนย์ข้อมูล ยังไม่มีในเมนบอร์ดเดสก์ท็อปทั่วไป (ณ ปี 2025) ข้อมูลส่งเป็นแพ็กเก็ตที่มีการตรวจ CRC และส่งซ้ำเมื่อผิดพลาด เลนบางส่วนมาจาก CPU โดยตรง (มักเป็นสล็อต x16 ตัวบนและ M.2 หลัก) ส่วนที่เหลือมาจากชิปเซ็ตซึ่งใช้ลิงก์ขึ้นสู่ CPU ร่วมกัน',
      en: 'PCIe is a serial point-to-point bus. Each lane consists of two differential pairs, one for transmit and one for receive, and a link aggregates 1, 2, 4, 8 or 16 lanes. At start-up the card and slot perform link training to negotiate the lane count and highest generation both support. PCIe 1.0 and 2.0 use 8b/10b encoding, which costs 20 % of the bandwidth, whereas 3.0 to 5.0 use 128b/130b at only about 1.5 % overhead. PCIe 6.0 (specification published 2022, 64 GT/s) switches to PAM4 signalling and FLIT-based transfers with FEC; it is used in servers and data centres and is not yet on mainstream desktop boards (as of 2025). Data travels in packets protected by CRC and retransmitted on error. Some lanes come straight from the CPU (usually the top x16 slot and primary M.2), while the rest come from the chipset and share its uplink to the CPU.',
    },
  },
  structure: [
    {
      name: { th: 'สล็อต PCIe บนเมนบอร์ด', en: 'PCIe slot on the motherboard' },
      desc: { th: 'ช่องเสียบพลาสติกยาวต่างกันตามจำนวนเลน: x1 สั้นที่สุด (ราว 25 มม.) และ x16 ยาวที่สุด (ราว 89 มม.) สล็อต x16 มักมีสลักล็อกที่ปลายและเสริมโครงโลหะ', en: 'A plastic socket whose length depends on lane count: x1 is the shortest (about 25 mm) and x16 the longest (about 89 mm). An x16 slot usually has a retention latch at its end and metal reinforcement.' },
    },
    {
      name: { th: 'แถบหน้าสัมผัสของการ์ด (edge connector)', en: 'Card edge connector' },
      desc: { th: 'แถบทองที่ขอบล่างของการ์ด มีร่องบากแบ่งช่วงสั้นที่เป็นขาไฟเลี้ยงและสัญญาณควบคุมออกจากส่วนสัญญาณข้อมูล เพื่อให้เสียบได้ทิศทางเดียว', en: 'The gold fingers along the bottom edge of the card, with a notch separating a short section of power and sideband control pins from the data section so it fits only one way.' },
    },
    {
      name: { th: 'แผ่นยึดท้ายเครื่อง (bracket)', en: 'Rear bracket' },
      desc: { th: 'แผ่นโลหะปลายการ์ดที่ขันสกรูกับช่องสล็อตของเคส มีขนาดเต็มความสูงและแบบเตี้ย (low-profile) สำหรับเคสขนาดเล็ก', en: 'The metal plate at the end of the card that screws to a case slot opening; it comes in full-height and low-profile versions for small cases.' },
    },
    {
      name: { th: 'ชิปควบคุมบนการ์ด', en: 'Controller chip on the card' },
      desc: { th: 'ชิปหลักที่ทำหน้าที่เฉพาะของการ์ด เช่น ชิปควบคุมอีเทอร์เน็ต ชิปควบคุม USB หรือชิปจับภาพวิดีโอ', en: 'The main chip that performs the card function, such as an Ethernet controller, USB host controller or video capture chip.' },
    },
    {
      name: { th: 'ช่องสล็อตด้านหลังเคส', en: 'Case rear slot openings' },
      desc: { th: 'เคส ATX ทั่วไปมี 7 ช่อง ตรงกับตำแหน่งสล็อตของเมนบอร์ด ช่องที่ไม่ใช้ควรปิดฝาไว้เพื่อคุมทิศทางลมและกันฝุ่น', en: 'A standard ATX case has seven openings aligned with the motherboard slots; unused ones should keep their covers to control airflow and keep dust out.' },
    },
  ],
  specs: [
    {
      label: { th: 'จำนวนเลนของสล็อต', en: 'Slot lane widths' },
      value: { th: 'x1, x4, x8, x16', en: 'x1, x4, x8, x16' },
      note: { th: 'ขนาดทางกายภาพกับจำนวนเลนทางไฟฟ้าอาจไม่เท่ากัน เช่น สล็อตยาว x16 ที่เดินสายจริงเพียง x4', en: 'Physical size and electrical lane count can differ, for example an x16-length slot wired for only x4.' },
    },
    {
      label: { th: 'ปริมาณงานต่อเลน ต่อทิศทาง', en: 'Throughput per lane, per direction' },
      value: { th: 'PCIe 1.0 ≈ 250 MB/s · 2.0 ≈ 500 MB/s · 3.0 ≈ 985 MB/s · 4.0 ≈ 1.97 GB/s · 5.0 ≈ 3.94 GB/s', en: 'PCIe 1.0 ≈ 250 MB/s · 2.0 ≈ 500 MB/s · 3.0 ≈ 985 MB/s · 4.0 ≈ 1.97 GB/s · 5.0 ≈ 3.94 GB/s' },
      note: { th: 'ค่าหลังหักการเข้ารหัสแล้ว; สล็อต x16 ได้ 16 เท่าของค่านี้ ส่วน PCIe 6.0 ได้ราว 7.5–7.9 GB/s ต่อเลน แต่ยังใช้เฉพาะในเซิร์ฟเวอร์/ศูนย์ข้อมูล', en: 'Values after encoding overhead; an x16 slot delivers sixteen times these figures. PCIe 6.0 reaches about 7.5–7.9 GB/s per lane, but so far only in servers and data centres.' },
    },
    {
      label: { th: 'อัตราสัญญาณต่อเลน', en: 'Signalling rate per lane' },
      value: { th: '2.5 / 5 / 8 / 16 / 32 GT/s (PCIe 1.0 ถึง 5.0)', en: '2.5 / 5 / 8 / 16 / 32 GT/s (PCIe 1.0 to 5.0)' },
      note: { th: 'PCIe 6.0 (ข้อกำหนดปี 2022) 64 GT/s แบบ PAM4 ยังไม่มีในเมนบอร์ดเดสก์ท็อป ณ ปี 2025', en: 'PCIe 6.0 (2022 specification) runs 64 GT/s with PAM4 and is not yet on desktop boards as of 2025.' },
    },
    {
      label: { th: 'กำลังไฟจากสล็อต', en: 'Power from the slot' },
      value: { th: 'สูงสุด 75 W สำหรับสล็อต x16; x1 โดยทั่วไป 10–25 W', en: 'Up to 75 W from an x16 slot; x1 typically 10–25 W' },
      note: { th: 'การ์ดที่ต้องการมากกว่านี้ต้องต่อสายไฟเสริมจากแหล่งจ่ายไฟ (6+2 ขา หรือ 12VHPWR / 12V-2x6 แบบ 16 ขา)', en: 'Cards needing more must take auxiliary power from the PSU (6+2-pin or 12VHPWR / 12V-2x6 16-pin).' },
    },
    {
      label: { th: 'จำนวนช่องสล็อตของเคส', en: 'Case slot count' },
      value: { th: 'ATX 7 ช่อง · micro-ATX 4 ช่อง · mini-ITX 1–2 ช่อง', en: 'ATX 7 · micro-ATX 4 · mini-ITX 1–2' },
    },
  ],
  connects: {
    th: 'การ์ดเสียบลงสล็อต PCIe บนเมนบอร์ดและยึดกับช่องสล็อตด้านหลังเคสด้วยสกรู สล็อตเชื่อมกับ CPU โดยตรงหรือผ่านชิปเซ็ต การ์ดบางชนิดต้องต่อสายเพิ่ม เช่น สายไฟจากแหล่งจ่ายไฟ สายไปยังเฮดเดอร์ USB หรือสายไปยังพอร์ตหน้าเคส',
    en: 'A card plugs into a PCIe slot on the motherboard and is screwed to a rear slot opening of the case. The slot links to the CPU directly or through the chipset. Some cards need extra cables, such as PSU power, a lead to a USB header or a cable to front-panel ports.',
  },
  related: ['motherboard', 'nic', 'wifi', 'soundcard', 'gpu', 'case'],
  compatibility: [
    {
      th: 'การ์ดที่สั้นกว่าเสียบในสล็อตที่ยาวกว่าได้เสมอ (เช่น การ์ด x1 ในสล็อต x16) ส่วนการ์ดที่ยาวกว่าจะเสียบในสล็อตที่สั้นกว่าได้ก็ต่อเมื่อสล็อตเป็นแบบปลายเปิด และจะทำงานด้วยจำนวนเลนที่น้อยกว่า',
      en: 'A shorter card always fits a longer slot (an x1 card in an x16 slot, say). A longer card fits a shorter slot only if the slot is open-ended, and then runs with the smaller lane count.',
    },
    {
      th: 'PCIe ทุกรุ่นเข้ากันได้ทั้งย้อนหลังและไปข้างหน้า: การ์ด PCIe 4.0 ในสล็อต 3.0 หรือการ์ด 3.0 ในสล็อต 5.0 ทำงานได้ที่ความเร็วของรุ่นที่ต่ำกว่า',
      en: 'All PCIe generations are backward and forward compatible: a PCIe 4.0 card in a 3.0 slot, or a 3.0 card in a 5.0 slot, works at the speed of the lower generation.',
    },
    {
      th: 'เมนบอร์ดบางรุ่นใช้เลนร่วมกัน เช่น เมื่อใช้ซ็อกเก็ต M.2 บางช่อง สล็อต PCIe หรือพอร์ต SATA บางพอร์ตจะถูกปิดหรือลดจำนวนเลน ต้องตรวจตารางในคู่มือ และตรวจว่าเคสมีช่องสล็อตและระยะว่างพอสำหรับการ์ด',
      en: 'Some boards share lanes: populating a certain M.2 socket may disable or narrow a PCIe slot or some SATA ports, so check the table in the manual, and confirm the case has enough slot openings and clearance for the card.',
    },
  ],
  useCases: [
    { th: 'การ์ดจับภาพวิดีโอสำหรับรับสัญญาณ HDMI จากกล้องหรือเครื่องเล่นเกมเพื่อถ่ายทอดสดหรือบันทึก', en: 'A video capture card taking HDMI from a camera or console for live streaming or recording.' },
    { th: 'การ์ดควบคุม RAID/HBA เพื่อเพิ่มพอร์ต SATA/SAS และจัดดิสก์หลายลูกเป็นชุดเดียวในเครื่องเซิร์ฟเวอร์หรือ NAS', en: 'A RAID/HBA controller adding SATA/SAS ports and combining several disks into one array in a server or NAS.' },
    { th: 'การ์ดเพิ่มพอร์ต USB ความเร็วสูงหรือ USB-C ให้เมนบอร์ดรุ่นเก่า และการ์ดอะแดปเตอร์ M.2 สำหรับเพิ่ม SSD แบบ NVMe', en: 'A card adding fast USB or USB-C ports to an older board, or an M.2 adapter card for an extra NVMe SSD.' },
  ],
  problems: [
    {
      symptom: { th: 'ระบบไม่พบการ์ดที่เพิ่งติดตั้ง', en: 'A newly installed card is not detected.' },
      check: { th: 'ปิดเครื่อง ถอดปลั๊ก แล้วกดการ์ดให้สุดจนแถบทองจมเสมอกันและขันสกรูยึด ตรวจสายไฟเสริม ลองสล็อตอื่น และดูในหน้าตั้งค่าเฟิร์มแวร์ว่าสล็อตนั้นถูกปิดเพราะใช้เลนร่วมกับ M.2 หรือไม่', en: 'Power off, unplug, press the card fully home until the gold fingers sit evenly and fix the screw. Check any auxiliary power lead, try another slot, and look in firmware setup for a slot disabled by lane sharing with M.2.' },
    },
    {
      symptom: { th: 'การ์ดทำงานได้แต่ช้ากว่าที่ควร', en: 'The card works but is slower than expected.' },
      check: { th: 'ตรวจความกว้างและรุ่นของลิงก์ที่เจรจาได้ด้วยโปรแกรมแสดงข้อมูลฮาร์ดแวร์ หากเป็น x4 ในสล็อตยาว x16 แสดงว่าสล็อตนั้นเดินสายเพียง x4 ให้ย้ายไปสล็อตที่ต่อกับ CPU', en: 'Read the negotiated link width and generation with a hardware information tool; if it shows x4 in an x16-length slot, that slot is wired for x4, so move the card to a CPU-connected slot.' },
    },
    {
      symptom: { th: 'เครื่องไม่บูตหรือไม่มีภาพหลังเพิ่มการ์ด', en: 'The PC will not boot or shows no picture after a card is added.' },
      check: { th: 'ถอดการ์ดที่เพิ่มออกแล้วลองบูต หากปกติให้เสียบใหม่ในสล็อตอื่น ตรวจว่าไม่ได้ดันการ์ดจอให้หลวม และอัปเดตเฟิร์มแวร์เมนบอร์ด', en: 'Remove the added card and try to boot; if that works, refit it in another slot, check the graphics card was not knocked loose, and update the motherboard firmware.' },
    },
  ],
  safety: [
    { th: 'ปิดเครื่อง ถอดสายไฟ และรอให้ไฟสแตนด์บายบนเมนบอร์ดดับก่อนเสียบหรือถอดการ์ด สล็อต PCIe ในเครื่องพีซีทั่วไปไม่รองรับการถอดเสียบขณะเปิดเครื่อง', en: 'Shut down, unplug and wait for the motherboard standby light to go out before inserting or removing a card; PCIe slots in ordinary PCs do not support hot-plugging.' },
    { th: 'แตะโครงโลหะของเคสเพื่อคายประจุไฟฟ้าสถิต จับการ์ดที่ขอบและแผ่นยึด กดลงตรง ๆ ไม่โยกเอียง และปลดสลักล็อกปลายสล็อตก่อนดึงการ์ดออกเสมอ', en: 'Touch the bare metal of the case to discharge static, hold the card by its edges and bracket, press straight down without rocking, and always release the slot latch before pulling a card out.' },
  ],
  vocab: [
    { en: 'Lane', th: 'เลน', meaning: { th: 'เส้นทางข้อมูลหนึ่งชุดของ PCIe ประกอบด้วยคู่สายส่งหนึ่งคู่และคู่สายรับหนึ่งคู่', en: 'One PCIe data path, made of one transmit pair and one receive pair.' } },
    { en: 'PCI Express (PCIe)', th: 'พีซีไอเอ็กซ์เพรส', meaning: { th: 'มาตรฐานบัสอนุกรมความเร็วสูงสำหรับเชื่อมการ์ดขยายและ SSD กับเมนบอร์ด', en: 'The high-speed serial bus standard that connects expansion cards and SSDs to the motherboard.' } },
    { en: 'Link training', th: 'การฝึกลิงก์', meaning: { th: 'ขั้นตอนตอนเริ่มระบบที่การ์ดและสล็อตตกลงจำนวนเลนและความเร็วที่จะใช้', en: 'The start-up step in which card and slot agree on the lane count and speed to use.' } },
    { en: 'Backward compatibility', th: 'ความเข้ากันได้ย้อนหลัง', meaning: { th: 'ความสามารถของอุปกรณ์รุ่นใหม่ในการทำงานร่วมกับรุ่นเก่า โดยใช้ความเร็วของรุ่นที่ต่ำกว่า', en: 'The ability of newer hardware to work with older hardware, at the speed of the older generation.' } },
    { en: 'Low-profile card', th: 'การ์ดแบบเตี้ย', meaning: { th: 'การ์ดขยายที่มีความสูงลดลงและแผ่นยึดสั้น สำหรับเคสขนาดเล็ก', en: 'An expansion card of reduced height with a short bracket, for slim cases.' } },
  ],
  facts: [
    { th: 'ข้อกำหนด PCIe ออกช่วงปี 2002–2003 และมีผลิตภัณฑ์วางขายในปี 2004 เพื่อแทนที่บัสแบบขนาน PCI และ AGP ซึ่งอุปกรณ์หลายตัวต้องใช้เส้นสัญญาณร่วมกัน', en: 'The PCIe specification appeared in 2002–2003, with products on sale in 2004, to replace the parallel PCI and AGP buses, on which several devices had to share the same signal lines.' },
    { th: 'SSD แบบ M.2 NVMe ใช้ PCIe เช่นเดียวกับการ์ดขยาย โดยทั่วไปใช้ 4 เลน เพียงแต่เปลี่ยนรูปแบบหัวต่อ', en: 'An M.2 NVMe SSD uses PCIe just like an expansion card, normally four lanes; only the connector form differs.' },
  ],
  review: [
    {
      q: { th: 'การ์ด PCIe x1 เสียบในสล็อต x16 ได้หรือไม่ และการ์ด PCIe 4.0 ใช้กับสล็อต 3.0 ได้หรือไม่', en: 'Can a PCIe x1 card go in an x16 slot, and can a PCIe 4.0 card be used in a 3.0 slot?' },
      a: { th: 'ได้ทั้งสองกรณี การ์ดจะใช้หนึ่งเลนในกรณีแรก และทำงานที่ความเร็ว PCIe 3.0 ในกรณีที่สอง', en: 'Yes to both: the card uses one lane in the first case and runs at PCIe 3.0 speed in the second.' },
    },
    {
      q: { th: 'ปริมาณงานต่อเลนเปลี่ยนไปอย่างไรในแต่ละรุ่นของ PCIe', en: 'How does per-lane throughput change with each PCIe generation?' },
      a: { th: 'เพิ่มขึ้นประมาณสองเท่าทุกรุ่น เช่น จากราว 985 MB/s ใน 3.0 เป็นราว 1.97 GB/s ใน 4.0', en: 'It roughly doubles each generation, for example from about 985 MB/s in 3.0 to about 1.97 GB/s in 4.0.' },
    },
    {
      q: { th: 'เหตุใดสล็อตที่ยาวเท่า x16 จึงอาจไม่ได้ให้ 16 เลน', en: 'Why might an x16-length slot not provide sixteen lanes?' },
      a: { th: 'เพราะขนาดทางกายภาพกับการเดินสายทางไฟฟ้าแยกจากกัน สล็อตอาจเดินสายเพียง x4 หรือ x8 เนื่องจากจำนวนเลนของ CPU และชิปเซ็ตมีจำกัด', en: 'Physical size and electrical wiring are separate; the slot may be wired for only x4 or x8 because CPU and chipset lanes are limited.' },
    },
  ],
};
