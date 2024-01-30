"use client"

import { HiOutlineZoomIn } from 'react-icons/hi'
import { SlEarphones } from 'react-icons/sl'
import useHasToken from '@/custom/useHasToken'
import { pageSwitch, quotesSelector } from '@/utils/commonFunctions'

import { HiOutlineBookmark, HiScissors } from 'react-icons/hi2'
import { PropsType } from './QuotesCardButton'
import { useRouter } from 'next/navigation'
import { useCardZoomInOutStore } from '@/store/store'
import { addBookmarkItem } from '@/api/data/post'
import { useState } from 'react'
import AlertCard from '../card/AlertCard'

export default function QuotesCardCommonButton({
  item,
  index,
}: PropsType) {

  const setIsZoomIn = useCardZoomInOutStore((state) => state.setIsZoomIn)
  const setCardIndex = useCardZoomInOutStore((state) => state.setCardIndex)
  const hasToken = useHasToken()
  const router = useRouter()
  const [alertToggle, setAlertToggle] = useState({ toggle: false, messgae: '' })

  const onClickBookmarkAdd = () => {
    if(!item) return
    const {id} = item
    addBookmarkItem(hasToken, id)
  }

  const onClickStylerPageSwitch = () => {
    if(!item) return
    const {id} = item
    pageSwitch(router, id)
    quotesSelector(item)
  }

  const onClickCardZoomInOut = () => {
    setIsZoomIn(true)
    setCardIndex(index)
  }

  return (
    <>
      <article className="">
        {/* 카드 만들기 버튼 */}
        <button
          onClick={onClickStylerPageSwitch}
          className=" flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px] "
          aria-label="명언 꾸미기 편집화면 이동 버튼"
        >
          <HiScissors />
          꾸미기
        </button>

        {/* 북마크 추가 버튼 */}
        <button
          onClick={onClickBookmarkAdd}
          className="flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px] "
          aria-label="명언 북마크 버튼"
        >
          <HiOutlineBookmark />
          북마크
        </button>

        {/* 확대 버튼 */}
        <button
          onClick={onClickCardZoomInOut}
          className="flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px]"
          aria-label="명언 확대해서 보기 버튼"
        >
          <HiOutlineZoomIn />
          확대
        </button>

        {/* 듣기 버튼 */}
        <button
          onClick={() => {
            // alert("준비중 입니다.")
            setAlertToggle({
              toggle: true,
              messgae: '준비중입니다.',
            })
          }}
          className="flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px] "
          aria-label="명언 듣기 버튼"
        >
          <SlEarphones />
          듣기
        </button>
      </article>
      <AlertCard toggle={alertToggle.toggle} message={alertToggle.messgae} />
    </>
  )
}
