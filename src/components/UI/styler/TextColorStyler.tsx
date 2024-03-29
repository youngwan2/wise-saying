import { PhotoshopPicker} from 'react-color'
import styles from './styler.module.css'
import { useState, useEffect, useRef } from 'react'
import { useQuotesTextStyleStore } from '@/store/store'
import { TextStyleType } from './TextStyler'

interface PropsType {
  setTextStyleState: (p: TextStyleType) => void
  textStyle: TextStyleType
}
export default function TextColorStyler({
  setTextStyleState,
  textStyle,
}: PropsType) {
  const [displayState, setDisplayState] = useState(false)
  const [confirmedColor, setConfirmedColor] = useState<any>()
  const previewInputRef = useRef<HTMLInputElement>(null)

  const {size,color,unit} = useQuotesTextStyleStore((state)=>state)

  useEffect(() => {
    if (previewInputRef.current) {
      const inputEl = previewInputRef.current
      inputEl.style.cssText = `background:${color}; `
    }
  }, [color, size, unit])

  return (
    <article className={`${styles.font_color} w-[50px]`}>
      {/* 글자색 미리보기 */}
      <article className="flex w-full flex-col" onClick={()=> setDisplayState(true)}>
        <h2 className=" flex items-center text-[1.2em] text-[white] relative">
          <p className="ml-[0.5em]" aria-label='글자색 선택도구 제목'>T</p>
        </h2>
        <p
          aria-label="글자 색 미리보기"
          className="p-[4px] h-[4px] rounded-[20px] w-[28px] text-center bg-white"
          ref={previewInputRef}
        >
        </p>
      </article>

      {/* 글자색 변경(컬러 선택기) */}
      <PhotoshopPicker
        className={`${displayState?'block':'hidden'} fixed left-[50%] translate-x-[-50%] top-0 z-[100000]`}
        onChange={(color) => setConfirmedColor(color)}
        onCancel={() => setDisplayState(false)}
        color={confirmedColor}
        onAccept={() => {
          const color = confirmedColor?.hex || ''
          setConfirmedColor(color)
          setDisplayState(false)
          setTextStyleState({ ...textStyle, color })
        }}
      />
    </article>
  )
}
