import useToggle from '@Hooks/useToggle'
import { ReactNode, useState } from 'react'

interface OptionProps {
  children?: ReactNode
  index: number
  selected?:boolean
  onClick: (index:number) => void
}

export function Option({ children, index, selected = false, onClick }:OptionProps) {
  return (
    <button className={`block p-2 capitalize rounded-md w-full text-left ${selected ? 'bg-gray-200 dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-500'}`} onClick={() => onClick(index)}>
      {children}
    </button>
  )
}

export interface SelectProps {
  className?: string
  options?: string[]
  onChange?: (value:string) => void
}

export default function Select({ className = '', options = [''], onChange }:SelectProps) {
  const [ index, setIndex ] = useState(0)
  const [ showed, toggleShowed ] = useToggle(false)

  function handleChange(i:number) {
    if(onChange) {
      onChange(options[i])
    }

    setIndex(i)
    toggleShowed()
  } 

  return (
    <div className={`sm:w-fit relative ${className}`}>
      <div className='border dark:border-cyan-600 dark:hover:border-cyan-700 border-cyan-400 hover:border-cyan-500 transition-all rounded-md p-2 flex flex-row justify-content-center content-center' onClick={() => toggleShowed()}>
        <p className='grow capitalize'>{options[index]}</p>
        <button className='btn px-2' style={{ 'aspectRatio': '1' }}>
          {showed ? '▲' : '▼'}
        </button>
      </div>
      <div className={`absolute top-full min-w-full z-50 ${!showed && 'hidden'}`}>
        {options.map((option, key) => (
          <Option key={key} index={key} selected={key === index} onClick={handleChange}>
            {option}
          </Option>
        ))}
      </div>
    </div>
  )
}