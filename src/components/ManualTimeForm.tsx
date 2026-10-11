import { useState } from 'react'
import type { FormEvent } from 'react'
import { parseTime } from '../domain/parseTime'
import './ManualTimeForm.css'

type ManualTimeFormProps = {
  readonly initialTime: string
  readonly disabled: boolean
  readonly onConvert: (time: string) => void
}

export function ManualTimeForm({
  initialTime,
  disabled,
  onConvert,
}: ManualTimeFormProps) {
  const [inputTime, setInputTime] = useState(initialTime)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (disabled) {
      return
    }

    try {
      parseTime(inputTime)
    } catch (cause) {
      if (!(cause instanceof RangeError)) {
        throw cause
      }

      setError(cause.message)
      return
    }

    setError(null)
    onConvert(inputTime)
  }

  return (
    <form className="time-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="time-input">Time (HH:mm:ss)</label>

      <div className="time-form__controls">
        <input
          id="time-input"
          type="text"
          value={inputTime}
          onChange={(event) => setInputTime(event.target.value)}
          placeholder="HH:mm:ss"
          disabled={disabled}
          aria-invalid={error !== null}
          aria-describedby={error ? 'time-error' : undefined}
        />

        <button type="submit" disabled={disabled}>
          Convert time
        </button>
      </div>

      {error && (
        <p id="time-error" className="time-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}