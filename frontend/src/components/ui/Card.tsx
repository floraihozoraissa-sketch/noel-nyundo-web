import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
