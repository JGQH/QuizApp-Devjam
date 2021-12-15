import { useEffect, useRef, useState } from 'react'

function humanReadable(msElapsed:number):string {
  const seconds = (Math.floor(msElapsed / 1000) % 60)
  const minutes = (Math.floor(msElapsed / 60000) % 60) //1000 * 60
  const hours = (Math.floor(msElapsed / 3600000) % 60) //1000 * 3600

  return `${hours}h ${minutes}m ${seconds}s`
}

export default function useTimer(inmediateStart:boolean) {
  const [ timing, setTiming ] = useState({
    start: 0,
    end: 0
  })

  function start() {
    const now = Date.now()
    setTiming({ start: now, end: now })
  }

  function end() {
    setTiming({ ...timing, end: Date.now() })
  }

  useEffect(() => {
    if(inmediateStart) start()
  }, [inmediateStart])

  return [ humanReadable(timing.end - timing.start), { start, end } ] as const
}