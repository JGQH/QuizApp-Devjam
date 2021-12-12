import { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  children?: ReactNode
  className?: string
  onClick?: (e:MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ children, className, onClick }:ButtonProps) {
  return (
    <button className={`btn p-2 text-white rounded-md bg-cyan-400 hover:bg-cyan-500 transition-all ${className}`} onClick={e => onClick && onClick(e)}>
      {children}
    </button>
  )
}