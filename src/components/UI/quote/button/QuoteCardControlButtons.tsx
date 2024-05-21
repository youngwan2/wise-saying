'use client'

import { MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useHasToken from '@/custom/useHasToken'
import { useBookmarkUpdate, useCardZoomInOutStore } from '@/store/store'

import ControlButton from '../../common/button/ControlButton'
import ButtonContainer from '../../common/container/ButtonContainer'

import { addBookmarkItem } from '@/services/data/post'
import { pageSwitch, quotesSelector } from '@/utils/common-func'
import { HiDotsVertical, HiOutlineZoomIn } from 'react-icons/hi'
import { HiOutlineBookmark, HiScissors, HiXMark } from 'react-icons/hi2'

import type { ItemsType } from '@/types/items.types'

interface PropsType {
  item: ItemsType
  index: number | 0
  isUserQuote?: boolean
}

export default function QuotesCardControlButtons({ item, index, isUserQuote }: PropsType) {

  const router = useRouter()

  const [isDisplay, setIsDisplay] = useState(false)

  const { data: session } = useSession()

  const { setIsZoomIn, setCardIndex } = useCardStore()
  const { setIsUpdate } = useBookmarkUpdate()

  const hasToken = useHasToken()

  function onDisplayButton(){
    setIsDisplay(false)

  }


  // 북마크 추가
  const onBookmarkAdd = async () => {
    if (!item && !hasToken && !session) return
    const { quote_id } = item
    const type = isUserQuote ? `?type=user` : `?type=no-user`
    const url = `/quotes/authors/${item.author}/${quote_id}` + type
    const isSuccess = await addBookmarkItem(quote_id, url)
    isSuccess && setIsUpdate(true)
  }

  // 카드 꾸미기 페이지로 이동
  const onStylerPageSwitch = () => {
    if (!item) return
    const { quote_id } = item
    pageSwitch(router, quote_id)
    quotesSelector(item)
  }

  // 명언 카드 확대
  const onCardZoomInOut = () => {
    setIsZoomIn(true)
    setCardIndex(index)
  }

  // ' : ' 메뉴 드롭다운
  const onToggleMenu = () => {
    setIsDisplay(!isDisplay)
  }

  const buttons = [
    {
      onClick: onStylerPageSwitch,
      ariaLabel: '명언 꾸미기 편집화면 이동 버튼',
      icon: <HiScissors />,
      label: '꾸미기',
    },
    {
      onClick: onBookmarkAdd,
      ariaLabel: '명언 북마크 버튼',
      icon: <HiOutlineBookmark />,
      label: '북마크',
    },
    {
      onClick: onCardZoomInOut,
      ariaLabel: '명언 확대해서 보기 버튼',
      icon: <HiOutlineZoomIn />,
      label: '확대',
    },
  ];

  return (
    <>
      <ButtonMenuIcon
        isDisplay={isDisplay}
        onClick={onToggleMenu}
      />
      <ButtonContainer
        elementName='div'
        className={` ${isDisplay ? 'visible opacity-100 top-2 z-50' : 'invisible opacity-0'
          } transition-all absolute top-0 right-[2.6em] bg-white shadow-[inset_0_0_5px_0_rgba(0,0,0,0.5)] rounded-[5px] `}
        onMouseLeave={onDisplayButton}
      >
        {buttons.map((button, index) => (
          <ControlButton key={index}
            onClick={button.onClick}
            className="flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px] w-full"
            ariaLabel={button.ariaLabel}
          >
            {button.icon}
            {button.label}
          </ControlButton>
        ))}
      </ButtonContainer>
    </>
  )
}

// Child : 버튼 메뉴
interface MenuIconPropsType {
  isDisplay: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}
function ButtonMenuIcon({ isDisplay, onClick}: MenuIconPropsType) {
  return (
    <button
      onClick={onClick}
      className="text-white hover:border-[tomato] border border-[transparent] absolute top-[0.55em] right-[0.45em] py-[4px] px-[3px] text-[1.05em]"
    >
      {isDisplay ? <HiXMark /> : <HiDotsVertical />}
    </button>
  )
}


/** 카드 확대-축소 관련 데이터 저장 */
const useCardStore = () => {
  const { setIsZoomIn, setCardIndex } = useCardZoomInOutStore()
  return { setIsZoomIn, setCardIndex }
}

