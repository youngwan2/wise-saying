import { MouseEventHandler } from 'react'

interface PropsType {
  category: string
  onClickQuotesFilter: MouseEventHandler<HTMLLIElement>
}
export default function MypageQuotesCategoryCard({
  category,
  onClickQuotesFilter,
}: PropsType) {
  return (
    <li
      tabIndex={0}
      aria-label={category + '명언만 보기'}
      key={category}
      onClick={onClickQuotesFilter}
      className="hover:cursor-pointer hover:bg-[white] hover:text-black  inline-block border rounded-[2em] py-[3px] px-[10px]  text-white m-[3px]"
    >
      {category}
    </li>
  )
}
