import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

type ButtonBaseProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
}

type ButtonProps = ButtonBaseProps &
  (
    | { to: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }
    | {
        to?: undefined
        type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
        disabled?: boolean
      }
  )

const buttonStyles =
  'inline-flex min-h-11 items-center justify-center rounded-md bg-school-gold px-5 py-2.5 text-sm font-semibold text-school-navy transition-colors hover:bg-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy disabled:opacity-50 disabled:cursor-not-allowed'

export function Button(props: ButtonProps) {
  const { disabled = false, className = '', onClick, to, ...rest } = props
  const classes = `${buttonStyles} ${className}`.trim()
  const isLink = typeof to === 'string'

  if (isLink) {
    return (
      <Link
        className={classes}
        to={to as string}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (disabled) e.preventDefault()
          else onClick?.(e)
        }}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...rest}
      >
        {props.children}
      </Link>
    )
  }

  const buttonType = (rest as { type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] }).type ?? 'button'

  return (
    <button
      className={classes}
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
      {...rest}
    >
      {props.children}
    </button>
  )
}
