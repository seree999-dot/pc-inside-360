import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'cooler',
  name: { th: 'ชุดระบายความร้อนซีพียู', en: 'CPU Cooler' },
  abbr: 'HSF',
  category: 'power-cooling',
  overview: {
    th: 'ชุดระบายความร้อนซีพียูทำหน้าที่พาความร้อนออกจาก CPU ไปปล่อยสู่อากาศ เพื่อให้ชิปอยู่ในช่วงอุณหภูมิที่ปลอดภัยและทำงานได้เต็มความเร็ว มีทั้งแบบลม (ฮีตซิงก์กับพัดลม) และแบบของเหลว (AIO) ในโมเดล 3 มิติเป็นแบบลมทรงทาวเวอร์เดี่ยว มีฐานทองแดง ฮีตไปป์ 4 เส้น ครีบอะลูมิเนียม และพัดลม 120 มม.',
    en: 'The CPU cooler carries heat away from the CPU and releases it into the air, keeping the chip within a safe temperature range so it can run at full speed. Coolers come as air designs (heatsink plus fan) or liquid designs (AIO). In the 3D model it is a single-tower air cooler with a copper base, four heat pipes, an aluminium fin stack and a 120 mm fan.',
  },
  mainFunction: {
    th: 'ถ่ายเทความร้อนจากฝา IHS ของ CPU ออกสู่อากาศภายในเคส ป้องกันไม่ให้ CPU ร้อนจนต้องลดความเร็วหรือดับเครื่อง',
    en: 'Transfers heat from the IHS of the CPU into the air inside the case, preventing the CPU from throttling or shutting down from overheating.',
  },
  howItWorks: {
    beginner: {
      th: 'นึกถึงหม้อน้ำรถยนต์ เครื่องยนต์ร้อน (CPU) ส่งความร้อนให้ของไหลที่วิ่งไปยังแผงครีบบาง ๆ แล้วพัดลมก็เป่าลมผ่านครีบเพื่อพาความร้อนออกไป ชุดระบายความร้อนแบบลมใช้ฮีตไปป์เป็น "ทางด่วนความร้อน" จากฐานขึ้นไปยังครีบ ส่วนสารนำความร้อนที่ทาระหว่าง CPU กับฐานก็เหมือนกาวอุดร่องเล็ก ๆ ให้โลหะสองชิ้นแนบกันสนิท ความร้อนจึงข้ามไปได้ง่าย',
      en: 'Think of a car radiator: the hot engine (the CPU) passes heat to a fluid that travels to a block of thin fins, and a fan blows air through the fins to carry the heat off. An air cooler uses heat pipes as a heat motorway from the base up to the fins, and the thermal paste between the CPU and the base works like filler in tiny gaps so the two metal surfaces meet properly and heat crosses easily.',
    },
    technical: {
      th: 'ความร้อนเดินทางเป็นลำดับ: จากไดผ่านฝา IHS ผ่านวัสดุเชื่อมประสานความร้อน (TIM) เข้าสู่ฐานของชุดระบายความร้อนด้วยการนำความร้อน TIM มีหน้าที่แทนที่อากาศในร่องขรุขระระดับไมโครเมตรระหว่างผิวโลหะ เพราะอากาศนำความร้อนได้แย่มาก ภายในฮีตไปป์เป็นท่อทองแดงปิดผนึกความดันต่ำที่มีของเหลวทำงาน (มักเป็นน้ำ) ของเหลวระเหยที่ปลายร้อน ไอวิ่งไปควบแน่นที่ปลายเย็นในชุดครีบพร้อมคายความร้อนแฝง แล้วไหลกลับผ่านโครงสร้างไส้ตะเกียง (wick) ด้วยแรงแคปิลลารี ครีบอะลูมิเนียมเพิ่มพื้นที่ผิวให้พัดลมพาความร้อนออกด้วยการพาความร้อนแบบบังคับ ส่วนชุดน้ำปิด (AIO) ใช้ปั๊มหมุนเวียนน้ำหล่อเย็นจากแผ่นเย็น (cold plate) บน CPU ไปยังหม้อน้ำ (radiator) ที่ติดกับเคส ซึ่งให้พื้นที่ครีบมากกว่าและย้ายจุดปล่อยความร้อนไปที่ขอบเคสได้ การเลือกขนาดชุดระบายความร้อนอ้างอิงจากค่า TDP ของ CPU เป็นวัตต์ โดยความสามารถที่แท้จริงคือความต้านทานความร้อน (°C/W) ยิ่งต่ำยิ่งดี',
      en: 'Heat travels in stages: from the die through the IHS and the thermal interface material (TIM) into the cooler base by conduction. The TIM exists to replace the air in the micrometre-scale roughness between the metal surfaces, because air conducts heat very poorly. A heat pipe is a sealed, low-pressure copper tube containing a working fluid (usually water): it evaporates at the hot end, the vapour travels to the cool end inside the fin stack and condenses, releasing latent heat, then returns through a wick structure by capillary action. The aluminium fins add surface area so the fan can remove the heat by forced convection. An all-in-one (AIO) liquid cooler instead uses a pump to circulate coolant from a cold plate on the CPU to a radiator mounted on the case, which offers more fin area and moves the heat exhaust to the edge of the case. Coolers are sized against the TDP of the CPU in watts, while the real measure of capability is thermal resistance (°C/W), where lower is better.',
    },
  },
  structure: [
    {
      name: { th: 'ฐานทองแดง', en: 'Copper base' },
      desc: {
        th: 'แผ่นทองแดงผิวเรียบที่กดแนบกับฝา IHS ของ CPU รับความร้อนเป็นด่านแรกแล้วส่งต่อให้ฮีตไปป์',
        en: 'The flat copper plate pressed against the IHS of the CPU; it is the first to receive the heat and hands it on to the heat pipes.',
      },
    },
    {
      name: { th: 'สารนำความร้อน (TIM)', en: 'Thermal interface material (TIM)' },
      desc: {
        th: 'ชั้นบาง ๆ ระหว่างฝา CPU กับฐาน ทำหน้าที่เติมร่องเล็ก ๆ ที่มองไม่เห็นแทนอากาศ ควรทาบางและทั่ว ไม่ใช่ทาหนา',
        en: 'The thin layer between the CPU lid and the base that fills invisible gaps in place of air. It should be thin and even, never thick.',
      },
    },
    {
      name: { th: 'ฮีตไปป์ 4 เส้น', en: 'Four heat pipes' },
      desc: {
        th: 'ท่อทองแดงรูปตัว U ที่พาดผ่านฐานแล้วตั้งขึ้นทะลุชุดครีบ ใช้การระเหยและควบแน่นของของเหลวภายในเพื่อขนความร้อนอย่างรวดเร็ว',
        en: 'U-shaped copper tubes that pass through the base and rise through the fin stack, moving heat rapidly by evaporating and condensing the fluid inside.',
      },
    },
    {
      name: { th: 'ชุดครีบอะลูมิเนียม', en: 'Aluminium fin stack' },
      desc: {
        th: 'แผ่นอะลูมิเนียมบางจำนวนมากที่เรียงซ้อนกัน เพิ่มพื้นที่ผิวสัมผัสกับอากาศเพื่อให้คายความร้อนได้มาก',
        en: 'Dozens of thin aluminium plates stacked together to give a large surface area in contact with air so the heat can escape.',
      },
    },
    {
      name: { th: 'พัดลม 120 มม.', en: '120 mm fan' },
      desc: {
        th: 'พัดลมที่หนีบกับชุดครีบ เป่าลมผ่านครีบไปทางพัดลมท้ายเคส ต่อกับเฮดเดอร์ CPU_FAN แบบ 4 พิน เพื่อให้บอร์ดปรับรอบด้วยสัญญาณ PWM ตามอุณหภูมิ',
        en: 'The fan clipped to the fin stack, blowing through the fins toward the rear case fan. It plugs into the 4-pin CPU_FAN header so the board can vary its speed by PWM according to temperature.',
      },
    },
    {
      name: { th: 'ชุดขายึดและแผ่นรองหลัง', en: 'Mounting bracket and backplate' },
      desc: {
        th: 'ขายึดเฉพาะซ็อกเก็ตและแผ่นรองหลังเมนบอร์ด ทำให้ฐานกดลงบน CPU ด้วยแรงที่สม่ำเสมอและไม่ทำให้บอร์ดโก่ง',
        en: 'Socket-specific brackets and a plate behind the motherboard that press the base onto the CPU with even force without bending the board.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'ประเภท', en: 'Type' },
      value: {
        th: 'แบบลม (ทาวเวอร์เดี่ยว/คู่, โลว์โพรไฟล์) หรือแบบน้ำปิด AIO (หม้อน้ำ 120/240/280/360 มม.)',
        en: 'Air (single/dual tower, low-profile) or AIO liquid (120/240/280/360 mm radiator)',
      },
    },
    {
      label: { th: 'ความสามารถระบายความร้อน (TDP)', en: 'Cooling capacity (TDP rating)' },
      value: { th: 'ประมาณ 65–250 W ขึ้นไป', en: 'About 65–250 W and above' },
      note: {
        th: 'วิธีวัดของแต่ละผู้ผลิตไม่เหมือนกัน ใช้เป็นแนวทาง และควรเลือกให้สูงกว่า TDP ของ CPU',
        en: 'Makers measure this differently, so treat it as a guide and choose a figure above the TDP of the CPU.',
      },
    },
    {
      label: { th: 'ความสูงของชุดระบายความร้อน', en: 'Cooler height' },
      value: { th: 'ทาวเวอร์ 120 มม. ราว 150–165 มม. · โลว์โพรไฟล์ ราว 37–70 มม.', en: '120 mm towers about 150–165 mm · low-profile about 37–70 mm' },
      note: { th: 'ต้องไม่เกินค่า CPU cooler clearance ของเคส', en: 'Must not exceed the CPU cooler clearance of the case.' },
    },
    {
      label: { th: 'ขนาดและรอบพัดลม', en: 'Fan size and speed' },
      value: { th: '92, 120 หรือ 140 มม. ราว 500–2000 รอบต่อนาที', en: '92, 120 or 140 mm at about 500–2000 RPM' },
      note: { th: 'พัดลมใหญ่กว่าให้ลมเท่ากันที่รอบต่ำกว่า จึงเงียบกว่า', en: 'A larger fan moves the same air at lower speed and is therefore quieter.' },
    },
    {
      label: { th: 'ซ็อกเก็ตที่รองรับ', en: 'Socket support' },
      value: { th: 'เช่น AM4/AM5, LGA1700/LGA1851', en: 'e.g. AM4/AM5, LGA1700/LGA1851' },
      note: { th: 'ขึ้นกับชุดขายึดที่ให้มาในกล่อง', en: 'Depends on the mounting kit supplied in the box.' },
    },
    {
      label: { th: 'ค่าการนำความร้อนของสารนำความร้อน', en: 'Thermal paste conductivity' },
      value: { th: 'ประมาณ 4–12 W/m·K', en: 'About 4–12 W/m·K' },
      note: {
        th: 'ต่ำกว่าทองแดง (ราว 400 W/m·K) มาก จึงต้องทาให้บางที่สุดเท่าที่ยังเติมร่องได้เต็ม',
        en: 'Far below copper (about 400 W/m·K), which is why the layer must be as thin as will still fill the gaps.',
      },
    },
    {
      label: { th: 'ระดับเสียง', en: 'Noise level' },
      value: { th: 'ประมาณ 20–35 dBA', en: 'About 20–35 dBA' },
      note: { th: 'ขึ้นกับรอบพัดลมและเส้นโค้งพัดลม (fan curve) ที่ตั้งใน UEFI', en: 'Depends on fan speed and the fan curve set in UEFI.' },
    },
  ],
  connects: {
    th: 'ทางกายภาพ ชุดระบายความร้อนยึดกับเมนบอร์ดรอบซ็อกเก็ตด้วยขายึดและแผ่นรองหลัง ฐานกดแนบฝา IHS ของ CPU โดยมีสารนำความร้อนคั่น และสายพัดลมเสียบเฮดเดอร์ CPU_FAN (ชุด AIO ต่อปั๊มเข้าเฮดเดอร์ปั๊มและยึดหม้อน้ำกับเคส) ทางตรรกะ เซนเซอร์อุณหภูมิใน CPU รายงานค่าให้เฟิร์มแวร์ ซึ่งปรับรอบพัดลมตามเส้นโค้งที่ตั้งไว้ ลมร้อนที่ออกจากครีบจะถูกพัดลมท้ายเคสดูดออก การไหลของลมในเคสจึงเป็นส่วนหนึ่งของระบบระบายความร้อนเดียวกัน',
    en: 'Physically the cooler is fixed to the motherboard around the socket with brackets and a backplate, its base pressed against the IHS of the CPU with thermal paste in between, and its fan lead plugged into the CPU_FAN header (an AIO also connects its pump to a pump header and fixes its radiator to the case). Logically the temperature sensor inside the CPU reports to the firmware, which adjusts fan speed along the configured curve. The warm air leaving the fins is drawn out by the rear case fan, so case airflow is part of the same cooling system.',
  },
  related: ['cpu', 'motherboard', 'case', 'ram', 'gpu'],
  compatibility: [
    {
      th: 'ชุดขายึดต้องรองรับซ็อกเก็ตของเมนบอร์ด ซ็อกเก็ตต่างตระกูลมีระยะรูยึดไม่เท่ากัน และบางครั้งต้องขอชุดขายึดเพิ่มสำหรับซ็อกเก็ตรุ่นใหม่',
      en: 'The mounting kit must support the socket of the motherboard; socket families use different hole spacings, and a newer socket sometimes needs an extra bracket kit.',
    },
    {
      th: 'ความสูงของชุดระบายความร้อนแบบลมต้องไม่เกินค่า CPU cooler clearance (มม.) ของเคส ส่วนชุด AIO ต้องมีตำแหน่งติดหม้อน้ำขนาดที่ตรงกันในเคส',
      en: 'The height of an air cooler must not exceed the CPU cooler clearance (mm) of the case, and an AIO needs a radiator mount of matching size in the case.',
    },
    {
      th: 'ความสามารถระบายความร้อนต้องไม่ต่ำกว่ากำลังความร้อนของ CPU โดยเฉพาะรุ่นระดับบนที่กำลังไฟช่วงบูสต์สูงกว่าค่า TDP บนกล่อง',
      en: 'Cooling capacity must be at least the heat output of the CPU, especially for high-end models whose boost power exceeds the TDP printed on the box.',
    },
    {
      th: 'ชุดระบายความร้อนขนาดใหญ่อาจบังสล็อต RAM ช่องแรกหรือชนกับ RAM ที่มีแผ่นกระจายความร้อนสูง และอาจชิดกับฮีตซิงก์ VRM หรือการ์ดจอ ต้องตรวจระยะ',
      en: 'A large cooler may overhang the first RAM slot or collide with tall RAM heat spreaders, and may crowd the VRM heatsinks or the graphics card, so check the clearances.',
    },
  ],
  useCases: [
    {
      th: 'CPU ระดับ 65 W สำหรับงานทั่วไป: ชุดระบายความร้อนแบบลมขนาดเล็กหรือที่แถมมากับ CPU ก็เพียงพอ',
      en: 'A 65 W class CPU for everyday work: a small air cooler or the one bundled with the CPU is enough.',
    },
    {
      th: 'เครื่องเล่นเกมและงานตัดต่อ: ชุดระบายความร้อนแบบลมทรงทาวเวอร์ 120–140 มม. ให้สมดุลที่ดีระหว่างอุณหภูมิ เสียง ราคา และความทนทาน',
      en: 'Gaming and editing PCs: a 120–140 mm tower air cooler balances temperature, noise, price and reliability well.',
    },
    {
      th: 'CPU ระดับบนที่ทำงานโหลดเต็มนาน ๆ หรือเคสที่พื้นที่รอบซ็อกเก็ตจำกัด: ชุดน้ำปิด AIO ขนาด 240–360 มม. ที่ย้ายจุดปล่อยความร้อนไปไว้ที่ขอบเคส',
      en: 'High-end CPUs under long full loads, or cases with little room around the socket: a 240–360 mm AIO that moves the heat exhaust to the edge of the case.',
    },
  ],
  problems: [
    {
      symptom: { th: 'อุณหภูมิ CPU สูงผิดปกติแม้ไม่ได้ใช้งานหนัก', en: 'CPU temperature is abnormally high even at light load.' },
      check: {
        th: 'ตรวจว่าขายึดขันแน่นและสม่ำเสมอทุกมุม ฐานแนบสนิท ลอกฟิล์มพลาสติกที่ฐานออกแล้ว และสารนำความร้อนไม่แห้งหรือทาไม่ทั่ว ถ้าสงสัยให้เช็ดออกแล้วทาใหม่',
        en: 'Check that the mount is tightened evenly at every corner, the base sits flat, the protective film was peeled off the base, and the paste is not dried out or patchy; if in doubt, clean it off and reapply.',
      },
    },
    {
      symptom: { th: 'ขึ้นข้อความ CPU Fan Error ตอนบูต หรือพัดลมไม่หมุน', en: 'A CPU Fan Error message at boot, or the fan does not spin.' },
      check: {
        th: 'ตรวจว่าสายพัดลมเสียบที่เฮดเดอร์ CPU_FAN ไม่ใช่เฮดเดอร์อื่น ดูว่าไม่มีสายไปขัดใบพัด แล้วตรวจรอบพัดลมในหน้า UEFI',
        en: 'Confirm the fan lead is on the CPU_FAN header and not another one, make sure no cable is blocking the blades, then read the fan speed in UEFI.',
      },
    },
    {
      symptom: { th: 'พัดลมดังมากหรือมีเสียงครืดคราด', en: 'The fan is very loud or makes a rattling noise.' },
      check: {
        th: 'เป่าฝุ่นออกจากครีบและใบพัด ปรับเส้นโค้งพัดลมใน UEFI และถ้าเสียงมาจากลูกปืนพัดลมที่สึกให้เปลี่ยนพัดลม',
        en: 'Blow dust out of the fins and blades, adjust the fan curve in UEFI, and replace the fan if the noise comes from a worn bearing.',
      },
    },
    {
      symptom: { th: 'ชุด AIO มีเสียงน้ำไหลหรือฟองอากาศ และอุณหภูมิพุ่งขึ้นเร็ว', en: 'An AIO gurgles or bubbles and the temperature climbs quickly.' },
      check: {
        th: 'ดูรอบปั๊มใน UEFI ว่าปั๊มยังทำงานอยู่หรือไม่ ตรวจว่าสายปั๊มเสียบเฮดเดอร์ที่จ่ายไฟเต็ม และจัดตำแหน่งให้ปั๊มไม่ใช่จุดสูงสุดของวงจรน้ำ เพื่อไม่ให้อากาศไปค้างที่ปั๊ม',
        en: 'Check the pump speed in UEFI to see whether the pump is still running, confirm its lead is on a header giving full power, and arrange the loop so the pump is not its highest point, where air would collect.',
      },
    },
  ],
  safety: [
    {
      th: 'ปิดเครื่อง ถอดปลั๊ก และรอให้ฮีตซิงก์เย็นก่อนจับ ครีบอะลูมิเนียมบางและคม อาจบาดมือได้',
      en: 'Power off, unplug and let the heatsink cool before touching it; the thin aluminium fins are sharp and can cut.',
    },
    {
      th: 'เวลาถอด ให้คลายสกรูสลับมุมทีละน้อย แล้วบิดชุดระบายความร้อนเบา ๆ ให้สารนำความร้อนคลายตัวก่อนยกขึ้น การดึงตรง ๆ อาจทำให้ CPU หลุดติดขึ้นมาและขาเสียหาย โดยเฉพาะซ็อกเก็ตแบบขา PGA เช่น AM4 (ซ็อกเก็ตแบบ LGA อย่าง AM5 มีโครงล็อก CPU ไว้)',
      en: 'When removing, loosen the screws a little at a time in a cross pattern, then twist the cooler gently to break the paste bond before lifting; pulling straight up can drag the CPU out and damage pins, especially on PGA sockets such as AM4 (LGA sockets such as AM5 hold the CPU under a retention frame).',
    },
    {
      th: 'ห้ามเปิดเครื่องโดยไม่มีชุดระบายความร้อน ห้ามเปิดวงจรน้ำของ AIO และถ้าใช้โลหะเหลว (liquid metal) ต้องระวังเป็นพิเศษ เพราะนำไฟฟ้าและกัดกร่อนอะลูมิเนียม',
      en: 'Never run the PC without a cooler, never open the sealed loop of an AIO, and take special care with liquid metal, which conducts electricity and attacks aluminium.',
    },
  ],
  vocab: [
    {
      en: 'Heatsink',
      th: 'ฮีตซิงก์',
      meaning: {
        th: 'ชิ้นโลหะที่มีครีบจำนวนมากสำหรับรับความร้อนจากชิปแล้วคายสู่อากาศ',
        en: 'A finned piece of metal that absorbs heat from a chip and releases it to the air.',
      },
    },
    {
      en: 'Heat pipe',
      th: 'ฮีตไปป์ (ท่อนำความร้อน)',
      meaning: {
        th: 'ท่อปิดผนึกที่ขนความร้อนด้วยการระเหยและควบแน่นของของเหลวภายใน',
        en: 'A sealed tube that transports heat by evaporating and condensing the fluid inside it.',
      },
    },
    {
      en: 'Thermal interface material (TIM)',
      th: 'วัสดุเชื่อมประสานความร้อน',
      meaning: {
        th: 'วัสดุ เช่น สารนำความร้อนหรือแผ่นเทอร์มัลแพด ที่เติมช่องว่างระหว่างผิวสองชิ้นเพื่อให้ความร้อนผ่านได้ดีขึ้น',
        en: 'A material such as thermal paste or a thermal pad that fills the gap between two surfaces so heat passes more easily.',
      },
    },
    {
      en: 'All-in-one (AIO) liquid cooler',
      th: 'ชุดน้ำปิด',
      meaning: {
        th: 'ชุดระบายความร้อนด้วยของเหลวสำเร็จรูปที่รวมแผ่นเย็น ปั๊ม ท่อ และหม้อน้ำ ปิดผนึกมาจากโรงงาน',
        en: 'A factory-sealed liquid cooler combining cold plate, pump, tubes and radiator.',
      },
    },
    {
      en: 'Thermal throttling',
      th: 'การลดความเร็วเพราะความร้อน',
      meaning: {
        th: 'การที่ CPU ลดความถี่และกำลังไฟลงเองเมื่ออุณหภูมิถึงขีดจำกัด เพื่อป้องกันความเสียหาย',
        en: 'The CPU lowering its own frequency and power when it reaches its temperature limit, to protect itself.',
      },
    },
    {
      en: 'PWM fan control',
      th: 'การควบคุมพัดลมแบบ PWM',
      meaning: {
        th: 'การปรับรอบพัดลม 4 พินด้วยสัญญาณพัลส์ ทำให้บอร์ดเร่งหรือผ่อนพัดลมตามอุณหภูมิได้',
        en: 'Speed control of a 4-pin fan by a pulsed signal, letting the board speed the fan up or down with temperature.',
      },
    },
  ],
  facts: [
    {
      th: 'อากาศนำความร้อนได้เพียงราว 0.026 W/m·K ขณะที่ทองแดงนำได้ราว 400 W/m·K ช่องอากาศบาง ๆ ระหว่าง CPU กับฐานจึงเป็นฉนวนที่ร้ายมาก และนี่คือเหตุผลที่ต้องใช้สารนำความร้อน',
      en: 'Air conducts heat at only about 0.026 W/m·K while copper manages about 400 W/m·K, so even a thin air gap between CPU and base is a serious insulator, which is exactly why thermal paste is needed.',
    },
    {
      th: 'ภายในฮีตไปป์มีความดันต่ำกว่าบรรยากาศ น้ำจึงเดือดที่อุณหภูมิต่ำกว่า 100 °C มาก และการระเหยกับควบแน่นทำให้ฮีตไปป์ขนความร้อนได้ดีกว่าแท่งทองแดงตันขนาดเท่ากันหลายเท่า',
      en: 'The inside of a heat pipe is below atmospheric pressure, so water boils far below 100 °C, and the evaporation-condensation cycle lets a heat pipe move heat many times better than a solid copper rod of the same size.',
    },
    {
      th: 'ชุดระบายความร้อนไม่ได้ทำให้ความร้อนหายไป เพียงย้ายความร้อนจาก CPU ไปสู่อากาศ และไม่ว่าจะแบบลมหรือแบบน้ำก็ไม่สามารถทำให้ CPU เย็นกว่าอุณหภูมิอากาศรอบข้างได้',
      en: 'A cooler does not destroy heat; it only moves it from the CPU into the air, and neither an air nor a liquid cooler can bring the CPU below the surrounding air temperature.',
    },
  ],
  review: [
    {
      q: { th: 'ทำไมต้องทาสารนำความร้อนระหว่าง CPU กับฐานชุดระบายความร้อน', en: 'Why is thermal paste applied between the CPU and the cooler base?' },
      a: {
        th: 'เพื่อเติมร่องขรุขระเล็ก ๆ ระหว่างผิวโลหะแทนอากาศ ซึ่งนำความร้อนได้แย่มาก ทำให้ความร้อนถ่ายเทได้ดีขึ้น',
        en: 'To fill the microscopic roughness between the metal surfaces in place of air, a very poor heat conductor, so heat transfers more effectively.',
      },
    },
    {
      q: { th: 'ฮีตไปป์ขนความร้อนได้อย่างไร', en: 'How does a heat pipe move heat?' },
      a: {
        th: 'ของเหลวภายในระเหยที่ปลายร้อน ไอไปควบแน่นและคายความร้อนที่ปลายเย็น แล้วไหลกลับผ่านไส้ตะเกียงด้วยแรงแคปิลลารี',
        en: 'The fluid inside evaporates at the hot end, the vapour condenses and gives up heat at the cool end, and the liquid returns through the wick by capillary action.',
      },
    },
    {
      q: { th: 'ชุดระบายความร้อนแบบลมกับแบบ AIO ต่างกันตรงไหน', en: 'How do an air cooler and an AIO differ?' },
      a: {
        th: 'แบบลมใช้ฮีตไปป์พาความร้อนไปยังครีบที่อยู่เหนือ CPU ส่วน AIO ใช้ปั๊มส่งน้ำหล่อเย็นไปยังหม้อน้ำที่ติดกับเคส',
        en: 'An air cooler uses heat pipes to carry heat to fins directly above the CPU, while an AIO pumps coolant to a radiator mounted on the case.',
      },
    },
  ],
};
