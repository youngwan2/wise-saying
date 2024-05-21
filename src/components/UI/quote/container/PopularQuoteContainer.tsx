"use client"

import { useCardZoomInOutStore } from "@/store/store";
import { useSwrFetch } from "@/utils/swr";

import toast from "react-hot-toast";
import ZommInQuoteCard from "../card/ZoomInQuoteCard";
import Title from "../../common/Title/Title";
import ReplaceMessageCard from "../../common/card/ReplaceMessageCard";
import PopularQuoteList from "../list/PopularQuoteList";
import RefreshButton from '../button/RefreshButton';

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
            <RefreshButton onClickReload={reload}/>
            <PopularQuoteList quotes={quotes} />
            <ZommInQuoteCard item={quotes[cardIndex]} />
        </>
    )
}