
import PopularQuoteContainer from "@/components/UI/quote/PopularQuoteContainer"
import { Metadata } from "next"

export const metadata:Metadata= {
    title:'실시간 인기명언',
    description:'조회수가 높은 명언목록 100개를 실시간으로 조회하여 보여주는 페이지입니다.'
}

export interface QuoteType {
    quote_id: number
    quote: string
    author: string
    job: string
    category: string
    views: number
}
export default function PopularQuotesPage() {

    return (
            <PopularQuoteContainer />

    )
}