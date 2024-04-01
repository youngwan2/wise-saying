'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import StylerImageUploadForm from './StylerImageUploadForm'
import CarouselControlButtons from './CarouselControlButtons'
import { HiInformationCircle } from 'react-icons/hi2'
import { TbTrash } from 'react-icons/tb'
import { ChangeEventHandler } from 'react'

const DEFAULT_IMG_SIZE = { width: 230, height: 230 }


interface PropsType {
  imagesSrc: string[]
  onClickSetBackgroundImage: (i: number) => void
  onClickDeleteBackgroundImage: (choiceIndex: number) => void
  onChangeImageUploader: ChangeEventHandler<HTMLInputElement>
}

export default function StylerCarosel({ imagesSrc, onClickDeleteBackgroundImage, onClickSetBackgroundImage, onChangeImageUploader }: PropsType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])


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
              <div className='relative group' key={image}>
                <button onClick={() => onClickDeleteBackgroundImage(i)} className='group-hover:visible  invisible p-[3px] text-white text-[1.8em] bg-[#1f1f1f] hover:text-[#b2b1b1] absolute bottom-[0] right-[10px]' ><TbTrash /> </button>
                <Image
                  onClick={() => onClickSetBackgroundImage(i)}
                  className="shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] rounded-[5px] mx-[10px] hover:cursor-pointer bg-[#fafafa] max-h-[250px] max-w-[250px] min-w-[250px] w-full "
                  key={image}
                  src={image}
                  alt="명언 카드 배경 이미지"
                  width={DEFAULT_IMG_SIZE.width}
                  height={DEFAULT_IMG_SIZE.height}
                ></Image>
              </div>
            )
          })}
        </figure>
        {/* 캐러셀 조작 버튼 */}
        <CarouselControlButtons emblaApi={emblaApi} />
      </article>
    </>
  )
}
