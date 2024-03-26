"use client"

import { useSwrFetch } from "@/utils/swr";
import ReplaceMessageCard from "../common/ReplaceMessageCard";
import PopularQuoteList from "./PopularQuoteList";
import toast from "react-hot-toast";
import { HiRefresh } from "react-icons/hi";


export default function PopularQuoteContainer() {

    const url = '/api/quotes/populars'
    const { data, mutate } = useSwrFetch(url, 15000)
    const { quotes } = data || { quotes: null }

    async function reload() {
        toast.promise(mutate(), {
            loading: '새로운 데이터를 불러오는 중입니다.',
            success: '최신 데이터로 갱신되었습니다.',
            error: '서버 문제로 데이터 조회에 실패하였습니다.'
        })
    }

    if (!quotes) return <ReplaceMessageCard childern='데이터를 조회중 입니다..' />

    return (
        <>
            <button className="absolute flex items-center left-[50%] translate-x-[-50%] text-white hover:cursor-pointer z-[20] hover:text-[gold] " onClick={reload}><HiRefresh className='mx-[3px]' />새로고침 </button>
            <PopularQuoteList quotes={quotes} />
        </>
    )
}