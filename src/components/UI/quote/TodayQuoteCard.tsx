'use client'

interface PropsType {
  id: number
  author: string
  quote: string
  index: number
}

export default function TodayQuoteCard({
  id,
  author,
  quote,
  index,
}: PropsType) {


  return (
    <li
      key={id}
      className="hover:shadow-[0_0_0_2px_tomato] px-[0.2em] py-[0.5em] bg-[#ffffffce] rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] max-w-[740px] w-full m-[10px] min-w-[200px]"
    >
      <blockquote>
        <p className="p-[0.5em]">{quote}</p>
        <p className="p-[8px] font-semibold text-end">- {author} -</p>
      </blockquote>
    </li>
  )
}
