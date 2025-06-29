'use client'

import { ChangeEvent, MouseEvent, useState } from 'react'

import SizeInput from '../../input/SizeInput'
import RecommandSizeList from '../../list/RecommandSizeList'
import RecommandSizeInfoCard from '../../card/RecommandSizeInfoCard'

import { debounceCloser } from '@/utils/common-func'

import { HiX } from 'react-icons/hi'
import { useQuotesCardSizeStore } from '@/store/stylerStore'


export default function BackgroundSizeStyler() {
  const [message, setMessage] = useState({ sizes: { width: 300, height: 400 }, meg: '간단하게 소장하기 적합한 사이즈' })
  const { height, width, setSize } = useQuotesCardSizeStore()
  const size = { width, height }


  /** li 또는 li의 자식 클릭 시 항상 li를 찾아서 dataset을 읽음 */
  function extractSize(e: MouseEvent<HTMLElement>) {
    const li = (e.target as HTMLElement).closest('li');
    if (!li) return { width: 0, height: 0 };
    const width = li.dataset.width ? Number(li.dataset.width) : Number(li.textContent?.split('x')[0]);
    const height = li.dataset.height ? Number(li.dataset.height) : Number(li.textContent?.split('x')[1]);
    return { width, height };
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
      <div className="flex items-center text-center">
        {/* 캔버스 넓이 */}
        <SizeInput
          ariaLabel='카드 넓이 사용자 입력창'
          className='p-[5px] mb-[0.5em] w-full rounded-[5px] border border-gray-100 text-center'
          type='number'
          dataType='width'
          value={width}
          max={1920}
          placeholder='넓이(기본: 300px)'
          onChangeSetSize={onChangeSetSize}
        />
        <HiX className="text-[2em] ml-[5px] pb-[5px]" />

        {/* 캔버스 높이 */}
        <SizeInput
          ariaLabel="카드 눂이 사용자 입력창"
          className='ml-3 p-[5px] mb-[0.5em] w-full rounded-[5px] border border-gray-100 text-center'
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
      <RecommandSizeInfoCard message={message} />
    </article>
  )
}
