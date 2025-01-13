import './embla.css'

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButton"
import { QuoteType } from '@/types/quote.types'
import TodayQuoteCard from '@/components/UI/quote/card/TodayQuoteCard'




interface PropsType {
    slides: QuoteType[]
    options?: EmblaOptionsType
    onTts: (quote: string) => void
    onAiComment: (quoteId: number, isUser: boolean) => void
}
export default function TodayQuotesSlide(props: PropsType) {
    const { slides, options, onAiComment, onTts } = props
    const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, active:true })

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((quoteInfo, index) => (
                        <TodayQuoteCard quoteInfo={quoteInfo} key={quoteInfo.quote_id} onTts={onTts} onAiComment={onAiComment} />
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

            </div>
        </section>
    )


}