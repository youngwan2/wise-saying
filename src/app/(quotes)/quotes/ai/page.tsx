import { Metadata } from "next"

export const metadata:Metadata= {
    title:'인공지능 생성 명언',
    description:'인공지능이 생성한 명언을 조회할 수 있는 페이지 입니다.'
}

export interface QuoteType {
    id: number
    quote: string
    author: string
    job: string
    category: string
    views: number
}
export default function PopularQuotesPage() {

    return (
        <article>
            <h2 className="flex flex-col  justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
                AI 명언
            </h2>
        </article>

    )
}