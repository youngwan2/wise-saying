'use client'
import { QuoteType } from "@/app/(quotes)/quotes/populars/page"
import ReplaceMessageCard from "../common/ReplaceMessageCard"
import PopularQuoteCard from "./PopularQuoteCard"

interface PropsType {
    quotes: QuoteType[]
}
export default function PopularQuoteList({ quotes }: PropsType) {


    if (!quotes || quotes?.length < 1) return <ReplaceMessageCard childern='데이터를 조회중입니다..' />
    return (
        <ul className=" mt-[1em] pt-[2em] flex flex-col flex-wrap w-full perspective-500 transform-style-3d">
            {quotes.map(quoteInfo =>
            <PopularQuoteCard quoteInfo={quoteInfo} key={quoteInfo.quote_id}/>
               )}
        </ul>
    )
}