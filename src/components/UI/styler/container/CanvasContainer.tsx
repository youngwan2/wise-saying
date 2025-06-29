'use client'
import styles from '../styler.module.css'

import { useCallback, useEffect, useRef, useState } from 'react'

import DownloadButton from '../button/DownloadButton'

import toast from 'react-hot-toast'
import wrap from 'word-wrap'
import { useBackgroundColorStore, useImageElementStore, useQuotesCardSizeStore, useQuotesStrokeStyleStore, useQuotesTextAlign, useQuotesTextOptions, useQuotesTextStyleStore } from '@/store/stylerStore'


interface QuoteType {
  quote: string
  author: string
}

const DEFALT_LINE_HEIGHT = 9

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null)

  const { color, font, fontStyle, size, unit } = useQuotesTextStyleStore()
  const { color: strokeColor, thickness: strokeThickness } = useQuotesStrokeStyleStore()
  const { width, height, bgColor } = useCanvasStyle()
  const { textLength, lineHeight, textPositionY, textPositionX } = useQuotesTextOptions()

  const align = useQuotesTextAlign((state) => state.align) as CanvasTextAlign

  // 명언(텍스트)
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  // 배경이미지
  const bgImageSrc = useImageElementStore((state) => state.imageSrc)


  // 이미지 다운로드
  function onClickDownload() {
    const imageURL = canvasRef.current?.toDataURL() || ''
    const link = document.createElement('a')
    link.href = imageURL
    link.download = `${author}의 명언`
    link.click()
    toast.success('다운로드 되었습니다. 이용해 주셔서 감사합니다.')

  }

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


  async function fontLoad() {
    const fontFile = new FontFace(
      font,
      `url(/fonts/${font}.woff2)`
    )
    const isLoaded = await fontFile.load()
    document.fonts.add(fontFile)
    return isLoaded

  }

  // 텍스트 그리기
  const draw = useCallback(
    async (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      imageEl: HTMLImageElement,
    ) => {
      ctx.textAlign = `${align}`
      ctx.textBaseline = 'alphabetic'
      ctx.lineWidth = strokeThickness
      ctx.strokeStyle = strokeColor

      // 폰트 로드
      const isLoaded = await fontLoad()

      if (!imageEl && !isLoaded) return
      ctx.font = `${size}${unit} ${font}`
      imageEl.alt = '명언 카드 배경 이미지'

      // 이미지 로드
      const handleImageLoad = () => {
        clearCanvas(ctx, canvas) // 새 그림을 추가하기 전에 이전 그림들 제거
        bgColorDraw(ctx, width, height)
        ctx.fillStyle = `${color}`
        ctx.drawImage(imageEl, 0, 0, canvas.width, canvas.height)

        let appliedLineHeight = 0
        let [defaultTextPositionX, defaultTextPositionY] = [0, 0]
        const [changeTextPositionX, changeTextPositionY] = [textPositionX, textPositionY]
        const split = wrap(quote, { newline: '\n\n', width: textLength, indent: '' }).split('\n\n') // 텍스트가 일정 넓이를 벗어나면 자동 개행

        // 배열 형태로 분리된 텍스트를 조건에 따라서 다르게 렌더링한다.
        split.forEach((text, i) => {
          appliedLineHeight = (lineHeight) * DEFALT_LINE_HEIGHT * i
          defaultTextPositionY = (height / 10 + appliedLineHeight) + changeTextPositionY
          defaultTextPositionX = changeTextPositionX

          fontStyle === 'fill' && ctx.fillText(text, defaultTextPositionX, defaultTextPositionY)
          fontStyle === 'stroke' && ctx.strokeText(text, defaultTextPositionX, defaultTextPositionY)
          fontStyle === 'hybrid' && (
            ctx.strokeText(text, defaultTextPositionX, defaultTextPositionY),
            ctx.fillText(text, defaultTextPositionX, defaultTextPositionY))
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
      align,
      size,
      unit,
      textLength,
      strokeColor,
      lineHeight,
      textPositionX,
      textPositionY,
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

  useEffect(() => {
    const imageEl = new Image()
    setImageEl(imageEl)
  }, [])

  useEffect(() => {
    const { canvas, ctx } = createCanvas()

    if (!imageEl) return
    if (canvas && ctx) { draw(ctx, canvas, imageEl) }
  }, [draw, imageEl])

  // 선택한 명언 카드의 정보를 가져오는 이펙트
  useEffect(() => {
    if (localStorage.getItem('selectedItem')) {
      const jsonQuote = localStorage.getItem('selectedItem')!
      const item: QuoteType = JSON.parse(jsonQuote)
      setQuote(item.quote)
      setAuthor(item.author)
    }
  }, [])
  // 캔버스 표시 크기 계산 (실제 크기는 유지하되, 표시만 축소)
  const getDisplaySize = () => {
    const maxDisplayWidth = 800
    const maxDisplayHeight = 600

    if (width <= maxDisplayWidth && height <= maxDisplayHeight) {
      return { displayWidth: width, displayHeight: height, scale: 1 }
    }

    const scaleX = maxDisplayWidth / width
    const scaleY = maxDisplayHeight / height
    const scale = Math.min(scaleX, scaleY)

    return {
      displayWidth: width * scale,
      displayHeight: height * scale,
      scale
    }
  }

  const { displayWidth, displayHeight, scale } = getDisplaySize()

  return (
    <>
      <DownloadButton onClick={onClickDownload} />
      <article className={`mt-4 w-full p-4 rounded-lg bg-[#1E306A] shadow-lg`}>
        <div className="flex flex-row items-center justify-between w-full mb-2">
          <span className="text-white text-sm font-medium">
            {width} × {height} {scale < 1 && `(${Math.round(scale * 100)}% 표시)`}
          </span>

        </div>
        <div className="flex flex-col items-center space-y-3">
          <div
            className="relative border-2 border-gray-300 rounded overflow-hidden bg-white mt-2"
            style={{
              width: `${displayWidth}px`,
              height: `${displayHeight}px`,
              maxWidth: '100%',
              maxHeight: '70vh'
            }}
          >
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="w-full h-full object-contain"
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`
              }}
            />
          </div>
        </div>
      </article>
    </>
  )
}


const useCanvasStyle = () => {
  const { bgColor } = useBackgroundColorStore()
  const { width, height } = useQuotesCardSizeStore()
  return { bgColor, width, height }
}


