interface Props {
    text: string;
  }

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-400	 flex-shrink-0">
          Y
        </div>
        <div className="relative mr-3 text-sm bg-black bg-opacity-25 py-2 px-4 shadow rounded-xl">
          <div>{text}</div>
        </div>
      </div>
    </div>
  )
}
