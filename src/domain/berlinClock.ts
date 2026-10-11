export type LampState = 'OFF' | 'YELLOW' | 'RED'

const SINGLE_MINUTE_LAMP_COUNT = 4
const MINUTES_PER_FIVE_MINUTE_BLOCK = 5
const MIN_MINUTES = 0
const MAX_MINUTES = 59

export function singleMinutes(minutes: number): readonly LampState[] {
  if (
    !Number.isInteger(minutes) ||
    minutes < MIN_MINUTES ||
    minutes > MAX_MINUTES
  ) {
    throw new RangeError('Minutes must be an integer between 0 and 59')
  }

  const illuminatedLampCount = minutes % MINUTES_PER_FIVE_MINUTE_BLOCK

  return Array.from(
    { length: SINGLE_MINUTE_LAMP_COUNT },
    (_, index): LampState =>
      index < illuminatedLampCount ? 'YELLOW' : 'OFF',
  )
}