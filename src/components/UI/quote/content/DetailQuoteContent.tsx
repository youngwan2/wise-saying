"use client"

import styles from '../Quotes.module.css'

import { hoverAnimation } from '@/utils/common-func'

import { ItemsType } from '@/types/items.types'

type EmailType = {
    email:string
    nickname:string
}
interface PropsType {
    item: ItemsType & EmailType
}
export default function DetailQuoteContent({ item }: PropsType) {

    const {author, quote, email, nickname, birth, job} = item
    return (
        <blockquote
            onMouseMove={hoverAnimation}
            className=
            {`${styles.card}
            sm:text-[1.2em] sm:px-[3em]
            md:text-[1.35em] text-[1.15em] 
            italic
            relative
            bg-[rgba(255,255,255,0.06)]
            transition-all
            border
            border-[rgba(255,255,255,0.03)]
            hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
            text-white
             p-[3.5em] min-h-[280px]  text-center text-centermax-w-[900px] w-full mx-auto rounded-[10px] mt-[2em]
            flex items-center justify-center`}
        >
            <span className='bg-[rgba(255,255,255,0.05)] absolute text-white p-[3px] top-[10px] left-[5px] text-[0.78em]'>
                <span>작성자: {email ? nickname || '익명 유저' : "관리자"}</span>
            </span>

            <p className='leading-[1.8]'>{'" ' + quote + '"'}</p>
            <span className='text-[0.78em] block absolute bottom-[0.5em] left-[50%] translate-x-[-50%] p-[5px] bg-[rgba(255,255,255,0.05)] '>- {author}({job||'유저'}) -</span>
        </blockquote>
    )
}