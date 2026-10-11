import { BerlinClock } from './components/BerlinClock'
import { toBerlinClock } from './domain/berlinClock'
import './App.css'

const EXAMPLE_TIME = {
  hours: 16,
  minutes: 50,
  seconds: 6,
}

export default function App() {
  const clockState = toBerlinClock(
    EXAMPLE_TIME.hours,
    EXAMPLE_TIME.minutes,
    EXAMPLE_TIME.seconds,
  )

  return (
    <main className="app">
      <h1>Berlin Clock</h1>
      <p>Example time: 16:50:06</p>
      <BerlinClock state={clockState} />
    </main>
  )
}