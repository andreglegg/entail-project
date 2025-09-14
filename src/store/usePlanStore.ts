import { create } from 'zustand';
import type { TaskInstance, WeatherPoint } from '../models/types';

type PlanState = {
  tasks: TaskInstance[];
  weather: WeatherPoint[];
  selectedId: string | undefined;
  setData: (tasks: TaskInstance[], weather: WeatherPoint[]) => void;
  select: (id: string | undefined) => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  tasks: [],
  weather: [],
  selectedId: undefined,
  setData: (tasks, weather) => set({ tasks, weather }),
  select: (id) => set({ selectedId: id }),
}));
