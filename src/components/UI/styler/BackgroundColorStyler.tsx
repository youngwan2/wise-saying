import { useBackgroundColorStore } from "@/store/store"
import { useEffect, useRef, useState } from "react"
import { PhotoshopPicker } from "react-color"

export default function BackgroundColorStyler() {

    const [displayState, setDisplayState] = useState(false)
    const [previewColor, setPreviewColor] = useState<any>()

    const setBgColor = useBackgroundColorStore((state) => state.setBgColor)


    function onClickSetDisplay() {
        setDisplayState(!displayState)
    }
    const previewDivRef = useRef<HTMLDivElement>(null)
    const bgColor = useBackgroundColorStore((state) => state.bgColor)

    useEffect(() => {
        if (previewDivRef.current) {
            const divEl = previewDivRef.current
            divEl.style.cssText = `background-color:${bgColor};
            `
        }
    }, [bgColor])



    return (
        <article className="flex justify-between  mt-[0.5em] ">
            <h2 className="flex items-center text-[1.05em] text-[white] hover:cursor-pointer" onClick={onClickSetDisplay}>
                <p>배경색</p>
            </h2>
            <PhotoshopPicker
                className={`${displayState
                    ? 'block fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
                    : 'hidden'
                    }`}
                onChange={(color) => setPreviewColor(color)}
                onCancel={() => {
                    setDisplayState(!displayState)
                }}
                color={previewColor}
                onAccept={() => {
                    const color = previewColor.hex
                    setPreviewColor(color)
                    setBgColor(color)
                    setDisplayState(!displayState)
                }}
            />
            <div
                aria-label="배경색 미리보기"
                onClick={onClickSetDisplay}
                className="rounded-[5px] h-[26px] w-[26px] bg-white hover:cursor-pointer "
                ref={previewDivRef}
            />
        </article>
    )
}