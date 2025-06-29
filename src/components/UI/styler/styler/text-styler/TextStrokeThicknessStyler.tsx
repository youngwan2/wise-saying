import { useQuotesStrokeStyleStore } from "@/store/stylerStore"
import { debounceCloser } from "@/utils/common-func"
import { ChangeEvent, useEffect, useState } from "react"
import { HiMinus, HiPlus } from "react-icons/hi2"

export default function TextStrokeThicknessStyler() {
    const [thickness, setThicknessState] = useState(1)
    const setThickness = useQuotesStrokeStyleStore((state) => state.setStrokeThicknessStyle)
    const storeThickness = useQuotesStrokeStyleStore((state) => state.thickness)

    function onSetThickness(e: ChangeEvent<HTMLInputElement>) {
        const value = Number(e.currentTarget.value)
        setThicknessState(value)
        debounceCloser(value, '', null, setThickness, 300)
    }

    function decrease() {
        if (thickness <= 0) return
        setThicknessState(thickness - 1)
        debounceCloser(thickness - 1, '', null, setThickness, 300)
    }
    function increase() {
        if (thickness >= 10) return
        setThicknessState(thickness + 1)
        debounceCloser(thickness + 1, '', null, setThickness, 300)
    }

    // store 값과 동기화
    useEffect(() => {
        setThicknessState(storeThickness)
    }, [storeThickness])

    return (
        <div className="flex flex-col space-y-2 flex-1 mt-3">
            <label className="text-sm font-medium text-gray-700">외곽선 두께</label>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:text-gray-800 hover:border-gray-300 transition-colors"
                    onClick={decrease}
                >
                    <HiMinus className="text-base" />
                </button>
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={thickness}
                    onChange={onSetThickness}
                    className="w-full accent-gray-500"
                />
                <button
                    type="button"
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:text-gray-800 hover:border-gray-300 transition-colors"
                    onClick={increase}
                >
                    <HiPlus className="text-base" />
                </button>
                <span className="text-xs text-gray-500 w-8 text-center">{thickness}</span>
            </div>
        </div>
    )
}