import styles from '../../styler.module.css'

import { useQuotesTextAlign } from "@/store/store"
import { MouseEvent, useState } from "react"

import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi"
import { HiXMark } from "react-icons/hi2"


const aligns =
    [
        {
            type: 'center',
            icon: <BiAlignMiddle />
        }, {
            type: 'right',
            icon: <BiAlignRight />

        }, {
            type: 'left',
            icon: <BiAlignLeft />

        }
    ]

export default function TextAlignStyler() {

    const [isShowOptions, setIsShowOptions] = useState(false)
    const { align, setAlign } = useQuotesTextAlign((state) => state)

    function onClickSetAlign(e: MouseEvent<HTMLButtonElement>) {
        const type = e.currentTarget.dataset.type || null
        type && setAlign(type)
    }

    function onClickSetIsShowOptions() {
        setIsShowOptions(!isShowOptions)
    }

    return (
        <>
            <button
                onClick={onClickSetIsShowOptions}
                className={
                    `${styles.align_option_button} ${isShowOptions
                        ? 'bg-[#91909049] rounded-[5px]'
                        : ''} hover:text-[#d5d4d4] text-white text-[1.45em] p-[3px] m-[5px]`}>
                {align === 'center' ? <BiAlignMiddle /> : align === 'left' ? <BiAlignLeft /> : <BiAlignRight />}
            </button>

            <article
                className={`${isShowOptions ? 'visible opacity-100' : 'invisible opacity-0'} transition bg-white max-w-[130px] w-full rounded-[10px] shadow-[0_5px_10px_5px_rgba(0,0,0,0.2)] absolute z-[100000] px-[10px] pt-[26px] pb-[10px] text-[1.35em]`}            >
                <button onClick={onClickSetIsShowOptions} className="absolute right-[1px] top-[1px] text-[0.95em] hover:shadow-[0_0_0_1px_tomato]"><HiXMark /></button>
                {aligns.map((align) => {
                    return <button className="mx-[5px] hover:bg-[#d3d3d3] p-[2px]" onClick={onClickSetAlign} data-type={align.type} key={align.type}>{align.icon} </button>
                })}
            </article>

        </>
    )
}