import Image from 'next/image'

// import { useEffect, useState } from 'react'

import { tv } from 'tailwind-variants'

type CardVariant = 'default' | 'selected' | 'flipped'

export type FlushCardProps = {
  variant?: CardVariant
  value: string
  onClick?: () => void
  className?: string
}

const flushCardStyles = tv({
  base: 'bg-dianne-950 flex items-center justify-center h-44 w-28 text-center transition-all duration-300 ease-in-out rounded-lg',
  variants: {
    variant: {
      default: '',
      selected: 'border-purpose-alert border-2',
      flipped: 'cursor-pointer hover:-translate-y-10 hover:scale-105',
    },
  },
})

export function FlushCard({
  variant = 'default',
  value,
  onClick,
  className,
}: FlushCardProps) {
  return (
    <div className={flushCardStyles({ variant, className })} onClick={onClick}>
      {variant === 'flipped' ? (
        <div className="relative flex h-full w-full items-center justify-center">
          <p className="absolute left-2 top-2 font-special text-3xl text-dianne-50">
            {value}
          </p>
          <p className="font-special text-6xl text-dianne-50">{value}</p>
          <p className="absolute bottom-2 right-2 font-special text-3xl text-dianne-50">
            {value}
          </p>
        </div>
      ) : (
        <Image
          src="/svg/flush-icon.svg"
          alt="Flush Icon"
          width={52}
          height={52}
        />
      )}
    </div>
  )
}
