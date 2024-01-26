"use client"

import useDraggable from "@/custom/useDraggable"
import { useEffect, useRef, useState } from "react"
import { HiArrowCircleDown, HiArrowCircleUp, HiDotsCircleHorizontal, HiDotsVertical, HiX } from "react-icons/hi"
import { HiXMark } from "react-icons/hi2"

export default function ScrollButton() {
    const [isDisplay, setIsDisplay] = useState(false)
    const asideRef = useRef<HTMLElement>(null)

    useDraggable(asideRef, 'x')

    useEffect(() => {

    }, [])

    return (
        <>
            <article
                ref={asideRef}
                className={` ${isDisplay ? 'bottom-[5em] visible opacity-100' : 'opacity-0 bottom-[4em] invisible'} fixed right-[1.25em] bg-[#807b7a22] rounded-[10px] p-[5px] pt-[10px] border-t-[0.25em] shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.5)] transition-all duration-75`}>
                <button onClick={() => {
                    window.scrollTo({ top: 0 })
                }} className="flex flex-col items-center my-[0.25em] bg-[tomato] rounded-full text-white text-[1.8em] "><HiArrowCircleUp /></button>
                <button onClick={() => {
                    window.scrollTo({ top: 2000000000000000 })
                }} className="flex flex-col items-center mt-[0.5em] bg-[tomato] rounded-full text-white text-[1.8em] "><HiArrowCircleDown /></button>
            </article>
            <button  onClick={() => {
                setIsDisplay(!isDisplay)
            }} className="transition-all  fixed my-[0.25em] bg-[#ff6347d4] rounded-full text-white text-[1.8em] bottom-[1em] right-[1em]"> {isDisplay ? <HiXMark /> : <HiDotsVertical />}  </button>
        </>

    )
}