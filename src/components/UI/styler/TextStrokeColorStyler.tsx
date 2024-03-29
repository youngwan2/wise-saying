import { useQuotesStrokeStyleStore } from "@/store/store"
import { useEffect, useRef, useState } from "react"
import { PhotoshopPicker } from 'react-color'
import styles from './styler.module.css'

export default function TextStrokeColorStyler() {

    const [displayState, setDisplayState] = useState(false)
    const [confirmedColor, setConfirmedColor] = useState<any>()

    const setColor = useQuotesStrokeStyleStore(
        (state) => state.setStrokeColorStyle,
    )



    const color = useQuotesStrokeStyleStore((state) => state.color)
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.background = color
        }
    }, [color])

    return (

        <>
            {/* 외곽선 색 */}
            <article className={`${styles.stroke_color} w-[50px]`}>
                <article onClick={() => setDisplayState(true)} className='hover:cursor-pointer'>
                    <h2 className=" flex items-center text-[1.2em] pb-[0.25em] text-[white]">
                        <p className="ml-[0.5em]">S</p>
                    </h2>
                    <div className="flex items-center">
                        <div
                            className="p-[4px] h-[4px] rounded-[20px] w-[28px] text-center bg-white"
                            ref={divRef}
                        ></div>
                    </div>
                </article>

                {/* 컬러 픽커 */}
                <PhotoshopPicker
                    className={`${displayState
                        ? 'block fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000]'
                        : 'hidden'
                        }`}
                    onChange={(color) => setConfirmedColor(color)}
                    onCancel={() => setDisplayState(false)}
                    color={confirmedColor}
                    onAccept={() => {
                        const color = confirmedColor?.hex || ''
                        setConfirmedColor(color)
                        setColor(color)
                        setDisplayState(false)
                    }}
                />
            </article>
        </>
    )
}