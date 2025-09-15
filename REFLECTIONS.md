# Design Reflection

When I started on this case study, my goal was pretty simple: build something that works well, feels reliable, and shows how I think about structure and quality. I didn’t just want to hit the checklist from the brief, I wanted to show what I’d normally do on a real project — things like type safety, error handling, and accessibility.

---

## How I structured it
I split the code into a few clear areas:

- `components` for UI bits like the timeline, chart, and Go/No-Go indicator.
- `store` with Zustand to keep state in one place.
- `logic` for pure functions like normalization, selectors, and feasibility.
- `lib` for helpers (API client, URL state, error handling).
- `models` for types and Zod schemas.

This keeps the UI clean and lets me test logic separately without dragging React into it.

---

## Type safety
I cranked TypeScript up to strict mode and turned off things like `null` and `any`. Data from the API goes through Zod first, so I know the shape is valid before it ever hits the UI. That way I don’t have to write “what if this is undefined?” checks all over the place — the compiler and Zod enforce it for me.

---

## State and URL sync
I used Zustand because it’s light and easy to reason about. The store holds tasks, weather, the selected task, plus `isLoading` and `error`. I also sync the selected task with the URL (`?task=...`). That wasn’t in the brief, but I find it practical: you can reload or share a link and land on the same task.

---

## Feasibility logic
The Go/No-Go calculation is a pure function: give it a task and forecast points, it tells you if it’s safe and why not if it isn’t. It also returns details about violations (what limit, what time, what value). That makes it predictable and easy to test.

---

## Accessibility
I paid attention to a11y even though it wasn’t asked for:
- The timeline can be navigated with keyboard arrow keys.
- Focus styles are visible.
- The status indicator uses `role="status"` so screen readers announce GO/NO-GO.
- Error banners use `role="alert`.
- Images have alt text.
- And color is never the only way something is communicated.

---

## Error and loading
Instead of leaving blank panels, I show loaders and error banners with retry buttons. If there’s no forecast overlap, you see a clear message instead of an empty chart. These touches make it feel more like production software.

---

## Styling and layout
I kept the CSS light, using BEM-style class names. The app goes full-width, with Timeline as a sidebar and Selected Task as the main focus. Inside the Selected Task panel, the chart and the placeholder image stack vertically so the flow feels natural. I also added a sticky menubar at the top with navigation — not in the brief, but it frames the app nicely.

---

## Testing
I set up Vitest with React Testing Library. There are unit tests for task normalization, selectors, and the feasibility logic, plus an integration test that mocks the API and checks that the app renders a Go/No-Go status. I added a ResizeObserver polyfill so Recharts wouldn’t blow up in jsdom. Not everything is tested, but the core logic is covered.

---

## Trade-offs and extra touches
- I used Recharts for the chart instead of hand-rolling SVGs, because it’s faster for this scope.
- The 3D view is just static images (`task1.png`, `task2.png`, `task3.png`), as asked.
- I added URL syncing, the header bar, and strict lint rules — none of which were in the brief, but they show how I usually work.
- The strict ESLint/TS setup slowed me down a little but made me more confident nothing unsafe slipped through.

---

## What I’d do next
If I had more time I’d:
- Add more tests (retry flow, keyboard navigation).
- Let you switch vessels or projects.
- Simulate real-time forecast updates.
- Wire up CI with type checks, lint, and tests.
- Polish visuals (themes, chart height control, spacing).

---

## Closing thoughts
The case study asked for timeline, task details, chart, and feasibility. I delivered that, but also layered in type safety, error handling, accessibility, testing, and some UX polish. My goal was to hand over something that feels like the starting point of a real product, not just a demo.
