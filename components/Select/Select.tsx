import useToggle from '@Hooks/useToggle'
import { ReactNode, useState } from 'react'

interface OptionProps {
  children?: ReactNode
  index: number
  selected:boolean
  onClick: (index:number) => void
}

function Option({ children, index, selected, onClick }:OptionProps) {
  return (
    <button className={`block p-2 rounded-md w-full text-left ${selected ? 'bg-neutral-200' : 'bg-neutral-100'}`} onClick={() => onClick(index)}>
      {children}
    </button>
  )
}

interface SelectProps {
  className?: string
  options?: string[]
  onChange?: (index:number) => void
}

export default function Select({ className = '', options = [''], onChange }:SelectProps) {
  const [ index, setIndex ] = useState(0)
  const [ showed, toggleShowed ] = useToggle(false)

  function handleChange(index:number) {
    if(onChange) {
      onChange(index)
    }

    setIndex(index)
    toggleShowed()
  } 

  return (
    <div className={`sm:w-fit relative ${className}`}>
      <div className='border border-cyan-400 hover:border-cyan-500 transition-all rounded-md p-2 flex flex-row justify-content-center content-center' onClick={() => toggleShowed()}>
        <p className='grow'>{options[index]}</p>
        <button className='btn text-2xl px-2' style={{ 'aspectRatio': '1' }}>
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