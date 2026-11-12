import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'ssd',
  name: { th: 'โซลิดสเตตไดรฟ์', en: 'Solid-State Drive' },
  abbr: 'SSD',
  category: 'storage',
  overview: {
    th: 'โซลิดสเตตไดรฟ์ (SSD) คือที่เก็บข้อมูลถาวรที่บันทึกข้อมูลลงชิปหน่วยความจำแฟลชแบบ NAND โดยไม่มีชิ้นส่วนเคลื่อนไหว จึงเร็ว เงียบ และทนแรงกระแทกกว่าฮาร์ดดิสก์ ในโมเดล 3 มิติเป็นแผ่น M.2 ขนาด 2280 แบบ NVMe ที่ขันยึดแนบกับเมนบอร์ด',
    en: 'A solid-state drive (SSD) is permanent storage that keeps data in NAND flash memory chips with no moving parts, making it faster, quieter and more shock-resistant than a hard disk. In the 3D model it is the M.2 2280 NVMe stick screwed flat against the motherboard.',
  },
  mainFunction: {
    th: 'เก็บระบบปฏิบัติการ โปรแกรม และไฟล์ไว้อย่างถาวรแม้ปิดเครื่อง และอ่านเขียนได้รวดเร็วจนเครื่องบูตและเปิดโปรแกรมได้ไว',
    en: 'Stores the operating system, programs and files permanently, even with the power off, and reads and writes quickly enough for fast boots and program launches.',
  },
  howItWorks: {
    beginner: {
      th: 'ถ้าฮาร์ดดิสก์คือเครื่องเล่นแผ่นเสียงที่ต้องหมุนแผ่นและเลื่อนหัวเข็มไปหาเพลง SSD ก็คือตู้ล็อกเกอร์ขนาดใหญ่ที่มีผู้จัดการ (คอนโทรลเลอร์) จำได้ว่าของแต่ละชิ้นอยู่ช่องไหนและเปิดช่องนั้นได้ทันทีโดยไม่ต้องรออะไรหมุน ข้อมูลถูกเก็บเป็นประจุไฟฟ้าที่ถูกขังไว้ในเซลล์เล็ก ๆ จึงยังอยู่แม้ไม่มีไฟเลี้ยง',
      en: 'If a hard disk is a record player that must spin the disc and move the needle to the right track, an SSD is a huge wall of lockers with a manager (the controller) who remembers which locker holds what and opens it at once, with nothing to wait for. The data is stored as electric charge trapped in tiny cells, so it stays put without power.',
    },
    technical: {
      th: 'เซลล์ NAND แฟลชเก็บบิตโดยกักอิเล็กตรอนไว้ในชั้น floating gate หรือ charge trap ระดับประจุเป็นตัวกำหนดค่า: SLC เก็บ 1 บิตต่อเซลล์ ส่วน TLC เก็บ 3 บิต และ QLC เก็บ 4 บิต ยิ่งเก็บหลายบิตยิ่งจุมากและถูกลง แต่เขียนช้าลงและทนจำนวนรอบเขียนได้น้อยลง NAND อ่านและเขียนเป็นหน้า (page) แต่ลบได้ทีละบล็อกซึ่งใหญ่กว่ามาก และเขียนทับของเดิมไม่ได้ คอนโทรลเลอร์จึงใช้ชั้นแปลแอดเดรส (FTL) จับคู่ตำแหน่งเชิงตรรกะกับตำแหน่งจริง ทำ garbage collection กระจายการสึกหรอ (wear leveling) และแก้ไขข้อผิดพลาด (ECC) โดยมีคำสั่ง TRIM จากระบบปฏิบัติการคอยบอกว่าบล็อกใดเลิกใช้แล้ว ด้านการเชื่อมต่อ SATA III ถูกจำกัดที่แบนด์วิดท์ของลิงก์ 6 Gb/s ทำให้ได้จริงราว 550 MB/s และใช้โพรโทคอล AHCI ที่ออกแบบมาสำหรับจานหมุน ซึ่งมีคิวคำสั่งเพียง 1 คิว คิวละ 32 คำสั่ง ส่วน NVMe ทำงานบนเลน PCIe โดยตรงซึ่งมีแบนด์วิดท์สูงกว่ามาก และรองรับคิวคำสั่งแบบขนานจำนวนมาก จึงเร็วกว่าหลายเท่า ความทนทานของไดรฟ์ระบุเป็น TBW คือปริมาณข้อมูลรวมที่ผู้ผลิตรับประกันว่าเขียนได้',
      en: 'A NAND flash cell stores bits by trapping electrons in a floating gate or charge-trap layer, and the charge level sets the value: SLC keeps 1 bit per cell, TLC 3 and QLC 4. More bits per cell means more capacity for less money, but slower writes and fewer write cycles. NAND is read and written in pages yet erased only in much larger blocks, and it cannot be overwritten in place, so the controller runs a flash translation layer (FTL) that maps logical addresses to physical ones, performs garbage collection, wear leveling and error correction (ECC), and relies on the TRIM command from the operating system to learn which blocks are no longer in use. On the interface side, SATA III is capped by the 6 Gb/s bandwidth of its link, which works out to about 550 MB/s in practice, and it uses the AHCI protocol designed for spinning disks, which offers a single command queue of 32 commands. NVMe runs directly over PCIe lanes with far more bandwidth and supports many parallel command queues, so it is several times faster. Drive endurance is rated in TBW, the total amount of data the maker warrants can be written.',
    },
  },
  structure: [
    {
      name: { th: 'ขั้ว M.2 และร่องคีย์', en: 'M.2 connector and key notch' },
      desc: {
        th: 'แถบหน้าสัมผัสสีทองที่ปลายด้านหนึ่ง มีร่องบากบอกชนิด: คีย์ M (ร่องเดียว) พบใน SSD แบบ NVMe ส่วนคีย์ B+M (สองร่อง) พบใน SSD M.2 แบบ SATA',
        en: 'The gold contact edge at one end, with notches that identify the type: M key (one notch) on NVMe drives and B+M key (two notches) on M.2 SATA drives.',
      },
    },
    {
      name: { th: 'คอนโทรลเลอร์', en: 'Controller' },
      desc: {
        th: 'ชิปประมวลผลของ SSD ทำหน้าที่จัดการตำแหน่งข้อมูล กระจายการสึกหรอ แก้ไขข้อผิดพลาด และสื่อสารกับเครื่องผ่านโพรโทคอล NVMe หรือ SATA',
        en: 'The processor of the SSD: it manages data placement, wear leveling and error correction, and speaks NVMe or SATA to the host.',
      },
    },
    {
      name: { th: 'ชิป NAND แฟลช', en: 'NAND flash chips' },
      desc: {
        th: 'ชิปที่เก็บข้อมูลจริง ภายในเป็นเซลล์หน่วยความจำที่ซ้อนกันในแนวตั้งหลายสิบถึงหลายร้อยชั้น (3D NAND)',
        en: 'The chips that actually hold the data, built from memory cells stacked vertically in tens to hundreds of layers (3D NAND).',
      },
    },
    {
      name: { th: 'ชิป DRAM แคช (มีในบางรุ่น)', en: 'DRAM cache chip (on some models)' },
      desc: {
        th: 'หน่วยความจำขนาดเล็กที่เก็บตารางจับคู่ตำแหน่งข้อมูล ช่วยให้คอนโทรลเลอร์ค้นหาได้เร็ว รุ่นประหยัดแบบ DRAM-less ใช้หน่วยความจำของเครื่องช่วยแทน',
        en: 'A small memory chip holding the address-mapping table so the controller can look data up quickly. Budget DRAM-less models borrow host memory instead.',
      },
    },
    {
      name: { th: 'รอยเว้าสำหรับสกรูยึด', en: 'Mounting notch' },
      desc: {
        th: 'รอยเว้าครึ่งวงกลมที่ปลายอีกด้าน ใช้ขันสกรูหรือสลักยึดกับเสารองบนเมนบอร์ดให้แผ่นวางขนานกับบอร์ด',
        en: 'The half-round cut-out at the far end where a screw or latch fixes the drive to a standoff so it lies parallel to the board.',
      },
    },
  ],
  specs: [
    {
      label: { th: 'ฟอร์มแฟกเตอร์', en: 'Form factor' },
      value: { th: 'M.2 2280 (กว้าง 22 มม. ยาว 80 มม.) · M.2 2230/2242 · 2.5 นิ้ว', en: 'M.2 2280 (22 mm wide, 80 mm long) · M.2 2230/2242 · 2.5-inch' },
      note: { th: 'ตัวเลขของ M.2 คือความกว้างตามด้วยความยาวเป็นมิลลิเมตร', en: 'M.2 numbers give width followed by length in millimetres.' },
    },
    {
      label: { th: 'อินเทอร์เฟซและโพรโทคอล', en: 'Interface and protocol' },
      value: { th: 'SATA III (AHCI) หรือ NVMe บน PCIe x4', en: 'SATA III (AHCI) or NVMe over PCIe x4' },
      note: {
        th: 'M.2 เป็นเพียงรูปร่างของขั้วต่อ SSD แบบ M.2 จึงเป็นได้ทั้ง SATA และ NVMe',
        en: 'M.2 is only the connector shape, so an M.2 drive can be either SATA or NVMe.',
      },
    },
    {
      label: { th: 'ความเร็วอ่านต่อเนื่อง', en: 'Sequential read speed' },
      value: {
        th: 'SATA III ราว 550 MB/s · NVMe PCIe 3.0 ราว 3,500 MB/s · PCIe 4.0 ราว 7,000 MB/s · PCIe 5.0 ราว 10,000–14,900 MB/s',
        en: 'SATA III about 550 MB/s · NVMe PCIe 3.0 about 3,500 MB/s · PCIe 4.0 about 7,000 MB/s · PCIe 5.0 about 10,000–14,900 MB/s',
      },
      note: { th: 'ค่าสูงสุดโดยประมาณของไดรฟ์ระดับบนในแต่ละรุ่นของ PCIe', en: 'Approximate ceilings for top drives of each PCIe generation.' },
    },
    {
      label: { th: 'ความจุ', en: 'Capacity' },
      value: { th: '250 GB – 4 TB (ทั่วไป)', en: '250 GB – 4 TB (common)' },
      note: { th: 'มีรุ่น 8 TB สำหรับผู้ใช้ทั่วไปแต่ราคาสูง', en: '8 TB consumer models exist at a high price.' },
    },
    {
      label: { th: 'ชนิดของ NAND', en: 'NAND type' },
      value: { th: 'TLC (3 บิตต่อเซลล์) หรือ QLC (4 บิตต่อเซลล์)', en: 'TLC (3 bits per cell) or QLC (4 bits per cell)' },
      note: { th: 'QLC ถูกกว่าต่อ GB แต่เขียนต่อเนื่องช้ากว่าและทนน้อยกว่า TLC', en: 'QLC is cheaper per GB but slower at sustained writes and less durable than TLC.' },
    },
    {
      label: { th: 'ความทนทาน (TBW)', en: 'Endurance (TBW)' },
      value: { th: 'ราว 300–700 TBW ต่อความจุ 1 TB', en: 'Roughly 300–700 TBW per 1 TB of capacity' },
      note: {
        th: 'ช่วงทั่วไปของไดรฟ์ TLC สำหรับผู้ใช้ทั่วไป; QLC ต่ำกว่า และค่าจริงต้องดูจากสเปกของแต่ละรุ่น',
        en: 'Typical of consumer TLC drives; QLC is lower, and the real figure comes from the specification of each model.',
      },
    },
    {
      label: { th: 'คีย์ของขั้ว M.2', en: 'M.2 key' },
      value: { th: 'คีย์ M (NVMe, PCIe x4) · คีย์ B+M (SATA)', en: 'M key (NVMe, PCIe x4) · B+M key (SATA)' },
      note: { th: 'ช่องบนเมนบอร์ดเดสก์ท็อปส่วนใหญ่เป็นคีย์ M', en: 'Most desktop motherboard sockets are M key.' },
    },
  ],
  connects: {
    th: 'ทางกายภาพ SSD แบบ M.2 เสียบเฉียงเข้าช่อง M.2 บนเมนบอร์ดแล้วกดลงขันสกรูยึด ไม่ต้องใช้สายใด ๆ เพราะรับทั้งไฟและข้อมูลผ่านขั้วเดียว (ส่วน SSD ขนาด 2.5 นิ้วใช้สายข้อมูล SATA และสายไฟ SATA จาก PSU) ทางตรรกะ SSD แบบ NVMe สื่อสารผ่านเลน PCIe ซึ่งช่อง M.2 หลักมักต่อตรงกับ CPU และช่องอื่นต่อผ่านชิปเซ็ต เฟิร์มแวร์ UEFI อ่านตัวบูตจาก SSD แล้วระบบปฏิบัติการจะโหลดโปรแกรมจาก SSD เข้าสู่ RAM',
    en: 'Physically an M.2 SSD slides at an angle into the M.2 socket on the motherboard and is pressed down and screwed in place. It needs no cables because power and data share the one connector (a 2.5-inch SSD instead uses a SATA data cable plus SATA power from the PSU). Logically an NVMe drive communicates over PCIe lanes: the main M.2 socket is usually wired to the CPU and the others go through the chipset. UEFI firmware reads the boot loader from the SSD, and the operating system then loads programs from it into RAM.',
  },
  related: ['motherboard', 'hdd', 'ram', 'cpu', 'firmware'],
  compatibility: [
    {
      th: 'ช่อง M.2 ของบอร์ดอาจรองรับเฉพาะ NVMe เฉพาะ SATA หรือทั้งสองแบบ ต้องตรวจคู่มือ SSD M.2 แบบ SATA จะไม่ถูกตรวจพบในช่องที่รองรับ NVMe อย่างเดียว',
      en: 'An M.2 socket may accept NVMe only, SATA only or both, so check the manual; an M.2 SATA drive will not be detected in an NVMe-only socket.',
    },
    {
      th: 'ความยาวของแผ่น (2230, 2242, 2280) ต้องตรงกับตำแหน่งเสารองที่บอร์ดมีให้ และคีย์ของแผ่นต้องเข้ากับคีย์ของช่อง',
      en: 'The stick length (2230, 2242, 2280) must match a standoff position the board provides, and the key of the drive must fit the key of the socket.',
    },
    {
      th: 'SSD แบบ PCIe รุ่นใหม่ใช้กับช่องรุ่นเก่าได้ แต่ความเร็วจะถูกจำกัดตามฝั่งที่ช้ากว่า เช่น ไดรฟ์ PCIe 4.0 ในช่อง PCIe 3.0 จะทำงานที่ความเร็วระดับ PCIe 3.0',
      en: 'A newer PCIe SSD works in an older socket, but speed is capped by the slower side: a PCIe 4.0 drive in a PCIe 3.0 socket runs at PCIe 3.0 speeds.',
    },
    {
      th: 'บนบางบอร์ด การใช้ช่อง M.2 บางช่องจะปิดพอร์ต SATA บางพอร์ต หรือแบ่งเลนจากสล็อต PCIe เพราะใช้ทรัพยากรร่วมกัน',
      en: 'On some boards, populating a particular M.2 socket disables certain SATA ports or takes lanes from a PCIe slot because they share resources.',
    },
  ],
  useCases: [
    {
      th: 'ไดรฟ์ระบบ: ติดตั้งระบบปฏิบัติการและโปรแกรมบน SSD แบบ NVMe เพื่อให้บูตเครื่องและเปิดโปรแกรมได้ในไม่กี่วินาที',
      en: 'System drive: put the operating system and applications on an NVMe SSD so the PC boots and opens programs within seconds.',
    },
    {
      th: 'เกมและงานตัดต่อ: ลดเวลาโหลดฉากและทำให้การเลื่อนดูไฟล์วิดีโอขนาดใหญ่ลื่นไหล',
      en: 'Games and editing: shortens level loading and makes scrubbing through large video files smooth.',
    },
    {
      th: 'อัปเกรดเครื่องเก่า: เปลี่ยนฮาร์ดดิสก์เป็น SSD ขนาด 2.5 นิ้วแบบ SATA เป็นวิธีที่คุ้มที่สุดในการทำให้เครื่องเก่ากลับมาตอบสนองไว',
      en: 'Upgrading an old PC: swapping the hard disk for a 2.5-inch SATA SSD is the most cost-effective way to make an ageing machine responsive again.',
    },
  ],
  problems: [
    {
      symptom: { th: 'UEFI ไม่พบ SSD ที่เพิ่งติดตั้ง', en: 'UEFI does not detect a newly installed SSD.' },
      check: {
        th: 'ถอดมาเสียบใหม่ให้สุดและขันยึด ตรวจคู่มือว่าช่องนั้นรองรับชนิดของไดรฟ์ (SATA หรือ NVMe) แล้วลองช่อง M.2 อื่นถ้ามี',
        en: 'Reseat it fully and screw it down, check the manual to confirm the socket supports that drive type (SATA or NVMe), then try another M.2 socket if one exists.',
      },
    },
    {
      symptom: { th: 'UEFI เห็นไดรฟ์ แต่ไม่ปรากฏในระบบปฏิบัติการ', en: 'The drive appears in UEFI but not in the operating system.' },
      check: {
        th: 'ไดรฟ์ใหม่ยังไม่ได้เตรียมพื้นที่ ให้เปิด Disk Management เพื่อ initialize สร้างพาร์ทิชัน และฟอร์แมต',
        en: 'A new drive has no partition yet: open Disk Management to initialise it, create a partition and format it.',
      },
    },
    {
      symptom: { th: 'ความเร็วต่ำกว่าสเปกมาก หรือเร็วช่วงแรกแล้วช้าลงขณะคัดลอกไฟล์ใหญ่', en: 'Speed is far below specification, or starts fast and then drops during large copies.' },
      check: {
        th: 'ตรวจว่าช่องทำงานที่ PCIe รุ่นใดและกี่เลน ดูอุณหภูมิไดรฟ์ (อาจลดความเร็วเพราะร้อน) และเว้นพื้นที่ว่างไว้ เพราะแคชแบบ SLC จะเต็มเร็วเมื่อไดรฟ์เกือบเต็ม',
        en: 'Check which PCIe generation and lane count the socket is running, watch drive temperature (it may be thermal throttling), and keep free space, because the SLC cache fills quickly on a nearly full drive.',
      },
    },
    {
      symptom: { th: 'มีคำเตือน S.M.A.R.T. ไฟล์เสีย หรือไดรฟ์กลายเป็นอ่านอย่างเดียว', en: 'S.M.A.R.T. warnings, corrupted files or the drive turning read-only.' },
      check: {
        th: 'สำรองข้อมูลทันที จากนั้นอ่านค่า S.M.A.R.T. ด้วยเครื่องมือของผู้ผลิตเพื่อดูเปอร์เซ็นต์อายุที่ใช้ไปและบล็อกสำรองที่เหลือ แล้วเตรียมเปลี่ยนไดรฟ์',
        en: 'Back up immediately, then read the S.M.A.R.T. data with the maker utility to see percentage used and remaining spare blocks, and plan a replacement.',
      },
    },
  ],
  safety: [
    {
      th: 'ปิดเครื่องและถอดปลั๊กก่อนติดตั้งหรือถอด เพราะช่อง M.2 ไม่รองรับการเสียบขณะมีไฟ และคายประจุไฟฟ้าสถิต (ESD) ก่อนจับ',
      en: 'Shut down and unplug before installing or removing the drive, since M.2 sockets are not hot-pluggable, and discharge static (ESD) before handling it.',
    },
    {
      th: 'จับที่ขอบแผ่น ไม่แตะหน้าสัมผัสสีทอง เสียบเฉียงราว 30 องศาแล้วกดลงเบา ๆ ต้องมีเสารองรับปลายแผ่น และอย่าขันสกรูแน่นเกินจนแผ่นโก่ง',
      en: 'Hold the stick by its edges, not the gold contacts; insert it at about 30 degrees and press down gently. A standoff must support the far end, and the screw must not be tightened so far that the board bows.',
    },
    {
      th: 'สำรองข้อมูลสำคัญเสมอ เพราะ SSD ที่เสียมักกู้ข้อมูลได้ยาก และก่อนส่งต่อหรือทิ้งไดรฟ์ให้ใช้คำสั่ง secure erase ของผู้ผลิตลบข้อมูล',
      en: 'Always keep backups, because data on a failed SSD is hard to recover, and use the maker secure-erase function before passing on or disposing of a drive.',
    },
  ],
  vocab: [
    {
      en: 'NAND flash',
      th: 'หน่วยความจำแฟลชแบบ NAND',
      meaning: {
        th: 'หน่วยความจำแบบไม่ลบเลือนที่เก็บข้อมูลเป็นประจุในเซลล์ เป็นสื่อเก็บข้อมูลของ SSD',
        en: 'Non-volatile memory that stores data as charge in cells; the storage medium of an SSD.',
      },
    },
    {
      en: 'NVMe',
      th: 'เอ็นวีเอ็มอี',
      meaning: {
        th: 'โพรโทคอลสำหรับที่เก็บข้อมูลแบบแฟลชที่ทำงานบน PCIe โดยตรง รองรับคิวคำสั่งขนานจำนวนมาก',
        en: 'A storage protocol designed for flash that runs directly over PCIe and supports many parallel command queues.',
      },
    },
    {
      en: 'M.2',
      th: 'เอ็มดอตทู',
      meaning: {
        th: 'มาตรฐานรูปร่างและขั้วต่อของการ์ดขนาดเล็กที่เสียบแนบบอร์ด ใช้ได้ทั้งสัญญาณ SATA และ PCIe',
        en: 'A form factor and connector standard for small cards mounted flat on the board, able to carry SATA or PCIe signals.',
      },
    },
    {
      en: 'TBW (terabytes written)',
      th: 'เทระไบต์ที่เขียนได้',
      meaning: {
        th: 'ปริมาณข้อมูลรวมที่ผู้ผลิตรับประกันว่าเขียนลงไดรฟ์ได้ตลอดอายุการใช้งาน',
        en: 'The total amount of data the maker warrants can be written to the drive over its life.',
      },
    },
    {
      en: 'Wear leveling',
      th: 'การกระจายการสึกหรอ',
      meaning: {
        th: 'เทคนิคที่คอนโทรลเลอร์กระจายการเขียนไปทั่วทุกเซลล์ เพื่อไม่ให้เซลล์ใดเสื่อมก่อนเซลล์อื่น',
        en: 'The controller technique of spreading writes across all cells so that none wears out before the others.',
      },
    },
    {
      en: 'TRIM',
      th: 'คำสั่งทริม',
      meaning: {
        th: 'คำสั่งที่ระบบปฏิบัติการใช้แจ้ง SSD ว่าบล็อกข้อมูลใดไม่ใช้แล้ว เพื่อให้ลบเตรียมไว้ล่วงหน้าได้',
        en: 'The command the operating system uses to tell the SSD which blocks are no longer needed, so they can be erased ahead of time.',
      },
    },
  ],
  facts: [
    {
      th: 'NAND แฟลชเขียนทับข้อมูลเดิมไม่ได้ ต้องลบทั้งบล็อกก่อนจึงจะเขียนใหม่ได้ ในขณะที่การเขียนทำทีละหน้าซึ่งเล็กกว่าบล็อกมาก SSD จึงต้องย้ายข้อมูลอยู่เบื้องหลัง (garbage collection)',
      en: 'NAND flash cannot overwrite data in place: a whole block must be erased before it can be rewritten, while writes happen one much smaller page at a time, so an SSD constantly relocates data in the background (garbage collection).',
    },
    {
      th: 'เซลล์แบบ TLC เก็บ 3 บิตโดยแยกระดับประจุ 8 ระดับ ส่วน QLC ต้องแยกถึง 16 ระดับ ช่วงห่างระหว่างระดับจึงแคบลง ซึ่งเป็นเหตุผลที่ QLC เขียนช้ากว่าและทนน้อยกว่า',
      en: 'A TLC cell stores 3 bits by distinguishing 8 charge levels and QLC must distinguish 16, so the margins between levels shrink, which is why QLC writes more slowly and wears out sooner.',
    },
    {
      th: '3D NAND สมัยใหม่ซ้อนเซลล์หน่วยความจำในแนวตั้งมากกว่า 100 ชั้นบนชิปเดียว คล้ายการสร้างตึกสูงแทนการขยายพื้นที่ในแนวราบ',
      en: 'Modern 3D NAND stacks memory cells vertically in more than 100 layers on one chip, like building a skyscraper instead of spreading out across the ground.',
    },
  ],
  review: [
    {
      q: { th: 'SATA และ NVMe ต่างกันอย่างไร', en: 'What is the difference between SATA and NVMe?' },
      a: {
        th: 'SATA III ถูกจำกัดด้วยแบนด์วิดท์ลิงก์ 6 Gb/s (ราว 550 MB/s) และใช้โพรโทคอล AHCI ที่ออกแบบมาสำหรับฮาร์ดดิสก์ซึ่งมีคิวคำสั่งเดียว ส่วน NVMe ทำงานบน PCIe โดยตรง มีแบนด์วิดท์สูงกว่าและมีคิวคำสั่งขนานจำนวนมาก จึงเร็วกว่าหลายเท่า',
        en: 'SATA III is capped by its 6 Gb/s link (about 550 MB/s) and uses the AHCI protocol designed for hard disks, with a single command queue; NVMe runs directly over PCIe with more bandwidth and many parallel queues, so it is several times faster.',
      },
    },
    {
      q: { th: 'ตัวเลข 2280 ของ SSD แบบ M.2 หมายถึงอะไร', en: 'What does 2280 mean on an M.2 SSD?' },
      a: {
        th: 'หมายถึงขนาดของแผ่น คือกว้าง 22 มม. และยาว 80 มม.',
        en: 'It gives the size of the stick: 22 mm wide and 80 mm long.',
      },
    },
    {
      q: { th: 'ค่า TBW บอกอะไร', en: 'What does the TBW rating tell you?' },
      a: {
        th: 'บอกปริมาณข้อมูลรวมที่เขียนได้ตลอดอายุรับประกัน เพราะเซลล์ NAND เสื่อมลงทุกครั้งที่ลบและเขียนใหม่',
        en: 'It states how much data can be written in total within the warranty, because NAND cells degrade with every erase-and-write cycle.',
      },
    },
  ],
};
