import type { TaskInstance, WeatherForecastPayload } from '../models/types';
import { toIsoDayStart, toIsoDayEnd } from '../lib/date';

export function normalizeTasks(payload: WeatherForecastPayload): TaskInstance[] {
  const tasks = payload.plannedTasks.projects.flatMap((p) => p.tasks);
  return tasks
    .map((task) => {
      const [minTp, maxTp] = task.weatherLimits.Tp;
      const instanceId = `${task.id}#${task.startDate}`;
      return {
        instanceId,
        id: task.id,
        name: task.name,
        parentId: task.parentId ?? '',
        level: task.level,
        startAt: toIsoDayStart(task.startDate),
        endAt: toIsoDayEnd(task.endDate),
        maxHs: task.weatherLimits.Hs,
        minTp,
        maxTp,
      };
    })
    .sort((a, b) => (a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0));
}
