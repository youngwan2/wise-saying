import { useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

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
    <article className="flex justify-center items-center mb-[1.5em] mt-[-1em] text-white">
      <button
        className="p-[8px] rounded-[5px] px-[10px] hover:bg-[white] hover:font-bold hover:text-[#162557] border mr-[10px]"
        onClick={scrollPrev}
      >
        Prev
      </button>
      <button
        className="p-[8px] rounded-[5px] px-[10px] hover:bg-[white] hover:font-bold hover:text-[#162557] border"
        onClick={scrollNext}
      >
        Next
      </button>
    </article>
  )
}
