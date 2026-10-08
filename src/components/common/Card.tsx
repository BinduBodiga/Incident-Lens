import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  accent?: 'red' | 'green'
}

export default function Card({ accent, className = '', ...rest }: Props) {
  const a = accent === 'red' ? 'border-l-[3px] border-l-red-500' : accent === 'green' ? '!border-green-800 !bg-[#0c2216]' : ''
  return <div className={`card ${a} ${className}`} {...rest} />
}
