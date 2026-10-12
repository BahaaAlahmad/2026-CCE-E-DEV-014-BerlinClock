import { StrictMode } from 'react'
import type { ReactNode } from 'react'
import { act, cleanup, renderHook } from '@testing-library/react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { useSystemTime } from './useSystemTime'

function StrictModeWrapper({ children }: { children: ReactNode }) {
  return <StrictMode>{children}</StrictMode>
}

describe('useSystemTime lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['Date', 'setInterval', 'clearInterval'],
    })

    vi.setSystemTime(new Date(2026, 9, 12, 10, 20, 30))
  })

  afterEach(() => {
    cleanup()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('does not schedule updates while disabled', () => {
    renderHook(() => useSystemTime(false))

    expect(vi.getTimerCount()).toBe(0)
  })

  it('stops its timer when disabled and restarts one timer when enabled', () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useSystemTime(enabled),
      {
        initialProps: { enabled: true },
        wrapper: StrictModeWrapper,
      },
    )

    expect(vi.getTimerCount()).toBe(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe('10:20:31')

    rerender({ enabled: false })

    expect(vi.getTimerCount()).toBe(0)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.time).toBe('10:20:31')

    rerender({ enabled: true })

    expect(vi.getTimerCount()).toBe(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe('10:20:37')
  })

  it('clears its timer when unmounted under Strict Mode', () => {
    const { unmount } = renderHook(() => useSystemTime(true), {
      wrapper: StrictModeWrapper,
    })

    expect(vi.getTimerCount()).toBe(1)

    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})