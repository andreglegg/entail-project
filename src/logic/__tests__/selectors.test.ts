import { describe, it, expect } from 'vitest';
import { forecastInWindow, getSelectedTask } from '../selectors';
import { normalizeTasks } from '../normalize';
import { payload2024 } from '../../test/fixtures';

describe('selectors', () => {
  it('finds the task that matches a given instanceId', () => {
    const tasks = normalizeTasks(payload2024);
    const id = tasks[0]!.instanceId;
    const sel = getSelectedTask(tasks, id);
    expect(sel?.instanceId).toBe(id);
  });

  it('returns only forecast points within the selected task window', () => {
    const tasks = normalizeTasks(payload2024);
    const sel = getSelectedTask(tasks, tasks[0]!.instanceId);
    const points = forecastInWindow(payload2024.forecast, sel);
    expect(points.map((p) => p.timestamp)).toEqual([
      '2024-09-01T06:00:00Z',
      '2024-09-01T12:00:00Z',
      '2024-09-01T18:00:00Z',
    ]);
  });
});
