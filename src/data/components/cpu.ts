import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'cpu',
  name: { th: 'หน่วยประมวลผลกลาง', en: 'Central Processing Unit' },
  abbr: 'CPU',
  category: 'core',
  overview: {
    th: 'หน่วยประมวลผลกลาง (CPU) คือชิปที่อ่านคำสั่งของโปรแกรมแล้วลงมือคำนวณ เปรียบเทียบ และตัดสินใจ งานเกือบทุกอย่างในคอมพิวเตอร์ต้องผ่าน CPU ไม่ทางตรงก็ทางอ้อม ในโมเดล 3 มิติจะเห็นเป็นแผ่นสี่เหลี่ยมมีฝาโลหะ วางอยู่ในซ็อกเก็ตแบบ LGA บนเมนบอร์ด ใต้ชุดระบายความร้อน',
    en: 'The central processing unit (CPU) is the chip that reads program instructions and carries out the calculations, comparisons and decisions they describe. Almost everything a computer does passes through the CPU directly or indirectly. In the 3D model it is the square package with a metal lid, seated in the LGA socket on the motherboard underneath the cooler.',
  },
  mainFunction: {
    th: 'ประมวลผลคำสั่งของระบบปฏิบัติการและโปรแกรม พร้อมทั้งประสานการทำงานของหน่วยความจำ ที่เก็บข้อมูล และอุปกรณ์อื่น ๆ',
    en: 'Executes the instructions of the operating system and applications, and coordinates memory, storage and other devices while doing so.',
  },
  howItWorks: {
    beginner: {
      th: 'ลองนึกถึงพ่อครัวในร้านอาหาร พ่อครัวหยิบใบสั่งอาหารมาอ่าน (fetch) ทำความเข้าใจว่าต้องทำอะไร (decode) แล้วลงมือปรุง (execute) จากนั้นก็หยิบใบถัดไปวนไปเรื่อย ๆ แต่ CPU ทำแบบนี้ได้หลายพันล้านรอบต่อวินาที แต่ละคอร์ (core) เปรียบเหมือนพ่อครัวหนึ่งคน ยิ่งมีหลายคอร์ก็ยิ่งทำหลายงานพร้อมกันได้ ส่วนแคช (cache) คือวัตถุดิบที่วางไว้ใกล้มือ ไม่ต้องเดินไปหยิบที่ห้องเก็บของ (RAM) ทุกครั้ง',
      en: 'Picture a chef in a restaurant. The chef picks up an order slip (fetch), works out what it asks for (decode), cooks it (execute), then picks up the next slip, over and over. A CPU does this billions of times per second. Each core is like one chef, so more cores can work on more tasks at the same moment. The cache is the set of ingredients kept within arm\'s reach, so the chef does not have to walk to the storeroom (RAM) every time.',
    },
    technical: {
      th: 'CPU ทำงานเป็นวงรอบ fetch–decode–execute: ตัวนับโปรแกรม (program counter) ชี้ตำแหน่งคำสั่งถัดไป คำสั่งถูกดึงจากหน่วยความจำผ่านแคช ถอดรหัสเป็นไมโครโอเปอเรชัน ส่งให้หน่วยคำนวณ (ALU และหน่วยประมวลผลอื่น) แล้วเขียนผลลัพธ์กลับลงรีจิสเตอร์หรือหน่วยความจำ คอร์สมัยใหม่ใช้ไปป์ไลน์ การประมวลผลแบบ superscalar และ out-of-order ร่วมกับการทำนายการแตกแขนง (branch prediction) เพื่อทำหลายคำสั่งต่อหนึ่งรอบสัญญาณนาฬิกา แคชแบ่งเป็นลำดับชั้น L1 (เล็กและเร็วที่สุด อยู่ในแต่ละคอร์) L2 (ใหญ่ขึ้น ช้าลงเล็กน้อย) และ L3 (ใหญ่ที่สุด ใช้ร่วมกันระหว่างคอร์ภายในกลุ่มคอร์หรือ die เดียวกัน เช่น หนึ่ง CCD ของ Ryzen) เพื่อลดเวลารอข้อมูลจาก RAM ซึ่งช้ากว่ามาก ประสิทธิภาพจริงจึงขึ้นกับทั้งความถี่สัญญาณนาฬิกา (GHz) จำนวนคำสั่งต่อรอบ (IPC) จำนวนคอร์/เธรด และขนาดแคช ไม่ใช่ GHz เพียงอย่างเดียว ชุดคำสั่ง (ISA) เช่น x86-64 หรือ ARM64 เป็นตัวกำหนดว่าซอฟต์แวร์ที่คอมไพล์แล้วจะรันบน CPU นั้นได้หรือไม่',
      en: 'The CPU runs a fetch–decode–execute cycle: the program counter points at the next instruction, the instruction is fetched from memory through the cache, decoded into micro-operations, executed by the ALU and other execution units, and the result is written back to a register or to memory. Modern cores combine pipelining, superscalar and out-of-order execution with branch prediction so that several instructions complete per clock cycle. The cache is a hierarchy: L1 (smallest and fastest, private to each core), L2 (larger, slightly slower) and L3 (largest, shared between the cores of one core cluster or die, e.g. one CCD on Ryzen), all there to hide the much longer delay of reading RAM. Real performance therefore depends on clock frequency (GHz), instructions per cycle (IPC), core/thread count and cache size together, not on GHz alone. The instruction set architecture (ISA), such as x86-64 or ARM64, decides whether compiled software can run on a given CPU.',
    },
  },
  structure: [
    {
      name: { th: 'ฝาครอบกระจายความร้อน (IHS)', en: 'Integrated heat spreader (IHS)' },
      desc: {
        th: 'ฝาโลหะ (ทองแดงชุบนิกเกิล) ที่มองเห็นด้านบน ทำหน้าที่ปกป้องไดและกระจายความร้อนจากพื้นที่เล็ก ๆ ของไดไปสู่ฐานของชุดระบายความร้อน',
        en: 'The nickel-plated copper lid visible on top. It protects the die and spreads heat from the small die area out to the base of the cooler.',
      },
    },
    {
      name: { th: 'ได (die)', en: 'Die' },
      desc: {
        th: 'แผ่นซิลิคอนใต้ IHS ที่บรรจุทรานซิสเตอร์หลายพันล้านตัว เป็นที่อยู่ของคอร์ แคช และวงจรกราฟิกในตัว (ถ้ามี) ในแอปกดปุ่ม reveal เพื่อยกฝาดูไดแบบจำลองเชิงแนวคิด',
        en: 'The silicon chip under the IHS holding billions of transistors: the cores, the cache and, on many models, integrated graphics. Use the reveal toggle in the app to lift the lid and see a conceptual die.',
      },
    },
    {
      name: { th: 'แผ่นฐานแพ็กเกจ (substrate)', en: 'Package substrate' },
      desc: {
        th: 'แผ่นวงจรหลายชั้นสีเขียวที่ไดยึดอยู่ ทำหน้าที่กระจายสัญญาณและไฟเลี้ยงจากไดขนาดเล็กไปยังหน้าสัมผัสจำนวนมากด้านล่าง',
        en: 'The green multilayer board the die is bonded to. It fans the signals and power of the tiny die out to the many contacts underneath.',
      },
    },
    {
      name: { th: 'หน้าสัมผัสแบบ LGA', en: 'LGA contact pads' },
      desc: {
        th: 'แผ่นหน้าสัมผัสเคลือบทองเรียบ ๆ ใต้ CPU จำนวนกว่าพันจุด แตะกับขาสปริงในซ็อกเก็ตของเมนบอร์ด (ในแบบ LGA ขาอยู่ที่ซ็อกเก็ต ไม่ใช่ที่ CPU)',
        en: 'More than a thousand flat gold-plated pads under the CPU that touch spring pins in the motherboard socket. In an LGA design the pins are in the socket, not on the CPU.',
      },
    },
    {
      name: { th: 'เครื่องหมายมุมและร่องบาก', en: 'Corner marker and alignment notches' },
      desc: {
        th: 'สามเหลี่ยมสีทองที่มุมหนึ่งและร่องบากที่ขอบ ใช้จัดทิศทางให้ตรงกับซ็อกเก็ต ทำให้ใส่ได้เพียงทิศเดียว',
        en: 'A small gold triangle on one corner and notches on the edges that line up with the socket, so the CPU can only be seated one way.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'จำนวนคอร์ / เธรด', en: 'Cores / threads' },
      value: { th: '4–24 คอร์ / 8–32 เธรด', en: '4–24 cores / 8–32 threads' },
      note: {
        th: 'ช่วงทั่วไปของ CPU เดสก์ท็อปยุค AM5, LGA1700 และ LGA1851 ตั้งแต่ Core i3/Ryzen 3 (4 คอร์) ถึง Core i9/Core Ultra 9 (24 คอร์) และ Ryzen 9 (16 คอร์ 32 เธรด); เทคโนโลยี SMT (Hyper-Threading) ทำให้หนึ่งคอร์รับงานได้สองเธรด Intel ตั้งแต่รุ่นที่ 12 เป็นต้นมาใช้แบบไฮบริด คือ P-core (คอร์ประสิทธิภาพสูง) ผสม E-core (คอร์ประหยัดพลังงาน) โดยรุ่นที่ 12–14 มี Hyper-Threading เฉพาะ P-core ส่วน Core Ultra 200S (Arrow Lake) ไม่มี Hyper-Threading จึงมีจำนวนเธรดเท่ากับจำนวนคอร์ ขณะที่ AMD Ryzen ยังคงมี SMT ทุกคอร์',
        en: 'Typical range for desktop CPUs of the AM5, LGA1700 and LGA1851 era, from Core i3/Ryzen 3 (4 cores) up to Core i9/Core Ultra 9 (24 cores) and Ryzen 9 (16 cores, 32 threads); SMT (Hyper-Threading) lets one core handle two threads. Since its 12th generation Intel uses a hybrid design that mixes P-cores (performance cores) with E-cores (efficiency cores); 12th–14th gen parts have Hyper-Threading on the P-cores only, and Core Ultra 200S (Arrow Lake) has no Hyper-Threading at all, so its thread count equals its core count. AMD Ryzen keeps SMT on every core.',
      },
    },
    {
      label: { th: 'ความถี่สัญญาณนาฬิกา', en: 'Clock speed' },
      value: { th: 'ประมาณ 3.5–6.2 GHz (ความถี่สูงสุดแบบบูสต์)', en: 'About 3.5–6.2 GHz (peak boost frequency)' },
      note: {
        th: 'เปรียบเทียบ GHz ได้ตรง ๆ เฉพาะ CPU สถาปัตยกรรมและรุ่นเดียวกันเท่านั้น',
        en: 'GHz can only be compared directly between CPUs of the same architecture and generation.',
      },
    },
    {
      label: { th: 'แคช (L1 / L2 / L3)', en: 'Cache (L1 / L2 / L3)' },
      value: {
        th: 'L1 หลักสิบ KB ต่อคอร์ · L2 ประมาณ 0.5–3 MB ต่อคอร์ · L3 ประมาณ 16–128 MB ใช้ร่วมกัน',
        en: 'L1 tens of KB per core · L2 roughly 0.5–3 MB per core · L3 roughly 16–128 MB shared',
      },
      note: { th: 'ค่าขึ้นกับรุ่นและตระกูลของ CPU', en: 'Values depend on the CPU family and model.' },
    },
    {
      label: { th: 'สถาปัตยกรรมชุดคำสั่ง', en: 'Instruction set architecture' },
      value: { th: 'x86-64 (พีซีส่วนใหญ่) หรือ ARM64', en: 'x86-64 (most PCs) or ARM64' },
      note: {
        th: 'ARM64 พบในสมาร์ตโฟน แท็บเล็ต และโน้ตบุ๊กบางตระกูล โปรแกรมต้องคอมไพล์ให้ตรงกับสถาปัตยกรรมหรือรันผ่านตัวแปล',
        en: 'ARM64 is used in phones, tablets and some laptop families. Software must be compiled for the architecture or run through translation.',
      },
    },
    {
      label: { th: 'ซ็อกเก็ต', en: 'Socket' },
      value: { th: 'เช่น AM5 (LGA 1718 จุด), LGA1700, LGA1851', en: 'e.g. AM5 (1718-contact LGA), LGA1700, LGA1851' },
      note: { th: 'ซ็อกเก็ตต่างชนิดใส่แทนกันไม่ได้', en: 'Different sockets are not interchangeable.' },
    },
    {
      label: { th: 'ค่าความร้อนออกแบบ (TDP)', en: 'Thermal design power (TDP)' },
      value: { th: 'ประมาณ 65–170 W', en: 'About 65–170 W' },
      note: {
        th: 'เป็นค่าอ้างอิงสำหรับเลือกชุดระบายความร้อน (ค่า 170 W คือรุ่นระดับบนของ Ryzen ซีรีส์ 7000/9000 บน AM5) กำลังไฟสูงสุดช่วงสั้น ๆ ของรุ่นระดับบนอาจสูงกว่านี้มาก',
        en: 'A reference figure for choosing a cooler (170 W is the top AM5 Ryzen 7000/9000-series parts); short-term peak power of high-end models can be far higher.',
      },
    },
    {
      label: { th: 'กราฟิกในตัว (iGPU)', en: 'Integrated graphics (iGPU)' },
      value: { th: 'มีหรือไม่มี ขึ้นกับรุ่น', en: 'Present or absent, depending on the model' },
      note: {
        th: 'ถ้า CPU ไม่มี iGPU ต้องติดตั้งการ์ดจอแยกจึงจะมีภาพออกจอ',
        en: 'A CPU without an iGPU needs a discrete graphics card to produce any display output.',
      },
    },
  ],
  connects: {
    th: 'ทางกายภาพ CPU วางในซ็อกเก็ตของเมนบอร์ดและถูกกดด้วยชุดระบายความร้อนโดยมีสารนำความร้อนคั่นกลาง รับไฟจากขั้ว EPS 8 พินผ่านวงจร VRM ของเมนบอร์ด ทางตรรกะ CPU เชื่อมกับ RAM โดยตรงผ่านช่องหน่วยความจำ ต่อกับการ์ดจอและ SSD แบบ NVMe ผ่านเลน PCIe ของ CPU เอง และสื่อสารกับอุปกรณ์ที่ช้ากว่า (SATA, USB, เครือข่าย, เสียง) ผ่านชิปเซ็ต',
    en: 'Physically the CPU sits in the motherboard socket and is clamped by the cooler with thermal paste in between; it is powered from the 8-pin EPS connector through the VRM of the board. Logically it talks to RAM directly over the memory channels, to the graphics card and an NVMe SSD over its own PCIe lanes, and to slower devices (SATA, USB, network, audio) through the chipset.',
  },
  related: ['motherboard', 'cooler', 'ram', 'gpu', 'psu', 'firmware'],
  compatibility: [
    {
      th: 'ซ็อกเก็ตของ CPU ต้องตรงกับซ็อกเก็ตของเมนบอร์ด เช่น CPU แบบ AM5 ใส่ได้เฉพาะบอร์ด AM5 และ CPU แบบ LGA1700 ใส่ได้เฉพาะบอร์ด LGA1700',
      en: 'The CPU socket must match the motherboard socket: an AM5 CPU fits only AM5 boards, and an LGA1700 CPU fits only LGA1700 boards.',
    },
    {
      th: 'แม้ซ็อกเก็ตตรงกัน ชิปเซ็ตและเวอร์ชันเฟิร์มแวร์ UEFI ต้องรองรับ CPU รุ่นนั้นด้วย CPU รุ่นใหม่บนบอร์ดรุ่นเก่าอาจต้องอัปเดต UEFI ก่อน',
      en: 'Even with the right socket, the chipset and UEFI firmware version must support that CPU. A newer CPU on an older board may need a UEFI update first.',
    },
    {
      th: 'แพลตฟอร์มกำหนดชนิด RAM: AM5 ใช้ DDR5 เท่านั้น ส่วน LGA1700 ใช้ DDR4 หรือ DDR5 ตามที่บอร์ดออกแบบมา (อย่างใดอย่างหนึ่ง)',
      en: 'The platform fixes the RAM type: AM5 is DDR5-only, while LGA1700 uses DDR4 or DDR5 depending on how the board was built (one or the other).',
    },
    {
      th: 'ชุดระบายความร้อนต้องมีขายึดสำหรับซ็อกเก็ตนั้นและระบายความร้อนได้ไม่น้อยกว่ากำลังความร้อนของ CPU และวงจร VRM ของบอร์ดต้องจ่ายไฟให้ CPU รุ่นกินไฟสูงได้เพียงพอ',
      en: 'The cooler needs a mounting kit for that socket and enough capacity for the heat output of the CPU, and the VRM of the board must be able to feed a power-hungry model.',
    },
  ],
  useCases: [
    {
      th: 'งานสำนักงานและเรียนออนไลน์: CPU 4–6 คอร์ที่มีกราฟิกในตัวก็เพียงพอและประหยัดไฟ',
      en: 'Office work and online classes: a 4–6 core CPU with integrated graphics is enough and uses little power.',
    },
    {
      th: 'เล่นเกม: เน้นประสิทธิภาพต่อคอร์สูงและแคช L3 ขนาดใหญ่ เพราะเกมจำนวนมากพึ่งพาเธรดหลักเพียงไม่กี่เธรด',
      en: 'Gaming: favours strong per-core performance and a large L3 cache, because many games lean on just a few main threads.',
    },
    {
      th: 'เรนเดอร์วิดีโอ คอมไพล์โปรแกรม และวิเคราะห์ข้อมูล: ได้ประโยชน์จากจำนวนคอร์และเธรดมาก เพราะงานแบ่งทำขนานกันได้',
      en: 'Video rendering, compiling and data analysis: benefit from many cores and threads because the work splits into parallel pieces.',
    },
  ],
  problems: [
    {
      symptom: {
        th: 'อุณหภูมิ CPU สูงมาก เครื่องช้าลงเองหรือดับขณะใช้งานหนัก (thermal throttling)',
        en: 'Very high CPU temperature; the PC slows itself down or shuts off under load (thermal throttling).',
      },
      check: {
        th: 'ตรวจว่าชุดระบายความร้อนยึดแน่นทุกจุด พัดลมหมุน สารนำความร้อนไม่แห้งและทาทั่ว ลอกฟิล์มพลาสติกที่ฐานแล้ว จากนั้นดูอุณหภูมิใน UEFI หรือโปรแกรมมอนิเตอร์',
        en: 'Check that the cooler is clamped evenly, its fan spins, the thermal paste is fresh and covers the lid, and the protective film was removed from the base; then read the temperature in UEFI or a monitoring tool.',
      },
    },
    {
      symptom: {
        th: 'เปิดเครื่องแล้วพัดลมหมุนแต่ไม่มีภาพ หลังเพิ่งติดตั้งหรือเปลี่ยน CPU',
        en: 'Fans spin but there is no picture right after installing or replacing the CPU.',
      },
      check: {
        th: 'ดูไฟ debug LED ของบอร์ด (CPU) ตรวจว่าเสียบสาย EPS 8 พินแล้ว ถอด CPU ออกมาส่องหาขาซ็อกเก็ตที่งอ และตรวจว่า UEFI เวอร์ชันปัจจุบันรองรับ CPU รุ่นนี้',
        en: 'Read the debug LED of the board (CPU), confirm the 8-pin EPS cable is connected, remove the CPU and inspect the socket for bent pins, and verify that the current UEFI version supports this CPU.',
      },
    },
    {
      symptom: {
        th: 'เครื่องค้างหรือรีสตาร์ตแบบสุ่มเมื่อใช้งานหนัก',
        en: 'Random freezes or restarts under heavy load.',
      },
      check: {
        th: 'คืนค่า UEFI เป็นค่าเริ่มต้นเพื่อยกเลิกการโอเวอร์คล็อก ตรวจอุณหภูมิขณะโหลดเต็ม แล้วทดสอบ RAM และ PSU เพื่อแยกสาเหตุ เพราะอาการคล้ายกันมาก',
        en: 'Load UEFI defaults to remove any overclock, watch the temperature at full load, then test RAM and the PSU to separate the causes, since their symptoms look very similar.',
      },
    },
    {
      symptom: {
        th: 'ประสิทธิภาพต่ำกว่าที่ควร ทั้งที่อุณหภูมิปกติ',
        en: 'Performance is lower than expected although temperatures look normal.',
      },
      check: {
        th: 'เปิดตัวจัดการงาน (Task Manager) ดูว่ามีโปรแกรมเบื้องหลังใช้ CPU อยู่หรือไม่ ตรวจโหมดพลังงานของระบบปฏิบัติการ และดูว่าความถี่ CPU ขึ้นถึงค่าบูสต์หรือไม่',
        en: 'Open Task Manager to look for background programs using the CPU, check the power mode of the operating system, and see whether the clock actually reaches its boost frequency.',
      },
    },
  ],
  safety: [
    {
      th: 'ปิดเครื่อง ถอดปลั๊ก และคายประจุไฟฟ้าสถิต (ESD) โดยแตะโลหะของเคสหรือสวมสายรัดข้อมือกันไฟฟ้าสถิตก่อนจับ CPU',
      en: 'Power off, unplug, and discharge static (ESD) by touching bare case metal or wearing an anti-static wrist strap before handling the CPU.',
    },
    {
      th: 'จับ CPU ที่ขอบเท่านั้น ห้ามแตะหน้าสัมผัสด้านล่างและห้ามแตะขาในซ็อกเก็ต จัดสามเหลี่ยมมุมให้ตรงแล้ววางลงเบา ๆ โดยไม่ต้องออกแรงกด',
      en: 'Hold the CPU by its edges only; never touch the pads underneath or the pins in the socket. Align the corner triangle and lower it gently with no force.',
    },
    {
      th: 'ห้ามเปิดเครื่องโดยไม่ติดตั้งชุดระบายความร้อน และระวังฝา IHS กับฮีตซิงก์ที่ยังร้อนหลังปิดเครื่องใหม่ ๆ',
      en: 'Never power on without a cooler installed, and remember the IHS and heatsink stay hot for a while after shutdown.',
    },
  ],
  vocab: [
    {
      en: 'Core',
      th: 'คอร์',
      meaning: {
        th: 'หน่วยประมวลผลอิสระหนึ่งหน่วยภายใน CPU ที่รันคำสั่งได้ด้วยตัวเอง',
        en: 'One independent processing unit inside the CPU that can execute instructions on its own.',
      },
    },
    {
      en: 'Thread',
      th: 'เธรด',
      meaning: {
        th: 'ลำดับคำสั่งที่ระบบปฏิบัติการจัดคิวให้ CPU; คอร์ที่มี SMT แสดงตัวเป็นสองเธรดเชิงตรรกะ',
        en: 'A sequence of instructions the operating system schedules; a core with SMT presents itself as two logical threads.',
      },
    },
    {
      en: 'Clock speed',
      th: 'ความถี่สัญญาณนาฬิกา',
      meaning: {
        th: 'จำนวนรอบสัญญาณนาฬิกาต่อวินาที หน่วยเป็น GHz (พันล้านรอบต่อวินาที)',
        en: 'The number of clock cycles per second, measured in GHz (billions of cycles per second).',
      },
    },
    {
      en: 'Cache',
      th: 'แคช',
      meaning: {
        th: 'หน่วยความจำขนาดเล็กความเร็วสูงใน CPU ที่เก็บข้อมูลและคำสั่งที่ใช้บ่อย แบ่งเป็น L1, L2, L3',
        en: 'Small, very fast memory inside the CPU that keeps frequently used data and instructions, organised as L1, L2 and L3.',
      },
    },
    {
      en: 'Instruction set architecture (ISA)',
      th: 'สถาปัตยกรรมชุดคำสั่ง',
      meaning: {
        th: 'ข้อกำหนดของคำสั่งระดับเครื่องที่ CPU เข้าใจ เช่น x86-64 และ ARM64',
        en: 'The definition of the machine-level instructions a CPU understands, such as x86-64 and ARM64.',
      },
    },
    {
      en: 'Thermal design power (TDP)',
      th: 'ค่าความร้อนออกแบบ',
      meaning: {
        th: 'ปริมาณความร้อน (วัตต์) ที่ชุดระบายความร้อนควรรับได้ภายใต้ภาระงานที่ผู้ผลิตกำหนด',
        en: 'The amount of heat (in watts) a cooler is expected to handle under a workload defined by the manufacturer.',
      },
    },
  ],
  facts: [
    {
      th: 'ที่ความถี่ 5 GHz หนึ่งรอบสัญญาณนาฬิกาใช้เวลาเพียง 0.2 นาโนวินาที ในเวลานั้นแสงในสุญญากาศเดินทางได้ราว 6 เซนติเมตรเท่านั้น',
      en: 'At 5 GHz one clock cycle lasts just 0.2 nanoseconds; in that time light in a vacuum travels only about 6 centimetres.',
    },
    {
      th: 'CPU เดสก์ท็อปสมัยใหม่มีทรานซิสเตอร์หลายพันล้านตัวบนไดที่เล็กกว่าแสตมป์ โดยโครงสร้างของทรานซิสเตอร์มีขนาดระดับนาโนเมตร',
      en: 'A modern desktop CPU packs billions of transistors onto a die smaller than a postage stamp, with transistor features measured in nanometres.',
    },
    {
      th: 'พลังงานไฟฟ้าที่ CPU ใช้เกือบทั้งหมดกลายเป็นความร้อน CPU ที่กินไฟ 100 W จึงปล่อยความร้อนราว 100 W ซึ่งชุดระบายความร้อนต้องพาออกไป',
      en: 'Nearly all the electrical energy a CPU consumes ends up as heat, so a CPU drawing 100 W emits about 100 W of heat that the cooler must remove.',
    },
  ],
  review: [
    {
      q: { th: 'วงรอบการทำงานพื้นฐานของ CPU มีขั้นตอนอะไรบ้าง', en: 'What are the steps of the basic CPU cycle?' },
      a: {
        th: 'ดึงคำสั่ง (fetch) ถอดรหัส (decode) และประมวลผล (execute) แล้วเก็บผลลัพธ์ก่อนวนไปคำสั่งถัดไป',
        en: 'Fetch the instruction, decode it, execute it, store the result, then move on to the next instruction.',
      },
    },
    {
      q: {
        th: 'ทำไม CPU ที่มี GHz สูงกว่าจึงไม่จำเป็นต้องเร็วกว่าเสมอไป',
        en: 'Why is a CPU with a higher GHz figure not always faster?',
      },
      a: {
        th: 'เพราะประสิทธิภาพขึ้นกับจำนวนคำสั่งที่ทำได้ต่อรอบ (IPC) จำนวนคอร์ และขนาดแคชด้วย GHz เปรียบเทียบได้เฉพาะ CPU รุ่นและสถาปัตยกรรมเดียวกัน',
        en: 'Performance also depends on instructions per cycle (IPC), core count and cache size; GHz is comparable only within the same generation and architecture.',
      },
    },
    {
      q: { th: 'แคช L1, L2 และ L3 ต่างกันอย่างไร', en: 'How do the L1, L2 and L3 caches differ?' },
      a: {
        th: 'L1 เล็กและเร็วที่สุดอยู่ในแต่ละคอร์ L2 ใหญ่ขึ้นแต่ช้าลงเล็กน้อย ส่วน L3 ใหญ่ที่สุด ช้าที่สุดในสามระดับ และใช้ร่วมกันระหว่างคอร์ภายในกลุ่มคอร์ (CCD/die) เดียวกัน',
        en: 'L1 is the smallest and fastest and belongs to each core, L2 is larger but slightly slower, and L3 is the largest, slowest of the three and shared by the cores within one core cluster (CCD/die).',
      },
    },
  ],
};
