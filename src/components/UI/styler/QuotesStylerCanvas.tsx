"use client"
import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { useBackgroundColorStore, useImageElementStore, useQuotesCardSizeStore, useQuotesLineHeightStore, useQuotesStrokeStyleStore, useQuotesTextStyleStore } from "@/store/store"
import wrap from "word-wrap"


interface QuoteType {
    wise_sayings: string
}
export default function QuotesStylerCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageEl = useMemo(()=>{return new Image() },[])

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

    // 텍스트 외곽선
    const strokeColor = useQuotesStrokeStyleStore((state) => state.color)
    const strokeThickness = useQuotesStrokeStyleStore((state) => state.thickness)

    // 배경이미지
    const bgImageSrc = useImageElementStore((state) => state.imageSrc)

    // 이미지 리셋
    const isClear = useImageElementStore((state) => state.isClear)

    // 텍스트 그리기
    const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {

        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
        ctx.closePath()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `${color}`
        ctx.lineWidth = strokeThickness
        ctx.strokeStyle = strokeColor
        ctx.font = `${size}${unit} ${font}`

        const split = wrap(quote, {newline:'\n\n', width: 20}).split('\n\n')
        let textY = 0

        if (imageEl) {
            imageEl.alt = "명언 카드 배경 이미지"
            imageEl.addEventListener('load', () => {
                ctx.drawImage(imageEl, 0, 0, canvas.width, canvas.height)
                split.forEach((text, i) => {
                    textY = (height / 3) + (i * lineHeight)
                    if (fontStyle === 'fill') ctx.fillText(text, width / 2, textY)
                    if (fontStyle === 'stroke') ctx.strokeText(text, width / 2, textY)
                    if (fontStyle === 'hybrid') {
                        ctx.strokeText(text, width / 2, textY)
                        ctx.fillText(text, width / 2, textY)
                    }
                })

            })
            imageEl.src = bgImageSrc
        }

    }, [imageEl,bgColor, color, fontStyle, width, height, font, quote, size, unit, lineHeight, strokeColor, strokeThickness, bgImageSrc])

    const createCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        return { canvas, ctx }
    }

    useEffect(() => {
        const { canvas, ctx } = createCanvas()

        if (canvas && ctx) {
            draw(ctx, canvas)
        }
    }, [draw, isClear])


    useEffect(() => {
        if (localStorage.getItem('selectedItem')) {
            const jsonQuote = localStorage.getItem('selectedItem')!
            const quote: QuoteType = JSON.parse(jsonQuote)
            setQuote(quote.wise_sayings)
        }
    }, [])

    return (
        <article>
            <span className="text-white">{width}X{height}</span>
            <canvas ref={canvasRef} width={width} height={height} className="border">
            </canvas>
        </article>
    )
}