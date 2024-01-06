"use client"

import { HiX } from "react-icons/hi"
import QuotesStylerCanvas from "./QuotesStylerCanvas"
import QuotesTextStyler from "./QuotesTextStyler"
import QuotesImageStyler from "./QuotesImageStyler"
import { useRouter } from "next/navigation"
import QuotesSizeStyler from "./QuotesSizeStyler"
import QuotesBackgroundStyler from "./QuotesBackgorundStyler"
import { useState } from "react"
import QuotesStylerTaps from "../tap/QuotesStylerTaps"

export default function QuoteStyler() {

    const router = useRouter()

    const [selecTapNum, setSelectTapNum] = useState(0)

    return (
        <div className={'opacity-[100%] visible fixed left-0 right-0 top-0 bottom-0 rounded-[10px] overflow-auto bg-[white] '}>
            <button onClick={() => {
                router.back()
            }} className="absolute right-2 top-2 text-[3em]"><HiX color="black"></HiX></button>

            <section className="flex flex-col justify-center w-full min-h-[100vh] p-[2em] mt-[2em] lg:flex-row lg:min-h-[90vh]">
                <article className="flex flex-col items-center w-full overflow-x-hidden mr-[1em] bg-[#303030]  rounded-[1em] shadow-[0_0px_5px_5px_rgba(0,0,0,0.4)] p-[1em] ">
                    {/* 메인 캔버스 */}
                    <QuotesStylerCanvas />
                    {/* 명언 배경 이미지 */}
                    <QuotesImageStyler />
                </article>

                {/* 우측  */}
                <article className="mt-[2em] w-full flex flex-col max-w-[100%] lg:max-w-[25%] lg:block pl-[1em] lg:mt-[0] bg-[#303030]  rounded-[1em]  shadow-[0_5px_5px_10px_rgba(0,0,0,0.2)] min-h-[400px]  ">
                    <QuotesStylerTaps selectTapNum={selecTapNum} setSelectTapNum={setSelectTapNum} />
                    {/* 명언 글자 편집 */}
                    <QuotesTextStyler selectTapNum={selecTapNum} />
                    {/* 카드 배경 편집 */}
                    <QuotesBackgroundStyler selectTapNum={selecTapNum} />
                    {/* 명언 카드 크기 편집 */}
                    <QuotesSizeStyler selectTapNum={selecTapNum} />
                </article>
            </section>
        </div>
    )
}