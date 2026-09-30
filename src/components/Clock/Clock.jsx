import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Africa/Nairobi',
})

/** Live Nairobi time, with a blinking colon. */
const Clock = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 15)
    return () => window.clearInterval(id)
  }, [])

  const [h, m] = fmt.format(now).split(':')
  return (
    <time dateTime={now.toISOString()} className="clock" aria-label={`Nairobi time ${h}:${m}`}>
      {h}
      <span className="clock__colon" aria-hidden="true">
        :
      </span>
      {m}
    </time>
  )
}

export default Clock
