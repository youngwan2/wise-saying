

import { useRouter } from "next/navigation"
import useTTS from "@/custom/useTTS"

import TodayQuoteCard from "../card/TodayQuoteCard"

import gsap from "gsap/all"
import { useGSAP } from "@gsap/react"

import { QuoteType } from "@/types/items.types"


interface PropsType {
    items: QuoteType[]
}
export default function TodayQuoteList({ items }: PropsType) {

    const { setText } = useTTS()
    const router = useRouter()


    // 텍스트 스플릿 애니메이션
    function playSplitAnimation(textSplit: HTMLSpanElement[]) {
        const tl = gsap.timeline()

        textSplit.forEach((text, i) => {
            tl.from(text, {
                x: () => {
                    return 300
                },
                y: () => {
                    return i % 2 ? -50 : 50
                },
                border: '2px solid black',
                opacity: 0,
                position: 'absolute',
                ease: 'none',
            }, '-=0.45')
        })

    }

    // 페이지 이동
    function onClickPush(author: string) {
        router.push(`/quotes/authors/${author}`)
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
                        onPush={() => onClickPush(item.author)}
                        onSetText={() => onClickSetText(item.quote)}
                    />
                )
            })}
        </ul>
    )
}