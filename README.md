# Entail Frontend Challenge

A React + TypeScript implementation of the Entail Senior Frontend Engineer case study.

The app displays:
- A **timeline** of planned offshore tasks
- A **Selected Task** panel with task details
- **Weather forecast** chart (wave height & period)
- **Go/No-Go** indicator based on weather limits
- Static **3D placeholders** for vessel/platform/riser views

Built with strict typing (no `any`, no `null`), accessible components, error handling, and automated tests.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or newer
- [pnpm](https://pnpm.io/) (recommended)

### Install dependencies
```bash
pnpm install
```

### Run the dev server

Start just the frontend:
```bash
pnpm run dev
```

Start only the mock API (json-server):
```bash
pnpm run dev:data
```

Start both frontend and API together:
```bash
pnpm run dev:all
```

- Frontend runs at: [http://localhost:5173](http://localhost:5173)  
- API runs at: [http://localhost:4000](http://localhost:4000)

### Lint & formatting
```bash
pnpm run lint        # check lint errors
pnpm run lint:fix    # fix lint errors
pnpm run format      # format with Prettier
pnpm run format:check
```

### Type checking
```bash
pnpm run check
```

### Run tests
```bash
pnpm run test          # single run
pnpm run test:watch    # watch mode
pnpm run test:coverage # with coverage
```

---
## 🧪 Testing

- Unit tests: normalization, selectors, feasibility logic
- Integration test: App loads, fetch is mocked, Go/No-Go indicator appears
- Run with:
  ```bash
  pnpm run test
  ```

---
...
---
