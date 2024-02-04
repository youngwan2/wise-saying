"use client"

import { HiDotsVertical, HiOutlineZoomIn } from 'react-icons/hi'
import { SlEarphones } from 'react-icons/sl'
import useHasToken from '@/custom/useHasToken'
import { pageSwitch, quotesSelector } from '@/utils/commonFunctions'
import { HiOutlineBookmark, HiScissors, HiXMark } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { useCardZoomInOutStore } from '@/store/store'
import { addBookmarkItem } from '@/services/data/post'
import { useState } from 'react'
import type { ItemsType } from '@/types/items.types'
import useTTS from '@/custom/useTTS'


interface PropsType {
  item: ItemsType
  index: number | 0
}
export default function QuotesCardControlButtons({
  item,
  index,
}: PropsType) {

  const setIsZoomIn = useCardZoomInOutStore((state) => state.setIsZoomIn)
  const setCardIndex = useCardZoomInOutStore((state) => state.setCardIndex)
  
  const hasToken = useHasToken()
  const router = useRouter()
  const [isDisplay, setIsDisplay] = useState(false)




  const onClickBookmarkAdd = () => {
    if (!item) return
    const { id } = item
    addBookmarkItem(hasToken, id)
  }

  const onClickStylerPageSwitch = () => {
    if (!item) return
    const { id } = item
    pageSwitch(router, id)
    quotesSelector(item)
  }

  const onClickCardZoomInOut = () => {
    setIsZoomIn(true)
    setCardIndex(index)
  }

  return (
    <>
      <button onClick={() => {
        setIsDisplay(!isDisplay)
      }} className='text-white hover:border-[tomato] border border-[transparent] absolute top-[0.5em] right-[0.55em]  p-[4px] text-[1.05em]'> {isDisplay ? <HiXMark /> : <HiDotsVertical />} </button>

      <article
        onMouseLeave={() => {
          setIsDisplay(false)
        }}
        className={` ${isDisplay ? 'visible opacity-100 top-2 z-50' : 'invisible opacity-0'} transition-all absolute top-0 right-[2.6em] bg-white shadow-[inset_0_0_5px_0_rgba(0,0,0,0.5)] rounded-[5px] `}>
        {/* 카드 만들기 버튼 */}
        <button
          onClick={onClickStylerPageSwitch}
          className=" flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px] w-full  "
          aria-label="명언 꾸미기 편집화면 이동 버튼"
        >
          <HiScissors />
          꾸미기
        </button>

        {/* 북마크 추가 버튼 */}
        <button
          onClick={onClickBookmarkAdd}
          className="flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px]  w-full "
          aria-label="명언 북마크 버튼"
        >
          <HiOutlineBookmark />
          북마크
        </button>

        {/* 확대 버튼 */}
        <button
          onClick={onClickCardZoomInOut}
          className="flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px]  w-full "
          aria-label="명언 확대해서 보기 버튼"
        >
          <HiOutlineZoomIn />
          확대
        </button>


      </article>
    </>
  )
}
