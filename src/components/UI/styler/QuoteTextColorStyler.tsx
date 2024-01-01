import { PhotoshopPicker } from 'react-color'
import { HiPaintBrush } from 'react-icons/hi2'
import { useState, useEffect, useRef } from 'react'
import { useQuotesTextStyleStore } from '@/store/store'
import { TextStyleType } from './QuotesTextStyler'



interface PropsType {
    setTextStyleState: (p: TextStyleType) => void
    textStyle: TextStyleType
}
export default function QuotesTextColorStyler({ setTextStyleState, textStyle }: PropsType) {


    const [displayState, setDisplayState] = useState(false)
    const [confirmedColor, setConfirmedColor] = useState<any>()
    const pickerRef = useRef<HTMLAreaElement>(null)
    const previewInputRef = useRef<HTMLInputElement>(null)

    const size = useQuotesTextStyleStore((state) => state.size)
    const color = useQuotesTextStyleStore((state) => state.color)
    const unit = useQuotesTextStyleStore((state) => state.unit)

    useEffect(() => {
        if (previewInputRef.current) {
            const inputEl = previewInputRef.current
            inputEl.style.cssText =
                `color:${color};
             font-size ${size}${unit};
            `
        }
    }, [color, size, unit])

    return (
        <article>
            <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" />
                <p className="ml-[0.5em]">글자 색</p>
            </h2>
            {/* 글자색 변경 */}
            <article className={`${displayState ? 'block fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : 'hidden'}`} ref={pickerRef}>
                <PhotoshopPicker
                    onChange={(color) => setConfirmedColor(color)}
                    onCancel={() => { setDisplayState(!displayState) }}
                    color={confirmedColor}
                    onAccept={() => {
                        const color = confirmedColor.hex
                        setConfirmedColor(color)
                        setDisplayState(!displayState)
                        setTextStyleState({ ...textStyle, color })
                    }
                    }
                />
            </article>
            {/* 글자색 미리보기 */}
            <article className='flex w-full'>
                <p aria-label='글자 색 변경 미리보기 텍스트' className='p-[1px] w-[120px] text-center bg-white ' ref={previewInputRef}>글자색</p>
                <button className='bg-[#d4d3d3] ml-[5px] px-[5px] ' onClick={() => setDisplayState(!displayState)}>변경</button>
            </article>
        </article>
    )
}