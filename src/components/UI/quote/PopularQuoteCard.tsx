import { QuoteType } from "@/app/(quotes)/quotes/populars/page";
import TtsButton from "../common/TtsButton";
import QuoteViews from "./QuoteViews";
import useTTS from "@/custom/useTTS";
import { HiSpeakerphone } from "react-icons/hi";
import QuoteProgress from "./QuoteProgress";
import QuoteDetailMoveButton from "./QuoteDetailMoveButton";
import { viewCounter } from "@/services/data/patch";
import { MouseEvent, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import gsap from "gsap/all";
import useIntersectionObserver from "@/custom/useIntersectionObserver";
import QuotesCardControlButtons from "./QuotesCardControlButtons";

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
  const onClickPushAnimation = (e: MouseEvent<HTMLButtonElement>) => {
    if (!quoteInfo) return
    viewCounter(quoteInfo.id)

    const tl = gsap.timeline()
    tl.to(e.currentTarget.parentElement, {
      scale: 0.8,
      duration: 1,
      onStart() {
        toast('✈ 잠시 후, 페이지를 전환합니다.', {
          className: 'font-sans'
        })
      },
    })
    tl.to(e.currentTarget.parentElement, {
      scale: 0.5,
      rotateY: 10,
      filter: 'blur(1px)',
      borderTopLeftRadius: '5%',
      borderBottomLeftRadius: '5%',
      boxShadow: '-100px 0 100px 0 tomato'

    })
    tl.to(e.currentTarget.parentElement, {
      x: window.innerWidth,
      opacity: 0,
    })
    tl.to(e.currentTarget.parentElement, {
      onComplete() {
        push(`/quotes/authors/${quoteInfo.author}/${quoteInfo.id}`)
        tl.kill()
      },
    })
  }

  return (
    <li ref={(element) => element instanceof HTMLLIElement && liRefs.current.push(element)} key={quoteInfo.id}
      className={`visible shadow-[inset_0_0_0_3px_white] rounded-[10px] w-[95%] my-[1em] max-w-[500px] bg-transparent  px-[15px] py-[35px] mx-auto relative hover:bg-[#d5d5d533]`}>
      <div className="absolute top-3">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 && '🥉'}</div>
      {/* 카드 만들기 버튼 */}
      <TtsButton quote={quoteInfo.quote} onClickSetText={onClickSetText} className='absolute right-[3.4em] top-[0.429em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white ' />
      <QuoteDetailMoveButton onClickDetailMove={onClickPushAnimation} />
      <QuoteProgress progress={progress} />
      <QuotesCardControlButtons item={quoteInfo} index={index}/>
      <blockquote className="text-white mt-[1.8em] ">
        <p>{readText || quoteInfo.quote}</p>
        <span className="block font-bold mt-[1em] text-right">
          - {quoteInfo.author} -
        </span>
      </blockquote>

      <QuoteViews viewCount={quoteInfo.views} />

      <p>{isPlaying
        ? <span className='text-[1.05em] animate-pulse absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px] flex items-center'><HiSpeakerphone color='gold' className='mr-[5px]' /> {progress}/100</span>
        : <span className='text-[1.05em] animate-none absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px]'></span>}</p>

    </li>
  )
}