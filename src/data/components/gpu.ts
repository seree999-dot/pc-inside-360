import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'gpu',
  name: { th: 'การ์ดจอ (หน่วยประมวลผลกราฟิก)', en: 'Graphics Card (Graphics Processing Unit)' },
  abbr: 'GPU',
  category: 'core',
  overview: {
    th: 'การ์ดจอคือการ์ดขยายที่มีหน่วยประมวลผลกราฟิก (GPU) ทำหน้าที่คำนวณภาพทุกเฟรมแล้วส่งออกไปยังจอภาพ GPU ถูกออกแบบให้ทำงานง่าย ๆ จำนวนมหาศาลพร้อมกัน จึงเก่งทั้งงานกราฟิก 3 มิติและงานคำนวณแบบขนานอย่าง AI ในโมเดล 3 มิติเป็นการ์ดพัดลมสามตัวที่เสียบในสล็อต PCIe x16 ตัวบน มีขั้วไฟ 8 พิน และพอร์ต HDMI กับ DisplayPort',
    en: 'A graphics card is an expansion card built around a graphics processing unit (GPU) that computes every frame of the picture and sends it to the monitor. A GPU is designed to do a huge number of simple operations at the same time, which makes it strong at 3D graphics and at parallel workloads such as AI. In the 3D model it is the triple-fan card in the upper PCIe x16 slot, with an 8-pin power connector and HDMI and DisplayPort outputs.',
  },
  mainFunction: {
    th: 'แปลงข้อมูลฉาก (รูปทรง พื้นผิว แสง) ให้เป็นพิกเซลบนจอ และเร่งงานคำนวณแบบขนาน เช่น การเข้ารหัสวิดีโอ การเรนเดอร์ และการเรียนรู้ของเครื่อง',
    en: 'Turns scene data (geometry, textures, lighting) into the pixels on screen and accelerates parallel computation such as video encoding, rendering and machine learning.',
  },
  howItWorks: {
    beginner: {
      th: 'ถ้า CPU คือศาสตราจารย์ไม่กี่คนที่แก้โจทย์ยากได้ทีละข้อ GPU ก็คือนักเรียนหลายพันคนที่แต่ละคนคิดเลขง่าย ๆ ได้พร้อมกัน การวาดภาพหนึ่งเฟรมคือการระบายสีจุดเล็ก ๆ หลายล้านจุด งานแบบนี้แบ่งให้นักเรียนทั้งห้องช่วยกันทำจะเสร็จเร็วกว่ามาก ส่วน VRAM คือกระดานและสมุดวาดเขียนของห้องนี้ ใช้เก็บลวดลายพื้นผิวและภาพที่กำลังวาด',
      en: 'If the CPU is a handful of professors who each solve hard problems one at a time, the GPU is thousands of students who each do simple sums at the same moment. Drawing one frame means colouring millions of tiny dots, a job that finishes far sooner when the whole class shares it. VRAM is the class whiteboard and sketchbooks, holding the textures and the pictures being drawn.',
    },
    technical: {
      th: 'CPU ส่งคำสั่งวาด (draw call) และข้อมูลฉากผ่านไดรเวอร์ไปยัง GPU ทางบัส PCIe จากนั้นไปป์ไลน์กราฟิกจะแปลงจุดยอด (vertex) ของโมเดลเป็นพิกัดบนจอ แรสเตอไรซ์สามเหลี่ยมให้เป็นแฟรกเมนต์ แล้วรันเชเดอร์เพื่อคำนวณสีของแต่ละพิกเซล งานเหล่านี้กระจายไปยังหน่วยประมวลผลขนาดเล็กหลายพันหน่วยที่ทำงานพร้อมกัน พื้นผิว (texture) บัฟเฟอร์รูปทรง และเฟรมบัฟเฟอร์ถูกเก็บในหน่วยความจำกราฟิก (VRAM) ชนิด GDDR ที่บัดกรีรอบชิป GPU เพื่อให้เข้าถึงได้ด้วยแบนด์วิดท์สูง เฟรมที่เสร็จแล้วจะถูกส่งออกทาง HDMI หรือ DisplayPort ตามอัตรารีเฟรชของจอ สล็อต PCIe x16 จ่ายไฟได้สูงสุดราว 75 W การ์ดที่กินไฟมากกว่านั้นจึงต้องรับไฟ +12 V เพิ่มจาก PSU ผ่านขั้ว PCIe 6/8 พิน หรือ 12VHPWR / 12V-2x6 (16 พิน)',
      en: 'The CPU sends draw calls and scene data through the driver to the GPU over the PCIe bus. The graphics pipeline then transforms model vertices into screen coordinates, rasterises triangles into fragments and runs shaders to compute the colour of each pixel, spreading the work across thousands of small processing units that operate simultaneously. Textures, geometry buffers and the frame buffer live in graphics memory (VRAM), GDDR chips soldered around the GPU so they can be reached at very high bandwidth. Finished frames go out over HDMI or DisplayPort at the refresh rate of the monitor. A PCIe x16 slot can supply only about 75 W, so cards that draw more take additional +12 V from the PSU through 6/8-pin PCIe or 12VHPWR / 12V-2x6 (16-pin) connectors.',
    },
  },
  structure: [
    {
      name: { th: 'ชุดระบายความร้อน (พัดลมและฮีตซิงก์)', en: 'Cooling assembly (fans and heatsink)' },
      desc: {
        th: 'พัดลมสามตัวเป่าลมผ่านครีบอะลูมิเนียมที่มีฮีตไปป์พาความร้อนมาจากชิป GPU, VRAM และวงจรจ่ายไฟ เป็นส่วนที่ทำให้การ์ดดูใหญ่และหนา',
        en: 'Three fans push air through aluminium fins fed by heat pipes that carry heat away from the GPU chip, VRAM and power circuitry. This assembly is what makes the card long and thick.',
      },
    },
    {
      name: { th: 'ชิป GPU', en: 'GPU chip' },
      desc: {
        th: 'ชิปประมวลผลหลักกลางแผงวงจรใต้ฮีตซิงก์ ภายในมีหน่วยประมวลผลขนานจำนวนมากสำหรับรันเชเดอร์และงานคำนวณ',
        en: 'The main processor in the middle of the circuit board under the heatsink, containing the many parallel units that run shaders and compute workloads.',
      },
    },
    {
      name: { th: 'ชิปหน่วยความจำกราฟิก (VRAM)', en: 'Graphics memory (VRAM) chips' },
      desc: {
        th: 'ชิป GDDR ที่เรียงรอบชิป GPU เก็บพื้นผิว โมเดล และเฟรมที่กำลังเรนเดอร์ ความจุ VRAM กำหนดว่ารับความละเอียดและพื้นผิวรายละเอียดสูงได้แค่ไหน',
        en: 'GDDR chips arranged around the GPU that hold textures, models and frames in progress. VRAM capacity limits how much resolution and texture detail the card can handle.',
      },
    },
    {
      name: { th: 'แถบหน้าสัมผัส PCIe x16', en: 'PCIe x16 edge connector' },
      desc: {
        th: 'แถบหน้าสัมผัสสีทองด้านล่างที่เสียบลงสล็อต PCIe x16 ของเมนบอร์ด ใช้รับส่งข้อมูลกับ CPU และรับไฟได้สูงสุดราว 75 W',
        en: 'The gold contact strip along the bottom that plugs into the PCIe x16 slot of the motherboard, carrying data to and from the CPU and up to about 75 W of power.',
      },
    },
    {
      name: { th: 'พอร์ตแสดงผลและแผ่นยึดท้ายการ์ด', en: 'Display outputs and bracket' },
      desc: {
        th: 'พอร์ต HDMI และ DisplayPort บนแผ่นโลหะที่ขันยึดกับช่องสล็อตด้านหลังเคส สายจอภาพต้องเสียบที่นี่ ไม่ใช่ที่พอร์ตของเมนบอร์ด',
        en: 'HDMI and DisplayPort sockets on the metal bracket that screws to the rear slots of the case. The monitor cable belongs here, not in the motherboard outputs.',
      },
    },
    {
      name: { th: 'ขั้วรับไฟเสริม', en: 'Auxiliary power connector' },
      desc: {
        th: 'ขั้ว PCIe 8 พินที่ขอบบนของการ์ด รับไฟ +12 V โดยตรงจาก PSU สำหรับพลังงานส่วนที่เกินจากที่สล็อตจ่ายได้',
        en: 'An 8-pin PCIe socket on the top edge that takes +12 V directly from the PSU for the power the slot cannot provide.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'หน่วยความจำกราฟิก (VRAM)', en: 'Graphics memory (VRAM)' },
      value: { th: '8–24 GB ชนิด GDDR6/GDDR6X', en: '8–24 GB of GDDR6/GDDR6X' },
      note: {
        th: 'ช่วงทั่วไปของการ์ดเดสก์ท็อปปี 2020–2024; ตระกูลที่ออกตั้งแต่ปี 2025 บางตระกูลเปลี่ยนมาใช้ GDDR7 และรุ่นเรือธงมี VRAM ถึง 32 GB',
        en: 'Typical range for desktop cards of 2020–2024; some families launched from 2025 move to GDDR7, with flagships reaching 32 GB.',
      },
    },
    {
      label: { th: 'อินเทอร์เฟซ', en: 'Interface' },
      value: { th: 'PCIe x16 (เวอร์ชัน 3.0, 4.0 หรือ 5.0)', en: 'PCIe x16 (version 3.0, 4.0 or 5.0)' },
      note: {
        th: 'เวอร์ชันต่างกันใช้ร่วมกันได้ โดยทำงานที่ความเร็วของฝั่งที่ช้ากว่า การ์ดระดับเริ่มต้นบางรุ่นเดินสายจริงเพียง x8 หรือ x4',
        en: 'Versions interoperate at the speed of the slower side. Some entry-level cards are wired for only x8 or x4.',
      },
    },
    {
      label: { th: 'กำลังไฟที่ใช้', en: 'Power draw' },
      value: { th: 'ประมาณ 75–575 W', en: 'About 75–575 W' },
      note: { th: 'ขึ้นกับระดับของการ์ด (การ์ดเรือธงรุ่นปี 2025 ใช้ไฟราว 575 W) ดูค่าที่ผู้ผลิตระบุสำหรับรุ่นนั้น', en: 'Depends on the class of card (2025-era flagship cards draw about 575 W); check the figure the maker states for that model.' },
    },
    {
      label: { th: 'ขั้วรับไฟเสริม', en: 'Auxiliary power connectors' },
      value: {
        th: 'ไม่มี · 6 พิน (75 W) · 8 พิน (150 W ต่อขั้ว) · 12VHPWR / 12V-2x6 (16 พิน, สูงสุด 600 W)',
        en: 'None · 6-pin (75 W) · 8-pin (150 W each) · 12VHPWR / 12V-2x6 (16-pin, up to 600 W)',
      },
      note: { th: 'ค่ากำลังไฟตามข้อกำหนด PCIe และ ATX 3.x', en: 'Power limits per the PCIe and ATX 3.x specifications.' },
    },
    {
      label: { th: 'พอร์ตแสดงผล', en: 'Display outputs' },
      value: { th: 'HDMI 2.0/2.1 และ DisplayPort 1.4/2.1', en: 'HDMI 2.0/2.1 and DisplayPort 1.4/2.1' },
      note: {
        th: 'เวอร์ชันของพอร์ตและสายกำหนดความละเอียดกับอัตรารีเฟรชสูงสุดที่ส่งได้',
        en: 'The port and cable version set the maximum resolution and refresh rate that can be carried.',
      },
    },
    {
      label: { th: 'ขนาดการ์ด', en: 'Card size' },
      value: { th: 'ยาวประมาณ 170–360 มม. หนา 2–4 สล็อต', en: 'About 170–360 mm long, 2–4 slots thick' },
      note: { th: 'เป็นช่วงทั่วไป การ์ดเรือธงบางรุ่นยาวเกิน 360 มม. และการ์ดขนาดเล็กบางรุ่นหนาเพียง 1 สล็อต ต้องเทียบกับระยะที่เคสรองรับ', en: 'A typical range: some flagship cards are longer than 360 mm and some compact cards are only 1 slot thick. Must be compared with the clearance the case allows.' },
    },
    {
      label: { th: 'กำลัง PSU ที่แนะนำ', en: 'Recommended PSU' },
      value: { th: 'ประมาณ 450–1000 W ตามระดับของการ์ด', en: 'About 450–1000 W depending on the class of card' },
      note: {
        th: 'เป็นคำแนะนำสำหรับทั้งระบบโดยผู้ผลิตการ์ด ไม่ใช่กำลังไฟของการ์ดเพียงอย่างเดียว',
        en: 'A whole-system recommendation from the card maker, not the draw of the card alone.',
      },
    },
  ],
  connects: {
    th: 'ทางกายภาพ การ์ดจอเสียบสล็อต PCIe x16 ตัวบนของเมนบอร์ด ขันแผ่นยึดเข้ากับช่องสล็อตด้านหลังเคส ต่อสายไฟ PCIe จาก PSU และต่อสาย HDMI หรือ DisplayPort ไปยังจอภาพ ทางตรรกะ CPU ส่งคำสั่งวาดและข้อมูลผ่านเลน PCIe ที่ต่อตรงกับ CPU ส่วน GPU ใช้ VRAM ของตัวเองแทน RAM ของระบบ และปล่อยความร้อนเข้าสู่ภายในเคส การไหลของลมในเคสจึงมีผลต่ออุณหภูมิของการ์ดโดยตรง',
    en: 'Physically the card plugs into the upper PCIe x16 slot of the motherboard, its bracket screws to the rear slots of the case, PCIe power cables come from the PSU and an HDMI or DisplayPort cable runs to the monitor. Logically the CPU sends draw calls and data over PCIe lanes wired directly to the CPU, while the GPU works from its own VRAM rather than system RAM and dumps its heat inside the case, so case airflow directly affects its temperature.',
  },
  related: ['motherboard', 'psu', 'monitor', 'cpu', 'case', 'expansion'],
  compatibility: [
    {
      th: 'ความยาวและความหนาของการ์ดต้องไม่เกินระยะ GPU clearance (มม.) ที่เคสระบุ และต้องมีช่องสล็อตด้านหลังเคสว่างพอสำหรับความหนาของการ์ด',
      en: 'Card length and thickness must stay within the GPU clearance (mm) the case states, with enough free rear slots for the thickness of the card.',
    },
    {
      th: 'PSU ต้องมีกำลังวัตต์พอพร้อมส่วนเผื่อ และมีขั้ว PCIe 6+2 พิน หรือ 12VHPWR / 12V-2x6 (16 พิน) ตามจำนวนที่การ์ดต้องการ',
      en: 'The PSU must have enough wattage with headroom and the number of 6+2-pin PCIe or 12VHPWR / 12V-2x6 (16-pin) connectors the card requires.',
    },
    {
      th: 'การ์ด PCIe รุ่นใหม่ใช้กับสล็อตรุ่นเก่าได้และกลับกัน แต่จะทำงานที่ความเร็วของฝั่งที่ช้ากว่า',
      en: 'A newer PCIe card works in an older slot and vice versa, but runs at the speed of the slower side.',
    },
    {
      th: 'พอร์ตและสายต้องรองรับความละเอียดกับอัตรารีเฟรชของจอ และ CPU ที่ช้าเกินไปอาจเป็นคอขวดจนการ์ดจอทำงานได้ไม่เต็มที่',
      en: 'Ports and cables must support the resolution and refresh rate of the monitor, and a CPU that is too slow can bottleneck the card so it never reaches full load.',
    },
  ],
  useCases: [
    {
      th: 'เล่นเกม 3 มิติ: GPU เรนเดอร์ฉากแบบเรียลไทม์ ความละเอียดและคุณภาพกราฟิกที่สูงขึ้นต้องการ GPU ที่แรงขึ้นและ VRAM ที่มากขึ้น',
      en: '3D gaming: the GPU renders scenes in real time; higher resolution and quality settings demand a faster GPU and more VRAM.',
    },
    {
      th: 'ตัดต่อวิดีโอและงาน 3 มิติ: ใช้ GPU เร่งการพรีวิว เอฟเฟกต์ การเข้ารหัสวิดีโอ และการเรนเดอร์ภาพ',
      en: 'Video editing and 3D work: the GPU accelerates previews, effects, video encoding and final rendering.',
    },
    {
      th: 'ปัญญาประดิษฐ์และวิทยาการข้อมูล: การฝึกและรันโมเดลคือการคูณเมทริกซ์จำนวนมาก ซึ่งเหมาะกับการประมวลผลแบบขนานของ GPU และมักถูกจำกัดด้วยขนาด VRAM',
      en: 'AI and data science: training and running models is mostly massive matrix multiplication, a natural fit for GPU parallelism and often limited by VRAM size.',
    },
  ],
  problems: [
    {
      symptom: { th: 'เปิดเครื่องได้แต่จอไม่มีภาพ', en: 'The PC powers on but the monitor stays blank.' },
      check: {
        th: 'ตรวจว่าสายจอเสียบที่พอร์ตของการ์ดจอ ไม่ใช่ของเมนบอร์ด เลือกอินพุตของจอให้ถูก ตรวจว่าเสียบสายไฟ PCIe ครบทุกขั้ว แล้วลองถอดการ์ดมาเสียบใหม่จนสลักสล็อตล็อก',
        en: 'Confirm the monitor cable is in a port on the graphics card, not the motherboard; select the right monitor input; check every PCIe power plug; then reseat the card until the slot latch clicks.',
      },
    },
    {
      symptom: { th: 'ภาพแตกเป็นลาย มีจุดสีหรือเส้นแปลก ๆ (artifact)', en: 'Corrupted picture with coloured dots, blocks or lines (artifacts).' },
      check: {
        th: 'ดูอุณหภูมิ GPU ขณะใช้งาน ติดตั้งไดรเวอร์ใหม่แบบล้างของเดิม ลองเปลี่ยนสายและพอร์ต หากยังเป็นแม้ในหน้า UEFI แสดงว่าการ์ดหรือ VRAM อาจเสีย',
        en: 'Watch GPU temperature under load, do a clean driver reinstall, and try another cable and port. If artifacts appear even on the UEFI screen, the card or its VRAM is probably failing.',
      },
    },
    {
      symptom: { th: 'จอดับหรือเครื่องรีสตาร์ตเมื่อเล่นเกมหรือเรนเดอร์', en: 'Black screen or restart while gaming or rendering.' },
      check: {
        th: 'เทียบกำลังวัตต์ของ PSU กับที่การ์ดแนะนำ ใช้สาย PCIe แยกเส้นต่อขั้วแทนสายพ่วงหัวคู่ ตรวจว่าขั้วเสียบสุด และดูอุณหภูมิ GPU',
        en: 'Compare the PSU wattage with the recommendation for the card, use a separate PCIe cable per connector instead of one daisy-chained lead, make sure plugs are fully seated, and check GPU temperature.',
      },
    },
    {
      symptom: { th: 'พัดลมการ์ดดังมากและอุณหภูมิสูง', en: 'Card fans are very loud and temperature is high.' },
      check: {
        th: 'เป่าฝุ่นออกจากครีบและพัดลม ตรวจทิศทางลมในเคสว่ามีลมเย็นเข้าด้านหน้าและลมร้อนออกด้านหลัง และดูว่าไม่มีสายบังช่องลมของการ์ด',
        en: 'Blow dust out of the fins and fans, check that the case moves cool air in at the front and hot air out at the rear, and make sure no cables block the intake of the card.',
      },
    },
  ],
  safety: [
    {
      th: 'ปิดเครื่อง ถอดปลั๊ก และคายประจุไฟฟ้าสถิต (ESD) ก่อนถอดหรือใส่การ์ด จับที่ขอบการ์ดและโครงชุดระบายความร้อน ไม่แตะหน้าสัมผัสสีทอง',
      en: 'Power off, unplug and discharge static (ESD) before removing or installing the card; hold it by its edges and cooler shroud, not by the gold contacts.',
    },
    {
      th: 'ก่อนดึงการ์ดออกต้องปลดสลักล็อกที่ปลายสล็อต PCIe และคลายสกรูแผ่นยึด การดึงโดยไม่ปลดสลักอาจทำให้สล็อตหรือการ์ดเสียหาย',
      en: 'Release the latch at the end of the PCIe slot and undo the bracket screws before pulling the card; yanking it out can damage the slot or the card.',
    },
    {
      th: 'เสียบขั้วไฟให้สุดจนสลักล็อก โดยเฉพาะ 12VHPWR / 12V-2x6 (16 พิน) ที่ต้องเสียบแน่นและไม่หักงอสายใกล้หัวขั้ว ขั้วที่หลวมอาจร้อนจัดจนละลาย',
      en: 'Push power plugs fully home until they latch, especially 12VHPWR / 12V-2x6 (16-pin), which must be seated firmly with no sharp bend near the plug; a loose connector can overheat and melt.',
    },
  ],
  vocab: [
    {
      en: 'VRAM',
      th: 'หน่วยความจำกราฟิก',
      meaning: {
        th: 'หน่วยความจำเฉพาะบนการ์ดจอ ใช้เก็บพื้นผิว โมเดล และเฟรมที่กำลังเรนเดอร์',
        en: 'Dedicated memory on the graphics card holding textures, models and frames being rendered.',
      },
    },
    {
      en: 'Shader',
      th: 'เชเดอร์',
      meaning: {
        th: 'โปรแกรมขนาดเล็กที่รันบน GPU เพื่อคำนวณตำแหน่งของจุดยอดหรือสีของพิกเซล',
        en: 'A small program that runs on the GPU to compute vertex positions or pixel colours.',
      },
    },
    {
      en: 'Rasterization',
      th: 'การแรสเตอไรซ์',
      meaning: {
        th: 'การแปลงรูปทรงสามเหลี่ยมของฉาก 3 มิติให้เป็นพิกเซลบนจอ 2 มิติ',
        en: 'Converting the triangles of a 3D scene into pixels on the 2D screen.',
      },
    },
    {
      en: 'Frame rate (FPS)',
      th: 'อัตราเฟรม',
      meaning: {
        th: 'จำนวนภาพที่ GPU เรนเดอร์ได้ต่อวินาที ยิ่งสูงภาพเคลื่อนไหวยิ่งลื่น',
        en: 'The number of images the GPU renders per second; higher values give smoother motion.',
      },
    },
    {
      en: 'Parallel processing',
      th: 'การประมวลผลแบบขนาน',
      meaning: {
        th: 'การแบ่งงานเป็นชิ้นย่อยจำนวนมากแล้วคำนวณพร้อมกัน ซึ่งเป็นจุดแข็งของ GPU',
        en: 'Splitting work into many small pieces computed at the same time, the core strength of a GPU.',
      },
    },
    {
      en: 'Integrated vs discrete graphics',
      th: 'กราฟิกในตัวและการ์ดจอแยก',
      meaning: {
        th: 'กราฟิกในตัวอยู่ใน CPU และใช้ RAM ของระบบ ส่วนการ์ดจอแยกเป็นการ์ดต่างหากที่มี VRAM ของตัวเอง',
        en: 'Integrated graphics live inside the CPU and share system RAM; a discrete card is a separate board with its own VRAM.',
      },
    },
  ],
  facts: [
    {
      th: 'ภาพความละเอียด 4K (3840 × 2160) มีประมาณ 8.3 ล้านพิกเซล ที่ 60 เฟรมต่อวินาที GPU จึงต้องคำนวณสีเกือบ 500 ล้านพิกเซลทุกวินาที',
      en: 'A 4K image (3840 × 2160) has about 8.3 million pixels, so at 60 frames per second the GPU must compute nearly 500 million pixel colours every second.',
    },
    {
      th: 'การคำนวณสีของพิกเซลแต่ละจุดแทบไม่ขึ้นต่อกัน งานกราฟิกจึงแบ่งทำขนานได้ดีมาก และความสามารถในการทำการคำนวณแบบเดียวกันซ้ำ ๆ พร้อมกันจำนวนมากนี้เองที่ทำให้ GPU เหมาะกับการคูณเมทริกซ์ในงานฝึกโมเดล AI ด้วย',
      en: 'The colour of each pixel can be computed almost independently, which is why graphics parallelises so well; that same ability to run one kind of calculation on huge amounts of data in parallel is what also makes GPUs suited to the matrix multiplications of AI training.',
    },
    {
      th: 'สล็อต PCIe x16 จ่ายไฟได้ราว 75 W เท่านั้น การ์ดจอระดับสูงที่ใช้ไฟหลายร้อยวัตต์จึงรับพลังงานส่วนใหญ่ผ่านสายไฟเสริมจาก PSU',
      en: 'A PCIe x16 slot supplies only about 75 W, so a high-end card drawing several hundred watts takes most of its power through auxiliary cables from the PSU.',
    },
  ],
  review: [
    {
      q: { th: 'ทำไม GPU จึงเรนเดอร์ภาพได้เร็วกว่า CPU', en: 'Why does a GPU render images faster than a CPU?' },
      a: {
        th: 'เพราะ GPU มีหน่วยประมวลผลขนาดเล็กจำนวนมากที่คำนวณพิกเซลหลายล้านจุดพร้อมกันได้ ส่วน CPU มีคอร์จำนวนน้อยที่เน้นงานซับซ้อนทีละลำดับ',
        en: 'A GPU has many small processing units that compute millions of pixels in parallel, whereas a CPU has a few cores tuned for complex sequential work.',
      },
    },
    {
      q: { th: 'VRAM ใช้เก็บอะไร และถ้าไม่พอจะเกิดอะไรขึ้น', en: 'What does VRAM hold, and what happens when it runs out?' },
      a: {
        th: 'เก็บพื้นผิว โมเดล และเฟรมบัฟเฟอร์ ถ้าไม่พอ ระบบต้องสลับข้อมูลกับ RAM ของเครื่อง ทำให้ภาพกระตุกหรือต้องลดคุณภาพพื้นผิว',
        en: 'It holds textures, models and frame buffers. When it runs out, data spills over into system RAM, causing stutter or forcing lower texture quality.',
      },
    },
    {
      q: { th: 'ทำไมการ์ดจอหลายรุ่นต้องต่อสายไฟเพิ่มจาก PSU', en: 'Why do many graphics cards need extra power cables from the PSU?' },
      a: {
        th: 'เพราะสล็อต PCIe จ่ายได้ราว 75 W ซึ่งไม่พอ การ์ดจึงรับไฟ +12 V เพิ่มผ่านขั้ว 6/8 พิน หรือ 12VHPWR / 12V-2x6 (16 พิน)',
        en: 'The PCIe slot provides only about 75 W, which is not enough, so the card takes additional +12 V through 6/8-pin or 12VHPWR / 12V-2x6 (16-pin) connectors.',
      },
    },
  ],
};
