import { usePlanStore } from '../../store/usePlanStore.ts';
import { getSelectedTask } from '../../logic/selectors.ts';
import { useMemo } from 'react';
import { formatDateRange } from '../../lib/format.ts';
import './SelectedTaskPanel.css';

export default function SelectedTaskPanel() {
  const tasks = usePlanStore((s) => s.tasks);
  const selectedId = usePlanStore((s) => s.selectedId);

  const task = useMemo(() => getSelectedTask(tasks, selectedId), [tasks, selectedId]);

  if (task === undefined) {
    return <em>Select a task to view details.</em>;
  }

  return (
    <div className="selected-task">
      <div className="selected-task__title">{task.name}</div>
      <div className="selected-task__dates">{formatDateRange(task.startAt, task.endAt)}</div>
      <div className="selected-task__limits">
        <span className="selected-task__limit">Hs ≤ {task.maxHs.toFixed(1)} m</span>
        <span className="selected-task__limit">
          Tp {task.minTp}–{task.maxTp} s
        </span>
      </div>
    </div>
  );
}
