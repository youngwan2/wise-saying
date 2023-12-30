"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { useBackgroundColorStore, useQuotesCardSizeStore, useQuotesLineHeightStore, useQuotesTextStyleStore } from "@/store/store"


interface QuoteType {
    wise_sayings: string
}
export default function QuotesStylerCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    // 텍스트 스타일 정보
    const color = useQuotesTextStyleStore((state) => state.color)
    const unit = useQuotesTextStyleStore((state) => state.unit)
    const size = useQuotesTextStyleStore((state) => state.size)
    const font = useQuotesTextStyleStore((state) => state.font)
    const fontStyle = useQuotesTextStyleStore((state) => state.fontStyle)
    const lineHeight = useQuotesLineHeightStore((state) => state.lineHeight)
    // 캔버스 스타일 정보
    const bgColor = useBackgroundColorStore((state) => state.bgColor)
    const width = useQuotesCardSizeStore((state) => state.width)
    const height = useQuotesCardSizeStore((state) => state.height)
    // 명언(텍스트)
    const [quote, setQuote] = useState('')


    // 텍스트 그리기
    const textDraw = useCallback((ctx: CanvasRenderingContext2D) => {

        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
        ctx.closePath()
        ctx.textAlign = 'center'
        ctx.fillStyle = `${color}`
        const split = quote.split('.')
        ctx.font = `${size}${unit} ${font}`

        let textY = 0
        split.forEach((text, i) => {
            textY = (height / 3) + (i * lineHeight)
            if (fontStyle === 'fill') ctx.fillText(text, width / 2, textY)
            if (fontStyle === 'stroke') ctx.strokeText(text, width / 2, textY)
            if (fontStyle === 'hybrid') {
                ctx.strokeText(text, width / 2, textY)
                ctx.fillText(text, width / 2, textY)
            }
        })
    }, [bgColor, color, fontStyle, width, height, font, quote, size, unit, lineHeight])


    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")

            if (ctx) {
                textDraw(ctx)
            }
        }
    }, [textDraw])

    useEffect(() => {
        if (localStorage.getItem('selectedItem')) {
            const jsonQuote = localStorage.getItem('selectedItem')!
            const quote: QuoteType = JSON.parse(jsonQuote)
            setQuote(quote.wise_sayings)
        }
    }, [])

    return (
        <article>
            <span>{width}X{height}</span>
            <canvas ref={canvasRef} width={width} height={height} className="border">
            </canvas>
        </article>
    )
}