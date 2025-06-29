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
    <div className="flex justify-center items-center gap-3 p-4 border-t border-gray-100">
      <SlideControlButton
        onClick={scrollPrev}
        rightMargin=''
        ariaLabel='이전 슬라이드 버튼'
      // className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
      >
        이전
      </SlideControlButton>
      <SlideControlButton
        onClick={scrollNext}
        ariaLabel='다음 슬라이드 버튼'
      // className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
      >
        다음
      </SlideControlButton>
    </div>
  )
}
