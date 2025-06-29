"use client"
import { ChangeEvent, useState } from "react";
import { useQuotesTextOptions } from '@/store/stylerStore';
import TextLineHeightStyler from "./styler/text-styler/TextLineHeightStyler";
import TextPositionStyler from "./styler/text-styler/TextPositionStyler";
import TextLengthStyler from "./styler/text-styler/TextLengthStyler";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import { debounceCloser } from "@/utils/common-func";

export default function TextSettingOptions() {
    const [isShowOptions, setIsShowOptions] = useState(false)
    const setTextOptions = useQuotesTextOptions((state) => state.setTextOption)
    const textOptions = useQuotesTextOptions()

    function onTextOptionToggle() {
        setIsShowOptions(!isShowOptions)
    }

    function onSetOptions(e: ChangeEvent<HTMLInputElement>, target: string) {
        const value = Number(e.currentTarget.value)
        debounceCloser(value, target, textOptions, setTextOptions, 0)
    }

    return (
        <div className="flex flex-col space-y-2 flex-1 relative">
            <label className="text-sm font-medium text-gray-700">고급 설정</label>

            <button
                type="button"
                onClick={onTextOptionToggle}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white w-full"
            >                <div className="flex items-center gap-2">
                    <HiAdjustmentsHorizontal className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-700">고급 설정</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>            {isShowOptions && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 space-y-4">
                    <button
                        onClick={onTextOptionToggle}
                        className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <HiXMark className="w-4 h-4 text-gray-500" />
                    </button>
                    <TextPositionStyler textOptions={textOptions} onSetOption={onSetOptions} />
                    <TextLineHeightStyler textOptions={textOptions} onSetOption={onSetOptions} />
                    <TextLengthStyler textOptions={textOptions} onSetOption={onSetOptions} />
                </div>
            )}
        </div>
    )
}