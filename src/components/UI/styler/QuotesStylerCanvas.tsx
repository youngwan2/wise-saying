'use client'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import {
  useBackgroundColorStore,
  useImageElementStore,
  useQuotesCardSizeStore,
  useQuotesLineHeightStore,
  useQuotesStrokeStyleStore,
  useQuotesTextStyleStore,
} from '@/store/store'

import toast, {Toaster} from 'react-hot-toast'
import wrap from 'word-wrap'
import QuotesStylerImageDownloadButton from './QuotesStylerImageDownloadButton'

interface QuoteType {
  quote: string
}
export default function QuotesStylerCanvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageEl, setImageEl] = useState<HTMLImageElement|null>(null)

  const { color, font, fontStyle, size, unit, lineHeight } = useTextStyle()
  const { color: strokeColor, thickness: strokeThickness } = useStrokeStyle()
  const { width, height, bgColor } = useCanvasStyle()


  // 명언(텍스트)
  const [quote, setQuote] = useState('')
  // 배경이미지
  const bgImageSrc = useImageElementStore((state) => state.imageSrc)

  const clearCanvas = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  const bgColorDraw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
    },
    [bgColor],
  )

  // 텍스트 그리기
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, imageEl:HTMLImageElement) => {
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.lineWidth = strokeThickness
      ctx.strokeStyle = strokeColor
      ctx.font = `${size}${unit} ${font}`

      const split = wrap(quote, { newline: '\n\n', width: 20 }).split('\n\n') // 텍스트가 일정 넓이를 벗어나면 자동 개행
      let textY = 0 // 캔버스에 그려질 텍스트의 Y 좌표축을 저장(또한, 개행 되는 텍스트의 높이를 저장)
      if (!imageEl) return
      imageEl.alt = '명언 카드 배경 이미지'

      const handleImageLoad = () => {
        clearCanvas(ctx, canvas) // 새 그림을 추가하기 전에 이전 그림들 제거
        bgColorDraw(ctx, width, height)
        ctx.fillStyle = `${color}`
        ctx.drawImage(imageEl, 0, 0, canvas.width, canvas.height)

        // 배열 형태로 분리된 텍스트를 조건에 따라서 다르게 렌더링한다.
        split.forEach((text, i) => {
          textY = height / 3 + i * lineHeight
          if (fontStyle === 'fill') {
            ctx.fillText(text, width / 2, textY)
          }
          if (fontStyle === 'stroke') ctx.strokeText(text, width / 2, textY)
          if (fontStyle === 'hybrid') {
            ctx.strokeText(text, width / 2, textY)
            ctx.fillText(text, width / 2, textY)
          }
        })
      }

      imageEl.addEventListener('load', handleImageLoad)
      // 모든 텍스트가 다 그려진 이후에 이미지를 추가하여 이미지가 글자 위로 덮어씌워 지는 것을 방지한다.
      imageEl.src = bgImageSrc

      return handleImageLoad

    },
    [
      color,
      fontStyle,
      width,
      height,
      font,
      quote,
      size,
      unit,
      lineHeight,
      strokeColor,
      strokeThickness,
      bgImageSrc,
      bgColorDraw,
    ],
  )

  // 캔버스 생성
  const createCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    return { canvas, ctx }
  }


  useEffect(()=>{
    const imageEl = new Image();
    setImageEl(imageEl)
  },[])

  useEffect(() => {
    const { canvas, ctx } = createCanvas()
  
    if (!imageEl) return
    if (canvas && ctx) {
      const handleImageLoad = draw(ctx, canvas, imageEl)
 
      return () => {
        if(!handleImageLoad) return
        imageEl.removeEventListener('load', handleImageLoad)
      }
    }
  }, [draw, imageEl])

  // 선택한 명언 카드의 정보를 가져오는 이펙트
  useEffect(() => {
    if (localStorage.getItem('selectedItem')) {
      const jsonQuote = localStorage.getItem('selectedItem')!
      const item: QuoteType = JSON.parse(jsonQuote)
      setQuote(item.quote)
    }
  }, [])

  return (
    <article className="min-h-[500px] w-[95%] bg-[#0f0f0fa4] p-[5px] relative shadow-[inset_5px_5px_5px_rgba(0,0,0,0.3)] rounded-[5px]">
      <Toaster/>
      <span className="text-white">
        {width}X{height}
      </span>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border shadow-[0_0px_5px_1px_rgba(1,100,500,0.7)]  mx-auto"
      ></canvas>
      <QuotesStylerImageDownloadButton
        onClick={() => {
          const imageURL = canvasRef.current?.toDataURL() || ''
          const link = document.createElement('a')
          link.href = imageURL
          link.download = '내가 만든 카드'
          link.click()
          toast.success('다운로드 되었습니다. 이용해 주셔서 감사합니다.')
        }}
      />
    </article>
  )
}

const useTextStyle = () => {
  const color = useQuotesTextStyleStore((state) => state.color)
  const unit = useQuotesTextStyleStore((state) => state.unit)
  const size = useQuotesTextStyleStore((state) => state.size)
  const font = useQuotesTextStyleStore((state) => state.font)
  const fontStyle = useQuotesTextStyleStore((state) => state.fontStyle)
  const lineHeight = useQuotesLineHeightStore((state) => state.lineHeight)

  return { color, unit, size, font, fontStyle, lineHeight }
}

const useCanvasStyle = () => {
  const bgColor = useBackgroundColorStore((state) => state.bgColor)
  const width = useQuotesCardSizeStore((state) => state.width)
  const height = useQuotesCardSizeStore((state) => state.height)

  return { bgColor, width, height }
}

const useStrokeStyle = () => {
  const color = useQuotesStrokeStyleStore((state) => state.color)
  const thickness = useQuotesStrokeStyleStore((state) => state.thickness)

  return { color, thickness }
}