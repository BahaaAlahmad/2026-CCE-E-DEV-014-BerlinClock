import type {
  BerlinClockState,
  LampState,
} from '../domain/berlinClock'
import './BerlinClock.css'

type BerlinClockProps = {
  readonly state: BerlinClockState
}

export function BerlinClock({ state }: BerlinClockProps) {
  const rows = [
    { name: 'Five hours', lamps: state.fiveHours },
    { name: 'Single hours', lamps: state.singleHours },
    { name: 'Five minutes', lamps: state.fiveMinutes },
    { name: 'Single minutes', lamps: state.singleMinutes },
  ]

  function lampClassName(lamp: LampState): string {
    return `lamp lamp--${lamp.toLowerCase()}`
  }

  return (
    <section className="berlin-clock" aria-label="Berlin Clock">
      <span
        role="img"
        aria-label={`Seconds lamp: ${state.seconds.toLowerCase()}`}
        className={`${lampClassName(state.seconds)} lamp--seconds`}
      />

      {rows.map((row) => (
        <div
          key={row.name}
          role="group"
          aria-label={row.name}
          className="berlin-clock__row"
        >
          {row.lamps.map((lamp, index) => (
            <span
              key={index}
              role="img"
              aria-label={`Lamp ${index + 1}: ${lamp.toLowerCase()}`}
              className={lampClassName(lamp)}
            />
          ))}
        </div>
      ))}
    </section>
  )
}