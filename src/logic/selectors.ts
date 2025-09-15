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

/**
 * check for overlap with weather and task date (mock data had no overlapping dates)
 */
export function hasAnyOverlap(points: WeatherPoint[], task: TaskInstance | undefined): boolean {
    if ((task == undefined) || points.length === 0) return false;
    const start = parseISO(task.startAt).getTime();
    const end = parseISO(task.endAt).getTime();
    const first = new Date(points[0]!.timestamp).getTime();
    const last = new Date(points[points.length - 1]!.timestamp).getTime();
    return !(end < first || start > last);
}