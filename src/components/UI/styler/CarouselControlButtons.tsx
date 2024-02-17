import { useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

interface PropsType {
  emblaApi?: EmblaCarouselType
}
export default function CarouselControlButtons({
  emblaApi,
}: PropsType) {
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <article className="flex justify-center items-center mb-[3em] text-white">
      <button
        className="px-[10px] hover:bg-[gold] hover:text-black border mr-[10px]"
        onClick={scrollPrev}
      >
        Prev
      </button>
      <button
        className="px-[10px] hover:bg-[gold] hover:text-black border"
        onClick={scrollNext}
      >
        Next
      </button>
    </article>
  )
}
