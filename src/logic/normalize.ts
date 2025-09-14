import type { TaskInstance, WeatherForecastPayload } from '../models/types';
import { toIsoDayStart, toIsoDayEnd } from '../lib/date';

export function normalizeTasks(payload: WeatherForecastPayload): TaskInstance[] {
  const tasks = payload.plannedTasks.projects.flatMap((p) => p.tasks);
  return tasks
    .map((t) => {
      const [minTp, maxTp] = t.weatherLimits.Tp;
      const instanceId = `${t.id}#${t.startDate}`;
      return {
        instanceId,
        id: t.id,
        name: t.name,
        parentId: t.parentId ?? '',
        level: t.level,
        startAt: toIsoDayStart(t.startDate),
        endAt: toIsoDayEnd(t.endDate),
        maxHs: t.weatherLimits.Hs,
        minTp,
        maxTp,
      };
    })
    .sort((a, b) => (a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0));
}
