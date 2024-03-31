import PopularQuoteContainer from "@/components/UI/quote/PopularQuoteContainer"
import { Metadata } from "next"

export const metadata:Metadata= {
    title:'실시간 인기명언',
    description:'조회수가 높은 명언목록 100개를 실시간으로 조회하여 보여주는 페이지입니다.'
}

export interface QuoteType {
    id: number
    quote: string
    author: string
    job: string
    category: string
    views: number
}
export default function PopularQuotesPage() {

    return (
        <article>
            <h2 className="flex flex-col  justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
                실시간 인기명언 <span> Top 100</span>
            </h2>
            <PopularQuoteContainer />
        </article>

    )
}