import { useEffect, useState }  from 'react'

export default function useLocalStorage<T>(key:string, fallbackValue:T) {
  const [ value, setValue ] = useState<T>(fallbackValue)

  useEffect(() => {
    try {
      const stringValue = localStorage.getItem(key)

      if(stringValue) setValue(JSON.parse(stringValue))
    } catch(e) {
      
    }
  }, [])

  useEffect(() => {
    const stringValue = JSON.stringify(value)

    localStorage.setItem(key, stringValue)
  }, [value])

  return [ value, setValue ] as const
}