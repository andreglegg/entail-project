import './AppHeader.css';

type MenuItem = {
  id: string;
  label: string;
};

const items: MenuItem[] = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'weather', label: 'Weather' },
  { id: 'reports', label: 'Reports' },
];

export default function AppHeader() {
  return (
    <header className="menu__bar" role="banner">
      <div className="menu__brand">Entail Ops</div>
      <nav aria-label="Main" className="menu__nav" role="navigation">
        <div role="menubar" aria-label="Primary" className="menu__items">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              role="menuitem"
              className="menu__item"
              onClick={() => {
                const target =
                  it.id === 'timeline'
                    ? '#timeline'
                    : it.id === 'weather'
                      ? '#selected-task'
                      : '#reports';
                const el = document.querySelector(target);
                if (el instanceof HTMLElement)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      </nav>
      <div className="menu__spacer" />
      <div className="menu__actions">
        <span className="menu__badge">v1.0</span>
      </div>
    </header>
  );
}
