import { ZWeatherForecastPayload } from '../models/zodSchemas';

const BASE = 'http://localhost:4000';

export async function fetchWeatherForecast() {
  const res = await fetch(`${BASE}/weatherForecast`);
  if (!res.ok) throw new Error(`Failed to load weatherForecast: ${res.status}`);

  const data: unknown = await res.json();
  return ZWeatherForecastPayload.parse(data);
}
