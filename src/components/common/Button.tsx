import { ReactNode, MouseEventHandler } from 'react'

import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  variants: {
    variant: {
      default:
        'bg-dianne-700 text-white hover:bg-dianne-600 focus:ring-dianne-600',
      outline:
        'border border-dianne-700 text-dianne-700 hover:bg-dianne-700 hover:text-dianne-50 focus:ring-dianne-700 !bg-none',
      'with-icon':
        'gap-2 text-dianne-50 bg-dianne-700 hover:bg-dianne-600 focus:ring-dianne-600',
    },
    size: {
      default: 'h-10 px-5 py-2',
      sm: 'h-9 px-4 py-1.5',
      lg: 'h-11 px-8 py-3',
    },
    state: {
      default: '',
      loading: 'cursor-wait opacity-50',
    },
    iconPosition: {
      left: '',
      right: 'flex-row-reverse',
    },
    color: {
      default: '',
      error: '',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      color: 'error',
      class: 'bg-purpose-error text-white hover:bg-purpose-error-dark',
    },
    {
      variant: 'outline',
      color: 'error',
      class:
        'border-purpose-error text-purpose-error hover:bg-purpose-error hover:text-white',
    },
    {
      variant: 'default',
      state: 'loading',
      class: 'pointer-events-none',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    state: 'default',
  },
})

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  variant?: 'default' | 'outline' | 'with-icon'
  size?: 'default' | 'sm' | 'lg'
  state?: 'default' | 'loading'
  iconPosition?: 'left' | 'right'
  color?: 'default' | 'error'
  label?: string
  icon?: ReactNode
  children?: ReactNode
  htmlAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button = ({
  onClick,
  className,
  variant = 'default',
  size = 'default',
  state = 'default',
  iconPosition = 'left',
  color = 'default',
  label,
  icon,
  children,
  htmlAttributes,
}: ButtonProps) => {
  const content = label ? (
    <>
      {icon && icon}
      <span>{label}</span>
    </>
  ) : (
    children
  )

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonStyles({
        variant,
        size,
        state,
        iconPosition,
        color,
        className,
      })}
      {...htmlAttributes}
    >
      {content}
    </button>
  )
}
