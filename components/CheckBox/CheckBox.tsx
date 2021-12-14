import { ReactNode } from 'react'
import useToggle from '@Hooks/useToggle'

interface CheckBoxProps {
  children?: ReactNode
  className?: string
  defaultValue?: boolean
  disabled?: boolean
  isCorrect?:boolean
  onChange?: (value:boolean) => void
}

function getColoring(disabled:boolean, isCorrect:boolean|undefined, value:boolean):string {
  //If it is disabled and it has been stablised it is either correct or incorrect
  if(disabled && (isCorrect !== undefined)) {
    //If it is indeed correct, return green color
    if(isCorrect) return 'bg-green-500 dark:bg-green-600'

    //If it is wrong but it has been marked, return red color
    if(value) return 'bg-red-500 dark:bg-red-600'
  }
  return 'bg-gray-100 dark:bg-gray-800'
}

export default function CheckBox({ children, className, defaultValue = false, disabled = false, isCorrect, onChange }:CheckBoxProps) {
  const [ value, setValue ] = useToggle(defaultValue)

  function handleChange() {
    const newValue = !value

    setValue(newValue)

    if(onChange) {
      onChange(newValue)
    }
  }

  const realClassName = [
    'btn select-none p-2 rounded-md transition-all',
    className || '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    getColoring(disabled, isCorrect, value)
  ].join(' ')

  return (
    <button className={realClassName} onClick={handleChange} disabled={disabled}>
      {children}
      <span className='pl-3 font-bold text-cyan-400 dark:text-cyan-500'>{value ? '⦿' : '◯'}</span>
    </button>
  )
}