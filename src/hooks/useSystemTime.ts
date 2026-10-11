import { useEffect, useState } from 'react'

const CLOCK_UPDATE_INTERVAL_MS = 1000
const TIME_PART_WIDTH = 2

function readLocalTime(): string {
  const now = new Date()

  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((part) => String(part).padStart(TIME_PART_WIDTH, '0'))
    .join(':')
}

export function useSystemTime(enabled: boolean) {
  const [time, setTime] = useState(readLocalTime)

  function refresh(): void {
    setTime(readLocalTime())
  }

  useEffect(() => {
    if (!enabled) {
      return
    }

    const intervalId = window.setInterval(() => {
      setTime(readLocalTime())
    }, CLOCK_UPDATE_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [enabled])

  return { time, refresh }
}