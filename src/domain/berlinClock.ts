export type LampState = 'OFF' | 'YELLOW' | 'RED'

const SINGLE_MINUTE_LAMP_COUNT = 4
const MINUTES_PER_FIVE_MINUTE_BLOCK = 5
const MIN_MINUTES = 0
const MAX_MINUTES = 59
const FIVE_MINUTE_LAMP_COUNT = 11
const LAMPS_PER_QUARTER_HOUR = 3
const HOUR_ROW_LAMP_COUNT = 4
const HOURS_PER_FIVE_HOUR_BLOCK = 5
const MIN_HOURS = 0
const MAX_HOURS = 23

function validateMinutes(minutes: number): void {
  if (
    !Number.isInteger(minutes) ||
    minutes < MIN_MINUTES ||
    minutes > MAX_MINUTES
  ) {
    throw new RangeError('Minutes must be an integer between 0 and 59')
  }
}

function validateHours(hours: number): void {
  if (
    !Number.isInteger(hours) ||
    hours < MIN_HOURS ||
    hours > MAX_HOURS
  ) {
    throw new RangeError('Hours must be an integer between 0 and 23')
  }
}

function createUniformRow(
  lampCount: number,
  illuminatedLampCount: number,
  color: Exclude<LampState, 'OFF'>,
): readonly LampState[] {
  return Array.from(
    { length: lampCount },
    (_, index): LampState =>
      index < illuminatedLampCount ? color : 'OFF',
  )
}

export function singleMinutes(minutes: number): readonly LampState[] {
  validateMinutes(minutes)

  const illuminatedLampCount = minutes % MINUTES_PER_FIVE_MINUTE_BLOCK

  return createUniformRow(
    SINGLE_MINUTE_LAMP_COUNT,
    illuminatedLampCount,
    'YELLOW',
  )
}

export function fiveMinutes(minutes: number): readonly LampState[] {
  validateMinutes(minutes)

  const illuminatedLampCount = Math.floor(
    minutes / MINUTES_PER_FIVE_MINUTE_BLOCK,
  )

  return Array.from(
    { length: FIVE_MINUTE_LAMP_COUNT },
    (_, index): LampState => {
      if (index >= illuminatedLampCount) {
        return 'OFF'
      }

      const lampPosition = index + 1
      const isQuarterHourLamp =
        lampPosition % LAMPS_PER_QUARTER_HOUR === 0

      return isQuarterHourLamp ? 'RED' : 'YELLOW'
    },
  )
}

export function singleHours(hours: number): readonly LampState[] {
  validateHours(hours)

  const illuminatedLampCount = hours % HOURS_PER_FIVE_HOUR_BLOCK

  return createUniformRow(
    HOUR_ROW_LAMP_COUNT,
    illuminatedLampCount,
    'RED',
  )
}

export function fiveHours(hours: number): readonly LampState[] {
  validateHours(hours)

  const illuminatedLampCount = Math.floor(
    hours / HOURS_PER_FIVE_HOUR_BLOCK,
  )

  return createUniformRow(
    HOUR_ROW_LAMP_COUNT,
    illuminatedLampCount,
    'RED',
  )
}

export function secondsLamp(seconds: number): LampState {
  void seconds
  throw new Error('Not implemented')
}