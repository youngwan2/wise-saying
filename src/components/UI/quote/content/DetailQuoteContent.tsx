"use client"

import { QuoteType } from '@/types/quote.types'
import styles from '../Quotes.module.css'
import { hoverAnimation } from '@/utils/common-func'


type UserType = {
    email:string
    nickname:string
}
interface PropsType {
    item: QuoteType & UserType
}
export default function DetailQuoteContent({ item }: PropsType) {

    const {author, quote, email, nickname,  job} = item
    return (
        <blockquote
            onMouseMove={hoverAnimation}
            className=
            {`${styles.card}
            p-[3em]
            text-[1.0595em] 
            relative
            bg-[rgba(255,255,255,0.06)]
            border
            border-[rgba(255,255,255,0.03)]
            hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
            text-white
            min-h-[280px]  text-center text-centermax-w-[900px] w-full mx-auto rounded-[10px] mt-[2em]
            flex items-center justify-center`}
        >
            <span className='bg-[rgba(255,255,255,0.05)] absolute text-white p-[3px] top-[10px] left-[5px] text-[0.9em]'>
                <span>작성자: {email ? nickname || '익명 유저' : "관리자"}</span>
            </span>

            <p className=' sm:text-[1.15rem] md:text-[1.3rem] text-[1rem]  leading-[1.95]'>{quote}</p>
            <span className='text-[0.9em] block absolute bottom-[0.5em] left-[50%] translate-x-[-50%] p-[5px] bg-[rgba(255,255,255,0.05)] '>- {author}({job||'알 수 없음'}) -</span>
        </blockquote>
    )
}