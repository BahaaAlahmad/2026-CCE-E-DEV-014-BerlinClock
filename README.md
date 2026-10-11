# Berlin Clock

A Berlin Clock kata built with React and TypeScript using
test-driven development.

## Features planned

- Convert a manually entered time in HH:mm:ss format.
- Display browser-local system time and update every second.
- Switch between manual and system-time modes.
- Show clear errors for invalid input.

## Clock rules

Lamps illuminate from left to right.

| Row | Lamps | Meaning | Colors when illuminated |
| --- | --- | --- | --- |
| Seconds | 1 | On for even seconds; off for odd seconds | Yellow |
| Five hours | 4 | Each lamp represents five hours | Red |
| Single hours | 4 | Each lamp represents one hour | Red |
| Five minutes | 11 | Each lamp represents five minutes | Yellow; lamps 3, 6, and 9 are red |
| Single minutes | 4 | Each lamp represents one minute | Yellow |

## Time conventions

- Manual input uses the 24-hour HH:mm:ss format.
- Hours range from 00 to 23.
- Minutes and seconds range from 00 to 59.
- Manual time remains fixed until another time is submitted.
- System time uses the browser's local timezone.
- The seconds lamp indicates whether seconds are even or odd.
  It does not encode the exact second value.

## Prerequisites

- Node.js 24
- npm

## Install dependencies

From the repository root:

```bash
npm ci
```

The committed package-lock.json records the dependency versions.

## Run locally

```bash
npm run dev
```

Open the local URL printed in the terminal.

To stop the development server, press Ctrl+C.

## Check code quality

```bash
npm run lint
```

## Build for production

```bash
npm run build
```

The build output is generated in the dist directory.

## Preview the production build

```bash
npm run build
npm run preview
```

Open the local URL printed in the terminal.

## Development approach

Development follows the TDD cycle:

1. Write and run a failing test for a specific behavior.
2. Implement the smallest change that makes the test pass.
3. Refactor when it improves clarity, keeping tests passing.

Changes are recorded in small, descriptive commits.
Clock conversion logic will remain independent of React components.

## Run tests

Run the test suite once:

```bash
npm test
```

Run tests continuously during development:

```bash
npm run test:watch
```

Tests are named *.test.ts or *.test.tsx and kept beside the code
they specify.