import type { BerlinClockState } from '../domain/berlinClock'

type BerlinClockProps = {
  readonly state: BerlinClockState
}

export function BerlinClock({ state }: BerlinClockProps) {
  void state
  return null
}