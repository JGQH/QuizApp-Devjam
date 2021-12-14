import { ReactNode } from 'react'
import useToggle from '@Hooks/useToggle'

interface CheckBoxProps {
  children?: ReactNode
  className?: string
  defaultValue?: boolean
  disabled?: boolean
  onChange?: (value:boolean) => void
}

export default function CheckBox({ children, className, defaultValue = false, disabled = false, onChange }:CheckBoxProps) {
  const [ value, setValue ] = useToggle(defaultValue)

  function handleChange() {
    const newValue = !value

    setValue(newValue)

    if(onChange) {
      onChange(newValue)
    }
  }

  return (
    <button className={`btn p-2 rounded-md dark:bg-gray-800 bg-gray-100 ${className} ${disabled && 'opacity-50 cursor-not-allowed'}`} onClick={handleChange} disabled={disabled}>
      {children}
      <span className='pl-3 font-bold text-cyan-400 dark:text-cyan-500'>{value ? '⦿' : '◯'}</span>
    </button>
  )
}