import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('manual time entry', () => {
  it('converts a submitted time and updates the displayed lamps', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('textbox', { name: 'Time (HH:mm:ss)' })

    await user.clear(input)
    await user.type(input, '23:59:59')
    await user.click(screen.getByRole('button', { name: 'Convert time' }))

    expect(screen.getByText('Displayed time: 23:59:59')).toBeVisible()

    expect(
      screen.getByRole('img', { name: 'Seconds lamp: off' }),
    ).toBeVisible()

    const expectedRows = [
      {
        name: 'Five hours',
        states: ['red', 'red', 'red', 'red'],
      },
      {
        name: 'Single hours',
        states: ['red', 'red', 'red', 'off'],
      },
      {
        name: 'Five minutes',
        states: [
          'yellow', 'yellow', 'red',
          'yellow', 'yellow', 'red',
          'yellow', 'yellow', 'red',
          'yellow', 'yellow',
        ],
      },
      {
        name: 'Single minutes',
        states: ['yellow', 'yellow', 'yellow', 'yellow'],
      },
    ]

    for (const row of expectedRows) {
      const group = screen.getByRole('group', { name: row.name })

      expect(
        within(group)
          .getAllByRole('img')
          .map((lamp) => lamp.getAttribute('aria-label')),
      ).toEqual(
        row.states.map((state, index) => `Lamp ${index + 1}: ${state}`),
      )
    }
  })

  it('keeps the displayed time unchanged until the input is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('textbox', { name: 'Time (HH:mm:ss)' })

    await user.clear(input)
    await user.type(input, '11:37:01')

    expect(screen.getByText('Displayed time: 16:50:06')).toBeVisible()
    expect(
      screen.queryByText('Displayed time: 11:37:01'),
    ).not.toBeInTheDocument()
  })

  it('shows an error for invalid input and preserves the last valid display', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('textbox', { name: 'Time (HH:mm:ss)' })
    const submit = screen.getByRole('button', { name: 'Convert time' })

    await user.clear(input)
    await user.type(input, '23:59:59')
    await user.click(submit)

    await user.clear(input)
    await user.type(input, '12:60:00')
    await user.click(submit)

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid time in HH:mm:ss format (00:00:00–23:59:59)',
    )
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Displayed time: 23:59:59')).toBeVisible()
    expect(
      screen.getByRole('img', { name: 'Seconds lamp: off' }),
    ).toBeVisible()
  })

  it('clears the error when a valid time is submitted afterward', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('textbox', { name: 'Time (HH:mm:ss)' })
    const submit = screen.getByRole('button', { name: 'Convert time' })

    await user.clear(input)
    await user.type(input, '24:00:00')
    await user.click(submit)

    expect(screen.getByRole('alert')).toBeVisible()

    await user.clear(input)
    await user.type(input, '00:00:00')
    await user.click(submit)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Displayed time: 00:00:00')).toBeVisible()
    expect(
      screen.getByRole('img', { name: 'Seconds lamp: yellow' }),
    ).toBeVisible()
  })
})