import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

if (!('ResizeObserver' in globalThis)) {
  type Entry = {
    target: Element;
    contentRect: DOMRectReadOnly;
  };

  class ResizeObserver {
    private cb: (entries: Entry[]) => void;

    constructor(cb: (entries: Entry[]) => void) {
      this.cb = cb;
    }

    observe(target: Element): void {
      const rect = {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: 800,
        height: 300,
        bottom: 300,
        right: 800,
        toJSON: () => ({}),
      } as unknown as DOMRectReadOnly;

      // Fire once with non-zero size so Recharts can compute layout.
      this.cb([{ target, contentRect: rect }]);
    }

    unobserve(): void {}
    disconnect(): void {}
  }

  Object.defineProperty(globalThis, 'ResizeObserver', {
    configurable: true,
    writable: true,
    value: ResizeObserver,
  });
}
