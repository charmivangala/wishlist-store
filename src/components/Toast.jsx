import { useEffect } from 'react'

/**
 * Simple bottom-center toast. Parent owns the `message` state and clears it;
 * this component just renders and auto-dismisses after a delay.
 */
export default function Toast({ message, onClear, duration = 2400 }) {
  useEffect(() => {
    if (!message) return undefined
    const timer = setTimeout(onClear, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClear])

  if (!message) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] toast-in">
      <div className="bg-ink text-canvas px-4 py-3 rounded-xl2 shadow-card text-sm font-medium max-w-xs text-center">
        {message}
      </div>
    </div>
  )
}
