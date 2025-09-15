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
import ThreeDPlaceholder from './components/threeDPlaceholder/ThreeDPlaceholder.tsx';
import AppHeader from './components/header/AppHeader.tsx';
import './index.css';

type ImageInfo = { src: string; alt: string };

function get3DImageForTask(taskId: string): ImageInfo {
  if (taskId.startsWith('wf-inst-001')) {
    return { src: '/task1.png', alt: 'Task 1 placeholder' };
  }
  if (taskId.startsWith('wf-inst-002')) {
    return { src: '/task2.png', alt: 'Task 2 placeholder' };
  }
  if (taskId.startsWith('wf-inst-003')) {
    return { src: '/task3.png', alt: 'Task 3 placeholder' };
  }
  if (taskId.startsWith('wf-inst-004')) {
    return { src: '/task2.png', alt: 'Task 2 placeholder' };
  }
  if (taskId.startsWith('wf-inst-005')) {
    return { src: '/task1.png', alt: 'Task 1 placeholder' };
  }
  if (taskId.startsWith('wf-prep-') || taskId.startsWith('wf-strm-')) {
    return { src: '/task3.png', alt: 'Storm/Prep placeholder' };
  }
  return { src: '/task1.png', alt: 'Default placeholder' };
}

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

  const threeDImage: ImageInfo = useMemo(() => {
    if (selectedTask !== undefined) {
      return get3DImageForTask(selectedTask.id);
    }
    return { src: '/task1.png', alt: 'Default placeholder' };
  }, [selectedTask]);

  return (
    <>
      <AppHeader />
      <div className="app__main">
        <section className="app__card" id="timeline">
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

        <section className="app__card" id="selected-task">
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
                  <div className="error__card">
                    No forecast overlaps the selected task’s window.
                  </div>
                ) : (
                  <WaveChart data={windowed} />
                )}
              </div>

              <div className="app__3d-container">
                <ThreeDPlaceholder
                  src={threeDImage.src}
                  alt={threeDImage.alt}
                  caption="3D operation view placeholder"
                />
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
