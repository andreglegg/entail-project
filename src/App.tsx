import { useEffect, useMemo } from 'react';
import { usePlanStore } from './store/usePlanStore';
import { getSelectedFromUrl, setSelectedInUrl } from './lib/urlState';
import { forecastInWindow, getSelectedTask, hasAnyOverlap } from './logic/selectors';
import Timeline from './components/timeline/Timeline.tsx';
import SelectedTaskPanel from './components/selectedTaskPanel/SelectedTaskPanel.tsx';
import WaveChart from './components/waveChart/WaveChart.tsx';
import GoNoGoIndicator from './components/goNoGoIndicator/GoNoGoIndicator.tsx';
import ErrorBanner from './components/errorBanner/ErrorBanner.tsx';
import Loader from './components/loader/Loader.tsx';
import './index.css';

export default function App() {
  const { tasks, weather, selectedId, setData, select, isLoading, error, loadAll } = usePlanStore();

  useEffect(() => {
    void (async () => {
      await loadAll();
      const firstId = usePlanStore.getState().tasks[0]?.instanceId;
      const initial = getSelectedFromUrl() ?? firstId;
      if (initial !== undefined) select(initial);
    })();
  }, [loadAll, select, setData]);

  useEffect(() => {
    setSelectedInUrl(selectedId);
  }, [selectedId]);

  const selectedTask = useMemo(() => getSelectedTask(tasks, selectedId), [tasks, selectedId]);
  const overlap = useMemo(() => hasAnyOverlap(weather, selectedTask), [weather, selectedTask]);
  const windowed = useMemo(() => forecastInWindow(weather, selectedTask), [weather, selectedTask]);

  return (
    <div className="app__main">
      <section className="app__card">
        <h2 className="app__heading">Timeline</h2>
        {isLoading ? (
          <Loader />
        ) : error !== undefined ? (
          <ErrorBanner
            message={error.message}
            onRetry={() => {
              void loadAll();
            }}
          />
        ) : (
          <Timeline />
        )}
      </section>

      <section className="app__card">
        <h2 className="app__heading">Selected Task</h2>
        {error !== undefined ? (
          <ErrorBanner
            message={error.message}
            onRetry={() => {
              void loadAll();
            }}
          />
        ) : (
          <>
            <SelectedTaskPanel />
            {selectedTask !== undefined && (
              <div className="app__indicator-container">
                <GoNoGoIndicator />
              </div>
            )}

            <div className="app__chart-container">
              {isLoading ? (
                <Loader />
              ) : selectedTask === undefined ? (
                <em>Select a task to view forecast.</em>
              ) : !overlap ? (
                <div className="error__card">No forecast overlaps the selected task’s window.</div>
              ) : (
                <WaveChart data={windowed} />
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
