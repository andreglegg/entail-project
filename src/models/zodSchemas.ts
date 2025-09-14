import { z } from 'zod';

export const ZWeatherPoint = z.object({
  timestamp: z.string(),
  wave_period: z.number(),
  wave_height: z.number(),
});

export const ZPlannedTask = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number(),
  parentId: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.number(),
  weatherLimits: z.object({
    Hs: z.number(),
    Tp: z.tuple([z.number(), z.number()]),
  }),
});

export const ZWeatherForecastPayload = z.object({
  location: z.object({ lat: z.number(), lon: z.number() }),
  forecast: z.array(ZWeatherPoint),
  plannedTasks: z.object({
    metadata: z.unknown(),
    vessels: z.array(z.object({ name: z.string() })),
    projects: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        tasks: z.array(ZPlannedTask),
      })
    ),
  }),
});
