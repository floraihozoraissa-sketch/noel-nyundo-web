import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-soft',
  secondary:
    'bg-accent-500 text-neutral-900 hover:bg-accent-600 active:bg-accent-700 shadow-soft',
  outline:
    'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 active:bg-primary-100',
  ghost:
    'text-primary-700 hover:bg-primary-50 active:bg-primary-100',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-small font-semibold rounded-lg',
  md: 'px-6 py-2.5 text-body font-semibold rounded-lg',
  lg: 'px-8 py-3.5 text-body-lg font-semibold rounded-xl',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    to?: undefined;
  };

type ButtonAsLink = CommonProps & {
  as: 'link';
  to: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
  } = props;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  const { as: _as, to: _to, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
