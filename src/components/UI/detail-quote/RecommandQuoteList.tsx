"use client"

import { useRouter } from 'next/navigation'

import RecommandQuoteCard from './RecommandQuoteCard'

import { ItemsType } from "@/types/items.types"


interface PropsType {
  recommandItems: ItemsType[]
}
export default function RecommandQuoteList({ recommandItems }: PropsType) {
  const { push } = useRouter()

  function onClickPageSwitchHandle(name: string, quoteId: number) {
    push('/quotes/authors/' + name + '/' + quoteId + '?type=no-user')
  }

  return (
    <article className='mt-[1em]'>
      <h3 className="text-white sm:text-[1.5em] text-[1.25em] mt-[2em]  bg-[rgba(255,255,255,0.05)]">
        추천 명언(TOP 10)</h3>
      <ul className=' pt-[2em] flex flex-wrap w-full'>
        {recommandItems.map((item: ItemsType) =>
          <RecommandQuoteCard
            onClick={() => onClickPageSwitchHandle(item.author, item.quote_id)}
            quoteInfo={item}
            key={item.quote_id}
          />)}
      </ul>
    </article>

  )
}