"use client"

import { useQuotesTextOptions } from "@/store/store";
import styles from './styler.module.css'
import TextLineHeightStyler from "./TextLineHeightStyler";
import TextPositionStyler from "./TextPositionStyler";
import { ChangeEvent, useState } from "react";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import { debounceCloser } from "@/utils/common-func";
import TextLengthStyler from "./TextLengthStyler";

export default function TextSettingOptions() {
    const [isShowOptions, setIsShowOptions] = useState(false)
    const setTextOptions = useQuotesTextOptions((state) => state.setTextOption)
    const textOptions = useQuotesTextOptions((state) => { return { lineHeight: state.lineHeight, textPositionY: state.textPositionY, textPositionX: state.textPositionX, textLength: state.textLength } })

    function onClickSetIsShowOptions() {
        setIsShowOptions(!isShowOptions)
    }

    function onSetOptions(e: ChangeEvent<HTMLInputElement>, target: string) {
        const value = Number(e.currentTarget.value)
        debounceCloser(value, target, textOptions, setTextOptions, 0)
    }

    return (
        <>
            <button onClick={onClickSetIsShowOptions} 
            className={`${styles.text_option_button}  ${isShowOptions?'bg-[#91909049] rounded-[5px]':''} hover:text-[#d5d4d4] text-white text-[1.48em] pl-0 p-[3px] ml-[0.8em] m-[5px]`}><HiAdjustmentsHorizontal /> </button>
            <article className={`${isShowOptions ? 'visible opacity-100' : 'invisible opacity-0'} transition bg-white max-w-[300px] w-full rounded-[10px] shadow-[0_5px_10px_5px_rgba(0,0,0,0.2)] absolute z-[100000] px-[10px] py-[15px]`}>
                <button onClick={onClickSetIsShowOptions} className="absolute right-1 top-1 text-[1.2em] hover:shadow-[0_0_0_1px_tomato]"><HiXMark /></button>
                <TextPositionStyler textOptions={textOptions} onSetOption={onSetOptions} />
                <TextLineHeightStyler textOptions={textOptions} onSetOption={onSetOptions} />
                <TextLengthStyler textOptions={textOptions} onSetOption={onSetOptions} />
            </article>
        </>
    )
}