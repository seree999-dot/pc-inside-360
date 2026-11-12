import { describe, expect, it } from 'vitest';
import { BOARDS, CASES, COOLERS, CPUS, GPUS, PSUS, RAMS, STORAGES } from './catalog';
import type { PartSpec } from './catalog';
import { checkBuild, estimateLoadW, hasErrors } from './compat';
import type { Build, RuleId } from './compat';

function byId<T extends PartSpec>(list: T[], id: string): T {
  const found = list.find((p) => p.id === id);
  if (!found) throw new Error(`missing ${id}`);
  return found;
}
const rules = (b: Build): RuleId[] => checkBuild(b).map((i) => i.rule);

const goodBuild: Build = {
  case: byId(CASES, 'case-mid'),
  board: byId(BOARDS, 'mb-am5-atx'),
  cpu: byId(CPUS, 'cpu-am5'),
  ram: byId(RAMS, 'ram-ddr5-2x16'),
  storage: byId(STORAGES, 'st-nvme'),
  cooler: byId(COOLERS, 'cool-tower'),
  gpu: byId(GPUS, 'gpu-mid'),
  psu: byId(PSUS, 'psu-750'),
};

describe('checkBuild', () => {
  it('accepts a coherent AM5 build with no issues', () => {
    expect(checkBuild(goodBuild)).toEqual([]);
  });

  it('rejects a CPU whose socket does not match the board', () => {
    const issues = checkBuild({ ...goodBuild, cpu: byId(CPUS, 'cpu-am4') });
    expect(issues[0].rule).toBe('socket');
    expect(hasErrors(issues)).toBe(true);
  });

  it('warns that a newer CPU on an older LGA1700 board needs a UEFI update', () => {
    const b: Build = { board: byId(BOARDS, 'mb-1700-ddr4'), cpu: byId(CPUS, 'cpu-1700-14') };
    const issues = checkBuild(b);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({ rule: 'firmware', level: 'warn' });
  });

  it('rejects DDR4 memory on a DDR5-only AM5 platform (board and CPU)', () => {
    const r = rules({ ...goodBuild, ram: byId(RAMS, 'ram-ddr4-2x16') });
    expect(r).toContain('ram-gen');
    expect(r).toContain('ram-cpu');
  });

  it('warns about single-channel memory', () => {
    expect(rules({ ...goodBuild, ram: byId(RAMS, 'ram-ddr5-1x16') })).toEqual(['ram-channel']);
  });

  it('rejects an ATX board in a mini-ITX case but accepts ITX in a mid-tower', () => {
    expect(rules({ case: byId(CASES, 'case-itx'), board: byId(BOARDS, 'mb-am5-atx') })).toEqual(['form-factor']);
    expect(rules({ case: byId(CASES, 'case-mid'), board: byId(BOARDS, 'mb-am5-itx') })).toEqual([]);
  });

  it('checks GPU length against case clearance', () => {
    expect(rules({ case: byId(CASES, 'case-matx'), gpu: byId(GPUS, 'gpu-high') })).toEqual(['gpu-clearance']);
    expect(rules({ case: byId(CASES, 'case-mid'), gpu: byId(GPUS, 'gpu-high') })).toEqual([]);
  });

  it('checks air cooler height and radiator support', () => {
    expect(rules({ case: byId(CASES, 'case-itx'), cooler: byId(COOLERS, 'cool-tower') })).toContain('cooler-height');
    expect(rules({ case: byId(CASES, 'case-itx'), cooler: byId(COOLERS, 'cool-aio') })).toEqual([]);
  });

  it('warns when the cooler is rated below the CPU peak power', () => {
    expect(rules({ cpu: byId(CPUS, 'cpu-am5'), cooler: byId(COOLERS, 'cool-low') })).toEqual(['cooler-capacity']);
  });

  it('enforces the M.2 protocol supported by the board', () => {
    expect(rules({ board: byId(BOARDS, 'mb-am5-atx'), storage: byId(STORAGES, 'st-m2sata') })).toEqual(['m2-protocol']);
    expect(rules({ board: byId(BOARDS, 'mb-1700-ddr4'), storage: byId(STORAGES, 'st-m2sata') })).toEqual([]);
  });

  it('rejects a 3.5-inch HDD in a case without a 3.5-inch bay', () => {
    expect(rules({ case: byId(CASES, 'case-itx'), storage: byId(STORAGES, 'st-hdd') })).toEqual(['bay-35']);
  });

  it('estimates load and flags an undersized PSU and missing GPU connectors', () => {
    const b: Build = { ...goodBuild, gpu: byId(GPUS, 'gpu-high'), psu: byId(PSUS, 'psu-450') };
    expect(estimateLoadW(b)).toBe(142 + 300 + 75);
    const r = rules(b);
    expect(r).toContain('psu-watts');
    expect(r).toContain('psu-gpu-connector');
  });

  it('warns about headroom and the 16-pin adapter for a flagship card on a 750 W unit', () => {
    const issues = checkBuild({ ...goodBuild, gpu: byId(GPUS, 'gpu-flag'), psu: byId(PSUS, 'psu-750') });
    expect(issues.map((i) => i.rule)).toEqual(['psu-headroom', 'psu-gpu-connector']);
    expect(hasErrors(issues)).toBe(false);
  });

  it('accepts a flagship card on a native 12V-2x6 1000 W unit', () => {
    expect(checkBuild({ ...goodBuild, gpu: byId(GPUS, 'gpu-flag'), psu: byId(PSUS, 'psu-1000') })).toEqual([]);
  });

  it('sorts errors before warnings', () => {
    const issues = checkBuild({ ...goodBuild, ram: byId(RAMS, 'ram-ddr5-1x16'), case: byId(CASES, 'case-itx') });
    const levels = issues.map((i) => i.level);
    expect(levels.indexOf('warn')).toBeGreaterThan(levels.lastIndexOf('error'));
  });
});
