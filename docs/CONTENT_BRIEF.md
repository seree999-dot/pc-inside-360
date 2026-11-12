# Content authoring brief — PC INSIDE 360°

University-level interactive 3D computer hardware lab (Thai default, English secondary).
All content is TypeScript data typed by `src/data/types.ts` — **read that file first**.

## Rules for every content file

- Every `L` value needs natural, fluent **Thai** (`th`) and **English** (`en`). Thai text keeps the English
  technical term in parentheses on first use where helpful, e.g. "หน่วยความจำหลัก (RAM)".
- Hardware facts must be accurate and component-specific. No filler, no identical sentences reused across
  components. Separate timeless principles from generation-specific examples; when a number depends on a product
  generation, say so (e.g. "DDR5: 4800–8000+ MT/s (typical 2024-era desktop kits)").
- Never invent specs for a named product. Refer to standards and families (AM5, LGA1700, ATX, PCIe 4.0, SATA III,
  NVMe, DDR4/DDR5, 80 PLUS, ATX12VO, 12VHPWR ...), not to made-up SKUs.
- Safety: ESD precautions; never open a PSU; unplug before servicing.
- Audience: undergraduate beginners → intermediate. Clear, concrete, no marketing tone.
- Code style: `import type { ... } from '../types'` (adjust relative path), single quotes, no `any`,
  no console.log, each file **under 380 lines** (long lines are fine). Escape apostrophes properly.
- Only create the files assigned to you. Do not run npm/tsc/vite, do not edit other files.
- When finished, reply with just the list of files written and exported names.

## IDs

ComponentId (20): cpu, motherboard, ram, gpu, ssd, hdd, psu, cooler, case, nic, wifi, soundcard, optical,
firmware, cmos, expansion, keyboard, mouse, monitor, ports.

Category: core = cpu, motherboard, ram, gpu · storage = ssd, hdd, optical · power-cooling = psu, cooler, case ·
expansion = nic, wifi, soundcard, expansion · firmware = firmware, cmos · peripheral = keyboard, mouse, monitor, ports.

Lesson ids (fixed): `l01` Introduction to Computer Hardware · `l02` Inside a Desktop Computer ·
`l03` CPU and Instruction Processing · `l04` Memory and Storage · `l05` Motherboard and Connectivity ·
`l06` Graphics and Display Systems · `l07` Power and Cooling · `l08` Computer Assembly Fundamentals ·
`l09` Hardware Compatibility · `l10` Basic Hardware Troubleshooting.

## The 3D scene (what students actually see)

A mid-tower ATX desktop, glass side panel, viewed from the motherboard side. Original procedural educational models:

- **case**: steel frame, 2 front intake fans, 1 rear exhaust fan, PSU shroud plate at the bottom, 7 rear expansion slots.
- **motherboard** (ATX): LGA-style CPU socket, VRM heatsinks left of and above the socket, 4 DIMM slots (2 sticks
  installed in A2/B2), 24-pin ATX + 8-pin EPS power, two PCIe x16 slots and x1 slots, one M.2 socket, 4 SATA ports,
  chipset heatsink, fan headers, USB headers, front-panel header, audio header.
- **cpu**: LGA package with integrated heat spreader (IHS); a "reveal" toggle lifts the IHS to show a *conceptual* die.
- **cooler**: single-tower air cooler (copper base, 4 heat pipes, aluminium fin stack, 120 mm fan).
- **ram**: two DDR5-style DIMMs. **gpu**: triple-fan card in the first PCIe x16 slot, 8-pin power, HDMI + DisplayPort.
- **ssd**: M.2 2280 NVMe on the board. **hdd**: 3.5" SATA drive in the lower bay; reveal removes the lid (platters, actuator).
- **psu**: ATX unit at the bottom rear. **optical**: 5.25" drive in the top-front bay.
- **nic**, **wifi**, **soundcard**: small PCIe cards in the lower slots ("expansion" = these three as a group).
- **firmware**: the UEFI flash chip on the board. **cmos**: CR2032 coin cell. **ports**: rear I/O block
  (USB 2.0, USB 3.x, DisplayPort, HDMI, RJ-45, 3.5 mm audio).
- Outside the case: **monitor**, **keyboard**, **mouse**.

View toggles available to lessons: exploded view, x-ray case, isolate selected part, airflow/thermal overlay.

## Hotspot ids (id · part · local position) — text is authored in `src/data/hotspots.ts`

