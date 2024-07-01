"use client"

import ZommInQuoteCard from "../card/ZoomInQuoteCard";
import Title from "../../common/Title/Title";
import RefreshButton from '../button/RefreshButton';
import { QuoteType } from "@/types/items.types";
import { useCardZoomInOutStore } from "@/store/store";
import QuoteContainer from "./QuoteContainer";

interface PropsType {
    quotes:QuoteType[]
    onReload:()=>void
}

export default function PopularQuoteContainer({quotes, onReload}:PropsType) {
    
    const {cardIndex} = useCardZoomInOutStore()

    return (
        <>
            <Title title={`실시간 인기명언`} current={quotes?.length||0} total={quotes?.length||0} />
            <RefreshButton onClickReload={onReload}/>
            <QuoteContainer items={quotes} />
            <ZommInQuoteCard item={quotes[cardIndex]} />
        </>
    )
}