import { useState } from 'react'

export default function useList<T>() {
  const [ list, setList ] = useState<T[]>([])

  function clear() {
    setList([])
  }

  function push(element:T):T[] {
    const newList = [...list, element]
    setList(newList)
    return newList
  }

  function pop(index:number):T[] {
    const newList = list.filter((_, i) => i !== index)
    setList(newList)
    return newList
  }

  function remove(element:T) {
    const newList = list.filter(e => e !== element)
    setList(newList)
  }

  return [ list, { clear, push, pop, remove } ] as const
}