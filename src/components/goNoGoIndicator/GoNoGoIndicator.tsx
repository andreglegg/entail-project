import { useMemo } from 'react';
import { usePlanStore } from '../../store/usePlanStore';
import { getSelectedTask, forecastInWindow } from '../../logic/selectors';
import { computeGoNoGo } from '../../logic/feasibility';
import './GoNoGoIndicator.css';

export default function GoNoGoIndicator() {
  const tasks = usePlanStore((s) => s.tasks);
  const selectedId = usePlanStore((s) => s.selectedId);
  const weather = usePlanStore((s) => s.weather);

  const task = useMemo(() => getSelectedTask(tasks, selectedId)!, [tasks, selectedId]);
  const windowed = useMemo(() => forecastInWindow(weather, task), [weather, task]);

  const res = computeGoNoGo(task, windowed);

  return (
    <div role="status" aria-live="polite" className="go-no-go">
      <span
        aria-hidden="true"
        className={`go-no-go__dot ${res.isGo ? 'go-no-go__dot--go' : 'go-no-go__dot--no'}`}
      />
      <strong className="go-no-go__status">{res.isGo ? 'GO' : 'NO-GO'}</strong>
      {res.isGo ? (
        <span className="go-no-go__details">All limits satisfied</span>
      ) : (
        <span className="go-no-go__details">
          {res.violations.length} violation{res.violations.length > 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
