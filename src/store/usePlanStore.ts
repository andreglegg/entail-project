import { create } from 'zustand';
import type { TaskInstance, WeatherPoint } from '../models/types';
import type { AppError } from '../models/types';
import { fetchWeatherForecast } from '../lib/dataClient';
import { normalizeTasks } from '../logic/normalize';
import { toAppError } from '../lib/errors';

type PlanState = {
  tasks: TaskInstance[];
  weather: WeatherPoint[];
  selectedId: string | undefined;
  isLoading: boolean;
  error: AppError | undefined;
  setData: (tasks: TaskInstance[], weather: WeatherPoint[]) => void;
  select: (id: string | undefined) => void;
  loadAll: () => Promise<void>;
};

export const usePlanStore = create<PlanState>((set) => ({
  tasks: [],
  weather: [],
  selectedId: undefined,
  isLoading: false,
  error: undefined,
  setData: (tasks, weather) => set({ tasks, weather }),
  select: (id) => set({ selectedId: id }),
  loadAll: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const payload = await fetchWeatherForecast();
      const normalized = normalizeTasks(payload);
      set({ tasks: normalized, weather: payload.forecast });
    } catch (e) {
      set({ error: toAppError(e) });
    } finally {
      set({ isLoading: false });
    }
  },
}));
