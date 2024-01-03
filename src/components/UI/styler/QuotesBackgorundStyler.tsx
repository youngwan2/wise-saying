import { PhotoshopPicker } from 'react-color'
import { useState, useEffect, useRef } from 'react'
import { useBackgroundColorStore } from '@/store/store'
import { HiPaintBrush } from 'react-icons/hi2'

interface PropsType {
    selectTapNum: number
}
export default function QuotesBackgroundStyler({ selectTapNum }: PropsType) {


    const [displayState, setDisplayState] = useState(false)
    const [previewColor, setPreviewColor] = useState<any>()
    const pickerRef = useRef<HTMLAreaElement>(null)
    const previewDivRef = useRef<HTMLDivElement>(null)
    const bgColor = useBackgroundColorStore((state) => state.bgColor)
    const setBgColor = useBackgroundColorStore((state) => state.setBgColor)

    useEffect(() => {
        if (previewDivRef.current) {
            const divEl = previewDivRef.current
            divEl.style.cssText =
                `background-color:${bgColor};
            `
        }
    }, [bgColor])

    return (
        <article className={`${selectTapNum === 1 ? 'block' : 'hidden'} transition-all`}>
            <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">배경 색 변경</p></h2>
            <article className={`${displayState ? 'block fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : 'hidden'}`} ref={pickerRef}>
                <PhotoshopPicker
                    className=''
                    onChange={(color) => setPreviewColor(color)}
                    onCancel={() => { setDisplayState(!displayState) }}
                    color={previewColor}
                    onAccept={() => {
                        const color = previewColor.hex
                        setPreviewColor(color)
                        setBgColor(color)
                        setDisplayState(!displayState)
                    }
                    }
                />
            </article>
            <article className='flex w-full'>
                <div className='p-[5px] w-[200px] rounded-[10px] ' ref={previewDivRef} />
                <button className='bg-[#fae04b] ml-[5px] p-[5px] rounded-[10px] w-[60px]' onClick={() => setDisplayState(!displayState)}>변경</button>
            </article>
        </article>
    )
}