import { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: (e:MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ children, className, disabled = false, onClick }:ButtonProps) {
  return (
    <button className={`btn p-2 text-white rounded-md bg-cyan-400 hover:bg-cyan-500 transition-all ${disabled && 'opacity-50 cursor-not-allowed'} ${className}`} onClick={e => onClick && onClick(e)} disabled={disabled} >
      {children}
    </button>
  )
}