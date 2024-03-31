'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useState } from 'react'
import Image from 'next/image'
import { useImageElementStore } from '@/store/store'
import StylerImageUploadForm from './StylerImageUploadForm'
import CarouselControlButtons from './CarouselControlButtons'
import { HiInformationCircle } from 'react-icons/hi2'

const DEFAULT_IMG_SIZE = { width: 230, height: 230 }

export default function StylerCarosel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [imagesSrc, setImagesSrc] = useState([
    '/images/image0.png',
    '/images/image1.png',
    '/images/image2.png',
    '/images/image3.png',
    '/images/image4.png',
    '/images/image5.png',
    '/images/image6.png',
    '/images/image7.png',
    '/images/image8.png',
    '/images/image9.png',
    '/images/image10.png',
    '/images/image11.png',
    '/images/image12.png',
    '/images/image13.png',
    '/images/image14.png',
    '/images/image15.png',
    '/images/image16.png',
    '/images/image17.png',
    '/images/image18.png',
    '/images/image19.png',
    '/images/image20.png',
    '/images/image21.png',
    '/images/image22.png',
    '/images/image23.png',
  ])
  const setImageSrc = useImageElementStore((state) => state.setImageSrc)

  function onClickSetBackgroundImage(i: number) {
    const src = imagesSrc[i]
    setImageSrc(src)
  }

  return (
    <>
      <p className='sm:text-[1em] text-[0.85em] relative mt-[2em] mb-[1em] text-white flex items-center'><HiInformationCircle className='mt-[1.5px] mr-[2.5px]' /> {'현재 ' + imagesSrc.length + '개의 이미지가 업로드 되었습니다. 필요에 따라 별도의 이미지를 업로드하여 추가할 수 있습니다.'}</p>
      <article
        className=" mb-[2em] w-full overflow-hidden px-[3em]  shadow-[0_0_0_1px_white] rounded-[5px]  hover:bg-[#ffffff0e] "
        ref={emblaRef}
      >
        <figure className="flex pb-[5em] mt-[5em]">
          {imagesSrc.map((image, i) => {
            return (
              <Image
                onClick={() => onClickSetBackgroundImage(i)}
                className="shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] rounded-[5px] mx-[10px] hover:cursor-pointer bg-[#fafafa] max-h-[250px] max-w-[250px] min-w-[250px] w-full "
                key={image}
                src={image}
                alt="명언 카드 배경 이미지"
                width={DEFAULT_IMG_SIZE.width}
                height={DEFAULT_IMG_SIZE.height}
              ></Image>
            )
          })}
          <StylerImageUploadForm setImages={setImagesSrc} images={imagesSrc} />
        </figure>
        {/* 캐러셀 조작 버튼 */}
        <CarouselControlButtons emblaApi={emblaApi} />
      </article>
    </>
  )
}
