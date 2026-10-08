import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'success'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const V: Record<Variant, string> = { primary: 'btn-primary', ghost: 'btn-ghost', success: 'btn-success' }

export default function Button({ variant = 'primary', className = '', type = 'button', ...rest }: Props) {
  return <button type={type} className={`btn ${V[variant]} ${className}`} {...rest} />
}