| id | part | pos |
|---|---|---|
| mb-socket | motherboard | [-0.25, 0.75, 0.08] |
| mb-ram-slots | motherboard | [0.63, 0.75, 0.1] |
| mb-pcie-x16 | motherboard | [-0.45, -0.25, 0.1] |
| mb-pcie-x1 | motherboard | [-0.78, -1.15, 0.1] |
| mb-m2 | motherboard | [0.1, 0.05, 0.06] |
| mb-sata | motherboard | [1.12, -0.7, 0.1] |
| mb-atx24 | motherboard | [1.12, 0.7, 0.15] |
| mb-eps8 | motherboard | [-0.85, 1.43, 0.15] |
| mb-vrm | motherboard | [-0.72, 0.75, 0.28] |
| mb-chipset | motherboard | [0.6, -0.6, 0.12] |
| mb-uefi | motherboard | [0.95, -1.1, 0.06] |
| mb-fan-header | motherboard | [0.1, 1.42, 0.1] |
| mb-usb-header | motherboard | [0.3, -1.45, 0.1] |
| mb-front-panel | motherboard | [1.0, -1.45, 0.1] |
| mb-rear-io | motherboard | [-1.1, 1.0, 0.4] |
| mb-cmos | motherboard | [0.15, -0.55, 0.06] |
| mb-audio | motherboard | [-1.0, -1.4, 0.08] |
| cpu-ihs | cpu | [0, 0, 0.05] |
| cpu-contacts | cpu | [0.12, -0.12, -0.03] |
| cpu-marker | cpu | [-0.17, -0.17, 0.02] |
| cpu-die | cpu | [0.05, 0.05, 0.03] |
| ram-chips | ram | [0.15, 0.3, 0.02] |
| ram-edge | ram | [0.12, -0.4, -0.15] |
| ram-notch | ram | [0.12, 0.08, -0.15] |
| gpu-fans | gpu | [0.05, -0.25, 0] |
| gpu-heatsink | gpu | [0.5, 0, 0.3] |
| gpu-pcie-edge | gpu | [-0.8, 0.2, -0.6] |
| gpu-outputs | gpu | [-1.42, 0, 0] |
| gpu-power | gpu | [0.9, 0.22, 0.6] |
| gpu-chip | gpu | [-0.3, 0.15, 0] |
| gpu-vram | gpu | [-0.05, 0.15, 0.3] |
| ssd-key | ssd | [-0.38, 0, 0.02] |
| ssd-controller | ssd | [-0.2, 0, 0.03] |
| ssd-nand | ssd | [0.15, 0, 0.03] |
| hdd-platters | hdd | [0.1, 0.14, 0.15] |
| hdd-actuator | hdd | [-0.25, 0.14, -0.4] |
| hdd-sata | hdd | [0, -0.05, -0.75] |
| psu-fan | psu | [0, -0.45, 0] |
| psu-ac-inlet | psu | [-0.72, 0.1, 0.3] |
| psu-cables | psu | [0.72, 0, 0] |
| psu-label | psu | [0, 0, 0.76] |
| cooler-base | cooler | [0, 0, 0.03] |
| cooler-heatpipes | cooler | [0, -0.3, 0.25] |
| cooler-fins | cooler | [-0.1, 0.3, 1.2] |
| cooler-fan | cooler | [0.5, 0, 0.92] |
| case-front-fans | case | [2.3, 0.4, 0] |
| case-rear-fan | case | [-2.3, 1.3, 0.15] |
| case-psu-shroud | case | [0.3, -1.25, 0.5] |
| case-standoffs | case | [0.9, 0.6, -0.8] |
| case-expansion-slots | case | [-2.35, -0.5, -0.3] |
| port-usb | ports | [-0.15, -0.05, 0] |
| port-dp | ports | [-0.15, 0.25, 0] |
| port-hdmi | ports | [-0.15, 0.1, 0] |
| port-rj45 | ports | [-0.15, -0.22, 0] |
| port-audio | ports | [-0.15, -0.42, 0] |
| mon-panel | monitor | [0, 0, 0.05] |
| mon-inputs | monitor | [0, -0.9, -0.2] |
| kb-switch | keyboard | [0, 0.1, 0] |
| mouse-sensor | mouse | [0, -0.05, 0] |

## Example platforms used by the Assembly Lab (for consistent compatibility questions)

- Socket AM5 CPUs need DDR5 boards (AM5 is DDR5-only). LGA1700 boards are built for *either* DDR4 *or* DDR5 —
  never both on one board. DDR4 and DDR5 DIMMs are keyed differently and are not interchangeable.
- Case form-factor support is a superset: a mid-tower ATX case usually also accepts micro-ATX and mini-ITX boards;
  a mini-ITX case does not accept ATX.
- GPU length, CPU-cooler height and radiator size are limited by the case's stated clearances (mm).
- PSU must supply enough wattage with headroom and the right connectors (24-pin ATX, 4+4-pin EPS, 6+2-pin PCIe / 12VHPWR, SATA power).
- M.2 sockets can be SATA-only, NVMe-only, or both, depending on the board; M-key vs B+M-key.
