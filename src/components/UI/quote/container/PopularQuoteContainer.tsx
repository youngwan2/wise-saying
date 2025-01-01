"use client"

import QuoteContainer from "./QuoteContainer";
import Title from "../../common/Title/Title";
import RefreshButton from '../button/RefreshButton';
import { QuoteType } from "@/types/quote.types";


interface PropsType {
    quotes:QuoteType[]
    onReload:()=>void
}

export default function PopularQuoteContainer({quotes, onReload}:PropsType) {
    return (
        <>
            <Title title={`실시간 인기명언`} current={quotes?.length||0} total={quotes?.length||0} />
            <RefreshButton onClickReload={onReload}/>
            <QuoteContainer items={quotes} />
            
        </>
    )
}