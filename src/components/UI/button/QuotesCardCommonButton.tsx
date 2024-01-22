import { HiOutlineZoomIn } from 'react-icons/hi'
import { SlEarphones } from 'react-icons/sl'
import useHasToken from '@/custom/useHasToken'
import { pageSwitch, quotesSelector } from '@/utils/commonFunctions'

import { HiOutlineBookmark, HiScissors } from 'react-icons/hi2'
import { PropsType } from './QuotesCardButton'
import { usePathname, useRouter } from 'next/navigation'
import { useCardZoomInOutStore } from '@/store/store'
import { postBookmarkItem } from '@/api/data/post'
import { useEffect, useState } from 'react'
import AlertCard from '../card/AlertCard'

export default function QuotesCardCommonButton({
  itemId,
  items,
  index,
}: PropsType) {
  const path = usePathname()
  const [category, setCategory] = useState('')
  const setIsZoomIn = useCardZoomInOutStore((state) => state.setIsZoomIn)
  const setCardIndex = useCardZoomInOutStore((state) => state.setCardIndex)
  const hasToken = useHasToken()
  const router = useRouter()
  const [alertToggle, setAlertToggle] = useState({ toggle: false, messgae: '' })

  const categorySwitch = (path: string) => {
    if (path.startsWith('/author-quotes')) return setCategory('인물')
    if (path.startsWith('/weather-quotes')) return setCategory('날씨')
    if (path.startsWith('/day-quotes')) return setCategory('요일')
    if (path.startsWith('/etc-quotes')) return setCategory('기타')
    if (path.startsWith('/user-quotes')) return setCategory('유저')
  }

  useEffect(() => {
    categorySwitch(path)
  }, [path])
  return (
    <>
      <article className="flex min-h-[60px] min-w-[60px]">
        {/* 카드 만들기 버튼 */}
        <button
          onClick={() => {
            if (!items) return
            const id = itemId
            pageSwitch(router, id)
            quotesSelector(items, id)
          }}
          className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.1em]"
          aria-label="명언 꾸미기 편집화면 이동 버튼"
        >
          <HiScissors className="ml-[4px]" />{' '}
          <p className="text-[14px] font-semibold">꾸미기</p>
        </button>

        {/* 북마크 버튼 */}
        <button
          onClick={() => {
            if (!items) return
            postBookmarkItem(hasToken, itemId, items, category)
          }}
          className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.3em]"
          aria-label="명언 북마크 버튼"
        >
          <HiOutlineBookmark className="ml-[4px]" />
          <p className="text-[14px] font-semibold">북마크</p>
        </button>
      </article>
      <article className="flex min-h-[60px] min-w-[100px] mt-[0.8em]">
        {/* 확대 버튼 */}
        <button
          onClick={() => {
            setIsZoomIn(true)
            setCardIndex(index)
          }}
          className="min-w-[48px]  p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.1em]"
          aria-label="명언 확대해서 보기 버튼"
        >
          <HiOutlineZoomIn />
          <p className="text-[14px] font-semibold">확대</p>
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
          className="min-w-[48px]  p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.3em]"
          aria-label="명언 듣기 버튼"
        >
          <SlEarphones className="ml-[4px]" />
          <p className="text-[14px] font-semibold">듣기</p>
        </button>
      </article>
      <AlertCard toggle={alertToggle.toggle} message={alertToggle.messgae} />
    </>
  )
}
