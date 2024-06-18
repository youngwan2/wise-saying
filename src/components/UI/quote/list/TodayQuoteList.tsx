import useTTS from "@/custom/useTTS"
import { useGSAP } from "@gsap/react"

import TodayQuoteCard from "../card/TodayQuoteCard"

import gsap from "gsap/all"

import { QuoteType } from "@/types/items.types"


interface PropsType {
    items: QuoteType[]
}
export default function TodayQuoteList({ items }: PropsType) {

    const { setText } = useTTS()

    // 텍스트 스플릿 애니메이션
    function playSplitAnimation(textSplit: HTMLSpanElement[]) {
        const tl = gsap.timeline()

        textSplit.forEach((text, i) => {
            tl.fromTo(text, {
                x: () => {
                    return 300
                },
                y: () => {
                    return i % 2 ? -50 : 50
                },
                opacity: 0,
                position: 'absolute',
                ease: 'none',
 
            },{
                opacity:1,
                position: 'relative',

            },'-=0.4')
        })

    }

    // 명언듣기 텍스트 설정
    function onClickSetText(quote: string) {
        setText(quote)
    }

    useGSAP(() => {
        if (!items) return
        const textSplit = gsap.utils.toArray('.today-quote') as HTMLSpanElement[] || []
        playSplitAnimation(textSplit)
    }, [items])

    return (
        <ul className="overflow-hidden mx-[10px]">
            {items.slice(0, 1).map((item) => {
                return (
                    <TodayQuoteCard
                        key={item.quote_id}
                        quoteInfo={item}
                        onSetText={() => onClickSetText(item.quote)}
                    />
                )
            })}
        </ul>
    )
}