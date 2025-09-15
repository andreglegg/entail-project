import { useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { usePlanStore } from '../../store/usePlanStore.ts';
import './Timeline.css';

export default function Timeline() {
  const tasks = usePlanStore((s) => s.tasks);
  const selectedId = usePlanStore((s) => s.selectedId);
  const select = usePlanStore((s) => s.select);

  const items = useMemo(
    () =>
      tasks.map((t) => ({
        key: t.instanceId,
        title: t.name,
        subtitle: `${t.startAt.slice(0, 10)} → ${t.endAt.slice(0, 10)}`,
      })),
    [tasks]
  );

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSelection = typeof selectedId === 'string' && selectedId.length > 0;
    if (listRef.current === null || !hasSelection) return;

    const el = listRef.current.querySelector<HTMLElement>(`[data-key="${selectedId}"]`);
    if (el !== null) {
      el.focus();
    }
  }, [selectedId]);

  if (tasks.length === 0) {
    return <em>No tasks available.</em>;
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        const idx =
          typeof selectedId === 'string' && selectedId.length > 0
            ? tasks.findIndex((t) => t.instanceId === selectedId)
            : -1;
        if (idx > 0) {
          const prev = tasks[idx - 1];
          if (prev !== undefined) select(prev.instanceId);
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const idx =
          typeof selectedId === 'string' && selectedId.length > 0
            ? tasks.findIndex((t) => t.instanceId === selectedId)
            : -1;
        const next = idx === -1 ? tasks[0] : tasks[idx + 1];
        if (next !== undefined) select(next.instanceId);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Operations timeline"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="timeline"
    >
      {items.map((it) => {
        const active = typeof selectedId === 'string' && it.key === selectedId;
        return (
          <div
            key={it.key}
            data-key={it.key}
            role="option"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => select(it.key)}
            className={`timeline__option${active ? ' timeline__option--active' : ''}`}
          >
            <div className="timeline__title">{it.title}</div>
            <div className="timeline__subtitle">{it.subtitle}</div>
            <div className="timeline__subtitle">{it.key}</div>
          </div>
        );
      })}
    </div>
  );
}
