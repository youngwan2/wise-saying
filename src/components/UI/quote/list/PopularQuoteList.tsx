'use client'

import ReplaceMessageCard from "../../common/card/ReplaceMessageCard"
import PopularQuoteCard from "../card/PopularQuoteCard"

import { QuoteType } from "@/app/(quotes)/quotes/populars/page"

interface PropsType {
    quotes: QuoteType[]
}
export default function PopularQuoteList({ quotes }: PropsType) {

    if (!quotes)
    return (
      <ReplaceMessageCard childern="데이터를 불러오는 중입니다." />
    )
  if (quotes.length < 1)
    return <ReplaceMessageCard childern="데이터가 존재하지 않습니다." />
    return (
        <ul
            className="mt-[1em] pt-[2em] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-content-center w-full perspective-500 transform-style-3d">
            {quotes.map((quoteInfo, i) =>
                <PopularQuoteCard quoteInfo={quoteInfo} key={quoteInfo.quote_id} index={i} />
            )}
        </ul>
    )
}