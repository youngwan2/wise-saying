import styles from '../Quotes.module.css'

import { useRef } from 'react';
import { useRouter } from "next/navigation";
import useTTS from "@/custom/useTTS";
import useIntersectionObserver from "@/custom/useIntersectionObserver";

import QuoteProgress from "../progress/QuoteProgress";
import QuoteDetailMoveButton from "../button/QuoteDetailMoveButton";
import TtsButton from "../../common/button/TtsButton";
import QuoteViews from "../icon/QuoteViewIcon";
import QuoteCardControlButtons from "../button/QuoteCardControlButtons";
import PopularQuoteContent from '../content/PopularQuoteContent';
import PercentageProgress from '../progress/PercentageProgress';

import { viewCounter } from "@/services/data/patch";
import { hoverAnimation } from "@/utils/common-func";

import { QuoteType } from "@/app/(quotes)/quotes/populars/page";


interface PropsType {
  quoteInfo: QuoteType
  index: number
}


export default function PopularQuoteCard({ quoteInfo, index }: PropsType) {

  const liRefs = useRef<HTMLLIElement[]>([])
  const { isPlaying, progress, readText, setText } = useTTS()
  const { push } = useRouter()

  const onClickSetText = (quote: string | null) => {
    if (!quote) return
    setText(quote)
  }

  useIntersectionObserver(liRefs)

  // 상세 페이지 이동
  const onClickPushAnimation = () => {
    if (!quoteInfo) return
    viewCounter(quoteInfo.quote_id, 'views')
    push(`/quotes/authors/${quoteInfo.author}/${quoteInfo.quote_id}?type=no-user`)
  }

  return (
    <li
      ref={(element) => element instanceof HTMLLIElement && liRefs.current.push(element)}
      key={quoteInfo.quote_id}
      onMouseMove={hoverAnimation}
      className={`${styles.card}
        visible hover:shadow-[inset_0_2px_1px_0_rgba(255,255,255,0.1)] rounded-[5px] w-[95%] my-[1em] max-w-[500px] px-[15px] py-[35px] mx-auto relative shadow-[0_0_0_1px_rgba(255,255,255,0.1)]`}>

      <div className="text-white absolute top-3">{index === 0 ? 'TOP 1' : index === 1 ? 'TOP 2' : index === 2 && 'TOP 3'}</div>

      <TtsButton quote={quoteInfo.quote} onClickSetText={onClickSetText} className='absolute right-[3.4em] top-[0.429em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white ' />
      <QuoteDetailMoveButton onClickDetailMove={onClickPushAnimation} />
      <QuoteProgress progress={progress} />
      <QuoteCardControlButtons item={quoteInfo} index={index} />
      <PopularQuoteContent quote={quoteInfo.quote} author={quoteInfo.author} readText={readText} />
      <QuoteViews viewCount={quoteInfo.views} />
      <PercentageProgress isPlaying={isPlaying} progress={progress} />
    </li>
  )
}