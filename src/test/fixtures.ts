import type { WeatherForecastPayload } from '../models/types';

export const payload2024: WeatherForecastPayload = {
  location: { lat: 61.5, lon: 4.8 },
  forecast: [
    { timestamp: '2024-09-01T06:00:00Z', wave_height: 1.8, wave_period: 8.2 },
    { timestamp: '2024-09-01T12:00:00Z', wave_height: 1.9, wave_period: 9.1 },
    { timestamp: '2024-09-01T18:00:00Z', wave_height: 2.2, wave_period: 6.0 },
  ],
  plannedTasks: {
    metadata: {},
    vessels: [{ name: 'Pioneering Spirit' }],
    projects: [
      {
        id: '1',
        name: 'Riser Replacement',
        tasks: [
          {
            id: 'wf-inst-001',
            name: 'INSTALLATION TASK 1',
            level: 1,
            parentId: 'wf-001',
            startDate: '2024-09-01',
            endDate: '2024-09-01',
            duration: 1,
            weatherLimits: { Hs: 2.0, Tp: [6, 12] },
          },
        ],
      },
    ],
  },
};
