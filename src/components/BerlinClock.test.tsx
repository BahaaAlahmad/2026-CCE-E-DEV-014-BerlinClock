import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { BerlinClockState } from '../domain/berlinClock'
import { BerlinClock } from './BerlinClock'

const clockAt165006: BerlinClockState = {
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
}

describe('BerlinClock', () => {
  it('displays the supplied lamp states in their correct rows', () => {
    render(<BerlinClock state={clockAt165006} />)

    expect(
      screen.getByRole('img', { name: 'Seconds lamp: yellow' }),
    ).toBeVisible()

    const expectedRows = [
      {
        name: 'Five hours',
        states: ['red', 'red', 'red', 'off'],
      },
      {
        name: 'Single hours',
        states: ['red', 'off', 'off', 'off'],
      },
      {
        name: 'Five minutes',
        states: [
          'yellow', 'yellow', 'red',
          'yellow', 'yellow', 'red',
          'yellow', 'yellow', 'red',
          'yellow', 'off',
        ],
      },
      {
        name: 'Single minutes',
        states: ['off', 'off', 'off', 'off'],
      },
    ]

    for (const row of expectedRows) {
      const group = screen.getByRole('group', { name: row.name })
      const lamps = within(group).getAllByRole('img')

      expect(lamps.map((lamp) => lamp.getAttribute('aria-label'))).toEqual(
        row.states.map((state, index) => `Lamp ${index + 1}: ${state}`),
      )

      for (const lamp of lamps) {
        expect(lamp).toBeVisible()
      }
    }
  })

  it('updates the seconds lamp when its supplied state changes', () => {
    const { rerender } = render(
      <BerlinClock state={clockAt165006} />,
    )

    expect(
      screen.getByRole('img', { name: 'Seconds lamp: yellow' }),
    ).toBeVisible()

    rerender(
      <BerlinClock state={{ ...clockAt165006, seconds: 'OFF' }} />,
    )

    expect(
      screen.getByRole('img', { name: 'Seconds lamp: off' }),
    ).toBeVisible()

    expect(
      screen.queryByRole('img', { name: 'Seconds lamp: yellow' }),
    ).not.toBeInTheDocument()
  })
})