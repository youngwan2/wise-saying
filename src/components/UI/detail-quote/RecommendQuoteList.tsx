"use client"

import { useRouter } from 'next/navigation'

import RecommendQuoteCard from './RecommendQuoteCard'
import { QuoteType } from '@/types/quote.types'


interface PropsType {
  recommendItems: QuoteType[]
}
export default function RecommendQuoteList({ recommendItems }: PropsType) {
  const { push } = useRouter()

  function onClickPageSwitchHandle(name: string, quoteId: number) {
    push('/quotes/authors/' + name + '/' + quoteId + '?type=no-user')
  }

  return (
    <article className='mt-[1em]'>
      <h3 className="text-white sm:text-[1.5em] text-[1.25em] mt-[2em]  bg-[rgba(255,255,255,0.05)] pl-2">
        다음 명언은 어떤가요?</h3>
      <ul className=' pt-[2em] flex flex-wrap w-full'>
        {recommendItems.map((item: QuoteType) =>
          <RecommendQuoteCard
            onClick={() => onClickPageSwitchHandle(item.author, item.quote_id)}
            quoteInfo={item}
            key={item.quote_id}
          />)}
      </ul>
    </article>
  )
}