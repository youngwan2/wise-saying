import styles from '../Quotes.module.css'

import ControlButton from '../../common/button/ControlButton'
import TodayQuoteContent from '../content/TodayQuoteContent'

import { hoverAnimation } from '@/utils/common-func'

import { SlEarphones } from 'react-icons/sl'
import { QuoteType } from '@/types/quote.types'

interface PropsType {
    quoteInfo: QuoteType
    onTts: (quote: string) => void
    onAiComment: (quoteId: number, isUser: boolean) => void
}

export default function TodayQuoteCard({
    quoteInfo,
    onTts,
    onAiComment
}: PropsType) {

    const { author, birth, job, quote, quote_id } = quoteInfo
    return (
        <li
            onMouseMove={hoverAnimation}
            className={`
            ${styles.card}
            hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.2)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] transition-all shrink-0
             rounded-[10px] mx-8  my-[1em] min-w-[275px] max-w-[530px] bg-transparent  px-[15px] py-[35px] relative`}
            key={quote_id}
        >
            <ControlButton
                ariaLabel='AI 명언 해설'
                title='AI가 명언의 의미를 해석합니다.'
                onClick={() => onAiComment(quote_id, false)}
                className='absolute top-[5px] left-3 hover:border hover:border-[tomato] text-white p-[2px]'
            >
                AI 해설
            </ControlButton>
            {/* 명언 듣기 버튼 */}
            <ControlButton
                ariaLabel='명언 듣기'
                onClick={()=>onTts(quote)}
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
