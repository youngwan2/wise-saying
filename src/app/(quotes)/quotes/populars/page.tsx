'use client'
import ReplaceMessageCard from "@/components/UI/common/ReplaceMessageCard"
import PopularQuoteList from "@/components/UI/quote/PopularQuoteList"
import { useSwrFetch } from "@/utils/swr"
import toast from "react-hot-toast"
import { HiRefresh } from "react-icons/hi"

export interface QuoteType {
    quote_id: number
    quote: string
    author: string
    job: string
    category: string
    views: number
}
export default function PopularQuotesPage() {

    const url = '/api/quotes/populars'
    const { data, mutate } = useSwrFetch(url,1000 * 60, false)
    const { quotes } = data || { quotes: null }

    async function reload() {
        toast.promise(mutate(), {
            loading:'새로운 데이터를 불러오는 중입니다.',
            success:'최신 데이터로 갱신되었습니다.',
            error:'서버 문제로 데이터 조회에 실패하였습니다.'
        })
    }

    if (!quotes) return <ReplaceMessageCard childern='데이터를 조회중 입니다..' />
    return (
        <article>
            <h2 className="flex flex-col  justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
                실시간 인기명언 <span> Top 100</span>
            </h2>
            <button className="absolute flex items-center left-[50%] translate-x-[-50%] text-white hover:cursor-pointer z-[20] hover:text-[gold] " onClick={reload}><HiRefresh className='mx-[3px]' />새로고침 </button>
            <PopularQuoteList quotes={quotes} />
        </article>

    )
}