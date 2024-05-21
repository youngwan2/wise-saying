'use client'

import { ChangeEvent, MouseEvent, useState } from 'react'
import { useQuotesCardSizeStore } from '@/store/store'

import SizeInput from '../../input/SizeInput'
import RecommandSizeList from '../../list/RecommandSizeList'
import RecommandSizeInfoCard from '../../card/RecommandSizeInfoCard'

import { debounceCloser } from '@/utils/common-func'

import { HiX } from 'react-icons/hi'


export default function BackgroundSizeStyler() {
  const [message, setMessage] = useState({ sizes: { width: 300, height: 400 }, meg: '간단하게 소장하기 적합한 사이즈' })
  const { height, width, setSize } = useQuotesCardSizeStore((state) => state)
  const size = { width, height }


  /** 텍스트로부터 사이즈 추출 */
  function extractSize(e: MouseEvent<HTMLElement>) {
    if (!(e.target instanceof HTMLLIElement)) return { width: 0, height: 0 }
    const [width, height] = e.target.textContent?.split('x') || [300, 400]
    return { width, height }
  }

  function onChangeSetMessage(size: { width: number, height: number, message: string }) {
    const { height, width, message } = size
    setMessage({ sizes: { width, height }, meg: message })

  }


  function onChangeSetSize(e: ChangeEvent<HTMLInputElement>) {
    const targetValue = Number(e.target.value)
    const type = e.target.dataset.type
    if (!type) return
    debounceCloser(targetValue, type, size, setSize, 0)
  }

  function onClickSetSize(e: MouseEvent<HTMLElement>) {
    const { width, height } = extractSize(e)
    setSize({ width: Number(width), height: Number(height) })

  }

  return (
    <article>
      <h2 className="flex items-center text-[1.05em] mt-[1.25em] pb-[0.25em] text-[white]">
        크기
      </h2>
      <div className="flex items-center text-center">
        {/* 캔버스 넓이 */}
        <SizeInput
          ariaLabel='카드 넓이 사용자 입력창'
          className='p-[5px] mb-[0.5em] w-full rounded-[5px]'
          type='number'
          dataType='width'
          value={width}
          max={1920}
          placeholder='넓이(기본: 300px)'
          onChangeSetSize={onChangeSetSize}
        />
        <HiX className="text-[2em] ml-[5px] pb-[5px]" color="white" />

        {/* 캔버스 높이 */}
        <SizeInput
          ariaLabel="카드 눂이 사용자 입력창"
          className="ml-[3px] p-[5px] mb-[0.5em] w-full rounded-[5px]"
          type="number"
          dataType="height"
          max={1920}
          value={height}
          placeholder="높이(기본: 400px)"
          onChangeSetSize={onChangeSetSize}
        />
      </div>
      {/* 추천 사이즈 */}
      <RecommandSizeList onSetSize={onClickSetSize} onSetMessage={onChangeSetMessage} />
      <RecommandSizeInfoCard message={message}/>
    </article>
  )
}
