export type TaskInstance = {
  instanceId: string;
  id: string;
  name: string;
  parentId?: string;
  level: number;
  startAt: string;
  endAt: string;
  maxHs: number;
  minTp: number;
  maxTp: number;
};

export type WeatherPoint = {
  timestamp: string;
  wave_period: number;
  wave_height: number;
};

export type WeatherForecastPayload = {
  location: { lat: number; lon: number };
  forecast: WeatherPoint[];
  plannedTasks: {
    metadata: unknown;
    vessels: Array<{ name: string }>;
    projects: Array<{
      id: string;
      name: string;
      tasks: Array<{
        id: string;
        name: string;
        level: number;
        parentId?: string | undefined;
        startDate: string;
        endDate: string;
        duration: number;
        weatherLimits: { Hs: number; Tp: [number, number] };
      }>;
    }>;
  };
};
