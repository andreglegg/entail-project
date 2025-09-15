import { describe, it, expect } from 'vitest';
import { normalizeTasks } from '../normalize';
import { payload2024 } from '../../test/fixtures';

describe('normalizeTasks', () => {
  it('assigns a stable instanceId to each task', () => {
    const tasks = normalizeTasks(payload2024);
    expect(tasks[0]!.instanceId).toBe('wf-inst-001#2024-09-01');
  });

  it('converts task start and end dates to full-day ISO timestamps', () => {
    const tasks = normalizeTasks(payload2024);
    expect(tasks[0]!.startAt).toBe('2024-09-01T00:00:00Z');
    expect(tasks[0]!.endAt).toBe('2024-09-01T23:59:59Z');
  });

  it('copies weather limits into maxHs, minTp, and maxTp fields', () => {
    const tasks = normalizeTasks(payload2024);
    const t = tasks[0]!;
    expect(t.maxHs).toBe(2.0);
    expect(t.minTp).toBe(6);
    expect(t.maxTp).toBe(12);
  });
});
