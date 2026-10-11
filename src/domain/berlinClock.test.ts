import { describe, expect, it } from 'vitest'
import {
  fiveHours,
  fiveMinutes,
  secondsLamp,
  singleHours,
  singleMinutes,
  toBerlinClock,
} from './berlinClock'

describe('singleMinutes', () => {
  it('turns all four lamps off at zero minutes', () => {
    expect(singleMinutes(0)).toEqual([
      'OFF',
      'OFF',
      'OFF',
      'OFF',
    ])
  })

  it.each([
    { minutes: 1, expected: ['YELLOW', 'OFF', 'OFF', 'OFF'] },
    { minutes: 2, expected: ['YELLOW', 'YELLOW', 'OFF', 'OFF'] },
    { minutes: 3, expected: ['YELLOW', 'YELLOW', 'YELLOW', 'OFF'] },
    { minutes: 4, expected: ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'] },
  ])('lights $minutes lamps from left to right at $minutes minutes', ({
    minutes,
    expected,
  }) => {
    expect(singleMinutes(minutes)).toEqual(expected)
  })

  it('resets the row at five minutes', () => {
    expect(singleMinutes(5)).toEqual([
      'OFF',
      'OFF',
      'OFF',
      'OFF',
    ])
  })

  it('shows two remaining minutes at thirty-two minutes', () => {
    expect(singleMinutes(32)).toEqual([
      'YELLOW',
      'YELLOW',
      'OFF',
      'OFF',
    ])
  })

  it('lights all four lamps at fifty-nine minutes', () => {
    expect(singleMinutes(59)).toEqual([
      'YELLOW',
      'YELLOW',
      'YELLOW',
      'YELLOW',
    ])
  })

    it.each([
    { minutes: -1 },
    { minutes: 60 },
    { minutes: 1.5 },
    { minutes: Number.NaN },
    { minutes: Number.POSITIVE_INFINITY },
    { minutes: Number.NEGATIVE_INFINITY },
  ])('rejects invalid minutes: $minutes', ({ minutes }) => {
    expect(() => singleMinutes(minutes)).toThrow(
      'Minutes must be an integer between 0 and 59',
    )
  })
  
})

describe('fiveMinutes', () => {
  it.each([
    { minutes: 0, expected: 'OOOOOOOOOOO' },
    { minutes: 4, expected: 'OOOOOOOOOOO' },
    { minutes: 5, expected: 'YOOOOOOOOOO' },
    { minutes: 14, expected: 'YYOOOOOOOOO' },
    { minutes: 15, expected: 'YYROOOOOOOO' },
    { minutes: 23, expected: 'YYRYOOOOOOO' },
    { minutes: 30, expected: 'YYRYYROOOOO' },
    { minutes: 35, expected: 'YYRYYRYOOOO' },
    { minutes: 45, expected: 'YYRYYRYYROO' },
    { minutes: 59, expected: 'YYRYYRYYRYY' },
  ])('shows $expected at $minutes minutes', ({ minutes, expected }) => {
    const states = {
      O: 'OFF',
      Y: 'YELLOW',
      R: 'RED',
    } as const

    const expectedLamps = Array.from(expected, (symbol) => {
      return states[symbol as keyof typeof states]
    })

    expect(fiveMinutes(minutes)).toEqual(expectedLamps)
  })

  it.each([
    { minutes: -1 },
    { minutes: 60 },
    { minutes: 1.5 },
    { minutes: Number.NaN },
    { minutes: Number.POSITIVE_INFINITY },
    { minutes: Number.NEGATIVE_INFINITY },
  ])('rejects invalid minutes: $minutes', ({ minutes }) => {
    expect(() => fiveMinutes(minutes)).toThrow(
      'Minutes must be an integer between 0 and 59',
    )
  })
})

describe('singleHours', () => {
  it.each([
    { hours: 0, expected: ['OFF', 'OFF', 'OFF', 'OFF'] },
    { hours: 1, expected: ['RED', 'OFF', 'OFF', 'OFF'] },
    { hours: 2, expected: ['RED', 'RED', 'OFF', 'OFF'] },
    { hours: 3, expected: ['RED', 'RED', 'RED', 'OFF'] },
    { hours: 4, expected: ['RED', 'RED', 'RED', 'RED'] },
    { hours: 5, expected: ['OFF', 'OFF', 'OFF', 'OFF'] },
    { hours: 14, expected: ['RED', 'RED', 'RED', 'RED'] },
    { hours: 23, expected: ['RED', 'RED', 'RED', 'OFF'] },
  ])('shows $expected at $hours hours', ({ hours, expected }) => {
    expect(singleHours(hours)).toEqual(expected)
  })

  it.each([
    { hours: -1 },
    { hours: 24 },
    { hours: 1.5 },
    { hours: Number.NaN },
    { hours: Number.POSITIVE_INFINITY },
    { hours: Number.NEGATIVE_INFINITY },
  ])('rejects invalid hours: $hours', ({ hours }) => {
    expect(() => singleHours(hours)).toThrow(
      'Hours must be an integer between 0 and 23',
    )
  })
})

describe('fiveHours', () => {
  it.each([
    { hours: 0, expected: ['OFF', 'OFF', 'OFF', 'OFF'] },
    { hours: 4, expected: ['OFF', 'OFF', 'OFF', 'OFF'] },
    { hours: 5, expected: ['RED', 'OFF', 'OFF', 'OFF'] },
    { hours: 9, expected: ['RED', 'OFF', 'OFF', 'OFF'] },
    { hours: 10, expected: ['RED', 'RED', 'OFF', 'OFF'] },
    { hours: 15, expected: ['RED', 'RED', 'RED', 'OFF'] },
    { hours: 20, expected: ['RED', 'RED', 'RED', 'RED'] },
    { hours: 23, expected: ['RED', 'RED', 'RED', 'RED'] },
  ])('shows $expected at $hours hours', ({ hours, expected }) => {
    expect(fiveHours(hours)).toEqual(expected)
  })

  it.each([
    { hours: -1 },
    { hours: 24 },
    { hours: 1.5 },
    { hours: Number.NaN },
    { hours: Number.POSITIVE_INFINITY },
    { hours: Number.NEGATIVE_INFINITY },
  ])('rejects invalid hours: $hours', ({ hours }) => {
    expect(() => fiveHours(hours)).toThrow(
      'Hours must be an integer between 0 and 23',
    )
  })
})

describe('secondsLamp', () => {
  it.each([
    { seconds: 0, expected: 'YELLOW' },
    { seconds: 1, expected: 'OFF' },
    { seconds: 2, expected: 'YELLOW' },
    { seconds: 37, expected: 'OFF' },
    { seconds: 58, expected: 'YELLOW' },
    { seconds: 59, expected: 'OFF' },
  ])('shows $expected at $seconds seconds', ({ seconds, expected }) => {
    expect(secondsLamp(seconds)).toBe(expected)
  })

  it.each([
    { seconds: -1 },
    { seconds: 60 },
    { seconds: 1.5 },
    { seconds: Number.NaN },
    { seconds: Number.POSITIVE_INFINITY },
    { seconds: Number.NEGATIVE_INFINITY },
  ])('rejects invalid seconds: $seconds', ({ seconds }) => {
    expect(() => secondsLamp(seconds)).toThrow(
      'Seconds must be an integer between 0 and 59',
    )
  })
})

describe('toBerlinClock', () => {
  it('shows midnight with only the seconds lamp illuminated', () => {
    expect(toBerlinClock(0, 0, 0)).toEqual({
      seconds: 'YELLOW',
      fiveHours: ['OFF', 'OFF', 'OFF', 'OFF'],
      singleHours: ['OFF', 'OFF', 'OFF', 'OFF'],
      fiveMinutes: [
        'OFF', 'OFF', 'OFF', 'OFF', 'OFF', 'OFF',
        'OFF', 'OFF', 'OFF', 'OFF', 'OFF',
      ],
      singleMinutes: ['OFF', 'OFF', 'OFF', 'OFF'],
    })
  })

  it('shows 23:59:59 with every row filled except the fourth single-hour lamp', () => {
    expect(toBerlinClock(23, 59, 59)).toEqual({
      seconds: 'OFF',
      fiveHours: ['RED', 'RED', 'RED', 'RED'],
      singleHours: ['RED', 'RED', 'RED', 'OFF'],
      fiveMinutes: [
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'YELLOW',
      ],
      singleMinutes: ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
    })
  })

  it('shows each row correctly for 16:50:06', () => {
    expect(toBerlinClock(16, 50, 6)).toEqual({
      seconds: 'YELLOW',
      fiveHours: ['RED', 'RED', 'RED', 'OFF'],
      singleHours: ['RED', 'OFF', 'OFF', 'OFF'],
      fiveMinutes: [
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'OFF',
      ],
      singleMinutes: ['OFF', 'OFF', 'OFF', 'OFF'],
    })
  })

  it('shows each row correctly for 11:37:01', () => {
    expect(toBerlinClock(11, 37, 1)).toEqual({
      seconds: 'OFF',
      fiveHours: ['RED', 'RED', 'OFF', 'OFF'],
      singleHours: ['RED', 'OFF', 'OFF', 'OFF'],
      fiveMinutes: [
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'YELLOW', 'RED',
        'YELLOW', 'OFF', 'OFF', 'OFF', 'OFF',
      ],
      singleMinutes: ['YELLOW', 'YELLOW', 'OFF', 'OFF'],
    })
  })

  it.each([
    {
      hours: 24,
      minutes: 0,
      seconds: 0,
      error: 'Hours must be an integer between 0 and 23',
    },
    {
      hours: 12,
      minutes: 60,
      seconds: 0,
      error: 'Minutes must be an integer between 0 and 59',
    },
    {
      hours: 12,
      minutes: 0,
      seconds: 60,
      error: 'Seconds must be an integer between 0 and 59',
    },
  ])(
    'rejects invalid time $hours:$minutes:$seconds',
    ({ hours, minutes, seconds, error }) => {
      expect(() => toBerlinClock(hours, minutes, seconds)).toThrow(error)
    },
  )
})