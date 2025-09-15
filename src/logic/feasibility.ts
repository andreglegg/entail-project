import type { Feasibility, WeatherPoint, TaskInstance } from '../models/types';

export function computeGoNoGo(task: TaskInstance, points: WeatherPoint[]): Feasibility {
  if (points.length === 0) {
    return {
      isGo: false,
      violations: [{ at: task.startAt, kind: 'Hs', value: NaN, limit: task.maxHs }],
    };
  }
  const violations = points.flatMap<Feasibility['violations'][number]>((p) => {
    const violations: Feasibility['violations'] = [];
    if (p.wave_height > task.maxHs)
      violations.push({ at: p.timestamp, kind: 'Hs', value: p.wave_height, limit: task.maxHs });
    if (p.wave_period < task.minTp)
      violations.push({ at: p.timestamp, kind: 'TpLow', value: p.wave_period, limit: task.minTp });
    if (p.wave_period > task.maxTp)
      violations.push({ at: p.timestamp, kind: 'TpHigh', value: p.wave_period, limit: task.maxTp });
    return violations;
  });
  return { isGo: violations.length === 0, violations };
}
