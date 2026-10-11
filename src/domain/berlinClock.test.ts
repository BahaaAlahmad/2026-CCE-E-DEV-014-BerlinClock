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
})