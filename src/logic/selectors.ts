import type { TaskInstance, WeatherPoint } from '../models/types';
import { parseISO, isWithinInterval } from 'date-fns';

export function getSelectedTask(
  tasks: TaskInstance[],
  id: string | undefined
): TaskInstance | undefined {
  if (id === undefined || id === '') return undefined; // no implicit truthiness
  return tasks.find((t) => t.instanceId === id);
}

/**
 * Filter forecast points that fall within the task's time window.
 */
export function forecastInWindow(
  points: WeatherPoint[],
  task: TaskInstance | undefined
): WeatherPoint[] {
  if (task === undefined) return [];

  const win = { start: parseISO(task.startAt), end: parseISO(task.endAt) };
  return points.filter((p) => isWithinInterval(parseISO(p.timestamp), win));
}
