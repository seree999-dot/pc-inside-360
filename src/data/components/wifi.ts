import type { HardwareComponent } from '../types';

export const component: HardwareComponent = {
  id: 'wifi',
  name: { th: 'การ์ดเครือข่ายไร้สาย', en: 'Wireless Network Card' },
  abbr: 'Wi-Fi',
  category: 'expansion',
  overview: {
    th: 'การ์ดเครือข่ายไร้สายเชื่อมคอมพิวเตอร์เข้ากับเครือข่ายด้วยคลื่นวิทยุตามมาตรฐาน IEEE 802.11 (Wi-Fi) และมักรวมวิทยุบลูทูธ (Bluetooth) ไว้ในโมดูลเดียวกัน ในเดสก์ท็อปมีสองรูปแบบ คือโมดูล M.2 ขนาดเล็กแบบ Key E บนเมนบอร์ด และการ์ด PCIe ที่มีเสาอากาศต่อออกทางด้านหลังเคส',
    en: 'A wireless network card connects the computer to a network by radio using the IEEE 802.11 (Wi-Fi) standards, and usually includes a Bluetooth radio in the same module. In desktops it comes as a small M.2 Key E module on the motherboard or as a PCIe card with antennas at the rear of the case.',
  },
  mainFunction: {
    th: 'รับส่งข้อมูลเครือข่ายผ่านคลื่นวิทยุย่าน 2.4, 5 และ 6 GHz กับจุดกระจายสัญญาณ (access point) และเชื่อมต่ออุปกรณ์ระยะใกล้ เช่น หูฟังหรือจอยเกม ผ่านบลูทูธ',
    en: 'Sends and receives network data by radio in the 2.4, 5 and 6 GHz bands to an access point, and links nearby devices such as headsets or game controllers over Bluetooth.',
  },
  howItWorks: {
    beginner: {
      th: 'การ์ด Wi-Fi เปรียบเหมือนวิทยุสื่อสารสองทางที่พูดเร็วมาก ข้อมูลถูกแปลงเป็นคลื่นวิทยุส่งไปยังเราเตอร์ และรับคลื่นกลับมาแปลงเป็นข้อมูล ย่านความถี่เปรียบเหมือนถนน: 2.4 GHz ไปได้ไกลแต่รถติด ส่วน 5 และ 6 GHz กว้างและเร็วกว่าแต่ไปได้ไม่ไกลและทะลุผนังได้น้อยกว่า',
      en: 'A Wi-Fi card is like a very fast two-way radio. Data is turned into radio waves sent to the router, and returning waves are turned back into data. Frequency bands are like roads: 2.4 GHz reaches far but is congested, while 5 and 6 GHz are wider and faster but cover less distance and pass through walls less well.',
    },
    technical: {
      th: 'ชิปวิทยุมอดูเลตข้อมูลลงบนคลื่นพาห์ย่อยจำนวนมากด้วย OFDM โดยแต่ละคลื่นพาห์ย่อยใช้ QAM (สูงสุด 256-QAM ใน Wi-Fi 5, 1024-QAM ใน Wi-Fi 6, 4096-QAM ใน Wi-Fi 7) เทคนิค MIMO ใช้เสาอากาศหลายต้นส่งกระแสข้อมูลเชิงพื้นที่ (spatial stream) หลายกระแสพร้อมกันบนความถี่เดียว การเข้าใช้ช่องสัญญาณใช้ CSMA/CA เพื่อเลี่ยงการชนกัน และ Wi-Fi 6 เพิ่ม OFDMA ให้แบ่งช่องสัญญาณให้หลายเครื่องพร้อมกัน ส่วนข้อมูล Wi-Fi วิ่งผ่าน PCIe ขณะที่บลูทูธมักใช้อินเทอร์เฟซ USB ของสล็อตเดียวกัน',
      en: 'The radio chip modulates data onto many sub-carriers using OFDM, each sub-carrier using QAM (up to 256-QAM in Wi-Fi 5, 1024-QAM in Wi-Fi 6, 4096-QAM in Wi-Fi 7). MIMO uses several antennas to send multiple spatial streams on the same frequency at once. Channel access uses CSMA/CA to avoid collisions, and Wi-Fi 6 adds OFDMA so one channel can serve several clients simultaneously. Wi-Fi data travels over PCIe, while Bluetooth normally uses the USB interface in the same socket.',
    },
  },
  structure: [
    {
      name: { th: 'โมดูลวิทยุพร้อมฝาครอบโลหะ', en: 'Radio module with metal shield' },
      desc: { th: 'ชิป Wi-Fi/Bluetooth อยู่ใต้ฝาโลหะที่กันสัญญาณรบกวนจากชิ้นส่วนอื่นในเครื่อง การ์ด PCIe หลายรุ่นคือแผงวงจรที่มีโมดูล M.2 2230 ติดอยู่ด้านบน', en: 'The Wi-Fi/Bluetooth chip sits under a metal can that blocks interference from the rest of the PC. Many PCIe cards are simply a carrier board with an M.2 2230 module on top.' },
    },
    {
      name: { th: 'ขั้วต่อเสาอากาศ', en: 'Antenna connectors' },
      desc: { th: 'ขั้ว RP-SMA ที่แผ่นยึดท้ายเครื่อง (หรือขั้ว U.FL/MHF4 ขนาดจิ๋วบนโมดูล M.2) หนึ่งขั้วต่อหนึ่งสายอากาศสำหรับแต่ละกระแสข้อมูล MIMO', en: 'RP-SMA sockets on the rear bracket (or tiny U.FL/MHF4 sockets on an M.2 module), one per antenna for each MIMO chain.' },
    },
    {
      name: { th: 'เสาอากาศภายนอก', en: 'External antennas' },
      desc: { th: 'เสาแบบขันเกลียวหรือฐานแม่เหล็กที่มีสายพ่วง ช่วยย้ายเสาออกจากด้านหลังเคสโลหะที่บังสัญญาณ', en: 'Screw-on antennas or a magnetic base on a lead, which moves the antennas away from the signal-blocking metal case.' },
    },
    {
      name: { th: 'แถบหน้าสัมผัส PCIe x1 หรือ M.2 Key E', en: 'PCIe x1 edge or M.2 Key E connector' },
      desc: { th: 'จุดเชื่อมต่อกับเมนบอร์ด ส่งข้อมูล Wi-Fi ผ่าน PCIe และรับไฟเลี้ยง 3.3 V', en: 'The connection to the motherboard, carrying Wi-Fi data over PCIe and 3.3 V power.' },
    },
    {
      name: { th: 'สายต่อเฮดเดอร์ USB สำหรับบลูทูธ', en: 'USB header cable for Bluetooth' },
      desc: { th: 'การ์ด PCIe ส่วนใหญ่ต้องต่อสายเส้นเล็กไปยังเฮดเดอร์ USB 2.0 บนเมนบอร์ด มิฉะนั้นบลูทูธจะไม่ทำงาน', en: 'Most PCIe cards need a thin cable to a USB 2.0 header on the motherboard; without it Bluetooth does not work.' },
    },
  ],
  specs: [
    {
      label: { th: 'รุ่นมาตรฐาน Wi-Fi', en: 'Wi-Fi generation' },
      value: { th: 'Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax), Wi-Fi 7 (802.11be)', en: 'Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax), Wi-Fi 7 (802.11be)' },
      note: { th: 'รุ่นใหม่ใช้งานร่วมกับเราเตอร์รุ่นเก่าได้ โดยทำงานตามมาตรฐานร่วมที่สูงที่สุด', en: 'Newer generations work with older routers, falling back to the highest standard both support.' },
    },
    {
      label: { th: 'ย่านความถี่', en: 'Frequency bands' },
      value: { th: '2.4 GHz, 5 GHz และ 6 GHz', en: '2.4 GHz, 5 GHz and 6 GHz' },
      note: { th: '802.11ac ใช้เฉพาะ 5 GHz; ย่าน 6 GHz เริ่มใน Wi-Fi 6E และขึ้นกับกฎระเบียบของแต่ละประเทศ', en: '802.11ac is 5 GHz only; the 6 GHz band begins with Wi-Fi 6E and depends on national regulation.' },
    },
    {
      label: { th: 'ความกว้างช่องสัญญาณสูงสุด', en: 'Maximum channel width' },
      value: { th: '80–160 MHz (Wi-Fi 5/6), 320 MHz (Wi-Fi 7 ในย่าน 6 GHz)', en: '80–160 MHz (Wi-Fi 5/6), 320 MHz (Wi-Fi 7 in the 6 GHz band)' },
    },
    {
      label: { th: 'จำนวนเสาอากาศ / กระแสข้อมูล', en: 'Antennas / spatial streams' },
      value: { th: '2×2 MIMO เป็นแบบที่พบมากที่สุดในการ์ดลูกข่าย', en: '2×2 MIMO is the most common client configuration' },
      note: { th: 'ความเร็วลิงก์สูงสุดทางทฤษฎีของ 2×2: ราว 867 Mbit/s (Wi-Fi 5, 80 MHz), 2.4 Gbit/s (Wi-Fi 6, 160 MHz), 5.8 Gbit/s (Wi-Fi 7, 320 MHz)', en: 'Theoretical peak link rates for 2×2: about 867 Mbit/s (Wi-Fi 5, 80 MHz), 2.4 Gbit/s (Wi-Fi 6, 160 MHz), 5.8 Gbit/s (Wi-Fi 7, 320 MHz).' },
    },
    {
      label: { th: 'บลูทูธ', en: 'Bluetooth' },
      value: { th: 'Bluetooth 5.x–6.0 ย่าน 2.4 GHz', en: 'Bluetooth 5.x–6.0 in the 2.4 GHz band' },
      note: { th: 'รุ่นย่อยขึ้นกับโมดูล โมดูล Wi-Fi 7 รุ่นใหม่รองรับ Bluetooth 5.4 หรือ 6.0; รองรับทั้ง Classic และ Low Energy', en: 'Exact version depends on the module; newer Wi-Fi 7 modules support Bluetooth 5.4 or 6.0. Both Classic and Low Energy are supported.' },
    },
    {
      label: { th: 'รูปแบบและอินเทอร์เฟซ', en: 'Form factor and interface' },
      value: { th: 'M.2 2230 Key E (PCIe + USB) หรือการ์ด PCIe x1', en: 'M.2 2230 Key E (PCIe + USB) or PCIe x1 card' },
    },
  ],
  connects: {
    th: 'การ์ด PCIe เสียบในสล็อต x1 และต่อสายบลูทูธไปยังเฮดเดอร์ USB 2.0 ส่วนโมดูล M.2 เสียบในซ็อกเก็ต Key E ของเมนบอร์ด (คนละแบบกับซ็อกเก็ต Key M ของ SSD) จากนั้นต่อสายอากาศ ทางฝั่งเครือข่ายจะเชื่อมแบบไร้สายกับเราเตอร์หรือ access point',
    en: 'A PCIe card goes into an x1 slot with its Bluetooth cable on a USB 2.0 header; an M.2 module goes into the motherboard Key E socket (a different socket from the Key M one used by SSDs), then the antennas are attached. On the network side it links by radio to a router or access point.',
  },
  related: ['motherboard', 'expansion', 'nic', 'ports', 'case'],
  compatibility: [
    {
      th: 'โมดูล Wi-Fi แบบ Key E เสียบในซ็อกเก็ต M.2 Key M ของ SSD ไม่ได้ เพราะตำแหน่งร่องบากต่างกัน ต้องตรวจว่าเมนบอร์ดมีซ็อกเก็ต Key E หรือไม่',
      en: 'A Key E Wi-Fi module does not fit an SSD M.2 Key M socket because the notch is in a different place; check that the board actually has a Key E socket.',
    },
    {
      th: 'จะได้ความเร็วและย่านความถี่ของรุ่นใหม่ก็ต่อเมื่อเราเตอร์รองรับด้วย เช่น ย่าน 6 GHz ต้องใช้เราเตอร์ Wi-Fi 6E หรือ Wi-Fi 7 และระบบปฏิบัติการที่รองรับ',
      en: 'New-generation speeds and bands are only available if the router supports them too; 6 GHz, for example, needs a Wi-Fi 6E or Wi-Fi 7 router and a supporting operating system.',
    },
    {
      th: 'โมดูล M.2 บางรุ่นใช้อินเทอร์เฟซเฉพาะของแพลตฟอร์ม (เช่น CNVi ของ Intel) จึงใช้ได้เฉพาะกับเมนบอร์ดที่รองรับ',
      en: 'Some M.2 modules use a platform-specific interface (for example Intel CNVi) and only work on boards that support it.',
    },
  ],
  useCases: [
    { th: 'เครื่องเดสก์ท็อปที่ตั้งอยู่ไกลเราเตอร์และไม่สะดวกเดินสาย LAN', en: 'A desktop located far from the router where running a LAN cable is impractical.' },
    { th: 'เพิ่มบลูทูธให้เครื่องเพื่อใช้หูฟัง ลำโพง คีย์บอร์ด หรือจอยเกมไร้สาย', en: 'Adding Bluetooth for wireless headsets, speakers, keyboards or game controllers.' },
    { th: 'อัปเกรดเครื่องเก่าจาก Wi-Fi 5 เป็น Wi-Fi 6E/7 เพื่อใช้ย่าน 6 GHz ที่มีสัญญาณรบกวนน้อย', en: 'Upgrading an older PC from Wi-Fi 5 to Wi-Fi 6E/7 to use the less crowded 6 GHz band.' },
  ],
  problems: [
    {
      symptom: { th: 'สัญญาณอ่อนหรือหลุดบ่อย ทั้งที่เราเตอร์อยู่ไม่ไกล', en: 'Weak signal or frequent drops although the router is not far away.' },
      check: { th: 'ตรวจว่าขันเสาอากาศครบทุกต้นและแน่น ย้ายเสาออกจากด้านหลังเคสด้วยฐานต่อพ่วง และลองสลับไปใช้ย่าน 5 GHz', en: 'Check that every antenna is fitted and tight, move the antennas clear of the case with an extension base, and try the 5 GHz band.' },
    },
    {
      symptom: { th: 'Wi-Fi ใช้งานได้แต่ไม่พบบลูทูธในระบบ', en: 'Wi-Fi works but Bluetooth is missing from the system.' },
      check: { th: 'ตรวจว่าเสียบสายจากการ์ดไปยังเฮดเดอร์ USB 2.0 บนเมนบอร์ดแล้ว และติดตั้งไดรเวอร์บลูทูธแยกจากไดรเวอร์ Wi-Fi', en: 'Confirm the cable from the card to a motherboard USB 2.0 header is connected, and install the Bluetooth driver separately from the Wi-Fi driver.' },
    },
    {
      symptom: { th: 'ความเร็วต่ำกว่าที่คาดมาก', en: 'Speed is far below expectation.' },
      check: { th: 'ดูในหน้าสถานะว่าเชื่อมต่อย่านใดและความเร็วลิงก์เท่าใด หากติดอยู่ที่ 2.4 GHz ให้เลือกเครือข่าย 5/6 GHz และตรวจว่าเราเตอร์รองรับมาตรฐานเดียวกัน', en: 'Read the band and link rate in the adapter status; if it is stuck on 2.4 GHz, select the 5/6 GHz network and verify the router supports the same standard.' },
    },
  ],
  safety: [
    { th: 'ปิดเครื่อง ถอดสายไฟ และคายประจุไฟฟ้าสถิตก่อนติดตั้ง ขั้ว U.FL/MHF4 บนโมดูล M.2 เปราะมาก ให้กดลงตรง ๆ และไม่ถอดเข้าออกบ่อย', en: 'Shut down, unplug and discharge static before installation. The U.FL/MHF4 sockets on an M.2 module are fragile: press straight down and avoid repeated reconnection.' },
    { th: 'อย่าใช้งานเครื่องส่งโดยไม่ต่อเสาอากาศเป็นเวลานาน และใช้เสาที่ออกแบบมาสำหรับย่านความถี่ของการ์ดเท่านั้น', en: 'Do not run the transmitter for long periods with no antenna attached, and use only antennas designed for the card bands.' },
  ],
  vocab: [
    { en: 'IEEE 802.11', th: 'มาตรฐาน IEEE 802.11', meaning: { th: 'กลุ่มมาตรฐานเครือข่ายท้องถิ่นไร้สายที่เป็นพื้นฐานของ Wi-Fi', en: 'The family of wireless LAN standards on which Wi-Fi is based.' } },
    { en: 'MIMO', th: 'ไมโม (หลายเสาเข้า-หลายเสาออก)', meaning: { th: 'การใช้เสาอากาศหลายต้นส่งและรับกระแสข้อมูลหลายกระแสพร้อมกันเพื่อเพิ่มความเร็วและความเสถียร', en: 'Using several antennas to send and receive multiple data streams at once for more speed and reliability.' } },
    { en: 'Access point', th: 'จุดกระจายสัญญาณ', meaning: { th: 'อุปกรณ์ที่เชื่อมเครื่องลูกข่ายไร้สายเข้ากับเครือข่ายแบบใช้สาย มักรวมอยู่ในเราเตอร์ตามบ้าน', en: 'A device that bridges wireless clients onto the wired network; usually built into a home router.' } },
    { en: 'Channel width', th: 'ความกว้างช่องสัญญาณ', meaning: { th: 'ช่วงความถี่ที่ใช้ส่งข้อมูล (เช่น 20/40/80/160 MHz) ยิ่งกว้างยิ่งส่งข้อมูลได้มากแต่เสี่ยงสัญญาณรบกวนมากขึ้น', en: 'The span of spectrum used for a transmission (e.g. 20/40/80/160 MHz); wider carries more data but is more exposed to interference.' } },
    { en: 'M.2 Key E', th: 'ซ็อกเก็ต M.2 แบบ Key E', meaning: { th: 'รูปแบบร่องบากของซ็อกเก็ต M.2 สำหรับโมดูลไร้สาย ให้สัญญาณ PCIe และ USB', en: 'The M.2 socket keying for wireless modules, providing PCIe and USB signals.' } },
  ],
  facts: [
    { th: 'เตาไมโครเวฟทำงานที่ประมาณ 2.45 GHz ซึ่งอยู่ในย่านเดียวกับ Wi-Fi 2.4 GHz จึงอาจรบกวนสัญญาณได้ขณะใช้งาน', en: 'Microwave ovens operate near 2.45 GHz, inside the 2.4 GHz Wi-Fi band, so they can disturb the signal while running.' },
    { th: 'ชื่อเรียกแบบตัวเลข (Wi-Fi 4, 5, 6 ...) ถูกนำมาใช้โดย Wi-Fi Alliance ในปี 2018 เพื่อให้จำง่ายกว่ารหัส 802.11n/ac/ax', en: 'The numbered names (Wi-Fi 4, 5, 6 ...) were introduced by the Wi-Fi Alliance in 2018 to be easier to remember than 802.11n/ac/ax.' },
  ],
  review: [
    {
      q: { th: 'ย่าน 2.4 GHz กับ 5 GHz ต่างกันอย่างไรในการใช้งาน', en: 'How do the 2.4 GHz and 5 GHz bands differ in practice?' },
      a: { th: '2.4 GHz ไปได้ไกลและทะลุผนังดีกว่าแต่ช้าและมีสัญญาณรบกวนมาก ส่วน 5 GHz เร็วกว่าและมีช่องสัญญาณมากกว่าแต่ระยะสั้นกว่า', en: '2.4 GHz reaches farther and penetrates walls better but is slower and congested; 5 GHz is faster with more channels but shorter range.' },
    },
    {
      q: { th: 'เหตุใดการ์ด Wi-Fi แบบ PCIe จึงต้องต่อสายไปยังเฮดเดอร์ USB', en: 'Why does a PCIe Wi-Fi card need a cable to a USB header?' },
      a: { th: 'เพราะส่วนบลูทูธของโมดูลสื่อสารผ่าน USB ไม่ใช่ PCIe', en: 'Because the Bluetooth part of the module communicates over USB, not PCIe.' },
    },
    {
      q: { th: 'Wi-Fi 6E เพิ่มอะไรจาก Wi-Fi 6', en: 'What does Wi-Fi 6E add to Wi-Fi 6?' },
      a: { th: 'เพิ่มการใช้งานย่านความถี่ 6 GHz ซึ่งมีช่องสัญญาณกว้างและมีอุปกรณ์รบกวนน้อยกว่า', en: 'Operation in the 6 GHz band, which offers wide channels and far less interference.' },
    },
  ],
};
