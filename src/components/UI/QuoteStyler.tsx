"use client"

import { HiX } from "react-icons/hi"
import QuotesStylerCanvas from "./QuotesStylerCanvas"
import QuotesTextStyler from "./QuotesTextStyler"
import QuotesImageStyler from "./QuotesImageStyler"
import { useRouter } from "next/navigation"
import QUotesSizeStyler from "./QuotesSizeStyler"
import QuotesBackgroundStyler from "./QuotesBackgorundStyler"

export default function QuoteStyler() {

    const router = useRouter()

    return (
        <>
            <div className={'opacity-[100%] visible fixed left-0 right-0 top-0 bottom-0 bg-[#531e1e] overflow-auto '}>
                <button onClick={() => {
                    router.back()
                }} className="absolute right-2 top-2 text-[3em]"><HiX color="white"></HiX></button>

                <section className="flex flex-col justify-center w-full min-h-[100vh] p-[2em] mt-[2em] lg:flex-row lg:h-[90vh]">
                    <article className="flex flex-col items-center w-full border overflow-x-hidden mr-[1em]">
                        {/* 메인 캔버스 */}
                        <QuotesStylerCanvas />
                        {/* 명언 배경 이미지 */}
                        <QuotesImageStyler />
                    </article>

                    {/* 우측  */}
                    <article className="w-full flex flex-col max-w-[100%] border pl-[1em] lg:max-w-[30%] lg:block">
                        {/* 명언 글자 편집 */}
                        <QuotesTextStyler />
                        {/* 카드 배경 편집 */}
                        <QuotesBackgroundStyler />
                        {/* 명언 카드 크기 편집 */}
                        <QUotesSizeStyler />
                    </article>
                </section>
            </div>
        </>
    )
}