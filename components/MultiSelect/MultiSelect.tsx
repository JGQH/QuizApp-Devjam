import { Option, SelectProps } from '@Components/Select'
import useToggle from '@Hooks/useToggle'
import { useState } from 'react'

interface MultiSelectProps extends Omit<SelectProps, 'onChange'> {
  onChange?: (list:string[]) => void
}

export default function MultiSelect({ className = '', options = [''], onChange }: MultiSelectProps) {
  const [ list, setList ] = useState<string[]>([])
  const [ showed, toggleShowed ] = useToggle(false)

  const remainingList = options.filter(option => !list.includes(option))

  function handleChange(index:number) {
    const option = remainingList[index]
    const newList = [...list, option]

    if(onChange) {
      onChange(newList)
    }

    setList(newList)
    toggleShowed()
  }

  function removeSelection(index:number) {
    const newList = list.filter((_, i) => i !== index)
    
    if(onChange) {
      onChange(newList)
    }
    setList(newList)
  }

  return (
    <div className={`sm:w-fit relative ${className}`}>
      <div className='border border-cyan-400 hover:border-cyan-500 transition-all rounded-md p-2 flex flex-row justify-content-center content-center' onClick={() => toggleShowed()}>
        <div className='grow'>
          {list.map((option, key) => (
            <button key={key} className='btn mr-2 p-2 text-white rounded-md bg-cyan-400 hover:bg-cyan-500 transition-all' onClick={e => {
              removeSelection(key)
              e.stopPropagation()
            }}>
              {option}
            </button>
          ))}
        </div>
        <button className='btn px-2' style={{ 'aspectRatio': '1' }}>
          {showed ? '▲' : '▼'}
        </button>
      </div>
      <div className={`absolute top-full min-w-full z-50 ${!showed && 'hidden'}`}>
        {remainingList.map((option, key) => (
          <Option key={key} index={key} onClick={handleChange}>
            {option}
          </Option>
        ))}
      </div>
    </div>
  )
}