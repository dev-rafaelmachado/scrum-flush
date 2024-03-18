type Props = {
  value: string
}

export const Card = ({ value }: Props) => {
  return (
    <div className="bg-blue-dianne-950 w-28 h-44 flex flex-col justify-between p-2 font-extra font-black text-3xl rounded-md">
      <div className="text-blue-dianne-50 flex w-full justify-start">
        {value}
      </div>
      <div className="text-blue-dianne-50 flex w-full justify-center">
        {value}
      </div>
      <div className="text-blue-dianne-50 rotate-180 justify-end">{value}</div>
    </div>
  )
}
