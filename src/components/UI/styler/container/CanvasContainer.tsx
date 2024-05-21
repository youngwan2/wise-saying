'use client'
import styles from '../styler.module.css'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useBackgroundColorStore,
  useImageElementStore,
  useQuotesCardSizeStore,
  useQuotesStrokeStyleStore,
  useQuotesTextAlign,
  useQuotesTextOptions,
  useQuotesTextStyleStore,
} from '@/store/store'

import DownloadButton from '../button/DownloadButton'

import toast from 'react-hot-toast'
import wrap from 'word-wrap'


interface QuoteType {
  quote: string
}

const DEFALT_LINE_HEIGHT = 9
export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null)
  const { color, font, fontStyle, size, unit } = useTextStyle()
  const { color: strokeColor, thickness: strokeThickness } = useStrokeStyle()
  const { width, height, bgColor } = useCanvasStyle()
  const { textLength, lineHeight, textPositionY, textPositionX } = useQuotesTextOptions()

  const align = useQuotesTextAlign((state) => state.align) as CanvasTextAlign

  // 명언(텍스트)
  const [quote, setQuote] = useState('')

  // 배경이미지
  const bgImageSrc = useImageElementStore((state) => state.imageSrc)


  // 이미지 다운로드
  function onClickDownload() {
    const imageURL = canvasRef.current?.toDataURL() || ''
    const link = document.createElement('a')
    link.href = imageURL
    link.download = '내가 만든 카드'
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

      const fontFile = new FontFace(
        font,
        `url(/fonts/${font}.ttf)`
      )
      document.fonts.add(fontFile)

      const isLoaded = await fontFile.load()

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
    }
  }, [])

  return (
    <>
      <article className={`mt-[2em] min-h-[500px] w-[100%] shadow-[0_0_0_1px_white] p-[5px] rounded-[5px]  bg-[#1E306A] z-[1] hover:bg-[rgba(255,255,255,0.1)]`} >
        <span className="text-white inline-block mb-[1em]">
          {width} X {height}
        </span>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border mx-auto"
        ></canvas>
      </article>

      <div className={`${styles.canvas_buttons} absolute top-[1.15em] right-[1.15em] flex z-[0]`}>
        <DownloadButton
          onClick={onClickDownload}
        />
      </div>
    </>
  )
}

// store hooks
const useTextStyle = () => {
  const { color, unit, size, font, fontStyle } = useQuotesTextStyleStore((state) => state)
  return { color, unit, size, font, fontStyle }
}

const useCanvasStyle = () => {
  const { bgColor } = useBackgroundColorStore((state) => state)
  const { width, height } = useQuotesCardSizeStore((state) => state)
  return { bgColor, width, height }
}

const useStrokeStyle = () => {
  const { color, thickness } = useQuotesStrokeStyleStore((state) => state)
  return { color, thickness }
}

