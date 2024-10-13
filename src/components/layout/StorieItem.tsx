import { ReactNode, useState } from 'react'

import { AlignCenterHorizontalSimple } from '@phosphor-icons/react/dist/ssr'
import { tv } from 'tailwind-variants'

type StorieItemProps = {
  icon?: ReactNode
  id: string
  title: string
  points?: number
  description: string
  variant?: 'default' | 'selected'
  className?: string
  onClick?: () => void
}

const storieItemStyle = tv({
  base: 'flex py-4 rounded-md flex-row bg-white gap-3 cursor-pointer',
  variants: {
    variant: {
      default: 'bg-white px-4',
      selected: 'border-l-8 border-dianne-600 pl-2',
    },
  },
})

const defaultIcon = () => (
  <AlignCenterHorizontalSimple size={32} weight="bold" />
)

export const StorieItem = ({
  id,
  title,
  points,
  description,
  icon = defaultIcon(),
  variant,
  className,
  onClick,
}: StorieItemProps) => {
  const [isSelect, setIsSelect] = useState(false)
  return (
    <div
      onClick={() => {
        onClick?.()
        setIsSelect(!isSelect)
      }}
      className={storieItemStyle({
        variant: (variant ?? isSelect) ? 'selected' : 'default',
        className,
      })}
    >
      <div className="flex h-full w-8 items-center justify-center py-3">
        {icon}
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-row gap-2">
          <div className="flex flex-col items-start justify-center px-4">
            <p className="text-base text-[#989898]">ID:</p>
            <p className="text-lg text-black">{id}</p>
          </div>
          <div className="flex flex-1 flex-col items-start justify-center">
            <p className="text-base text-[#989898]">Title:</p>
            <p className="text-lg text-black">{title}</p>
          </div>
          <div className="flex flex-col items-start justify-center px-4">
            <p className="text-base text-[#989898]">Points:</p>
            <p className="text-lg text-black">{points || '?'}</p>
          </div>
        </div>
        {(variant === 'selected' || isSelect) && (
          <div className="flex flex-col items-start justify-center px-4">
            <p className="text-base text-[#989898]">Description:</p>
            <p className="text-lg text-black">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
