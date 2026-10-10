import type { HTMLAttributes, ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function PageContainer({
  children,
  className = '',
  ...props
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
