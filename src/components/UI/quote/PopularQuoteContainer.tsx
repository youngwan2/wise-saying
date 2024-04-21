"use client"
import styles from './Quotes.module.css'

import { useCardZoomInOutStore } from "@/store/store";
import { useSwrFetch } from "@/utils/swr";

import toast from "react-hot-toast";

import { HiRefresh } from "react-icons/hi";
import ZommInQuoteCard from "./ZoomInQuoteCard";
import Title from "../common/Title";
import ReplaceMessageCard from "../common/ReplaceMessageCard";
import PopularQuoteList from "./PopularQuoteList";

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
    const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

    if (!quotes) return <ReplaceMessageCard childern='데이터를 불러오는 입니다..' />
    return (
        <>
            <Title title={`실시간 인기명언`} current={quotes.length||0} total={quotes.length||0} />
            <button aria-label="새로고침" className={`${styles.refresh_btn} top-[11em] border p-[8px] text-[1.15em] absolute flex items-center right-[4%] text-white hover:cursor-pointer z-[20] hover:text-[#e3e3e0] `}onClick={reload}><HiRefresh /></button>
            <PopularQuoteList quotes={quotes} />
            <ZommInQuoteCard item={quotes[cardIndex]} />
        </>
    )
}