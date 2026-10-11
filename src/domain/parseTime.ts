export type TimeParts = {
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
}

const TIME_INPUT_LENGTH = 8
const VALID_TIME_PATTERN = /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/

export function parseTime(input: string): TimeParts {
  if (
    input.length !== TIME_INPUT_LENGTH ||
    !VALID_TIME_PATTERN.test(input)
  ) {
    throw new RangeError(
      'Enter a valid time in HH:mm:ss format (00:00:00–23:59:59)',
    )
  }

  const [hours, minutes, seconds] = input.split(':').map(Number)

  return { hours, minutes, seconds }
}