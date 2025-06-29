import { useBackgroundColorStore } from "@/store/stylerStore"
import { useEffect, useRef, useState } from "react"
import { createPortal } from 'react-dom'

import { PhotoshopPicker } from "react-color"

export default function BackgroundColorStyler() {

    const [displayState, setDisplayState] = useState(false)
    const [previewColor, setPreviewColor] = useState<any>()
    const { bgColor, setBgColor } = useBackgroundColorStore()

    const previewDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (previewDivRef.current) {
            const divEl = previewDivRef.current
            divEl.style.cssText = `background-color:${bgColor};
            `
        }
    }, [bgColor])

    function onClickSetDisplay() {
        setDisplayState(!displayState)
    }
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">배경 색상</label>

            <button
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
                onClick={onClickSetDisplay}
            >
                <span className="text-gray-700">색상 선택</span>
                <div
                    className="w-8 h-8 rounded-md border border-gray-200 cursor-pointer"
                    style={{ backgroundColor: bgColor }}
                    ref={previewDivRef}
                />
            </button>

            {displayState && createPortal(
                <div className="fixed inset-0 bg-rgba(0,0,0,0.3) flex items-center justify-center z-[100000000001]">
                    <div className="relative">
                        <PhotoshopPicker
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
                    </div>
                </div>
                , document.body)}
        </div>
    )
}