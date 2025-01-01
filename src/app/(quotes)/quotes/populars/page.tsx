"use client"

import { useFetchPopularityQuoteQuery } from "@/custom/swr/useFetchQuote"
import ReplaceMessageCard from "@/components/UI/common/card/ReplaceMessageCard"

import PopularQuoteContainer from "@/components/UI/quote/container/PopularQuoteContainer"
import { toast } from "react-toastify"

export default function PopularQuotesPage() {

    
    const { data, mutate,isLoading, error } = useFetchPopularityQuoteQuery()
    const { quotes } = data || { quotes: null }

    async function onReload() {
        toast.promise(mutate(), { 
            pending: '새로운 데이터를 불러오는 중입니다.',
            success: '최신 데이터로 갱신되었습니다.',
            error: '서버 문제로 데이터 조회에 실패하였습니다.'
        })
    }

    if(error) return <ReplaceMessageCard>데이터를 불러오는 중 문제가 발생하였습니다.</ReplaceMessageCard>
    if(isLoading) return <ReplaceMessageCard>데이터를 불러오는 중입니다.</ReplaceMessageCard>
    if(quotes?.length<1) return <ReplaceMessageCard>조회된 데이터가 존재하지 않습니다.</ReplaceMessageCard>
    return (
            <PopularQuoteContainer onReload={onReload} quotes={quotes}/>
    )
}