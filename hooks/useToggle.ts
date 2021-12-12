import { useState } from 'react'

export default function useToggle(initialState:boolean) {
  const [ state, setState ] = useState(initialState)

  function toggleState(forcedState?:boolean) {
    if(forcedState === undefined) { //If there is no forced state, just negate the current value
      setState(prevState => !prevState)
    } else {
      //If ther is a forced state, apply it
      setState(forcedState)
    }
  }

  return [ state, toggleState ] as const
}