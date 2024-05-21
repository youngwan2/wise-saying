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
    <>
      <p className='sm:text-[1em] text-[0.85em] relative mt-[2em] mb-[1em] text-white flex items-center'><HiInformationCircle className='mt-[1.5px] mr-[2.5px]' /> {'현재 ' + imagesSrc.length + '개의 이미지가 업로드 되었습니다. 필요에 따라 별도의 이미지를 업로드하여 추가할 수 있습니다.'}</p>
      <article
        className=" mb-[2em] w-full overflow-hidden px-[3em]  shadow-[0_0_0_1px_white] rounded-[5px]  hover:bg-[#ffffff0e] "
        ref={emblaRef}
      >
        {/*캐러셀 카드 */}
        <figure className="flex pb-[5em] mt-[5em]">
          {imagesSrc.map((image, i) =>
            <StylerCarouselCard key={i} image={image} onClickDeleteImage={() => onClickDeleteBackgroundImage(i)} onClickSetImage={() => onClickSetBackgroundImage(image)} />)}
        </figure>
        {/* 캐러셀 조작 버튼 */}
        <CarouselControlButtonContainer emblaApi={emblaApi} />
      </article>
    </>
  )
}
