import styles from '../Quotes.module.css'

import type { MouseEventHandler } from 'react'

import ControlButton from '../../common/button/ControlButton'
import TodayQuoteContent from '../content/TodayQuoteContent'

import { hoverAnimation } from '@/utils/common-func'

import { SlEarphones } from 'react-icons/sl'
import { QuoteType } from '@/types/items.types'

interface PropsType {
    quoteInfo: QuoteType
    onSetText: MouseEventHandler<HTMLButtonElement>
}

export default function TodayQuoteCard({
    quoteInfo,
    onSetText,
}: PropsType) {

    const { author, birth, job, quote, quote_id } = quoteInfo
    return (
        <li
            onMouseMove={hoverAnimation}
            className={`
            ${styles.card}
            hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.2)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] transition-all
             rounded-[10px]  my-[1em] max-w-[600px] bg-transparent  px-[15px] py-[35px] mx-auto relative`}
            key={quote_id}
        >
            {/* 명언 듣기 버튼 */}
            <ControlButton
                ariaLabel='명언 듣기'
                onClick={onSetText}
                className='absolute top-2 right-2 hover:border hover:border-[tomato] text-white p-[5px]'
            >
                <SlEarphones />
            </ControlButton>
            {/* 명언 내용 */}
            <TodayQuoteContent
                author={author}
                birth={birth}
                job={job}
                quote={quote}
            />
        </li>
    )
}
