import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'firmware',
  name: { th: 'เฟิร์มแวร์เมนบอร์ด (BIOS/UEFI)', en: 'Motherboard Firmware (BIOS/UEFI)' },
  abbr: 'UEFI',
  category: 'firmware',
  overview: {
    th: 'เฟิร์มแวร์เมนบอร์ดคือโปรแกรมแรกที่ทำงานเมื่อกดปุ่มเปิดเครื่อง เก็บอยู่ในชิปแฟลชแบบ SPI ขนาดเล็กบนเมนบอร์ด มีหน้าที่เตรียมฮาร์ดแวร์ให้พร้อม ตรวจสอบเบื้องต้น แล้วส่งต่อการควบคุมให้ระบบปฏิบัติการ เครื่องรุ่นเก่าใช้ BIOS ส่วนเครื่องปัจจุบันใช้ UEFI แม้คนทั่วไปยังเรียกรวมว่า "ไบออส"',
    en: 'Motherboard firmware is the first program to run when the power button is pressed. It lives in a small SPI flash chip on the board, prepares the hardware, runs basic checks and then hands control to the operating system. Older machines used BIOS and current ones use UEFI, although people still casually call it "the BIOS".',
  },
  mainFunction: {
    th: 'เริ่มต้นการทำงานของ CPU หน่วยความจำ และอุปกรณ์พื้นฐาน ทำการทดสอบตัวเองเมื่อเปิดเครื่อง (POST) ค้นหาอุปกรณ์บูตตามลำดับที่ตั้งไว้ โหลดตัวบูตของระบบปฏิบัติการ และมีหน้าจอตั้งค่าฮาร์ดแวร์ให้ผู้ใช้ปรับ',
    en: 'Initialises the CPU, memory and basic devices, runs the power-on self-test (POST), searches for a boot device in the configured order, loads the operating system boot loader, and provides a setup screen for hardware settings.',
  },
  howItWorks: {
    beginner: {
      th: 'เปรียบเฟิร์มแวร์เหมือนเจ้าหน้าที่ที่มาเปิดอาคารทุกเช้า: เปิดไฟ เดินตรวจว่าทุกห้องพร้อมใช้งาน (POST) แล้วไขประตูให้ผู้จัดการ (ระบบปฏิบัติการ) เข้ามาทำงาน หากพบว่าห้องสำคัญมีปัญหา เช่น ไม่มี RAM ก็จะแจ้งเตือนด้วยเสียงบี๊บหรือไฟแสดงสถานะบนเมนบอร์ดแทนที่จะเปิดอาคารต่อ',
      en: 'Think of firmware as the caretaker who opens a building each morning: switches on the lights, walks round to check every room is usable (POST) and then unlocks the door for the manager (the operating system). If an essential room has a problem, such as no RAM, it raises the alarm with beeps or the motherboard debug LEDs instead of opening up.',
    },
    technical: {
      th: 'เมื่อรีเซ็ต CPU จะเริ่มประมวลผลจากเวกเตอร์รีเซ็ต (reset vector) ซึ่งชี้ไปยังโค้ดในชิปแฟลช SPI (ในแพลตฟอร์มรุ่นใหม่ ตัวประมวลผลความปลอดภัยภายในชิป เช่น AMD PSP หรือ Intel CSME/Boot Guard จะทำงานและตรวจสอบเฟิร์มแวร์ก่อนที่คอร์ x86 จะเริ่ม) เฟิร์มแวร์โหลดไมโครโค้ด ฝึกหน่วยความจำ (memory training) กำหนดค่าชิปเซ็ต และแจกแจงอุปกรณ์บนบัส PCIe, USB และ SATA ระหว่าง POST จากนั้นตัวจัดการบูตของ UEFI อ่านรายการบูตจาก NVRAM และโหลดไฟล์ .efi จากพาร์ทิชันระบบ EFI (ESP) บนดิสก์แบบ GPT ต่างจาก BIOS ดั้งเดิมที่ทำงานในโหมด 16 บิตและอ่านโค้ดบูตจากเซกเตอร์แรกของดิสก์แบบ MBR เมื่อเปิด Secure Boot เฟิร์มแวร์จะตรวจลายเซ็นดิจิทัลของตัวบูตกับกุญแจที่เก็บไว้ก่อนอนุญาตให้ทำงาน',
      en: 'On reset the CPU begins executing at the reset vector, which maps to code in the SPI flash chip (on current platforms a built-in security processor, such as AMD PSP or Intel CSME/Boot Guard, runs first and verifies the firmware before the x86 cores start). The firmware loads CPU microcode, performs memory training, configures the chipset and enumerates devices on PCIe, USB and SATA during POST. The UEFI boot manager then reads boot entries from NVRAM and loads an .efi file from the EFI System Partition on a GPT disk, unlike legacy BIOS, which runs in 16-bit mode and reads boot code from the first sector of an MBR disk. With Secure Boot enabled, the firmware verifies the boot loader digital signature against stored keys before allowing it to run.',
    },
  },
  structure: [
    {
      name: { th: 'ชิปแฟลช SPI', en: 'SPI flash chip' },
      desc: { th: 'ชิป 8 ขาขนาดเล็กบนเมนบอร์ดที่เก็บโค้ดเฟิร์มแวร์แบบไม่ลบเลือน ในโมเดล 3D อยู่บริเวณมุมล่างขวาของเมนบอร์ด', en: 'A small 8-pin chip on the motherboard that stores the firmware code non-volatilely. In the 3D model it sits near the lower-right area of the board.' },
    },
    {
      name: { th: 'พื้นที่ NVRAM', en: 'NVRAM region' },
      desc: { th: 'ส่วนหนึ่งของชิปแฟลชที่เก็บค่าตั้งของผู้ใช้ รายการบูต และกุญแจ Secure Boot ข้อมูลส่วนนี้คงอยู่ได้โดยไม่ต้องใช้แบตเตอรี่', en: 'A part of the flash chip holding user settings, boot entries and Secure Boot keys; it persists without any battery.' },
    },
    {
      name: { th: 'หน้าจอตั้งค่า (UEFI Setup)', en: 'Setup utility (UEFI Setup)' },
      desc: { th: 'ส่วนติดต่อผู้ใช้ที่เข้าได้โดยกดปุ่ม เช่น Del หรือ F2 ขณะเปิดเครื่อง ใช้ตั้งลำดับบูต โปรไฟล์หน่วยความจำ เส้นโค้งความเร็วพัดลม และเปิดปิดอุปกรณ์บนบอร์ด', en: 'The user interface reached by pressing a key such as Del or F2 at power-on, used to set boot order, memory profiles, fan curves and to enable or disable onboard devices.' },
    },
    {
      name: { th: 'ไฟแสดงสถานะ POST / ลำโพงบี๊บ', en: 'POST debug LEDs / beeper' },
      desc: { th: 'ไฟ LED สี่ดวง (CPU, DRAM, VGA, BOOT) หรือจอแสดงรหัสสองหลัก บอกว่าขั้นตอน POST หยุดอยู่ที่ส่วนใด', en: 'Four LEDs (CPU, DRAM, VGA, BOOT) or a two-digit code display that show at which stage POST has stopped.' },
    },
    {
      name: { th: 'ปุ่มอัปเดตเฟิร์มแวร์โดยไม่ต้องมี CPU', en: 'CPU-less firmware flash button' },
      desc: { th: 'เมนบอร์ดบางรุ่นมีปุ่มและพอร์ต USB เฉพาะที่แผงด้านหลัง ให้เขียนเฟิร์มแวร์จากแฟลชไดรฟ์ได้โดยมีเพียงไฟเลี้ยง', en: 'Some boards have a dedicated button and USB port on the rear panel that can write firmware from a flash drive with only power connected.' },
    },
  ],
  specs: [
    {
      label: { th: 'ชนิดเฟิร์มแวร์', en: 'Firmware type' },
      value: { th: 'UEFI (ปัจจุบัน) หรือ BIOS ดั้งเดิม (รุ่นเก่า)', en: 'UEFI (current) or legacy BIOS (older)' },
      note: { th: 'พีซีส่วนใหญ่เปลี่ยนมาใช้ UEFI ตั้งแต่ราวปี 2011–2012; แพลตฟอร์มรุ่นใหม่จำนวนมากตัดโหมดเข้ากันได้กับ BIOS (CSM) ออกแล้ว', en: 'Most PCs moved to UEFI around 2011–2012; many recent platforms have dropped the BIOS compatibility mode (CSM).' },
    },
    {
      label: { th: 'ความจุชิปแฟลช', en: 'Flash chip capacity' },
      value: { th: 'โดยทั่วไป 16–32 MB (128–256 Mbit)', en: 'Typically 16–32 MB (128–256 Mbit)' },
      note: { th: 'เป็นช่วงของเมนบอร์ดเดสก์ท็อปยุคปัจจุบัน; รุ่นเก่ามีขนาดเล็กกว่ามาก', en: 'The range for current desktop boards; older boards used much smaller chips.' },
    },
    {
      label: { th: 'รูปแบบตารางพาร์ทิชันที่ใช้บูต', en: 'Boot partition scheme' },
      value: { th: 'UEFI: GPT · BIOS ดั้งเดิม: MBR', en: 'UEFI: GPT · legacy BIOS: MBR' },
      note: { th: 'MBR จำกัดดิสก์บูตที่ราว 2.2 TB (เซกเตอร์ 512 ไบต์); GPT ไม่มีข้อจำกัดนี้ในทางปฏิบัติ', en: 'MBR limits a boot disk to about 2.2 TB (with 512-byte sectors); GPT has no such practical limit.' },
    },
    {
      label: { th: 'คุณสมบัติด้านความปลอดภัย', en: 'Security features' },
      value: { th: 'Secure Boot, รหัสผ่านผู้ดูแล, การรองรับ TPM 2.0', en: 'Secure Boot, administrator password, TPM 2.0 support' },
    },
    {
      label: { th: 'วิธีอัปเดต', en: 'Update methods' },
      value: { th: 'เครื่องมือในหน้าตั้งค่าจากแฟลชไดรฟ์ USB (FAT32), ปุ่มอัปเดตโดยไม่ต้องมี CPU, หรือโปรแกรมบนระบบปฏิบัติการ', en: 'Built-in flash tool from a USB drive (FAT32), CPU-less flash button, or an OS-based utility' },
    },
  ],
  connects: {
    th: 'ชิปแฟลชบัดกรีหรือเสียบซ็อกเก็ตอยู่บนเมนบอร์ดและเชื่อมกับชิปเซ็ตผ่านบัส SPI เฟิร์มแวร์ทำงานร่วมกับ CPU, RAM, อุปกรณ์จัดเก็บข้อมูล และการ์ดจอทุกครั้งที่เปิดเครื่อง และอาศัยแบตเตอรี่ CMOS เพื่อให้นาฬิกาเวลาจริงเดินต่อขณะปิดเครื่อง',
    en: 'The flash chip is soldered or socketed on the motherboard and reaches the chipset over the SPI bus. The firmware works with the CPU, RAM, storage and graphics card at every start-up, and relies on the CMOS battery to keep the real-time clock running while the PC is off.',
  },
  related: ['motherboard', 'cmos', 'cpu', 'ram', 'ssd'],
  compatibility: [
    {
      th: 'CPU รุ่นใหม่ที่ใช้ซ็อกเก็ตเดียวกับเมนบอร์ดรุ่นเก่าอาจต้องอัปเดตเฟิร์มแวร์ก่อนจึงจะบูตได้ เพราะเฟิร์มแวร์ต้องมีไมโครโค้ดและโค้ดเริ่มต้นของ CPU รุ่นนั้น ควรตรวจรายการ CPU ที่รองรับและรุ่นเฟิร์มแวร์ขั้นต่ำจากผู้ผลิตเมนบอร์ด',
      en: 'A newer CPU that fits an older board socket may not boot until the firmware is updated, because the firmware must contain microcode and initialisation code for that CPU. Check the board maker CPU support list and its minimum firmware version.',
    },
    {
      th: 'ระบบปฏิบัติการที่ติดตั้งในโหมด UEFI บนดิสก์ GPT จะไม่บูตหากเปลี่ยนเฟิร์มแวร์เป็นโหมด Legacy/CSM และกลับกัน',
      en: 'An operating system installed in UEFI mode on a GPT disk will not boot if the firmware is switched to Legacy/CSM mode, and vice versa.',
    },
    {
      th: 'ระบบปฏิบัติการบางรุ่นกำหนดให้ใช้ UEFI ที่รองรับ Secure Boot และมี TPM 2.0 (เช่น ข้อกำหนดของ Windows 11) ส่วนการ์ดจอรุ่นเก่ามากที่ไม่มีเฟิร์มแวร์แบบ UEFI อาจไม่แสดงภาพเมื่อปิด CSM',
      en: 'Some operating systems require Secure Boot-capable UEFI and TPM 2.0 (the Windows 11 requirements, for instance), and a very old graphics card without UEFI firmware may show no picture when CSM is disabled.',
    },
  ],
  useCases: [
    { th: 'ตั้งลำดับบูตเพื่อเริ่มระบบจากแฟลชไดรฟ์ USB เมื่อติดตั้งระบบปฏิบัติการใหม่', en: 'Setting the boot order to start from a USB flash drive when installing an operating system.' },
    { th: 'เปิดใช้โปรไฟล์หน่วยความจำ (XMP/EXPO) เพื่อให้ RAM ทำงานที่ความเร็วตามสเปกของชุด', en: 'Enabling a memory profile (XMP/EXPO) so the RAM runs at its rated kit speed.' },
    { th: 'อัปเดตเฟิร์มแวร์เพื่อรองรับ CPU รุ่นใหม่ แก้ไขข้อบกพร่อง หรืออุดช่องโหว่ด้านความปลอดภัย', en: 'Updating firmware to support a newer CPU, fix bugs or patch security vulnerabilities.' },
  ],
  problems: [
    {
      symptom: { th: 'เปิดเครื่องแล้วพัดลมหมุนแต่ไม่มีภาพ และไฟแสดงสถานะ POST ค้างอยู่ที่ดวงใดดวงหนึ่ง', en: 'The PC powers on and fans spin but there is no picture, and one POST debug LED stays lit.' },
      check: { th: 'อ่านว่าไฟดวงใดค้าง (CPU, DRAM, VGA หรือ BOOT) แล้วตรวจชิ้นส่วนนั้นก่อน เช่น เสียบ RAM ใหม่ให้แน่น ลองทีละแถว หรือตรวจสายไฟ CPU', en: 'Read which LED is lit (CPU, DRAM, VGA or BOOT) and check that part first: reseat the RAM, test one stick at a time, or check the CPU power cable.' },
    },
    {
      symptom: { th: 'ขึ้นข้อความว่าไม่พบอุปกรณ์บูต', en: 'A "no bootable device" message appears.' },
      check: { th: 'เข้าหน้าตั้งค่าแล้วดูว่าเฟิร์มแวร์มองเห็นไดรฟ์หรือไม่ ตรวจลำดับบูต และตรวจว่าโหมดบูต (UEFI หรือ Legacy) ตรงกับวิธีที่ติดตั้งระบบปฏิบัติการ', en: 'Enter setup and see whether the drive is detected, check the boot order, and confirm the boot mode (UEFI or Legacy) matches how the OS was installed.' },
    },
    {
      symptom: { th: 'ติดตั้ง CPU รุ่นใหม่แล้วเครื่องไม่ผ่าน POST', en: 'After fitting a newer CPU the system fails POST.' },
      check: { th: 'ตรวจรายการ CPU ที่เมนบอร์ดรองรับและรุ่นเฟิร์มแวร์ที่ต้องใช้ จากนั้นอัปเดตด้วยปุ่มอัปเดตโดยไม่ต้องมี CPU หรือใส่ CPU รุ่นเดิมเพื่ออัปเดตก่อน', en: 'Check the board CPU support list and required firmware version, then update using the CPU-less flash button or with the previous CPU installed.' },
    },
  ],
  safety: [
    { th: 'ห้ามปิดเครื่อง กดรีเซ็ต หรือถอดปลั๊กระหว่างอัปเดตเฟิร์มแวร์ การเขียนที่ไม่สมบูรณ์อาจทำให้เมนบอร์ดบูตไม่ได้ ควรใช้ไฟล์จากเว็บไซต์ผู้ผลิตที่ตรงรุ่นเมนบอร์ดเท่านั้น', en: 'Never power off, reset or unplug during a firmware update: an incomplete write can leave the board unable to boot. Use only the file from the manufacturer site for the exact board model.' },
    { th: 'จดค่าตั้งเดิมไว้ก่อนเปลี่ยน และอย่าปรับแรงดันไฟหรือค่าโอเวอร์คล็อกหากยังไม่เข้าใจผล เพราะอาจทำให้ชิ้นส่วนร้อนเกินหรือเสียหาย', en: 'Note the original values before changing settings, and do not alter voltages or overclocking options without understanding them, as parts may overheat or be damaged.' },
  ],
  vocab: [
    { en: 'POST (Power-On Self-Test)', th: 'การทดสอบตัวเองเมื่อเปิดเครื่อง', meaning: { th: 'ชุดการตรวจสอบและเริ่มต้นฮาร์ดแวร์ที่เฟิร์มแวร์ทำก่อนบูตระบบปฏิบัติการ', en: 'The series of hardware checks and initialisation steps the firmware runs before booting the operating system.' } },
    { en: 'UEFI', th: 'ยูอีเอฟไอ', meaning: { th: 'ข้อกำหนดอินเทอร์เฟซเฟิร์มแวร์สมัยใหม่ที่มาแทน BIOS รองรับดิสก์ GPT, Secure Boot และส่วนติดต่อแบบกราฟิก', en: 'The modern firmware interface specification that replaced BIOS, supporting GPT disks, Secure Boot and graphical setup.' } },
    { en: 'Secure Boot', th: 'การบูตแบบปลอดภัย', meaning: { th: 'กลไกของ UEFI ที่อนุญาตเฉพาะตัวบูตที่มีลายเซ็นดิจิทัลที่เชื่อถือได้ เพื่อป้องกันมัลแวร์ระดับบูต', en: 'A UEFI mechanism that allows only boot loaders with a trusted digital signature, blocking boot-level malware.' } },
    { en: 'Boot order', th: 'ลำดับการบูต', meaning: { th: 'ลำดับของอุปกรณ์ที่เฟิร์มแวร์จะลองค้นหาระบบปฏิบัติการ', en: 'The sequence of devices the firmware tries when looking for an operating system.' } },
    { en: 'Microcode', th: 'ไมโครโค้ด', meaning: { th: 'โค้ดระดับต่ำของ CPU ที่เฟิร์มแวร์โหลดตอนเริ่มเครื่องเพื่อแก้ไขข้อบกพร่องและรองรับ CPU รุ่นต่าง ๆ', en: 'Low-level CPU code that firmware loads at start-up to correct errata and support particular CPU models.' } },
  ],
  facts: [
    { th: 'คำว่า BIOS ย่อจาก Basic Input/Output System ใช้ในเครื่อง IBM PC ตั้งแต่ปี 1981 และยังเป็นชื่อที่คนเรียกเฟิร์มแวร์จนถึงทุกวันนี้', en: 'BIOS stands for Basic Input/Output System; it was used in the IBM PC from 1981 and remains the everyday name for firmware today.' },
    { th: 'เมนบอร์ดบางรุ่นมีชิปแฟลชสองตัว (Dual BIOS) เพื่อให้กู้เครื่องได้หากชิปหลักเสียหายจากการอัปเดต', en: 'Some motherboards carry two flash chips (Dual BIOS) so the system can recover if the main chip is corrupted by an update.' },
  ],
  review: [
    {
      q: { th: 'POST คืออะไร และเกิดขึ้นเมื่อใด', en: 'What is POST and when does it happen?' },
      a: { th: 'คือการทดสอบและเริ่มต้นฮาร์ดแวร์โดยเฟิร์มแวร์ทันทีหลังเปิดเครื่อง ก่อนโหลดระบบปฏิบัติการ', en: 'The firmware hardware test and initialisation that runs immediately after power-on, before the operating system loads.' },
    },
    {
      q: { th: 'บอกข้อแตกต่างสองข้อระหว่าง UEFI กับ BIOS ดั้งเดิม', en: 'Give two differences between UEFI and legacy BIOS.' },
      a: { th: 'UEFI บูตจากดิสก์ GPT ที่ใหญ่กว่า 2.2 TB ได้และรองรับ Secure Boot ส่วน BIOS ใช้ MBR และทำงานในโหมด 16 บิต', en: 'UEFI boots from GPT disks larger than 2.2 TB and supports Secure Boot, whereas BIOS uses MBR and runs in 16-bit mode.' },
    },
    {
      q: { th: 'เหตุใดบางครั้งต้องอัปเดตเฟิร์มแวร์ก่อนเปลี่ยน CPU', en: 'Why must firmware sometimes be updated before changing the CPU?' },
      a: { th: 'เพราะเฟิร์มแวร์รุ่นเก่ายังไม่มีไมโครโค้ดและโค้ดเริ่มต้นสำหรับ CPU รุ่นใหม่ เครื่องจึงไม่ผ่าน POST', en: 'Older firmware lacks the microcode and initialisation code for the newer CPU, so the system cannot pass POST.' },
    },
  ],
};
