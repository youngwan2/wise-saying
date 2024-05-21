import { useCallback } from 'react'

import { EmblaCarouselType } from 'embla-carousel'
import SlideControlButton from '../button/SlideControlButton'

interface PropsType {
  emblaApi?: EmblaCarouselType
}
export default function CarouselControlButtons({ emblaApi }: PropsType) {
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="flex justify-center items-center mb-[1.5em] mt-[-1em] text-white">
      <SlideControlButton onClick={scrollPrev} rightMargin='mar-[10px]' ariaLabel='이전 슬라이드 버튼' >
        이전
      </SlideControlButton>
      <SlideControlButton onClick={scrollNext} ariaLabel='다음 슬라이드 버튼'>
        다음
      </SlideControlButton>
    </div>
  )
}
