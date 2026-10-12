# Berlin Clock

A Berlin Clock application built with React and TypeScript.

## Features

- Convert a manually entered time into Berlin Clock lamp states.
- Display browser-local system time, updated every second.
- Switch between manual and system-time modes.
- Validate input and show accessible error messages.
- Preserve the last submitted manual time when switching modes.

## Prerequisites

- Node.js 24
- npm

## Getting started

Clone the repository:

```bash
git clone https://github.com/BahaaAlahmad/2026-CCE-E-DEV-014-BerlinClock.git
cd 2026-CCE-E-DEV-014-BerlinClock
```

Install the dependencies recorded in package-lock.json:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal.
Press Ctrl+C to stop the server.

## Using the application

### Manual time

Enter a time in HH:mm:ss format and select Convert time,
or press Enter.

Hours must be between 00 and 23.
Minutes and seconds must be between 00 and 59.
Whitespace and incomplete formats are rejected.

Editing the input does not change the clock until submission.
Invalid submissions show an error and preserve the last valid display.

### System time

Select Use system time to display the browser's local time.
The display updates every second, and manual controls are disabled.

Deselect Use system time to restore the last submitted manual time.

The initial manual example is 16:50:06.

## Berlin Clock rules

Lamps illuminate from left to right.

| Row | Lamps | Meaning | Illuminated colors |
| --- | --- | --- | --- |
| Seconds | 1 | On for even seconds; off for odd seconds | Yellow |
| Five hours | 4 | Five hours per lamp | Red |
| Single hours | 4 | One remaining hour per lamp | Red |
| Five minutes | 11 | Five minutes per lamp | Yellow; positions 3, 6, and 9 are red |
| Single minutes | 4 | One remaining minute per lamp | Yellow |

For example, 16:50:06 produces:

- Seconds: yellow.
- Five hours: three red lamps, then one off.
- Single hours: one red lamp, then three off.
- Five minutes: ten illuminated lamps, then one off.
  Positions 3, 6, and 9 are red.
- Single minutes: all off.

## Tests and checks

Run all automated tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run lint checks:

```bash
npm run lint
```

Type-check and build the application:

```bash
npm run build
```

Tests use Vitest, React Testing Library, user-event, and jest-dom.
React tests run in jsdom.

The suite covers:

- Each lamp-row rule and complete clock conversion.
- Valid and invalid numeric boundaries.
- Strict HH:mm:ss parsing.
- Ordered lamp states and display updates.
- Manual submission, validation errors, and recovery.
- System-time updates and midnight rollover.
- Mode switching and preservation of manual time.
- Timer cleanup, including React Strict Mode.

System-time tests control Date and interval timers while keeping
interaction timers native.

Browser checks cover actual lamp colors, responsive layout,
keyboard controls, and focus visibility.

## Production preview

Build and serve the production output locally:

```bash
npm run build
npm run preview
```

Open the URL printed in the terminal.
The production build is generated in dist.

## Design

- src/domain: clock conversion and time parsing, independent of React.
- src/components: lamp rendering and the manual input form.
- src/hooks/useSystemTime.ts: local-time reading and timer lifecycle.
- src/App.tsx: time-mode selection and application composition.
- src/test/setup.ts: shared component-test setup and cleanup.

Lamp states use a TypeScript union to restrict valid values.
Domain constants name the quantities used by the clock rules.
CSS classes control presentation.

Clock state is derived from the displayed time rather than stored
as a second source of truth.

Each system-time tick reads the current local time instead of
incrementing a counter. The interval is cleared when system mode
is disabled or the component unmounts.

## Development approach

Clock conversion, parsing, and UI behavior were developed through
failing tests followed by implementation.

Small commits record test additions, implementation, and purposeful
refactoring. Later lifecycle tests verify existing cleanup behavior.

## AI assistance

AI assisted with planning, test suggestions, and troubleshooting.