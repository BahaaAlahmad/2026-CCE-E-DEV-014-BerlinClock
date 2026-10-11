import { useState } from 'react'
import type { FormEvent } from 'react'
import { BerlinClock } from './components/BerlinClock'
import { toBerlinClock } from './domain/berlinClock'
import { parseTime } from './domain/parseTime'
import './App.css'

const INITIAL_TIME = '16:50:06'

export default function App() {
  const [inputTime, setInputTime] = useState(INITIAL_TIME)
  const [displayedTime, setDisplayedTime] = useState(INITIAL_TIME)
  const [error, setError] = useState<string | null>(null)

  const { hours, minutes, seconds } = parseTime(displayedTime)
  const clockState = toBerlinClock(hours, minutes, seconds)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    try {
      parseTime(inputTime)
    } catch (cause) {
      if (!(cause instanceof RangeError)) {
        throw cause
      }

      setError(cause.message)
      return
    }

    setDisplayedTime(inputTime)
    setError(null)
  }

  return (
    <main className="app">
      <h1>Berlin Clock</h1>

      <form className="time-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="time-input">Time (HH:mm:ss)</label>

        <div className="time-form__controls">
          <input
            id="time-input"
            type="text"
            value={inputTime}
            onChange={(event) => setInputTime(event.target.value)}
            placeholder="HH:mm:ss"
            aria-invalid={error !== null}
            aria-describedby={error ? 'time-error' : undefined}
          />

          <button type="submit">Convert time</button>
        </div>

        {error && (
          <p id="time-error" className="time-form__error" role="alert">
            {error}
          </p>
        )}
      </form>

      <p>Displayed time: {displayedTime}</p>
      <BerlinClock state={clockState} />
    </main>
  )
}