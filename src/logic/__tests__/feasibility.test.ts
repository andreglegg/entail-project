import { describe, it, expect } from 'vitest';
import { computeGoNoGo } from '../feasibility';
import { normalizeTasks } from '../normalize';
import { forecastInWindow, getSelectedTask } from '../selectors';
import { payload2024 } from '../../test/fixtures';

describe('computeGoNoGo', () => {
  it('returns GO when all forecast points meet weather limits', () => {
    const ok = structuredClone(payload2024);
    ok.forecast = [
      { timestamp: '2024-09-01T06:00:00Z', wave_height: 1.0, wave_period: 8 },
      { timestamp: '2024-09-01T12:00:00Z', wave_height: 1.5, wave_period: 9 },
    ];
    const task = getSelectedTask(normalizeTasks(ok), 'wf-inst-001#2024-09-01')!;
    const pts = forecastInWindow(ok.forecast, task);
    const res = computeGoNoGo(task, pts);
    expect(res.isGo).toBe(true);
    expect(res.violations).toHaveLength(0);
  });

  it('returns NO-GO when any forecast point violates weather limits', () => {
    const tasks = normalizeTasks(payload2024);
    const task = getSelectedTask(tasks, tasks[0]!.instanceId)!;
    const pts = forecastInWindow(payload2024.forecast, task);
    const res = computeGoNoGo(task, pts);
    expect(res.isGo).toBe(false);
    expect(res.violations.length).toBeGreaterThan(0);
  });
});
