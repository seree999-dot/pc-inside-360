import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'hdd',
  name: { th: 'ฮาร์ดดิสก์ไดรฟ์', en: 'Hard Disk Drive' },
  abbr: 'HDD',
  category: 'storage',
  overview: {
    th: 'ฮาร์ดดิสก์ไดรฟ์ (HDD) คือที่เก็บข้อมูลถาวรที่บันทึกข้อมูลด้วยสนามแม่เหล็กลงบนจานหมุน เป็นอุปกรณ์เชิงกล จึงช้ากว่า SSD แต่มีราคาต่อความจุต่ำ เหมาะกับการเก็บข้อมูลปริมาณมาก ในโมเดล 3 มิติเป็นไดรฟ์ขนาด 3.5 นิ้วแบบ SATA ในช่องด้านล่างของเคส และกด reveal เพื่อเปิดฝาดูจานกับแขนหัวอ่านได้',
    en: 'A hard disk drive (HDD) is permanent storage that records data magnetically on spinning platters. Being mechanical, it is slower than an SSD but costs far less per gigabyte, which suits bulk storage. In the 3D model it is the 3.5-inch SATA drive in the lower bay of the case, and the reveal toggle removes the lid to show the platters and actuator.',
  },
  mainFunction: {
    th: 'เก็บไฟล์จำนวนมาก เช่น วิดีโอ ภาพถ่าย และข้อมูลสำรอง ไว้อย่างถาวรด้วยต้นทุนต่อเทระไบต์ที่ต่ำ',
    en: 'Stores large amounts of files such as video, photos and backups permanently at a low cost per terabyte.',
  },
  howItWorks: {
    beginner: {
      th: 'ฮาร์ดดิสก์ทำงานคล้ายเครื่องเล่นแผ่นเสียง จานกลมหมุนอยู่ตลอดเวลาและมีแขนที่ปลายติดหัวอ่านเลื่อนเข้าออกเพื่อไปยังตำแหน่งข้อมูล ต่างกันตรงที่หัวอ่านไม่ได้แตะจาน แต่ลอยอยู่เหนือผิวจานเพียงนิดเดียว และใช้แม่เหล็กแทนร่องเสียง การที่ต้องรอแขนเลื่อนและรอจานหมุนมาถึงตำแหน่งนี่เองที่ทำให้ HDD ช้ากว่า SSD',
      en: 'A hard disk works rather like a record player: a round disc spins continuously while an arm with a head on its tip swings in and out to reach the data. The difference is that the head never touches the disc but floats a hair above its surface, and it uses magnetism instead of a groove. Waiting for the arm to move and the disc to rotate into position is exactly what makes an HDD slower than an SSD.',
    },
    technical: {
      th: 'จานแม่เหล็ก (platter) ทำจากอะลูมิเนียมหรือแก้วเคลือบชั้นสารแม่เหล็กบาง ๆ หมุนด้วยมอเตอร์แกน (spindle) ที่ความเร็วคงที่ เช่น 5400 หรือ 7200 รอบต่อนาที ข้อมูลจัดเป็นแทร็กวงกลมซ้อนกันและแบ่งเป็นเซกเตอร์ หัวเขียนสร้างสนามแม่เหล็กเพื่อกลับทิศของโดเมนแม่เหล็กบนผิวจาน ส่วนหัวอ่านตรวจจับทิศสนามด้วยปรากฏการณ์แมกนีโตรีซิสแตนซ์ แขนหัวอ่านขับด้วยแอกทูเอเตอร์แบบวอยซ์คอยล์ซึ่งเลื่อนหัวไปยังแทร็กที่ต้องการภายในไม่กี่มิลลิวินาที เวลาเข้าถึงข้อมูลจึงเท่ากับเวลาค้นหาแทร็ก (seek time) บวกเวลารอจานหมุน (rotational latency) ทำให้การอ่านแบบสุ่มช้ากว่า SSD หลายร้อยเท่า การบันทึกมีสองแบบหลัก: CMR เขียนแทร็กแยกจากกัน ส่วน SMR เขียนแทร็กซ้อนเหลื่อมกันเหมือนกระเบื้องหลังคาเพื่อเพิ่มความจุ แต่การเขียนทับต้องเขียนแทร็กข้างเคียงใหม่ด้วย จึงช้าเมื่อเขียนต่อเนื่องปริมาณมาก',
      en: 'The platters are aluminium or glass discs coated with a thin magnetic layer, turned by a spindle motor at constant speed such as 5400 or 7200 RPM. Data is laid out in concentric tracks divided into sectors. The write head generates a magnetic field that flips the orientation of magnetic domains on the surface, and the read head senses those orientations through the magnetoresistive effect. A voice-coil actuator swings the head arm to the required track within a few milliseconds, so access time is seek time plus rotational latency, which makes random reads hundreds of times slower than on an SSD. There are two main recording methods: CMR writes separate tracks, while SMR overlaps tracks like roof shingles to gain capacity, at the cost of having to rewrite neighbouring tracks on an overwrite, which makes sustained writing slow.',
    },
  },
  structure: [
    {
      name: { th: 'จานแม่เหล็ก (platter)', en: 'Platters' },
      desc: {
        th: 'จานกลมผิวเงาเหมือนกระจกที่ซ้อนกันบนแกนเดียว เป็นที่เก็บข้อมูลจริงทั้งสองหน้าของจาน ยิ่งมีหลายจานความจุยิ่งมาก',
        en: 'Mirror-smooth discs stacked on one spindle; data is stored on both faces of each, and more platters mean more capacity.',
      },
    },
    {
      name: { th: 'มอเตอร์แกนหมุน (spindle motor)', en: 'Spindle motor' },
      desc: {
        th: 'มอเตอร์กลางจานที่หมุนจานด้วยความเร็วคงที่ เป็นที่มาของเสียงหึ่งเบา ๆ และแรงสั่นเล็กน้อยของไดรฟ์',
        en: 'The motor at the hub that spins the platters at constant speed; it is the source of the soft hum and slight vibration of the drive.',
      },
    },
    {
      name: { th: 'แขนแอกทูเอเตอร์และหัวอ่าน/เขียน', en: 'Actuator arm and read/write heads' },
      desc: {
        th: 'แขนโลหะที่กวาดเหนือจาน ปลายแขนมีหัวอ่าน/เขียนขนาดจิ๋วหนึ่งหัวต่อหนึ่งหน้าจาน ลอยอยู่บนชั้นอากาศบางมากโดยไม่แตะผิวจาน',
        en: 'The metal arm that sweeps over the platters, tipped with one tiny read/write head per surface, riding on an extremely thin cushion of air without touching the disc.',
      },
    },
    {
      name: { th: 'วอยซ์คอยล์และแม่เหล็กถาวร', en: 'Voice coil and permanent magnets' },
      desc: {
        th: 'ขดลวดที่โคนแขนซึ่งอยู่ระหว่างแม่เหล็กถาวรกำลังสูง เมื่อจ่ายกระแสจะเกิดแรงผลักแขนให้เลื่อนไปยังแทร็กที่ต้องการอย่างแม่นยำ',
        en: 'A coil at the base of the arm sitting between strong permanent magnets; current through it produces the force that swings the arm precisely to the target track.',
      },
    },
    {
      name: { th: 'ขั้วต่อ SATA (ข้อมูลและไฟ)', en: 'SATA connectors (data and power)' },
      desc: {
        th: 'ขั้วรูปตัว L สองขั้วที่ท้ายไดรฟ์ ขั้วสั้น 7 พินสำหรับสายข้อมูลไปเมนบอร์ด ขั้วยาว 15 พินสำหรับสายไฟจาก PSU',
        en: 'Two L-shaped connectors at the rear: the short 7-pin one for the data cable to the motherboard and the long 15-pin one for power from the PSU.',
      },
    },
    {
      name: { th: 'แผงวงจรควบคุมและตัวถังปิดผนึก', en: 'Controller board and sealed enclosure' },
      desc: {
        th: 'แผงวงจรใต้ไดรฟ์ควบคุมมอเตอร์ แอกทูเอเตอร์ และการแปลงสัญญาณ ส่วนตัวถังโลหะปิดผนึกกันฝุ่นเข้าไปในห้องจาน',
        en: 'The circuit board underneath drives the motor and actuator and processes the signals, while the sealed metal enclosure keeps dust out of the platter chamber.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'ฟอร์มแฟกเตอร์', en: 'Form factor' },
      value: { th: '3.5 นิ้ว (เดสก์ท็อป) · 2.5 นิ้ว (โน้ตบุ๊กและไดรฟ์พกพา)', en: '3.5-inch (desktop) · 2.5-inch (laptop and portable drives)' },
    },
    {
      label: { th: 'ความจุ', en: 'Capacity' },
      value: { th: '1–30 TB ขึ้นไป (ขนาด 3.5 นิ้ว)', en: '1–30 TB and beyond (3.5-inch)' },
      note: { th: 'รุ่นความจุสูงมักบรรจุก๊าซฮีเลียมเพื่อใส่จานได้มากขึ้น ช่วงปี 2025–2026 มีรุ่นระดับองค์กรขนาด 30–36 TB ที่ใช้เทคโนโลยี HAMR หรือ ePMR', en: 'High-capacity models are usually helium-filled so that more platters fit; by 2025–2026 enterprise models reach 30–36 TB using HAMR or ePMR recording.' },
    },
    {
      label: { th: 'ความเร็วรอบ', en: 'Rotational speed' },
      value: { th: '5400 หรือ 7200 รอบต่อนาที (RPM)', en: '5400 or 7200 RPM' },
      note: { th: 'รอบสูงกว่าอ่านเขียนเร็วกว่า แต่ร้อนและดังกว่าเล็กน้อย', en: 'Higher speed reads and writes faster but runs slightly hotter and louder.' },
    },
    {
      label: { th: 'อินเทอร์เฟซ', en: 'Interface' },
      value: { th: 'SATA III (6 Gb/s)', en: 'SATA III (6 Gb/s)' },
      note: { th: 'ไดรฟ์ระดับองค์กรบางรุ่นใช้ SAS', en: 'Some enterprise drives use SAS instead.' },
    },
    {
      label: { th: 'ความเร็วอ่านเขียนต่อเนื่อง', en: 'Sequential transfer rate' },
      value: { th: 'ประมาณ 100–280 MB/s', en: 'About 100–280 MB/s' },
      note: {
        th: 'ต่ำกว่าขีดจำกัดของ SATA III; แทร็กด้านนอกของจานเร็วกว่าด้านใน เพราะผิวจานเคลื่อนผ่านหัวอ่านเร็วกว่า',
        en: 'Below the SATA III ceiling; outer tracks are faster than inner ones because the surface passes the head more quickly.',
      },
    },
    {
      label: { th: 'เทคโนโลยีการบันทึก', en: 'Recording technology' },
      value: { th: 'CMR หรือ SMR', en: 'CMR or SMR' },
      note: {
        th: 'CMR เหมาะกับงานเขียนบ่อยและ NAS/RAID ส่วน SMR เหมาะกับการเก็บถาวรที่เขียนครั้งเดียวอ่านหลายครั้ง',
        en: 'CMR suits frequent writes and NAS/RAID; SMR suits archives that are written once and read many times.',
      },
    },
    {
      label: { th: 'บัฟเฟอร์ (cache)', en: 'Buffer (cache)' },
      value: { th: '64–512 MB', en: '64–512 MB' },
      note: { th: 'หน่วยความจำพักข้อมูลบนแผงวงจรของไดรฟ์', en: 'Temporary memory on the drive circuit board.' },
    },
  ],
  connects: {
    th: 'ทางกายภาพ HDD ยึดในช่องไดรฟ์ 3.5 นิ้วของเคสด้วยสกรูหรือถาดเลื่อน ต่อสายข้อมูล SATA ไปยังพอร์ต SATA บนเมนบอร์ด และต่อสายไฟ SATA จาก PSU ซึ่งจ่ายทั้ง +12 V สำหรับมอเตอร์และ +5 V สำหรับวงจร ทางตรรกะ ไดรฟ์สื่อสารผ่านตัวควบคุม SATA ของชิปเซ็ตด้วยโพรโทคอล AHCI ระบบปฏิบัติการมองเห็นเป็นอุปกรณ์เก็บข้อมูลแบบบล็อกเช่นเดียวกับ SSD และมักใช้คู่กัน: SSD เป็นไดรฟ์ระบบ ส่วน HDD เป็นไดรฟ์เก็บข้อมูล',
    en: 'Physically the HDD is fixed in a 3.5-inch bay of the case with screws or a sled, with a SATA data cable to a SATA port on the motherboard and a SATA power cable from the PSU, which supplies +12 V for the motor and +5 V for the electronics. Logically the drive talks to the SATA controller in the chipset using AHCI, and the operating system sees it as a block storage device just like an SSD. The two are often paired: SSD as system drive, HDD as data drive.',
  },
  related: ['ssd', 'motherboard', 'psu', 'case', 'optical'],
  compatibility: [
    {
      th: 'เมนบอร์ดต้องมีพอร์ต SATA ว่าง และ PSU ต้องมีขั้วไฟ SATA ว่าง สาย SATA รุ่นต่าง ๆ ใช้ร่วมกันได้ โดยทำงานที่ความเร็วของฝั่งที่ช้ากว่า',
      en: 'The motherboard needs a free SATA port and the PSU a free SATA power plug. SATA generations interoperate at the speed of the slower side.',
    },
    {
      th: 'เคสต้องมีช่องไดรฟ์ 3.5 นิ้ว เคสขนาดเล็กหรือเคสรุ่นใหม่บางรุ่นมีเพียงหนึ่งหรือสองช่อง หรือไม่มีเลย',
      en: 'The case must have a 3.5-inch bay; small or some recent cases offer only one or two, or none at all.',
    },
    {
      th: 'บนบางบอร์ด พอร์ต SATA บางพอร์ตจะถูกปิดเมื่อใช้ช่อง M.2 บางช่อง ต้องตรวจตารางในคู่มือเมนบอร์ด',
      en: 'On some boards certain SATA ports are disabled when a particular M.2 socket is in use; check the table in the motherboard manual.',
    },
    {
      th: 'เลือก CMR สำหรับงานที่เขียนข้อมูลบ่อยหรือใช้ใน RAID/NAS เพราะไดรฟ์ SMR อาจช้ามากระหว่างการสร้างอาร์เรย์ใหม่',
      en: 'Choose CMR for write-heavy work or RAID/NAS use, because SMR drives can become extremely slow during an array rebuild.',
    },
  ],
  useCases: [
    {
      th: 'คลังไฟล์ขนาดใหญ่: เก็บวิดีโอ ภาพถ่าย และชุดข้อมูลหลายเทระไบต์ด้วยต้นทุนต่ำ โดยให้ SSD ทำหน้าที่ไดรฟ์ระบบ',
      en: 'Bulk file library: holds terabytes of video, photos and datasets cheaply while an SSD serves as the system drive.',
    },
    {
      th: 'สำรองข้อมูล: ใช้เป็นปลายทางของการสำรองข้อมูลประจำ ทั้งแบบติดตั้งภายในและแบบไดรฟ์ภายนอก',
      en: 'Backup: serves as the target of regular backups, either installed internally or as an external drive.',
    },
    {
      th: 'NAS และระบบกล้องวงจรปิด: ไดรฟ์ที่ออกแบบให้ทำงานต่อเนื่อง 24 ชั่วโมง ใช้เก็บไฟล์ส่วนกลางหรือบันทึกวิดีโอตลอดเวลา',
      en: 'NAS and surveillance recorders: drives rated for 24-hour operation hold shared files or record video continuously.',
    },
  ],
  problems: [
    {
      symptom: { th: 'มีเสียงคลิกซ้ำ ๆ หรือเสียงครูดจากไดรฟ์', en: 'Repeated clicking or grinding noises from the drive.' },
      check: {
        th: 'เป็นสัญญาณว่าหัวอ่านหรือกลไกกำลังเสีย ให้หยุดใช้งานและสำรองข้อมูลทันทีหากยังอ่านได้ อย่าเปิดปิดเครื่องซ้ำ ๆ และถ้าข้อมูลสำคัญให้ส่งผู้เชี่ยวชาญกู้ข้อมูล',
        en: 'This signals failing heads or mechanics: stop using the drive and back up at once if it still reads, avoid repeated power cycles, and send it to a recovery specialist if the data matters.',
      },
    },
    {
      symptom: { th: 'UEFI หรือระบบปฏิบัติการไม่พบไดรฟ์', en: 'UEFI or the operating system does not detect the drive.' },
      check: {
        th: 'ตรวจว่าเสียบทั้งสายข้อมูลและสายไฟ SATA แน่น แตะตัวไดรฟ์ว่ามีแรงสั่นจากการหมุนหรือไม่ จากนั้นลองเปลี่ยนสายและพอร์ต SATA และตรวจว่าพอร์ตนั้นไม่ได้ถูกปิดใน UEFI',
        en: 'Check that both the SATA data and power cables are firmly connected, feel the drive for spin vibration, then try another cable and SATA port and make sure the port is not disabled in UEFI.',
      },
    },
    {
      symptom: { th: 'เครื่องช้ามาก ค้างเป็นช่วง ๆ หรือคัดลอกไฟล์แล้วเกิดข้อผิดพลาด', en: 'Very slow system, periodic freezes or errors while copying files.' },
      check: {
        th: 'อ่านค่า S.M.A.R.T. โดยดูจำนวน reallocated sectors และ pending sectors ถ้าเพิ่มขึ้นเรื่อย ๆ ให้สำรองข้อมูลและเปลี่ยนไดรฟ์ แล้วตรวจระบบไฟล์ด้วย chkdsk',
        en: 'Read the S.M.A.R.T. data, watching reallocated and pending sector counts; if they keep rising, back up and replace the drive, and check the file system with chkdsk.',
      },
    },
    {
      symptom: { th: 'ไดรฟ์ใหม่ไม่ปรากฏใน File Explorer', en: 'A new drive does not show up in File Explorer.' },
      check: {
        th: 'เปิด Disk Management เพื่อ initialize เป็น GPT สร้างพาร์ทิชัน และฟอร์แมต ไดรฟ์ที่ใหญ่กว่า 2 TB ต้องใช้ GPT จึงจะใช้พื้นที่ได้เต็ม',
        en: 'Open Disk Management, initialise the disk as GPT, create a partition and format it; drives larger than 2 TB need GPT to use their full capacity.',
      },
    },
  ],
  safety: [
    {
      th: 'ห้ามเปิดฝาไดรฟ์จริง ฝุ่นเพียงเม็ดเดียวก็ทำให้หัวอ่านชนผิวจานและข้อมูลเสียหายถาวร การเปิดฝาในแอปเป็นการจำลองเพื่อการเรียนรู้เท่านั้น',
      en: 'Never open a real drive: a single dust particle can make a head crash into the platter and destroy data permanently. Removing the lid in the app is a simulation for learning only.',
    },
    {
      th: 'ห้ามเคลื่อนย้าย กระแทก หรือเอียงไดรฟ์ขณะกำลังหมุน ปิดเครื่อง ถอดปลั๊ก และรอให้จานหยุดหมุนก่อนถอด',
      en: 'Do not move, knock or tilt the drive while it is spinning; shut down, unplug and wait for the platters to stop before removing it.',
    },
    {
      th: 'คายประจุไฟฟ้าสถิต (ESD) ก่อนจับ จับที่ด้านข้างของตัวถัง ไม่แตะแผงวงจรด้านล่าง และยึดสกรูให้ครบเพื่อลดการสั่น',
      en: 'Discharge static (ESD) before handling, hold the drive by its sides rather than the circuit board underneath, and fit all mounting screws to limit vibration.',
    },
  ],
  vocab: [
    {
      en: 'Platter',
      th: 'จานแม่เหล็ก',
      meaning: {
        th: 'จานแข็งเคลือบสารแม่เหล็กที่ใช้บันทึกข้อมูลภายในฮาร์ดดิสก์',
        en: 'The rigid magnetically coated disc on which a hard disk records data.',
      },
    },
    {
      en: 'Actuator',
      th: 'แอกทูเอเตอร์',
      meaning: {
        th: 'กลไกที่เลื่อนแขนหัวอ่านไปยังแทร็กที่ต้องการ ขับด้วยวอยซ์คอยล์',
        en: 'The mechanism that swings the head arm to the required track, driven by a voice coil.',
      },
    },
    {
      en: 'Seek time',
      th: 'เวลาค้นหา',
      meaning: {
        th: 'เวลาที่หัวอ่านใช้เลื่อนไปถึงแทร็กที่มีข้อมูล',
        en: 'The time the head takes to move to the track holding the data.',
      },
    },
    {
      en: 'RPM (revolutions per minute)',
      th: 'รอบต่อนาที',
      meaning: {
        th: 'ความเร็วการหมุนของจาน มีผลต่อความเร็วอ่านเขียนและเวลารอจานหมุน',
        en: 'The rotation speed of the platters, which affects transfer rate and rotational delay.',
      },
    },
    {
      en: 'CMR / SMR',
      th: 'การบันทึกแบบ CMR / SMR',
      meaning: {
        th: 'CMR เขียนแทร็กแยกกัน ส่วน SMR เขียนแทร็กซ้อนเหลื่อมกันเพื่อเพิ่มความจุ แลกกับการเขียนทับที่ช้าลง',
        en: 'CMR writes separate tracks; SMR overlaps tracks to gain capacity in exchange for slower rewrites.',
      },
    },
    {
      en: 'S.M.A.R.T.',
      th: 'ระบบรายงานสุขภาพไดรฟ์',
      meaning: {
        th: 'ระบบที่ไดรฟ์ใช้บันทึกและรายงานค่าสุขภาพของตัวเอง เช่น จำนวนเซกเตอร์เสีย เพื่อเตือนก่อนไดรฟ์พัง',
        en: 'The system by which a drive records and reports its own health indicators, such as bad sector counts, to warn before failure.',
      },
    },
  ],
  facts: [
    {
      th: 'หัวอ่านลอยเหนือผิวจานเพียงไม่กี่นาโนเมตร น้อยกว่าความหนาของเส้นผมมนุษย์หลายหมื่นเท่า โดยอาศัยชั้นอากาศที่เกิดจากการหมุนของจานพยุงไว้',
      en: 'The head flies only a few nanometres above the platter, tens of thousands of times less than the width of a human hair, supported by the cushion of air the spinning disc drags along.',
    },
    {
      th: 'ที่ 7200 รอบต่อนาที จานหมุน 120 รอบต่อวินาที และขอบนอกของจานขนาด 3.5 นิ้วเคลื่อนที่เร็วกว่า 100 กิโลเมตรต่อชั่วโมง',
      en: 'At 7200 RPM the platters turn 120 times per second, and the outer edge of a 3.5-inch platter moves at more than 100 km/h.',
    },
    {
      th: 'ไดรฟ์ความจุสูงบรรจุก๊าซฮีเลียมแทนอากาศ ฮีเลียมมีความหนาแน่นราวหนึ่งในเจ็ดของอากาศ จึงลดแรงต้านและการสั่น ทำให้ใช้จานที่บางลงและใส่จานได้มากขึ้น',
      en: 'High-capacity drives are filled with helium instead of air. Helium is about one seventh as dense, which cuts drag and flutter and allows thinner platters, and more of them.',
    },
  ],
  review: [
    {
      q: { th: 'ทำไม HDD จึงช้ากว่า SSD มากในการอ่านแบบสุ่ม', en: 'Why is an HDD so much slower than an SSD at random reads?' },
      a: {
        th: 'เพราะต้องรอแขนหัวอ่านเลื่อนไปยังแทร็ก (seek time) และรอจานหมุนมาถึงตำแหน่ง (rotational latency) ส่วน SSD ไม่มีชิ้นส่วนเคลื่อนไหว',
        en: 'It must wait for the head arm to reach the track (seek time) and for the platter to rotate into position (rotational latency), whereas an SSD has no moving parts.',
      },
    },
    {
      q: { th: 'CMR กับ SMR ต่างกันอย่างไร', en: 'How do CMR and SMR differ?' },
      a: {
        th: 'CMR เขียนแทร็กแยกจากกัน เขียนทับได้เร็ว ส่วน SMR เขียนแทร็กซ้อนเหลื่อมกันเพื่อเพิ่มความจุ แต่เขียนทับช้าเพราะต้องเขียนแทร็กข้างเคียงใหม่',
        en: 'CMR writes separate tracks and rewrites quickly; SMR overlaps tracks for more capacity but rewrites slowly because neighbouring tracks must be written again.',
      },
    },
    {
      q: { th: 'HDD ต้องต่อสายอะไรบ้าง', en: 'Which cables does an HDD need?' },
      a: {
        th: 'สองเส้น คือสายข้อมูล SATA ไปยังเมนบอร์ด และสายไฟ SATA จาก PSU',
        en: 'Two: a SATA data cable to the motherboard and a SATA power cable from the PSU.',
      },
    },
  ],
};
