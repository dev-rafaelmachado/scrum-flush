import { dateFormat } from '@/shared/utils/date/dateFormat'

import { Button } from '../common/Button'

type RoomCardProps = {
  title: string
  date: Date
  sprintName: string
  onEnter: () => void
  onDelete: () => void
}

export const RoomCard = ({
  title,
  date,
  sprintName,
  onEnter,
  onDelete,
}: RoomCardProps) => {
  return (
    <div className="flex min-w-72 max-w-80 flex-1 flex-col items-start justify-center gap-3 rounded-lg bg-dianne-950 p-4 text-white">
      <h1 className="text-2xl">{title}</h1>
      <div className="flex flex-col gap-1 text-sm">
        <p>{dateFormat(date)}</p>
        <p>{sprintName}</p>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Button
          className="w-1/3"
          variant="outline"
          label="Delete"
          color="error"
          onClick={onDelete}
        />
        <Button
          className="w-2/3"
          variant="default"
          label="Join"
          onClick={onEnter}
        />
      </div>
    </div>
  )
}
