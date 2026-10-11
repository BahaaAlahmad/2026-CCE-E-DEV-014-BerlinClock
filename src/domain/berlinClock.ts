export type LampState = 'OFF' | 'YELLOW' | 'RED'

const SINGLE_MINUTE_LAMP_COUNT = 4
const MINUTES_PER_FIVE_MINUTE_BLOCK = 5

export function singleMinutes(minutes: number): readonly LampState[] {
  const illuminatedLampCount = minutes % MINUTES_PER_FIVE_MINUTE_BLOCK

  return Array.from(
    { length: SINGLE_MINUTE_LAMP_COUNT },
    (_, index): LampState =>
      index < illuminatedLampCount ? 'YELLOW' : 'OFF',
  )
}