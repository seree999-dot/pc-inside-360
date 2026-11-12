import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'ram',
  name: { th: 'หน่วยความจำหลัก (แรม)', en: 'Random Access Memory' },
  abbr: 'RAM',
  category: 'core',
  overview: {
    th: 'หน่วยความจำหลัก (RAM) คือพื้นที่ทำงานชั่วคราวความเร็วสูงที่เก็บโปรแกรมและข้อมูลซึ่ง CPU กำลังใช้งานอยู่ ข้อมูลใน RAM จะหายทันทีเมื่อไฟดับ จึงต่างจากที่เก็บข้อมูลถาวรอย่าง SSD หรือ HDD ในโมเดล 3 มิติเป็นแผงแบบ DDR5 สองแถวที่เสียบในสล็อต A2 และ B2 ของเมนบอร์ด',
    en: 'Random access memory (RAM) is the fast, temporary workspace that holds the programs and data the CPU is using right now. Its contents vanish when power is removed, which is what separates it from permanent storage such as an SSD or HDD. In the 3D model it appears as two DDR5-style modules in slots A2 and B2 of the motherboard.',
  },
  mainFunction: {
    th: 'เก็บข้อมูลและคำสั่งของโปรแกรมที่เปิดอยู่ให้ CPU อ่านและเขียนได้อย่างรวดเร็ว เร็วกว่าการอ่านจากที่เก็บข้อมูลหลายเท่า',
    en: 'Keeps the data and instructions of running programs where the CPU can read and write them quickly, many times faster than reading from storage.',
  },
  howItWorks: {
    beginner: {
      th: 'RAM เปรียบเหมือนโต๊ะทำงาน ส่วน SSD หรือ HDD เปรียบเหมือนตู้เอกสาร เวลาจะทำงานเราหยิบเอกสารจากตู้มาวางบนโต๊ะเพื่อหยิบใช้ได้ทันที โต๊ะยิ่งกว้าง (ความจุมาก) ก็ยิ่งกางงานได้หลายอย่างพร้อมกันโดยไม่ต้องเก็บ ๆ หยิบ ๆ แต่เมื่อเลิกงาน (ปิดเครื่อง) โต๊ะจะถูกกวาดจนว่าง งานที่ไม่ได้เก็บเข้าตู้ (บันทึกลงดิสก์) จึงหายไป',
      en: 'RAM is like a desk, while an SSD or HDD is like a filing cabinet. To work, you take documents out of the cabinet and spread them on the desk where you can reach them instantly. A wider desk (more capacity) lets you keep more work open at once without shuffling things back and forth. When the day ends (power off) the desk is swept clean, so anything not filed back in the cabinet (saved to disk) is lost.',
    },
    technical: {
      th: 'RAM ของพีซีเป็นชนิด DRAM แต่ละบิตเก็บเป็นประจุในตัวเก็บประจุขนาดจิ๋วที่มีทรานซิสเตอร์หนึ่งตัวควบคุม ประจุรั่วได้เอง จึงต้องรีเฟรชทุกเซลล์ซ้ำทุก ๆ ไม่กี่สิบมิลลิวินาที (โดยทั่วไป 32–64 ms) และข้อมูลหายเมื่อไม่มีไฟ (volatile) คำว่า DDR (Double Data Rate) หมายถึงการส่งข้อมูลทั้งขอบขาขึ้นและขาลงของสัญญาณนาฬิกา ความเร็วจึงระบุเป็น MT/s เช่น DDR5-6000 ส่วนค่า CAS latency (CL) บอกจำนวนรอบนาฬิกาที่ต้องรอหลังสั่งอ่าน ตัวควบคุมหน่วยความจำใน CPU เข้าถึง DIMM ผ่านแชนเนล เมื่อเสียบสองแถวในสล็อตที่ถูกคู่จะทำงานแบบดูอัลแชนเนล ได้แบนด์วิดท์เพิ่มราวสองเท่า DDR5 ย้ายวงจรจัดการไฟ (PMIC) มาไว้บนแผงและลดแรงดันเหลือ 1.1 V และแต่ละแผงมีชิป SPD ที่บอกสเปกให้เฟิร์มแวร์ รวมถึงโปรไฟล์ XMP/EXPO สำหรับความเร็วที่สูงกว่ามาตรฐาน JEDEC',
      en: 'PC RAM is DRAM: each bit is a charge on a tiny capacitor gated by one transistor. The charge leaks, so every cell must be refreshed every few tens of milliseconds (typically 32–64 ms), and the data is lost without power (volatile). DDR (Double Data Rate) means data is transferred on both the rising and falling clock edges, so speed is stated in MT/s, as in DDR5-6000, while CAS latency (CL) gives the number of clock cycles to wait after a read command. The memory controller inside the CPU reaches the DIMMs over channels; two modules in the correct pair of slots run in dual-channel mode and roughly double the bandwidth. DDR5 moves power management onto the module (PMIC) and lowers the voltage to 1.1 V, and each module carries an SPD chip that reports its specifications to the firmware, including XMP/EXPO profiles for speeds above the JEDEC standard.',
    },
  },
  structure: [
    {
      name: { th: 'ชิปหน่วยความจำ (DRAM)', en: 'Memory chips (DRAM)' },
      desc: {
        th: 'ชิปสี่เหลี่ยมสีดำที่เรียงบนแผง เป็นที่เก็บข้อมูลจริง ความจุของแผงคือผลรวมความจุของชิปทุกตัว',
        en: 'The row of black rectangular chips that actually store the data. The module capacity is the sum of all its chips.',
      },
    },
    {
      name: { th: 'แถบหน้าสัมผัสสีทอง', en: 'Gold edge contacts' },
      desc: {
        th: 'หน้าสัมผัสเคลือบทองที่ขอบล่าง (288 จุดสำหรับ DIMM ของ DDR4 และ DDR5) ส่งสัญญาณข้อมูล แอดเดรส และไฟเลี้ยงระหว่างแผงกับสล็อต',
        en: 'Gold-plated contacts along the bottom edge (288 on both DDR4 and DDR5 DIMMs) carrying data, address and power between module and slot.',
      },
    },
    {
      name: { th: 'ร่องบาก (key notch)', en: 'Key notch' },
      desc: {
        th: 'ร่องที่ขอบหน้าสัมผัสซึ่งอยู่เยื้องจากกึ่งกลาง บังคับให้เสียบได้ทิศเดียว และตำแหน่งร่องของ DDR4 กับ DDR5 ต่างกัน จึงเสียบข้ามรุ่นไม่ได้',
        en: 'An off-centre slot in the contact edge that allows insertion one way only. DDR4 and DDR5 place it differently, so a module cannot go into the wrong generation of slot.',
      },
    },
    {
      name: { th: 'ชิป PMIC และ SPD', en: 'PMIC and SPD chips' },
      desc: {
        th: 'บนแผง DDR5 มีชิปจัดการไฟ (PMIC) ที่แปลงไฟให้ชิปหน่วยความจำ และชิป SPD ที่เก็บข้อมูลสเปกกับโปรไฟล์ความเร็วของแผง',
        en: 'A DDR5 module carries a power-management IC (PMIC) that regulates voltage for the memory chips and an SPD chip that stores the module specifications and speed profiles.',
      },
    },
    {
      name: { th: 'แผ่นกระจายความร้อน', en: 'Heat spreader' },
      desc: {
        th: 'แผ่นโลหะที่ประกบสองด้านของแผง ช่วยกระจายความร้อนจากชิปและป้องกันชิปจากการกระแทก',
        en: 'Metal plates clamped over both faces of the module that spread heat from the chips and protect them from knocks.',
      },
    },
    {
      name: { th: 'ร่องล็อกปลายแผง', en: 'Latch notches' },
      desc: {
        th: 'ร่องเว้าที่ปลายแผงทั้งสองข้าง ให้คลิปของสล็อตดีดเข้าล็อกเมื่อเสียบสุด (มีเสียงคลิก)',
        en: 'Cut-outs at both ends of the module that the slot clips snap into when it is fully seated (with a click).',
      },
    },
  ],
  specs: [
    {
      label: { th: 'รุ่นของมาตรฐาน', en: 'Generation' },
      value: { th: 'DDR4 หรือ DDR5', en: 'DDR4 or DDR5' },
      note: {
        th: 'DDR4 ใช้กับแพลตฟอร์มอย่าง AM4 และบอร์ด LGA1700 บางรุ่น; DDR5 ใช้กับ AM5, LGA1851 และบอร์ด LGA1700 บางรุ่น',
        en: 'DDR4 serves platforms such as AM4 and some LGA1700 boards; DDR5 serves AM5, LGA1851 and other LGA1700 boards.',
      },
    },
    {
      label: { th: 'ความจุต่อแผง', en: 'Capacity per module' },
      value: { th: '8–32 GB (DDR4) · 8–64 GB (DDR5)', en: '8–32 GB (DDR4) · 8–64 GB (DDR5)' },
      note: { th: 'แผง UDIMM สำหรับเดสก์ท็อปทั่วไป นิยมซื้อเป็นชุด 2 แถว เช่น 2 × 8 GB หรือ 2 × 16 GB', en: 'Mainstream desktop UDIMMs, usually bought as kits of two such as 2 × 8 GB or 2 × 16 GB.' },
    },
    {
      label: { th: 'ความเร็ว', en: 'Speed' },
      value: { th: 'DDR4: 2133–3600 MT/s · DDR5: 4800–8000+ MT/s', en: 'DDR4: 2133–3600 MT/s · DDR5: 4800–8000+ MT/s' },
      note: {
        th: 'ค่าทั่วไปของชุด RAM เดสก์ท็อปช่วงปี 2020–2024; ความเร็วเหนือมาตรฐาน JEDEC ต้องเปิดโปรไฟล์ XMP หรือ EXPO',
        en: 'Typical desktop kits of 2020–2024; speeds above the JEDEC baseline require enabling an XMP or EXPO profile.',
      },
    },
    {
      label: { th: 'ค่าหน่วงเวลา (CAS latency)', en: 'CAS latency' },
      value: { th: 'DDR4: CL14–CL22 · DDR5: CL28–CL40', en: 'DDR4: CL14–CL22 · DDR5: CL28–CL40' },
      note: {
        th: 'CL นับเป็นรอบนาฬิกา จึงต้องดูคู่กับความเร็ว: เวลาหน่วงจริง (ns) ≈ CL × 2000 ÷ ความเร็ว (MT/s)',
        en: 'CL counts clock cycles, so read it together with speed: true latency (ns) ≈ CL × 2000 ÷ speed (MT/s).',
      },
    },
    {
      label: { th: 'แรงดันไฟ', en: 'Voltage' },
      value: { th: '1.2 V (DDR4) · 1.1 V (DDR5)', en: '1.2 V (DDR4) · 1.1 V (DDR5)' },
      note: { th: 'เป็นค่ามาตรฐาน JEDEC โปรไฟล์ XMP/EXPO มักใช้แรงดันสูงกว่าเล็กน้อย', en: 'JEDEC standard values; XMP/EXPO profiles usually run slightly higher.' },
    },
    {
      label: { th: 'รูปแบบแผง', en: 'Module form' },
      value: { th: 'DIMM (เดสก์ท็อป) · SO-DIMM (โน้ตบุ๊ก)', en: 'DIMM (desktop) · SO-DIMM (laptop)' },
      note: { th: 'SO-DIMM สั้นกว่าและเสียบสล็อต DIMM ไม่ได้', en: 'SO-DIMMs are shorter and do not fit DIMM slots.' },
    },
    {
      label: { th: 'การทำงานแบบแชนเนล', en: 'Channel mode' },
      value: { th: 'ดูอัลแชนเนลเมื่อเสียบ 2 หรือ 4 แถวในสล็อตที่ถูกคู่', en: 'Dual-channel with 2 or 4 modules in the correct slots' },
      note: { th: 'บอร์ด 4 สล็อตส่วนใหญ่แนะนำให้เริ่มที่ A2 และ B2 ใน DDR5 แต่ละแถวยังแบ่งภายในเป็นช่องย่อย (sub-channel) ขนาด 32 บิตสองช่อง แต่การเรียก "ดูอัลแชนเนล" ยังหมายถึงการใช้แชนเนลของบอร์ดสองแชนเนลเหมือนเดิม', en: 'Most four-slot boards recommend starting with A2 and B2. On DDR5 each module is internally split into two 32-bit sub-channels, but "dual-channel" still refers to using the two memory channels of the board.' },
    },
  ],
  connects: {
    th: 'ทางกายภาพ RAM เสียบในสล็อต DIMM ของเมนบอร์ดและล็อกด้วยคลิปปลายสล็อต รับไฟเลี้ยงจากบอร์ดผ่านหน้าสัมผัสเดียวกัน ทางตรรกะ RAM ต่อตรงกับตัวควบคุมหน่วยความจำใน CPU ผ่านแชนเนล A และ B ระบบปฏิบัติการโหลดโปรแกรมจาก SSD หรือ HDD เข้ามาไว้ใน RAM ก่อนรัน และเมื่อ RAM ไม่พอจะใช้พื้นที่บนที่เก็บข้อมูลแทน (page file/swap) ซึ่งช้ากว่ามาก กราฟิกในตัวของ CPU ก็ใช้ RAM ของระบบร่วมด้วย',
    en: 'Physically RAM plugs into the DIMM slots of the motherboard, is held by the end clips and draws power through the same contacts. Logically it connects straight to the memory controller in the CPU over channels A and B. The operating system loads programs from the SSD or HDD into RAM before running them, and when RAM runs short it falls back on storage space (page file/swap), which is far slower. Integrated graphics in the CPU also borrow system RAM.',
  },
  related: ['cpu', 'motherboard', 'ssd', 'hdd', 'firmware'],
  compatibility: [
    {
      th: 'รุ่น DDR ต้องตรงกับเมนบอร์ด: DDR4 และ DDR5 มีร่องบากคนละตำแหน่งและใช้แทนกันไม่ได้ บอร์ด AM5 ใช้ DDR5 เท่านั้น ส่วนบอร์ด LGA1700 เป็น DDR4 หรือ DDR5 อย่างใดอย่างหนึ่ง',
      en: 'The DDR generation must match the board: DDR4 and DDR5 are keyed differently and are not interchangeable. AM5 boards are DDR5-only; an LGA1700 board is either DDR4 or DDR5.',
    },
    {
      th: 'ความจุรวมและความเร็วต้องไม่เกินที่ CPU และบอร์ดรองรับ หากแผงเร็วกว่าที่ระบบรองรับ ระบบจะรันที่ความเร็วต่ำลง',
      en: 'Total capacity and speed must stay within what the CPU and board support; a faster module simply runs at the lower supported speed.',
    },
    {
      th: 'ควรใช้แผงที่เหมือนกันเป็นคู่ (ชุดเดียวกัน) และเสียบในสล็อตที่คู่มือกำหนดเพื่อให้ได้ดูอัลแชนเนล การผสมแผงต่างรุ่นทำให้ทั้งชุดรันตามแผงที่ช้าที่สุดหรืออาจไม่เสถียร',
      en: 'Use matched pairs (one kit) in the slots the manual specifies to get dual-channel; mixing different modules makes everything run at the slowest one or can cause instability.',
    },
    {
      th: 'แผงที่มีแผ่นกระจายความร้อนสูงอาจชนกับพัดลมหรือครีบของชุดระบายความร้อน CPU แบบทาวเวอร์ ต้องตรวจระยะห่าง',
      en: 'Modules with tall heat spreaders can collide with the fan or fins of a tower CPU cooler, so check the clearance.',
    },
  ],
  useCases: [
    {
      th: 'งานเอกสาร ท่องเว็บ และเรียนออนไลน์: 8–16 GB เพียงพอสำหรับเปิดแท็บเบราว์เซอร์และโปรแกรมสำนักงานพร้อมกัน',
      en: 'Documents, browsing and online classes: 8–16 GB covers a browser with many tabs alongside office applications.',
    },
    {
      th: 'เล่นเกมและเขียนโปรแกรม: 16–32 GB แบบดูอัลแชนเนล ช่วยให้เฟรมเรตนิ่งและเปิดเครื่องมือพัฒนาหลายตัวได้',
      en: 'Gaming and programming: 16–32 GB in dual-channel keeps frame rates steady and leaves room for several development tools.',
    },
    {
      th: 'ตัดต่อวิดีโอ เครื่องเสมือน (virtual machine) และวิเคราะห์ข้อมูลขนาดใหญ่: 32–64 GB ขึ้นไป เพราะข้อมูลทั้งชุดต้องอยู่ในหน่วยความจำ',
      en: 'Video editing, virtual machines and large data analysis: 32–64 GB or more, because whole datasets must sit in memory.',
    },
  ],
  problems: [
    {
      symptom: { th: 'เปิดเครื่องแล้วไม่มีภาพ ไฟ debug LED ค้างที่ DRAM หรือมีเสียงบี๊บซ้ำ ๆ', en: 'No picture at power-on, with the DRAM debug LED lit or repeating beeps.' },
      check: {
        th: 'ปิดเครื่อง ถอดปลั๊ก แล้วถอด RAM ออกมาเสียบใหม่ให้คลิปล็อกทั้งสองข้าง จากนั้นทดสอบทีละแถวในสล็อต A2 เพื่อหาแผงหรือสล็อตที่มีปัญหา',
        en: 'Power off and unplug, reseat the modules until both clips lock, then test one module at a time in slot A2 to find a faulty module or slot.',
      },
    },
    {
      symptom: { th: 'จอฟ้า โปรแกรมปิดเอง หรือไฟล์เสียหายแบบสุ่ม', en: 'Blue screens, programs closing by themselves or random file corruption.' },
      check: {
        th: 'รันโปรแกรมทดสอบหน่วยความจำ เช่น Windows Memory Diagnostic หรือ MemTest86 หากพบข้อผิดพลาดให้ปิด XMP/EXPO แล้วทดสอบซ้ำ ถ้ายังผิดพลาดแสดงว่าแผงเสีย',
        en: 'Run a memory test such as Windows Memory Diagnostic or MemTest86. If errors appear, disable XMP/EXPO and retest; errors that remain point to a bad module.',
      },
    },
    {
      symptom: { th: 'ระบบแสดงความจุ RAM น้อยกว่าที่ติดตั้ง', en: 'The system reports less RAM than is installed.' },
      check: {
        th: 'ดูใน UEFI ว่าตรวจพบทุกสล็อตหรือไม่ ถ้าขาดไปหนึ่งแถวให้เสียบใหม่หรือสลับสล็อต และจำไว้ว่ากราฟิกในตัวกันหน่วยความจำส่วนหนึ่งไปใช้',
        en: 'Check in UEFI whether every slot is detected. If one module is missing, reseat it or swap slots, and remember that integrated graphics reserve part of the memory.',
      },
    },
    {
      symptom: { th: 'RAM ทำงานช้ากว่าความเร็วที่ระบุบนฉลาก หรือทำงานแบบซิงเกิลแชนเนล', en: 'RAM runs below its labelled speed or in single-channel mode.' },
      check: {
        th: 'เปิดโปรไฟล์ XMP หรือ EXPO ใน UEFI และตรวจว่าเสียบสองแถวในสล็อตคู่ที่ถูกต้อง (มักเป็น A2 และ B2) ไม่ใช่สล็อตติดกัน',
        en: 'Enable the XMP or EXPO profile in UEFI and confirm the two modules sit in the correct pair of slots (usually A2 and B2), not side by side.',
      },
    },
  ],
  safety: [
    {
      th: 'ปิดเครื่องและถอดปลั๊กก่อนถอดหรือใส่ RAM เสมอ เพราะสล็อตยังมีไฟเลี้ยงสแตนด์บายแม้เครื่องดับอยู่',
      en: 'Always shut down and unplug before removing or inserting RAM, because the slots still carry standby power while the PC is merely off.',
    },
    {
      th: 'คายประจุไฟฟ้าสถิต (ESD) ก่อนจับ และจับแผงที่ขอบด้านข้าง ไม่แตะหน้าสัมผัสสีทองหรือชิป',
      en: 'Discharge static (ESD) first and hold the module by its side edges, never by the gold contacts or the chips.',
    },
    {
      th: 'จัดร่องบากให้ตรงกับสันของสล็อตก่อนกด แล้วกดลงตรง ๆ ทั้งสองปลายอย่างสม่ำเสมอ ถ้าไม่ลงแสดงว่ากลับด้านหรือผิดรุ่น ห้ามฝืน',
      en: 'Line the notch up with the ridge in the slot, then press straight down evenly at both ends. If it will not go in, it is reversed or the wrong generation; never force it.',
    },
  ],
  vocab: [
    {
      en: 'Volatile memory',
      th: 'หน่วยความจำแบบลบเลือนได้',
      meaning: {
        th: 'หน่วยความจำที่ข้อมูลหายเมื่อไม่มีไฟเลี้ยง เช่น RAM',
        en: 'Memory that loses its contents when power is removed, such as RAM.',
      },
    },
    {
      en: 'DIMM',
      th: 'ดิมม์',
      meaning: {
        th: 'แผงหน่วยความจำสำหรับเดสก์ท็อปที่มีหน้าสัมผัสแยกกันสองด้าน (Dual In-line Memory Module)',
        en: 'A desktop memory module with separate contacts on each side (Dual In-line Memory Module).',
      },
    },
    {
      en: 'Dual-channel',
      th: 'ดูอัลแชนเนล',
      meaning: {
        th: 'การใช้สองแชนเนลหน่วยความจำพร้อมกันเพื่อเพิ่มแบนด์วิดท์ระหว่าง CPU กับ RAM',
        en: 'Using two memory channels at once to increase the bandwidth between CPU and RAM.',
      },
    },
    {
      en: 'CAS latency (CL)',
      th: 'ค่าหน่วงเวลา CAS',
      meaning: {
        th: 'จำนวนรอบนาฬิกาตั้งแต่สั่งอ่านจนข้อมูลพร้อมใช้ ที่ความเร็วเท่ากัน ค่ายิ่งต่ำยิ่งตอบสนองเร็ว',
        en: 'The number of clock cycles between a read command and the data being available; at equal speed, lower is quicker.',
      },
    },
    {
      en: 'XMP / EXPO',
      th: 'โปรไฟล์ XMP / EXPO',
      meaning: {
        th: 'โปรไฟล์ความเร็วและแรงดันที่ผู้ผลิตบันทึกไว้ในแผง เปิดใช้ใน UEFI เพื่อรันเร็วกว่าค่ามาตรฐาน JEDEC',
        en: 'Speed and voltage profiles stored on the module by its maker; enabling one in UEFI runs the RAM faster than the JEDEC default.',
      },
    },
    {
      en: 'MT/s (megatransfers per second)',
      th: 'เมกะทรานส์เฟอร์ต่อวินาที',
      meaning: {
        th: 'หน่วยความเร็วของ RAM แบบ DDR นับจำนวนการส่งข้อมูลต่อวินาที ซึ่งเป็นสองเท่าของความถี่นาฬิกา',
        en: 'The speed unit of DDR memory: data transfers per second, which is twice the clock frequency.',
      },
    },
  ],
  facts: [
    {
      th: 'แต่ละบิตใน DRAM เก็บเป็นประจุในตัวเก็บประจุขนาดจิ๋วที่รั่วได้เอง ระบบจึงต้องอ่านแล้วเขียนซ้ำ (รีเฟรช) ทุกเซลล์ภายในเวลาไม่กี่สิบมิลลิวินาที ตลอดเวลาที่เครื่องเปิดอยู่',
      en: 'Each DRAM bit is a charge on a tiny leaky capacitor, so the system must read and rewrite (refresh) every cell within a few tens of milliseconds, for as long as the PC is on.',
    },
    {
      th: 'RAM แบบ DDR ส่งข้อมูลสองครั้งต่อหนึ่งรอบนาฬิกา แผง DDR5-6000 จึงใช้สัญญาณนาฬิกาจริงเพียง 3000 MHz',
      en: 'DDR memory transfers data twice per clock cycle, so a DDR5-6000 module actually runs on a 3000 MHz clock.',
    },
    {
      th: 'ข้อมูลใน RAM ไม่ได้หายในเสี้ยววินาทีที่ไฟดับ ประจุจะค่อย ๆ จางในเวลาหลายวินาที และจางช้าลงเมื่ออุณหภูมิต่ำ ซึ่งเป็นหลักการของการโจมตีแบบ cold boot',
      en: 'RAM does not go blank the instant power is cut: the charge fades over several seconds, and more slowly when cold, which is the basis of the cold boot attack.',
    },
  ],
  review: [
    {
      q: { th: 'RAM ต่างจาก SSD หรือ HDD อย่างไร', en: 'How does RAM differ from an SSD or HDD?' },
      a: {
        th: 'RAM เร็วกว่ามากแต่ข้อมูลหายเมื่อไฟดับ ใช้เป็นพื้นที่ทำงานชั่วคราว ส่วน SSD และ HDD เก็บข้อมูลถาวรแม้ไม่มีไฟ',
        en: 'RAM is far faster but loses its contents without power, so it serves as temporary workspace; SSDs and HDDs keep data permanently without power.',
      },
    },
    {
      q: { th: 'บนบอร์ด 4 สล็อต ถ้ามี RAM 2 แถวควรเสียบที่ใด เพราะอะไร', en: 'On a four-slot board, where should two modules go, and why?' },
      a: {
        th: 'เสียบสล็อตคู่ที่คู่มือกำหนด ซึ่งมักเป็น A2 และ B2 เพื่อให้แต่ละแถวอยู่คนละแชนเนลและทำงานแบบดูอัลแชนเนล',
        en: 'In the pair the manual specifies, usually A2 and B2, so that each module sits on its own channel and the system runs in dual-channel mode.',
      },
    },
    {
      q: { th: 'ใส่ RAM แบบ DDR4 ในสล็อต DDR5 ได้หรือไม่', en: 'Can a DDR4 module be installed in a DDR5 slot?' },
      a: {
        th: 'ไม่ได้ ร่องบากอยู่คนละตำแหน่ง อีกทั้งแรงดันและสัญญาณต่างกัน สองรุ่นนี้ใช้แทนกันไม่ได้',
        en: 'No. The key notch is in a different position, and the voltage and signalling differ; the two generations are not interchangeable.',
      },
    },
  ],
};
