import useTTS from "@/custom/useTTS"

import ReplaceMessageCard from "../../common/card/ReplaceMessageCard"

import { QuoteType } from "@/types/quote.types"
import TodayQuotesSlide from "@/app/(home)/_components/slides/TodayQuotesSlide"


interface PropsType {
    items: QuoteType[]
    onAiComment: (quoteId: number, isUser: boolean) => void
}
export default function TodayQuoteList({ items = [], onAiComment }: PropsType) {

    const { setText } = useTTS()

    // 명언듣기 텍스트 설정
    function onTts(quote: string) {
        setText(quote)
    }

    if (!items || items.length < 1) return <ReplaceMessageCard isFull={false}>TTS를 적용할 명언이 존재하지 않습니다.</ReplaceMessageCard>
    return (
        <TodayQuotesSlide slides={items} onAiComment={onAiComment} onTts={onTts} />

    )
}