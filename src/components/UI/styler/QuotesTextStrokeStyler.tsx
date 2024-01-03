import { HiPaintBrush } from "react-icons/hi2";
import { PhotoshopPicker } from 'react-color'
import { useState, useRef, useEffect } from 'react'
import { useQuotesStrokeStyleStore } from "@/store/store";

export default function QuotesTextStrokeStyler() {

    const [displayState, setDisplayState] = useState(false)
    const [confirmedColor, setConfirmedColor] = useState<any>()
    const color = useQuotesStrokeStyleStore((state) => state.color)
    const pickerRef = useRef<HTMLAreaElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const setThickness = useQuotesStrokeStyleStore((state) => state.setStrokeThicknessStyle)
    const setColor = useQuotesStrokeStyleStore((state) => state.setStrokeColorStyle)


    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.background = color
        }
    }, [color])


    return (
        <>
            {/* 외곽선 굵기 */}
            <article>
                <h2 className=" flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">글자 외곽선 굵기</p></h2>
                <article className="flex">
                    <input min={0} type="number" className="p-[5px] rounded-[0.5em] shadow-[0_0px_0px_1px_black] w-[200px] text-center bg-white" placeholder="Default: 1px" onChange={(e) => {
                        const thickness = Number(e.currentTarget.value)
                        setThickness(thickness)
                    }} />


                </article>
            </article>
            {/* 외곽선 색 */}
            <article className="mb-[1em]" >
                <h2 className=" flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">글자 외곽선 색</p></h2>
                {/* 컬러 픽커 */}
                <article className={`${displayState ? 'block fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : 'hidden'}`} ref={pickerRef}>
                    <PhotoshopPicker
                        onChange={(color) => setConfirmedColor(color)}
                        onCancel={() => { setDisplayState(!displayState) }}
                        color={confirmedColor}
                        onAccept={() => {
                            const color = confirmedColor.hex
                            setConfirmedColor(color)
                            setColor(color)
                            setDisplayState(!displayState)
                        }
                        }
                    />
                </article>
                <div className="flex items-center">
                    <div className="h-[32px] p-[5px] rounded-[0.5em] shadow-[0_0px_0px_1px_black] w-[195px] text-center bg-white" ref={divRef} ></div>
                    <button className='bg-[#fae04b] ml-[5px] p-[5px] rounded-[10px] w-[60px] ' onClick={() => setDisplayState(!displayState)}>변경</button>
                </div>
            </article>
        </>
    )
}