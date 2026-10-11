import { describe, expect, it } from 'vitest'
import { parseTime } from './parseTime'

describe('parseTime', () => {
  it.each([
    {
      input: '00:00:00',
      expected: { hours: 0, minutes: 0, seconds: 0 },
    },
    {
      input: '23:59:59',
      expected: { hours: 23, minutes: 59, seconds: 59 },
    },
    {
      input: '16:50:06',
      expected: { hours: 16, minutes: 50, seconds: 6 },
    },
    {
      input: '01:02:03',
      expected: { hours: 1, minutes: 2, seconds: 3 },
    },
  ])('parses $input into numeric time parts', ({ input, expected }) => {
    expect(parseTime(input)).toEqual(expected)
  })

  it.each([
    { input: '' },
    { input: '1:02:03' },
    { input: '12:3:04' },
    { input: '12:03:4' },
    { input: '12:30' },
    { input: '12:30:00:00' },
    { input: '12-30-00' },
    { input: 'ab:cd:ef' },
    { input: ' 12:30:00' },
    { input: '12:30:00 ' },
    { input: '12:30:00\n' },
    { input: '24:00:00' },
    { input: '12:60:00' },
    { input: '12:00:60' },
    { input: '-1:00:00' },
  ])('rejects invalid input "$input"', ({ input }) => {
    expect(() => parseTime(input)).toThrow(
      'Enter a valid time in HH:mm:ss format (00:00:00–23:59:59)',
    )
  })
})