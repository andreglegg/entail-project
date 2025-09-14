import { useEffect } from 'react';
import { usePlanStore } from './store/usePlanStore';
import { fetchWeatherForecast } from './lib/dataClient';
import { normalizeTasks } from './logic/normalize';
import { getSelectedFromUrl, setSelectedInUrl } from './lib/urlState';
import Timeline from './components/Timeline';
import './index.css';

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

export default function App() {
  const { tasks, selectedId, setData, select } = usePlanStore();

  useEffect(() => {
    void (async () => {
      const payload = await fetchWeatherForecast();
      const normalized = normalizeTasks(payload);

      setData(normalized, payload.forecast);

      // Determine initial selection (URL takes precedence, then first task)
      const fromUrl = getSelectedFromUrl();
      const firstTask = normalized[0];

      const initial: string | undefined = isNonEmptyString(fromUrl)
        ? fromUrl
        : firstTask !== undefined
          ? firstTask.instanceId
          : undefined;

      if (isNonEmptyString(initial)) {
        select(initial);
      }
    })();
  }, [setData, select]);

  useEffect(() => {
    setSelectedInUrl(selectedId);
  }, [selectedId]);

  if (tasks.length === 0) {
    return (
      <div className="app-main">
        <section className="card">
          <h2>Timeline</h2>
          <em>No tasks available.</em>
        </section>
      </div>
    );
  }

  return (
    <div className="app-main">
      <section className="card">
        <h2>Timeline</h2>
        <Timeline />
      </section>
    </div>
  );
}
