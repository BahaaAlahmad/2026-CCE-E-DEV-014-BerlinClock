import { describe, expect, it } from 'vitest'
import { singleMinutes } from './berlinClock'

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
})