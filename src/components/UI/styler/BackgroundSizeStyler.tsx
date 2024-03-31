'use client'
import { useQuotesCardSizeStore } from '@/store/store'
import { debounceCloser } from '@/utils/common-func'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { HiX } from 'react-icons/hi'
import {CgInfo} from 'react-icons/cg'


const backgroundSizes = [
  {
    width: 300,
    height: 400,
    message: '기본으로 지정되어 있는 사이즈. 간편하게 소장하기 좋은 사이즈'
  },
  {
    width: 500,
    height: 500,
    message: '작은 이미지로 소셜 미디어에 공유하기 적합한 사이즈'
  },
  {
    width: 600,
    height: 400,
    message: '카드나 포스터로 사용하기 적합한 사이즈'
  },
  {
    width: 800,
    height: 600,
    message: '소셜 미디어에 공유하기 적합한 사이즈'
  },
  {
    width: 800,
    height: 400,
    message: '가로로 긴 형태의 카드로 적합한 사이즈'
  },
  {
    width: 1000,
    height: 700,
    message: '소형 포스터로 사용하기 적합한 사이즈'
  },
  {
    width: 1080,
    height: 1080,
    message: '인스타그램 및 기타 소셜 미디어 피드에 적합한 사이즈'
  },

  {
    width: 1260,
    height: 630,
    message: '페이스북 포스트나 링크 미리보기에 적합한 사이즈'
  },

  {
    width: 1920,
    height: 1080,
    message: '유튜브나 기타 동영상 플랫폼에 적합한 사이즈'
  },
]

export default function BackgroundSizeStyler() {
  const [message, setMessage] = useState({ sizes: { width: 300, height: 400 }, meg: '간단하게 소장하기 적합한 사이즈' })
  const { height, width, setSize } = useQuotesCardSizeStore((state) => state)
  const size = { width, height }

  function onSetSize(e: ChangeEvent<HTMLInputElement>) {
    const targetValue = Number(e.target.value)
    const type = e.target.dataset.type
    if (!type) return
    debounceCloser(targetValue, type, size, setSize, 0)
  }

  function onClickSetSize(e: MouseEvent<HTMLElement>) {
    if (!(e.target instanceof HTMLLIElement)) return

    const [width, height] = e.target.textContent?.split('x') || [300, 400]

    setSize({ width: Number(width), height: Number(height) })

  }

  return (
    <article>
      <h2 className="flex items-center text-[1.05em] mt-[1.25em] pb-[0.25em] text-[white]">
        크기
      </h2>
      <div className="flex items-center text-center">
        {/* 캔버스 넓이 */}
        <input
          aria-label="카드 넓이 사용자 입력창"
          className="p-[5px] mb-[0.5em] w-full rounded-[5px] "
          type="number"
          data-type="width"
          value={width}
          max={1920}
          placeholder="넓이(기본: 300px)"
          onChange={onSetSize}
        ></input>
        <HiX className="text-[2em] ml-[5px] pb-[5px]" color="white" />

        {/* 캔버스 높이 */}
        <input
          aria-label="카드 눂이 사용자 입력창"
          className="ml-[3px] p-[5px] mb-[0.5em] w-full rounded-[5px]"
          type="number"
          data-type="height"
          max={1920}
          value={height}
          placeholder="높이(기본: 400px)"
          onChange={onSetSize}
        ></input>
      </div>
      {/* 추천 사이즈 */}
      <ul onClick={onClickSetSize} className='flex flex-wrap justify-between text-white mt-[0.25em]'>
        {backgroundSizes.map((size) => {
          return <li onMouseEnter={() => setMessage({ sizes: { width: size.width, height: size.height }, meg: size.message })} className='border ml-[0] m-[5px] p-[5px] min-w-[100px] hover:bg-[#c5c3c361] hover:cursor-pointer' key={size.message}>{size.width} x {size.height}
          </li>
        })}

      </ul>
      <article  className='absolute top-[17em] mt-[1.25em] text-white z-[-1]'>
        <strong className='ml-[3px] flex items-center'><CgInfo className='mr-[3px]'/> info</strong>
        <p className=' max-w-[400px] bg-[#00000097] p-[8px] ml-[6px] mt-[0.2em] rounded-b-[5px] rounded-tr-[5px]  text-[0.95em]'>{message.sizes.width} x {message.sizes.height} - {message.meg}</p></article>

    </article>
  )
}
