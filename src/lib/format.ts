export function formatYyyyMmDd(iso: string): string {
  return iso.slice(0, 10);
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function formatDateRange(startIso: string, endIso: string): string {
  const s = formatYyyyMmDd(startIso);
  const e = formatYyyyMmDd(endIso);
  return `${s} → ${e}`;
}
