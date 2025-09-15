import { useEffect, useMemo } from 'react';
import { usePlanStore } from './store/usePlanStore';
import { fetchWeatherForecast } from './lib/dataClient';
import { normalizeTasks } from './logic/normalize';
import { getSelectedFromUrl, setSelectedInUrl } from './lib/urlState';
import { forecastInWindow, getSelectedTask, hasAnyOverlap } from './logic/selectors';
import Timeline from './components/timeline/Timeline.tsx';
import SelectedTaskPanel from './components/selectedTaskPanel/SelectedTaskPanel.tsx';
import WaveChart from './components/waveChart/WaveChart.tsx';
import './index.css';

export default function App() {
    const { tasks, weather, selectedId, setData, select } = usePlanStore();

    useEffect(() => {
        void (async () => {
            const payload = await fetchWeatherForecast();
            const normalized = normalizeTasks(payload);
            setData(normalized, payload.forecast);
            const initial = getSelectedFromUrl() ?? normalized[0]?.instanceId;
            if (initial !== undefined) select(initial);
        })();
    }, [setData, select]);

    useEffect(() => {
        setSelectedInUrl(selectedId);
    }, [selectedId]);

    const selectedTask = useMemo(
        () => getSelectedTask(tasks, selectedId),
        [tasks, selectedId]
    );
    const overlap = useMemo(
        () => hasAnyOverlap(weather, selectedTask),
        [weather, selectedTask]
    );
    const windowed = useMemo(
        () => forecastInWindow(weather, selectedTask),
        [weather, selectedTask]
    );

    return (
        <div className="app__main">
            <section className="app__card">
                <h2 className="app__heading">Timeline</h2>
                <Timeline />
            </section>

            <section className="app__card">
                <h2 className="app__heading">Selected Task</h2>
                <SelectedTaskPanel />
                <div className="app__chart-container">
                    {!overlap && selectedTask !== undefined ? (
                        <div className="error__card">
                            No forecast overlaps the selected task’s window.
                        </div>
                    ) : undefined}
                    <WaveChart data={windowed} />
                </div>
            </section>
        </div>
    );
}
