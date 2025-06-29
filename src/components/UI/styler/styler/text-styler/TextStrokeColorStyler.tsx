import { useQuotesStrokeStyleStore } from '@/store/stylerStore'
import { useEffect, useRef, useState } from "react"
import { PhotoshopPicker } from 'react-color'

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
        <article className="space-y-2">
            <label className="text-sm font-medium text-gray-700">외곽선 색상</label>
            <button
                type="button"
                className="flex items-center gap-2 w-full px-3 py-2 rounded border border-gray-300 bg-white hover:border-gray-400 transition"
                onClick={() => setDisplayState(true)}
            >
                <span
                    className="inline-block w-6 h-6 rounded border border-gray-200"
                    style={{ background: color }}
                    ref={divRef}
                />
                <span className="text-sm text-gray-600">색상 선택</span>
            </button>
            <PhotoshopPicker
                className={`${displayState ? 'block fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000]' : 'hidden'}`}
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
    )
}