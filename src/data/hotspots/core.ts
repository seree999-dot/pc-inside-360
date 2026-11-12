import type { Hotspot } from '../types';

/** Hotspots on the CPU, RAM, GPU, SSD and HDD (20). Ids, parts and positions follow docs/CONTENT_BRIEF.md. */
export const coreHotspots: Hotspot[] = [
  /* ---------- CPU ---------- */
  {
    id: 'cpu-ihs', part: 'cpu', pos: [0, 0, 0.05], lesson: 'l03',
    name: { th: 'ฝาครอบกระจายความร้อน (IHS)', en: 'Integrated heat spreader (IHS)' },
    brief: { th: 'ฝาโลหะด้านบนของซีพียูที่ปกป้องชิปและกระจายความร้อนไปยังชุดระบายความร้อน', en: 'The metal lid on top of the CPU that protects the chip and spreads heat to the cooler.' },
    detail: {
      th: 'IHS เป็นแผ่นทองแดงชุบนิกเกิลที่ครอบอยู่เหนือแผ่นซิลิคอน ความร้อนจากชิปซึ่งมีพื้นที่เล็กจะถ่ายผ่านวัสดุนำความร้อนภายในขึ้นมายังฝา แล้วกระจายออกเป็นพื้นที่กว้างขึ้นก่อนส่งต่อให้ฐานของชุดระบายความร้อน',
      en: 'The IHS is a nickel-plated copper plate sitting over the silicon. Heat from the small chip passes through an internal thermal interface material into the lid, which spreads it over a larger area before handing it to the cooler base.',
    },
    significance: {
      th: 'ผิวของ IHS กับฐานฮีตซิงก์ไม่ได้เรียบสนิท จึงต้องมีสารนำความร้อนชั้นบาง ๆ คั่นกลางเสมอ ข้อความที่พิมพ์บนฝาใช้ระบุรุ่นของซีพียูเมื่อตรวจความเข้ากันได้',
      en: 'Neither the IHS nor the cooler base is perfectly flat, so a thin layer of thermal paste is always needed between them. The markings on the lid identify the CPU model when checking compatibility.',
    },
  },
  {
    id: 'cpu-contacts', part: 'cpu', pos: [0.12, -0.12, -0.03], lesson: 'l03',
    name: { th: 'แผ่นหน้าสัมผัส (LGA Contacts)', en: 'LGA contact pads' },
    brief: { th: 'แผ่นหน้าสัมผัสเคลือบทองใต้ซีพียูที่แตะกับขาในซ็อกเก็ต', en: 'Gold-plated pads under the CPU that touch the pins in the socket.' },
    detail: {
      th: 'ด้านล่างของซีพียูแบบ LGA มีแผ่นหน้าสัมผัสเรียงเป็นตารางตั้งแต่หลักพันจุดขึ้นไป เช่น LGA1700 มี 1,700 จุด ส่วนใหญ่ทำหน้าที่จ่ายไฟและกราวด์ ที่เหลือเป็นเส้นทางสัญญาณไปยังแรม สล็อต PCIe และชิปเซ็ต',
      en: 'The underside of an LGA CPU carries a grid of contact pads numbering in the thousands; LGA1700, for example, has 1,700. Most are power and ground, and the rest are signal paths to the RAM, PCIe slots and chipset.',
    },
    significance: {
      th: 'คราบไขมันจากนิ้วหรือสิ่งสกปรกบนหน้าสัมผัสทำให้การเชื่อมต่อไม่สมบูรณ์ จึงควรจับซีพียูที่ขอบเท่านั้น จำนวนและการจัดวางหน้าสัมผัสคือเหตุผลที่ซีพียูใส่ข้ามซ็อกเก็ตไม่ได้',
      en: 'Skin oil or dirt on the pads can cause poor contact, so hold the CPU by its edges only. The number and layout of the pads is why a CPU cannot be used in a different socket type.',
    },
  },
  {
    id: 'cpu-marker', part: 'cpu', pos: [-0.17, -0.17, 0.02], lesson: 'l08',
    name: { th: 'สามเหลี่ยมบอกทิศทาง', en: 'Orientation triangle' },
    brief: { th: 'สามเหลี่ยมสีทองที่มุมหนึ่งของซีพียู ใช้จัดให้ตรงกับมุมที่ทำเครื่องหมายบนซ็อกเก็ต', en: 'A small golden triangle on one corner of the CPU that lines up with the marked socket corner.' },
    detail: {
      th: 'ซีพียูวางลงซ็อกเก็ตได้ถูกต้องเพียงทิศทางเดียว สามเหลี่ยมสีทองที่มุมของตัวซีพียูต้องตรงกับเครื่องหมายสามเหลี่ยมที่มุมของซ็อกเก็ต นอกจากนี้ขอบของซีพียูยังมีรอยบากที่รับกับปุ่มนูนในซ็อกเก็ตช่วยบังคับตำแหน่งอีกชั้นหนึ่ง',
      en: 'The CPU fits the socket in only one orientation. The golden triangle on its corner must line up with the triangle marked on the socket corner. Notches on the CPU edges also mate with keys in the socket as a second guide.',
    },
    significance: {
      th: 'หากวางผิดทิศแล้วฝืนกดคานล็อก ขาในซ็อกเก็ตจะงอและเมนบอร์ดอาจเสียถาวร การหาสามเหลี่ยมให้เจอก่อนวางจึงเป็นขั้นตอนแรกของการติดตั้งซีพียู',
      en: 'Forcing the lever down on a misaligned CPU bends socket pins and can permanently damage the board. Finding the triangle before lowering the chip is therefore step one of CPU installation.',
    },
  },
  {
    id: 'cpu-die', part: 'cpu', pos: [0.05, 0.05, 0.03], lesson: 'l03',
    name: { th: 'ชิปซิลิคอน (ภาพจำลองเชิงแนวคิด)', en: 'Silicon die (conceptual illustration)' },
    brief: { th: 'ภาพจำลองแบบย่อของแผ่นซิลิคอนใต้ IHS ซึ่งเป็นที่อยู่ของวงจรประมวลผลจริง', en: 'A simplified depiction of the silicon under the IHS, where the actual processing circuits live.' },
    detail: {
      th: 'ภาพนี้เป็นแบบจำลองเชิงแนวคิดที่ทำให้เข้าใจง่าย ไม่ใช่ผังจริงของซีพียูรุ่นใด ในชิปจริงมีทรานซิสเตอร์จำนวนหลายพันล้านตัวจัดเป็นบล็อกหน้าที่ต่าง ๆ เช่น คอร์ประมวลผล หน่วยความจำแคช ตัวควบคุมหน่วยความจำ และในบางรุ่นมีกราฟิกในตัว แต่ละคอร์ทำวงรอบดึงคำสั่ง ถอดรหัส และประมวลผลซ้ำไปเรื่อย ๆ',
      en: 'This view is a simplified, conceptual model, not the real floorplan of any specific processor. A real die holds billions of transistors arranged into functional blocks such as cores, cache memory, the memory controller and, on some models, integrated graphics. Each core repeats the fetch, decode and execute cycle.',
    },
    significance: {
      th: 'ความร้อนเกือบทั้งหมดของซีพียูเกิดขึ้นบนพื้นที่เล็ก ๆ นี้ จึงต้องมี IHS และชุดระบายความร้อนที่แนบสนิท ในการใช้งานจริงไม่ควรแกะ IHS ออก เพราะทำให้ชิปเสียหายได้',
      en: 'Nearly all CPU heat is generated in this small area, which is why a well-seated IHS and cooler are essential. On real hardware the IHS should not be removed, as doing so can destroy the chip.',
    },
  },
  /* ---------- RAM ---------- */
  {
    id: 'ram-chips', part: 'ram', pos: [0.15, 0.3, 0.02], lesson: 'l04',
    name: { th: 'ชิปหน่วยความจำ DRAM', en: 'DRAM chips' },
    brief: { th: 'ชิปสีดำบนแผงแรมที่เก็บข้อมูลซึ่งโปรแกรมกำลังใช้งานอยู่', en: 'The black chips on the module that hold the data programs are currently using.' },
    detail: {
      th: 'DRAM เก็บข้อมูลแต่ละบิตเป็นประจุไฟฟ้าในตัวเก็บประจุขนาดจิ๋วที่มีทรานซิสเตอร์หนึ่งตัวควบคุม ประจุรั่วออกได้เองจึงต้องเขียนซ้ำ (refresh) อย่างต่อเนื่อง และข้อมูลจะหายทั้งหมดเมื่อไม่มีไฟเลี้ยง แผง DDR5 ยังมีชิปจัดการไฟ (PMIC) อยู่บนแผงเองด้วย',
      en: 'DRAM stores each bit as charge in a tiny capacitor gated by one transistor. The charge leaks away, so it must be refreshed constantly, and all data is lost when power is removed. A DDR5 module also carries its own power-management chip (PMIC).',
    },
    significance: {
      th: 'ความจุรวมของชิปเหล่านี้กำหนดว่าระบบเปิดโปรแกรมและข้อมูลพร้อมกันได้มากเพียงใดก่อนต้องสลับไปใช้พื้นที่บนไดรฟ์ซึ่งช้ากว่ามาก ชิปบนแผงไวต่อไฟฟ้าสถิต จึงควรจับแผงที่ขอบ',
      en: 'The total capacity of these chips decides how many programs and how much data can be open before the system falls back to much slower drive-based swap. The chips are ESD-sensitive, so hold the module by its edges.',
    },
  },
  {
    id: 'ram-edge', part: 'ram', pos: [0.12, -0.4, -0.15], lesson: 'l04',
    name: { th: 'แถบหน้าสัมผัส (Edge Connector)', en: 'Edge connector contacts' },
    brief: { th: 'แถวหน้าสัมผัสเคลือบทองที่ขอบล่างของแผง ซึ่งเสียบลงในสล็อต DIMM', en: 'The row of gold-plated contacts along the bottom edge that plugs into the DIMM slot.' },
    detail: {
      th: 'แผง DIMM สำหรับเดสก์ท็อปทั้ง DDR4 และ DDR5 มีหน้าสัมผัส 288 ขา แบ่งอยู่สองด้านของแผ่นวงจร ทำหน้าที่ส่งข้อมูล แอดเดรส สัญญาณนาฬิกา และไฟเลี้ยง แม้จำนวนขาเท่ากัน แต่หน้าที่ของขาและแรงดันไฟของสองรุ่นต่างกัน',
      en: 'Desktop DDR4 and DDR5 DIMMs both have 288 contacts split across the two sides of the board, carrying data, address, clock and power. Although the pin count is the same, pin assignments and voltages differ between the two generations.',
    },
    significance: {
      th: 'ต้องกดแผงลงตรง ๆ จนสลักล็อกเข้าที่และมองไม่เห็นหน้าสัมผัสโผล่พ้นสล็อต แรมที่เสียบไม่สุดเป็นสาเหตุที่พบบ่อยของอาการเปิดเครื่องแล้วไม่มีภาพ',
      en: 'The module must be pressed straight down until the latches lock and no gold is visible above the slot. A half-seated module is a common cause of a PC that powers on with no display.',
    },
  },
  {
    id: 'ram-notch', part: 'ram', pos: [0.12, 0.08, -0.15], lesson: 'l09',
    name: { th: 'รอยบากกันเสียบผิด (Key Notch)', en: 'Key notch' },
    brief: { th: 'รอยบากที่อยู่เยื้องจากกึ่งกลางของแถบหน้าสัมผัส ใช้บังคับทิศทางและรุ่นของแรม', en: 'An off-centre notch in the contact edge that enforces module orientation and DDR generation.' },
    detail: {
      th: 'รอยบากไม่ได้อยู่ตรงกลางแผง จึงเสียบได้ทิศทางเดียวโดยต้องตรงกับสันในสล็อต ตำแหน่งของรอยบากใน DDR4 และ DDR5 ต่างกันเล็กน้อย ทำให้แรมรุ่นหนึ่งเสียบลงสล็อตของอีกรุ่นไม่ได้',
      en: 'The notch is not in the middle of the module, so it only goes in one way round, matching the ridge in the slot. Its position differs slightly between DDR4 and DDR5, which physically stops one generation from entering the other\'s slot.',
    },
    significance: {
      th: 'ก่อนเสียบควรเทียบรอยบากกับสันในสล็อตเสมอ หากไม่ตรงห้ามฝืนกด เพราะหมายความว่าหันผิดด้านหรือเป็นแรมคนละรุ่นกับที่เมนบอร์ดรองรับ',
      en: 'Always compare the notch with the slot ridge before pressing. If they do not line up, never force it: the module is either reversed or the wrong DDR generation for the board.',
    },
  },
  /* ---------- GPU ---------- */
  {
    id: 'gpu-fans', part: 'gpu', pos: [0.05, -0.25, 0], lesson: 'l07',
    name: { th: 'พัดลมการ์ดจอ', en: 'GPU fans' },
    brief: { th: 'พัดลมสามตัวที่เป่าลมผ่านฮีตซิงก์ของการ์ดจอ', en: 'Three fans that push air through the graphics card heatsink.' },
    detail: {
      th: 'พัดลมดูดอากาศจากภายในเคสแล้วเป่าลงบนครีบระบายความร้อน ลมร้อนส่วนใหญ่จะกระจายกลับเข้าสู่ภายในเคสแล้วถูกพัดลมเคสพาออกไป การ์ดจะปรับรอบพัดลมเองตามอุณหภูมิของชิป และหลายรุ่นหยุดพัดลมเมื่อภาระงานต่ำ',
      en: 'The fans draw air from inside the case and blow it onto the fin stack. Most of the warm air is released back into the case and removed by the case fans. The card adjusts fan speed to chip temperature, and many cards stop their fans at low load.',
    },
    significance: {
      th: 'การ์ดจอมักเป็นแหล่งความร้อนใหญ่ที่สุดในเครื่องเล่นเกม จึงต้องมีที่ว่างใต้การ์ดและมีลมเข้าเคสเพียงพอ ฝุ่นที่สะสมบนพัดลมและครีบทำให้อุณหภูมิสูงขึ้นและเสียงดังขึ้น',
      en: 'The graphics card is usually the largest heat source in a gaming PC, so it needs clear space beneath it and enough case intake. Dust on the fans and fins raises temperature and noise.',
    },
  },
  {
    id: 'gpu-heatsink', part: 'gpu', pos: [0.5, 0, 0.3], lesson: 'l07',
    name: { th: 'ฮีตซิงก์การ์ดจอ', en: 'GPU heatsink' },
    brief: { th: 'ชุดครีบอะลูมิเนียมและท่อนำความร้อนที่ดึงความร้อนออกจากชิปกราฟิก', en: 'The aluminium fin stack and heat pipes that draw heat away from the graphics chip.' },
    detail: {
      th: 'ฐานโลหะแนบกับชิปกราฟิกโดยมีวัสดุนำความร้อนคั่น ท่อนำความร้อนพาความร้อนจากฐานไปกระจายตลอดความยาวของครีบ ซึ่งมีพื้นที่ผิวมากให้ลมจากพัดลมพัดพาความร้อนออกไป แผ่นรองนำความร้อน (thermal pad) ช่วยระบายความร้อนจากชิปหน่วยความจำและภาคจ่ายไฟของการ์ด',
      en: 'A metal base presses on the graphics chip through a thermal interface material. Heat pipes carry heat from the base along the length of the fin stack, whose large surface area lets the fan airflow remove it. Thermal pads cool the memory chips and the card\'s power stage.',
    },
    significance: {
      th: 'ขนาดของฮีตซิงก์เป็นตัวกำหนดความยาวและความหนาของการ์ด (จำนวนสล็อตที่กิน) จึงต้องเทียบกับระยะที่เคสรองรับ การ์ดที่หนักอาจต้องมีขาค้ำเพื่อไม่ให้สล็อตรับแรงงอ',
      en: 'Heatsink size dictates card length and thickness (how many slots it occupies), which must be checked against the case clearance. A heavy card may need a support bracket so the slot is not strained.',
    },
  },
  {
    id: 'gpu-pcie-edge', part: 'gpu', pos: [-0.8, 0.2, -0.6], lesson: 'l06',
    name: { th: 'ขั้ว PCIe x16 ของการ์ด', en: 'PCIe x16 edge connector' },
    brief: { th: 'แถบหน้าสัมผัสที่เสียบลงในสล็อต PCIe x16 ของเมนบอร์ด', en: 'The contact edge that plugs into the motherboard PCIe x16 slot.' },
    detail: {
      th: 'แถบหน้าสัมผัสนี้รับส่งข้อมูลกับซีพียูผ่านเลน PCIe ได้สูงสุด 16 เลน ช่วงสั้นด้านหน้ารอยบากเป็นขาไฟเลี้ยง (+12 V, +3.3 V) และสัญญาณควบคุม เช่น สัญญาณรีเซ็ตและสัญญาณนาฬิกาอ้างอิง โดยสล็อตจ่ายไฟให้การ์ดได้ไม่เกิน 75 W ตามมาตรฐาน ส่วนที่เกินต้องมาจากขั้วไฟเสริม',
      en: 'This edge exchanges data with the CPU over up to 16 PCIe lanes. The short section before the notch carries power (+12 V, +3.3 V) and sideband control signals such as reset and the reference clock, and the slot may supply at most 75 W by specification; anything beyond that comes from the auxiliary power connectors.',
    },
    significance: {
      th: 'ต้องกดการ์ดจนสลักปลายสล็อตล็อก แล้วขันสกรูยึดแผ่นเหล็กท้ายการ์ดกับเคส การ์ดที่เสียบไม่สุดทำให้ไม่มีภาพหรือระบบมองไม่เห็นการ์ด',
      en: 'Press the card in until the slot latch clicks, then screw its bracket to the case. A card that is not fully seated gives no picture or is not detected at all.',
    },
  },
  {
    id: 'gpu-outputs', part: 'gpu', pos: [-1.42, 0, 0], lesson: 'l06',
    name: { th: 'พอร์ตแสดงผลของการ์ดจอ', en: 'GPU display outputs' },
    brief: { th: 'พอร์ต HDMI และ DisplayPort บนแผ่นเหล็กท้ายการ์ด สำหรับต่อสายไปยังจอภาพ', en: 'The HDMI and DisplayPort connectors on the card bracket that cable to the monitor.' },
    detail: {
      th: 'เมื่อการ์ดจอสร้างภาพเสร็จแต่ละเฟรม จะส่งออกเป็นสัญญาณดิจิทัลผ่านพอร์ตเหล่านี้ไปยังจอ ทั้ง HDMI และ DisplayPort ส่งได้ทั้งภาพและเสียงในสายเส้นเดียว ความละเอียดและอัตรารีเฟรชสูงสุดขึ้นกับเวอร์ชันของมาตรฐานที่การ์ด สาย และจอรองรับร่วมกัน',
      en: 'Each frame the card finishes is sent out digitally through these ports to the monitor. HDMI and DisplayPort both carry video and audio in one cable. The maximum resolution and refresh rate depend on the standard version supported by the card, the cable and the monitor together.',
    },
    significance: {
      th: 'เมื่อเครื่องมีการ์ดจอแยก ต้องต่อสายจอเข้าที่พอร์ตของการ์ด ไม่ใช่พอร์ตบนเมนบอร์ด การต่อผิดจุดเป็นสาเหตุที่พบบ่อยของอาการไม่มีภาพหรือเกมทำงานช้าผิดปกติ',
      en: 'In a PC with a discrete card, the monitor cable must go to the card, not to the motherboard ports. Plugging into the wrong place is a common cause of no display or unexpectedly poor game performance.',
    },
  },
  {
    id: 'gpu-power', part: 'gpu', pos: [0.9, 0.22, 0.6], lesson: 'l07',
    name: { th: 'ขั้วไฟเสริมการ์ดจอ', en: 'GPU auxiliary power connector' },
    brief: { th: 'ขั้ว 8 พินที่รับไฟ +12 V เพิ่มเติมจากพาวเวอร์ซัพพลายโดยตรง', en: 'An 8-pin connector that takes extra +12 V directly from the power supply.' },
    detail: {
      th: 'การ์ดจอที่กินไฟเกินกว่าที่สล็อตจ่ายได้จะมีขั้วไฟเสริม ตามมาตรฐาน ขั้ว PCIe 6 พินจ่ายได้ถึง 75 W และ 8 พิน (6+2) จ่ายได้ถึง 150 W ต่อขั้ว การ์ดรุ่นใหม่บางรุ่นใช้ขั้ว 12VHPWR / 12V-2x6 แบบ 16 พิน (12V-2x6 คือรุ่นปรับปรุงตาม ATX 3.1) ซึ่งออกแบบให้จ่ายได้สูงสุด 600 W ผ่านขั้วเดียว',
      en: 'Cards that draw more than the slot can supply have auxiliary connectors. By specification a 6-pin PCIe plug delivers up to 75 W and an 8-pin (6+2) up to 150 W each. Some newer cards use the 16-pin 12VHPWR / 12V-2x6 connector (12V-2x6 being the revised version in ATX 3.1), designed for up to 600 W through a single plug.',
    },
    significance: {
      th: 'พาวเวอร์ซัพพลายต้องมีขั้วชนิดและจำนวนที่การ์ดต้องการ และมีกำลังวัตต์เพียงพอ ต้องเสียบให้สุดจนสลักล็อก เพราะขั้วที่หลวมเกิดความร้อนสะสมได้ และห้ามใช้สาย EPS ของซีพียูแทน',
      en: 'The power supply must have the right type and number of connectors as well as enough wattage. Push the plug in until it latches, because a loose connector can overheat, and never substitute a CPU EPS cable.',
    },
  },
  {
    id: 'gpu-chip', part: 'gpu', pos: [-0.3, 0.15, 0], lesson: 'l06',
    name: { th: 'ชิปประมวลผลกราฟิก (GPU)', en: 'Graphics processor (GPU chip)' },
    brief: { th: 'ชิปหลักของการ์ดที่คำนวณภาพด้วยหน่วยประมวลผลขนาดเล็กจำนวนมากทำงานขนานกัน', en: 'The main chip of the card, which computes images using many small processing units in parallel.' },
    detail: {
      th: 'ชิปกราฟิกมีหน่วยประมวลผลขนาดเล็กจำนวนมากที่ทำงานแบบเดียวกันพร้อมกันกับข้อมูลหลายชุด เหมาะกับการคำนวณจุดยอดและสีของพิกเซลนับล้านในแต่ละเฟรม หลักการเดียวกันนี้ทำให้ GPU ถูกนำไปใช้กับงานคำนวณเชิงขนานอื่น ๆ เช่น การเรนเดอร์และการเรียนรู้ของเครื่อง',
      en: 'A graphics chip contains many small processing units that apply the same operation to many pieces of data at once, which suits calculating the vertices and millions of pixel colours in each frame. The same principle makes GPUs useful for other parallel workloads such as rendering and machine learning.',
    },
    significance: {
      th: 'ชิปนี้เป็นตัวกำหนดประสิทธิภาพด้านกราฟิกของเครื่องเป็นหลัก หากซีพียูส่งงานให้ไม่ทัน GPU ก็ทำงานได้ไม่เต็มที่ จึงควรเลือกสองส่วนนี้ให้สมดุลกัน',
      en: 'This chip is the main factor in graphics performance. If the CPU cannot feed it work fast enough, the GPU sits partly idle, so the two should be chosen in balance.',
    },
  },
  {
    id: 'gpu-vram', part: 'gpu', pos: [-0.05, 0.15, 0.3], lesson: 'l06',
    name: { th: 'หน่วยความจำกราฟิก (VRAM)', en: 'Video memory (VRAM)' },
    brief: { th: 'ชิปหน่วยความจำที่วางรอบชิปกราฟิก ใช้เก็บข้อมูลภาพที่ GPU กำลังทำงานด้วย', en: 'Memory chips placed around the graphics chip that hold the image data the GPU is working on.' },
    detail: {
      th: 'VRAM เป็นหน่วยความจำชนิด GDDR ที่บัดกรีติดกับการ์ด ใช้เก็บพื้นผิว (texture) โมเดลสามมิติ และเฟรมที่กำลังสร้าง ชิปวางชิดกับ GPU เพื่อให้เส้นทางสัญญาณสั้นและรับส่งข้อมูลได้เร็วมาก เป็นหน่วยความจำแยกจากแรมของระบบ',
      en: 'VRAM is GDDR-type memory soldered to the card. It holds textures, 3D models and the frames being built. The chips sit close to the GPU so signal paths are short and data moves very quickly. It is separate from system RAM.',
    },
    significance: {
      th: 'เมื่องานต้องการ VRAM มากกว่าที่มี ข้อมูลส่วนเกินต้องสลับไปใช้แรมของระบบซึ่งช้ากว่า ทำให้ภาพกระตุก VRAM บัดกรีตายตัวกับการ์ด จึงเพิ่มภายหลังไม่ได้และต้องเลือกให้พอตั้งแต่ตอนซื้อ',
      en: 'When a workload needs more VRAM than the card has, the overflow spills into slower system RAM and causes stutter. VRAM is soldered on and cannot be upgraded, so enough must be chosen at purchase.',
    },
  },
  /* ---------- SSD ---------- */
  {
    id: 'ssd-key', part: 'ssd', pos: [-0.38, 0, 0.02], lesson: 'l09',
    name: { th: 'รอยบาก M-key', en: 'M-key notch' },
    brief: { th: 'รอยบากบนขั้วต่อ M.2 ที่บอกชนิดของอินเทอร์เฟซและกันการเสียบผิด', en: 'The notch in the M.2 connector that indicates the interface type and prevents wrong insertion.' },
    detail: {
      th: 'SSD แบบ NVMe ส่วนใหญ่มีรอยบากตำแหน่งเดียวเรียกว่า M-key ซึ่งรองรับ PCIe ได้ถึงสี่เลน ส่วนไดรฟ์ M.2 ที่มีรอยบากสองตำแหน่ง (B+M key) มักเป็นแบบ SATA หรือ PCIe สองเลน รอยบากต้องตรงกับสันในซ็อกเก็ตจึงจะเสียบเข้าได้',
      en: 'Most NVMe SSDs have a single notch called M-key, which supports up to four PCIe lanes. M.2 drives with two notches (B+M key) are usually SATA or two-lane PCIe. The notch must match the ridge in the socket for the drive to go in.',
    },
    significance: {
      th: 'ไดรฟ์เสียบลงซ็อกเก็ตได้ไม่ได้แปลว่าใช้งานได้เสมอไป เพราะซ็อกเก็ตอาจรองรับเฉพาะ SATA หรือเฉพาะ NVMe จึงต้องตรวจทั้งรอยบากและโปรโตคอลที่เมนบอร์ดรองรับ',
      en: 'A drive that physically fits is not guaranteed to work, because the socket may support only SATA or only NVMe. Check both the keying and the protocol the motherboard supports.',
    },
  },
  {
    id: 'ssd-controller', part: 'ssd', pos: [-0.2, 0, 0.03], lesson: 'l04',
    name: { th: 'ชิปควบคุม SSD (Controller)', en: 'SSD controller' },
    brief: { th: 'ตัวประมวลผลของ SSD ที่จัดการว่าข้อมูลแต่ละส่วนถูกเก็บไว้ที่ใดในแฟลช', en: 'The SSD\'s own processor, which manages where every piece of data is stored in the flash.' },
    detail: {
      th: 'ชิปควบคุมแปลงตำแหน่งข้อมูลที่ระบบปฏิบัติการร้องขอให้เป็นตำแหน่งจริงในชิป NAND กระจายการเขียนให้ทั่วทุกเซลล์ (wear levelling) ตรวจและแก้ข้อผิดพลาดของข้อมูล และจัดเก็บกวาดบล็อกที่ไม่ใช้แล้วเพื่อเตรียมพื้นที่ว่างสำหรับการเขียนครั้งต่อไป',
      en: 'The controller translates the locations the operating system asks for into physical locations in the NAND chips, spreads writes evenly across cells (wear levelling), detects and corrects data errors, and reclaims unused blocks to prepare free space for future writes.',
    },
    significance: {
      th: 'คุณภาพของชิปควบคุมและเฟิร์มแวร์มีผลต่อความเร็วและความทนทานของ SSD ไม่น้อยกว่าตัวแฟลชเอง ชิปนี้ร้อนขึ้นเมื่อโอนถ่ายข้อมูลต่อเนื่อง ไดรฟ์ NVMe ความเร็วสูงจึงมักมีฮีตซิงก์',
      en: 'Controller and firmware quality affect SSD speed and endurance as much as the flash itself. The chip heats up during sustained transfers, which is why fast NVMe drives often have a heatsink.',
    },
  },
  {
    id: 'ssd-nand', part: 'ssd', pos: [0.15, 0, 0.03], lesson: 'l04',
    name: { th: 'ชิปแฟลช NAND', en: 'NAND flash chips' },
    brief: { th: 'ชิปที่เก็บข้อมูลถาวรของ SSD โดยไม่มีชิ้นส่วนเคลื่อนไหว', en: 'The chips that hold the SSD\'s permanent data with no moving parts.' },
    detail: {
      th: 'แฟลช NAND เก็บข้อมูลโดยกักประจุไฟฟ้าไว้ในเซลล์ ซึ่งคงอยู่ได้แม้ไม่มีไฟเลี้ยง เซลล์หนึ่งเซลล์อาจเก็บได้หนึ่งบิต (SLC) สามบิต (TLC) หรือสี่บิต (QLC) ยิ่งเก็บหลายบิตต่อเซลล์ยิ่งได้ความจุต่อราคาสูงขึ้น แต่ความเร็วในการเขียนและความทนทานลดลง',
      en: 'NAND flash stores data by trapping electric charge in cells, which remains without power. A cell may hold one bit (SLC), three (TLC) or four (QLC). More bits per cell gives more capacity per cost but lowers write speed and endurance.',
    },
    significance: {
      th: 'แต่ละเซลล์เขียนและลบซ้ำได้จำนวนครั้งจำกัด ผู้ผลิตจึงระบุความทนทานเป็นปริมาณข้อมูลที่เขียนได้รวม (TBW) การไม่มีชิ้นส่วนกลไกทำให้ SSD เข้าถึงข้อมูลได้เร็วและทนแรงกระแทกกว่าฮาร์ดดิสก์',
      en: 'Each cell survives a limited number of write/erase cycles, so manufacturers rate endurance as total bytes written (TBW). Having no mechanical parts makes an SSD much faster to access and more shock-resistant than a hard disk.',
    },
  },
  /* ---------- HDD ---------- */
  {
    id: 'hdd-platters', part: 'hdd', pos: [0.1, 0.14, 0.15], lesson: 'l04',
    name: { th: 'จานแม่เหล็ก (Platters)', en: 'Platters' },
    brief: { th: 'จานหมุนเคลือบสารแม่เหล็กที่ใช้บันทึกข้อมูลของฮาร์ดดิสก์', en: 'The spinning magnetically coated discs on which a hard drive records data.' },
    detail: {
      th: 'จานแต่ละแผ่นเคลือบด้วยชั้นสารแม่เหล็กบาง ๆ ข้อมูลถูกบันทึกเป็นทิศทางของสนามแม่เหล็กในพื้นที่ขนาดเล็กมากเรียงเป็นแทร็กวงกลม มอเตอร์แกนหมุนจานด้วยความเร็วคงที่ โดยไดรฟ์เดสก์ท็อปทั่วไปหมุนที่ 5,400 หรือ 7,200 รอบต่อนาที',
      en: 'Each platter is coated with a thin magnetic layer. Data is recorded as the direction of magnetisation in very small regions arranged in circular tracks. A spindle motor turns the platters at constant speed; typical desktop drives spin at 5,400 or 7,200 rpm.',
    },
    significance: {
      th: 'การต้องรอให้จานหมุนมาถึงตำแหน่งข้อมูลคือเหตุผลที่ฮาร์ดดิสก์ช้ากว่า SSD มาก โดยเฉพาะกับไฟล์เล็กจำนวนมาก ฮาร์ดดิสก์จริงห้ามเปิดฝา เพราะฝุ่นเพียงเล็กน้อยก็ทำลายผิวจานได้',
      en: 'Waiting for the platter to rotate to the data is why a hard drive is far slower than an SSD, especially with many small files. A real drive must never be opened, since a speck of dust can ruin the platter surface.',
    },
  },
  {
    id: 'hdd-actuator', part: 'hdd', pos: [-0.25, 0.14, -0.4], lesson: 'l04',
    name: { th: 'แขนหัวอ่าน (Actuator Arm)', en: 'Actuator arm and heads' },
    brief: { th: 'แขนกลที่พาหัวอ่านเขียนเคลื่อนไปยังแทร็กที่ต้องการบนจาน', en: 'The arm that swings the read/write heads to the required track on the platters.' },
    detail: {
      th: 'แขนถูกขับด้วยขดลวดแม่เหล็กไฟฟ้า (voice coil) ซึ่งเคลื่อนที่ได้เร็วและแม่นยำ ที่ปลายแขนมีหัวอ่านเขียนลอยอยู่เหนือผิวจานบนชั้นอากาศหรือฮีเลียม (ในไดรฟ์ความจุสูงที่บรรจุฮีเลียม) บางระดับนาโนเมตรโดยไม่สัมผัสจาน เมื่อปิดเครื่อง หัวจะถูกนำไปจอดในตำแหน่งปลอดภัย',
      en: 'The arm is driven by an electromagnetic voice coil that moves quickly and precisely. At its tip the read/write heads fly over the platter surface on a nanometre-scale cushion of air (or helium, in high-capacity helium-filled drives) without touching it. When the drive powers down, the heads are parked in a safe position.',
    },
    significance: {
      th: 'เวลาที่แขนใช้เคลื่อนที่ (seek time) เป็นส่วนสำคัญของความล่าช้าในการเข้าถึงข้อมูล แรงกระแทกขณะทำงานอาจทำให้หัวกระทบจานจนข้อมูลเสียหาย และเสียงคลิกซ้ำ ๆ เป็นสัญญาณเตือนให้รีบสำรองข้อมูล',
      en: 'The time the arm takes to move (seek time) is a major part of access delay. A shock while running can make the heads strike the platter and destroy data, and repeated clicking is a warning to back up immediately.',
    },
  },
  {
    id: 'hdd-sata', part: 'hdd', pos: [0, -0.05, -0.75], lesson: 'l08',
    name: { th: 'ขั้วต่อ SATA ของไดรฟ์', en: 'SATA data and power connectors' },
    brief: { th: 'ขั้วต่อสองช่องท้ายไดรฟ์ สำหรับสายข้อมูลและสายไฟ', en: 'The two connectors at the back of the drive for the data cable and the power cable.' },
    detail: {
      th: 'ขั้วช่องสั้นแบบ 7 ขาเป็นขั้วข้อมูล ต่อไปยังพอร์ต SATA บนเมนบอร์ด ส่วนขั้วช่องยาวแบบ 15 ขาเป็นขั้วไฟ ต่อกับสาย SATA power จากพาวเวอร์ซัพพลาย ทั้งสองขั้วเป็นรูปตัว L จึงเสียบได้ทิศทางเดียว',
      en: 'The short 7-pin connector is for data and goes to a SATA port on the motherboard. The longer 15-pin connector is for power and takes a SATA power cable from the power supply. Both are L-shaped, so they fit only one way.',
    },
    significance: {
      th: 'ไดรฟ์ต้องมีทั้งสองสายจึงจะทำงาน หากต่อเพียงสายเดียวระบบจะมองไม่เห็นไดรฟ์ ตัวขั้วเป็นพลาสติกบางที่หักได้หากงัดสายออกในแนวเฉียง',
      en: 'A drive needs both cables to work; with only one connected it will not be detected. The connector is thin plastic and can snap if a cable is levered out at an angle.',
    },
  },
];
