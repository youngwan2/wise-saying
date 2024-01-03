"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useImageElementStore } from '@/store/store'
import ImageUploadForm from '../form/ImageUploadForm'

export default function Carousel() {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const [images, setImages] = useState(['/images/image1.png', '/images/image2.png', '/images/image3.png', '/images/image4.png', '/images/image5.png', '/images/image6.png', '/images/image7.png','/images/image8.png','/images/image9.png'])
    const setImageSrc = useImageElementStore((state) => state.setImageSrc)
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])



    return (
        <article className='overflow-hidden' ref={emblaRef}>
            <figure className="flex  max-w-[1000px] px-[3em] pb-[5em] mt-[5em]">
                {images.map((image, i) => {
                    return <Image onClick={(e) => {
                        const src = images[i]
                        setImageSrc(src)
                    }} className='rounded-[1em] mx-[10px] shadow-custom1 hover:cursor-pointer bg-[#4ff44f]' key={image} src={image} alt='명언 카드 배경 이미지' width={230} height={230}></Image>
                })}
            <ImageUploadForm setImages={setImages} images={images}/>
            </figure>
            {/* 버튼 컨테이너 */}
            <article className='flex justify-center items-center mb-[3em] text-white'>
                <button className="px-[10px] hover:bg-[gold] hover:text-black border mr-[10px]" onClick={scrollPrev}>
                    Prev
                </button>
                <button className="px-[10px] hover:bg-[gold] hover:text-black border" onClick={scrollNext}>
                    Next
                </button>
            </article>
        </article>
    )
}