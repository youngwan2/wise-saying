interface PropsType {
  item: {
    id: number
    category: string
    quote: string
  }
}
export default function MyQuoteCard({ item }: PropsType) {
  return (
    <ul
      key={item.id}
      className="shadow-[inset_0_0_0_2px_white] p-[10px] rounded-[10px] my-[5px] max-w-[700px] mx-auto text-white hover:bg-[#ffffff1a] transition-all"
    >
      <li className="flex">
        <span className="rounded-[5px] mr-[10px] min-w-50px max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">
          구분{' '}
        </span>
        {item.id}
      </li>
      <li className="flex">
        <span className=" rounded-[5px] mr-[10px] min-w-50px max-w-[50px] inline-block  w-full px-[3px] m-[3px] font-semibold">
          명언{' '}
        </span>
        <p className="text-start">{item.quote}</p>
      </li>
      <li className="flex">
        <span className="rounded-[5px] mr-[10px] min-w-50px max-w-[50px] inline-block  w-full px-[3px] m-[3px] font-semibold">
          분류{' '}
        </span>
        {item.category}
      </li>
    </ul>
  )
}
