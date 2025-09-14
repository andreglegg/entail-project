export function getSelectedFromUrl(): string | undefined {
  const u = new URL(window.location.href);
  const v = u.searchParams.get('task');
  return v ?? undefined;
}
export function setSelectedInUrl(id: string | undefined) {
  const u = new URL(window.location.href);
  if (id !== undefined && id.length > 0) u.searchParams.set('task', id);
  else u.searchParams.delete('task');
  window.history.replaceState({}, '', u.toString());
}
