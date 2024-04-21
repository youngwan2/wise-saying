import { SlEarphones } from 'react-icons/sl'
import type { MouseEventHandler } from 'react'
import styles from './Quotes.module.css'
import { hoverAnimation } from '@/utils/common-func'

type QuoteType = {
    quote_id: number
    author: string
    quote: string
    job: string
    birth: string
    intro: string
}

interface PropsType {
    quoteInfo : QuoteType
    onPush: MouseEventHandler<HTMLElement>
    onSetText: MouseEventHandler<HTMLButtonElement>
}

export default function TodayQuoteCard({
    quoteInfo,
    onPush,
    onSetText,
}: PropsType) {

    const { author, birth, intro, job, quote, quote_id} = quoteInfo
    return (
        <li
            onMouseMove={hoverAnimation}
            className={`
            ${styles.card}
            hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.2)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] transition-all
             rounded-[10px]  my-[1em] max-w-[600px] bg-transparent  px-[15px] py-[35px] mx-auto relative`}
            key={quote_id }
        >
            {/* 명언 듣기 버튼 */}
            <button
                aria-label="명언 듣기"
                onClick={onSetText}
                className="absolute top-2 right-2 hover:border hover:border-[tomato] text-white p-[5px]"
            >
                <SlEarphones />
            </button>

            {/* 명언 */}
            {quote.split('').map((text, i) => {
                return <span key={i} className=" today-quote opacity-100 relative sm:text-[1.25em] text-[1.1em] mt-[0.5em] text-white">{text}</span>
            })}

            {/* 저자 */}
            <strong
                onClick={onPush}
                className="inline-block mt-[2em] mr-[1em] text-white text-right w-full hover:text-[tomato] hover:cursor-pointer"
            >
                {author}({job!=='알수없음'? job :'사이트 운영자'}{birth? ';'+birth:''})
            </strong>
            <div className="max-w-[100px] border-t-[20px] border-b-[20px] absolute  right-0 z-[1] top-0"></div>
        </li>
    )
}
