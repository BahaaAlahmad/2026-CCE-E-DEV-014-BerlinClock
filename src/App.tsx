import { useState } from 'react'
import { BerlinClock } from './components/BerlinClock'
import { ManualTimeForm } from './components/ManualTimeForm'
import { toBerlinClock } from './domain/berlinClock'
import { parseTime } from './domain/parseTime'
import { useSystemTime } from './hooks/useSystemTime'
import './App.css'

const INITIAL_TIME = '16:50:06'

export default function App() {
  const [manualTime, setManualTime] = useState(INITIAL_TIME)
  const [useLiveTime, setUseLiveTime] = useState(false)

  const systemTime = useSystemTime(useLiveTime)
  const displayedTime = useLiveTime ? systemTime.time : manualTime
  const { hours, minutes, seconds } = parseTime(displayedTime)
  const clockState = toBerlinClock(hours, minutes, seconds)

  function changeTimeMode(enabled: boolean): void {
    if (enabled) {
      systemTime.refresh()
    }

    setUseLiveTime(enabled)
  }

  return (
    <main className="app">
      <h1>Berlin Clock</h1>

      <label className="system-time-control">
        <input
          type="checkbox"
          checked={useLiveTime}
          onChange={(event) => changeTimeMode(event.target.checked)}
        />
        Use system time
      </label>

      <ManualTimeForm
        initialTime={INITIAL_TIME}
        disabled={useLiveTime}
        onConvert={setManualTime}
      />

      <p>Displayed time: {displayedTime}</p>
      <BerlinClock state={clockState} />
    </main>
  )
}