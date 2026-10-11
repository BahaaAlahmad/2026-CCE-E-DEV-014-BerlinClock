import { describe, expect, it } from 'vitest'
import {
  fiveHours,
  fiveMinutes,
  singleHours,
  singleMinutes,
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