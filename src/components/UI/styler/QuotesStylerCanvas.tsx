"use client"
import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { useBackgroundColorStore, useImageElementStore, useQuotesCardSizeStore, useQuotesLineHeightStore, useQuotesStrokeStyleStore, useQuotesTextStyleStore } from "@/store/store"
import wrap from "word-wrap"


interface QuoteType {
    wise_sayings: string
}
export default function QuotesStylerCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageEl = useMemo(() => {
        if (Image) return new Image()
    }, [])

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

    const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const bgColorDraw= useCallback((ctx: CanvasRenderingContext2D,width: number, height: number)=>{
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
    },[bgColor])

    // 텍스트 그리기
    const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.lineWidth = strokeThickness
        ctx.strokeStyle = strokeColor
        ctx.font = `${size}${unit} ${font}`

        const split = wrap(quote, { newline: '\n\n', width: 20 }).split('\n\n') // 텍스트가 일정 넓이를 벗어나면 자동 개행
        let textY = 0 // 캔버스에 그려질 텍스트의 Y 좌표축을 저장(또한, 개행 되는 텍스트의 높이를 저장)
        if (imageEl) {
            imageEl.alt = "명언 카드 배경 이미지"
            imageEl.addEventListener('load', () => {
                clearCanvas(ctx, canvas) // 새 그림을 추가하기 전에 이전 그림들 제거
                bgColorDraw(ctx, width, height)
                ctx.fillStyle = `${color}`
                ctx.drawImage(imageEl, 0, 0, canvas.width, canvas.height)
                split.forEach((text, i) => {
                    textY = (height / 3) + (i * lineHeight)
                    if (fontStyle === 'fill') { ctx.fillText(text, width / 2, textY) }
                    if (fontStyle === 'stroke') ctx.strokeText(text, width / 2, textY)
                    if (fontStyle === 'hybrid') {
                        ctx.strokeText(text, width / 2, textY)
                        ctx.fillText(text, width / 2, textY)
                    }
                })
            })
            imageEl.src = bgImageSrc
        }

    }, [imageEl, color, fontStyle, width, height, font, quote, size, unit, lineHeight, strokeColor, strokeThickness, bgImageSrc, bgColorDraw])

    const createCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        return { canvas, ctx }
    }

    useEffect(() => {
        const { canvas, ctx } = createCanvas()
        if (canvas && ctx) {
            // clearCanvas(ctx, canvas)
            draw(ctx, canvas)
        }
    }, [draw])


    useEffect(() => {
        if (localStorage.getItem('selectedItem')) {
            const jsonQuote = localStorage.getItem('selectedItem')!
            const quote: QuoteType = JSON.parse(jsonQuote)
            setQuote(quote.wise_sayings)
        }
    }, [])

    return (
        <article className="min-h-[500px] w-[90%] bg-[#0f0f0fc7] p-[10px] relative shadow-inner shadow-[#303030]">
            <span className="text-white">{width}X{height}</span>
            <canvas ref={canvasRef} width={width} height={height} className="border shadow-[0_0px_5px_1px_rgba(1,100,500,0.7)]  mx-auto">
            </canvas>
        </article>
    )
}