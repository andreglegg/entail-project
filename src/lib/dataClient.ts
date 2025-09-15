import { ZWeatherForecastPayload } from '../models/zodSchemas';
import type { WeatherForecastPayload, WeatherPoint } from '../models/types';

const BASE = 'http://localhost:4000';

export async function fetchWeatherForecast(): Promise<WeatherForecastPayload> {
  const res = await fetch(`${BASE}/weatherForecast`);
  if (!res.ok) throw new TypeError(`HTTP ${res.status}`);
  const raw: unknown = await res.json();
  const parsed = ZWeatherForecastPayload.parse(raw);
  const forecast: WeatherPoint[] = parsed.forecast.map((p) => ({
    timestamp: p.timestamp,
    wave_height: p.wave_height,
    wave_period: p.wave_period,
  }));
  return { ...parsed, forecast };
}
