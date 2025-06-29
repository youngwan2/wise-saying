'use client'

import useEmblaCarousel from 'embla-carousel-react'

import StylerCarouselCard from '../card/StylerCarouselCard'
import Autoplay from 'embla-carousel-autoplay'
import CarouselControlButtonContainer from '../container/CarouselControlButtonContainer'

import { HiInformationCircle } from 'react-icons/hi2'


interface PropsType {
  imagesSrc: string[]
  onClickSetBackgroundImage: (imgage: string) => void
  onClickDeleteBackgroundImage: (choiceIndex: number) => void
}

export default function StylerCarosel({ imagesSrc, onClickDeleteBackgroundImage, onClickSetBackgroundImage }: PropsType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="w-full mt-8">
      <div className='flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
        <HiInformationCircle className='text-blue-600 text-lg flex-shrink-0' />
        <p className='text-sm text-blue-800'>
          현재 {imagesSrc.length}개의 이미지가 업로드되었습니다. 필요에 따라 이미지를 추가할 수 있습니다.
        </p>
      </div>

      <article
        className="w-full overflow-hidden border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
        ref={emblaRef}
      >
        {/*캐러셀 카드 */}
        <figure className="flex py-8 px-6 gap-4">
          {imagesSrc.map((image, i) =>
            <StylerCarouselCard
              key={i}
              image={image}
              onClickDeleteImage={() => onClickDeleteBackgroundImage(i)}
              onClickSetImage={() => onClickSetBackgroundImage(image)}
            />
          )}
        </figure>
        {/* 캐러셀 조작 버튼 */}
        <CarouselControlButtonContainer emblaApi={emblaApi} />
      </article>
    </div>
  )
}
