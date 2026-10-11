# Berlin Clock

A Berlin Clock kata implemented with React and TypeScript using
test-driven development.

## Planned features

- Convert a manually entered time in HH:mm:ss format.
- Display browser-local system time and update every second.
- Switch between manual and system-time modes.
- Show clear errors for invalid input.

## Clock rules

Lamps illuminate from left to right.

- Seconds: one yellow lamp, on for even seconds and off for odd seconds.
- Five-hour row: four red lamps, each representing five hours.
- Single-hour row: four red lamps, each representing one hour.
- Five-minute row: eleven lamps, each representing five minutes.
  The third, sixth, and ninth lamps are red; the others are yellow.
- Single-minute row: four yellow lamps, each representing one minute.

## Time conventions

- Manual input uses the 24-hour HH:mm:ss format.
- Hours range from 00 to 23.
- Minutes and seconds range from 00 to 59.
- Manual time remains fixed until the user submits another time.
- System time uses the browser's local timezone.
- The seconds lamp indicates parity, not the exact second value.

## Implementation scope

This implementation uses React and TypeScript only.

The assignment email also requests a Java/Spring backend.
Acceptance of a frontend-only submission has not been confirmed.

## Development approach

- Write and run a failing behavioral test.
- Implement the smallest change that makes it pass.
- Refactor when it improves clarity, keeping tests passing.
- Record these steps in small, descriptive commits.
- Keep clock conversion independent of React components.

## Project status

Initial repository setup. The application has not been scaffolded yet.

Setup, run, build, and test instructions will be added as the
corresponding tooling is introduced.