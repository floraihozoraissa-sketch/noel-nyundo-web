import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { Link } from 'react-router'

type ButtonBaseProps = {
  children: ReactNode
  className?: string
}

type ButtonProps = ButtonBaseProps &
  (
    | { to: string; onClick?: MouseEventHandler<HTMLAnchorElement> }
    | {
        to?: undefined
        type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
        onClick?: MouseEventHandler<HTMLButtonElement>
      }
  )

const buttonStyles =
  'inline-flex min-h-11 items-center justify-center rounded-md bg-school-gold px-5 py-2.5 text-sm font-semibold text-school-navy transition-colors hover:bg-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy'

export function Button(props: ButtonProps) {
  const classes = `${buttonStyles} ${props.className ?? ''}`.trim()

  if (typeof props.to === 'string') {
    return (
      <Link className={classes} to={props.to} onClick={props.onClick}>
        {props.children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={props.type ?? 'button'}
    >
      {props.children}
    </button>
  )
}
