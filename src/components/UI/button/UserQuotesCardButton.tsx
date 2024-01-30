'use client'
import { HiOutlinePencil, HiOutlineTrash, HiScissors } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCardZoomInOutStore, useUserPostIdStore } from '@/store/store'
import { ItemsType } from '@/types/items.types'
import QuotesCardCommonButton from './QuotesCardCommonButton'
import { deleteUserQuote } from '@/api/data/delete'

interface PropsType {
  item: ItemsType
  items: ItemsType[]
  index: number
}
export default function UserQuotesCardButton({
  index,
  item,
}: PropsType) {
  const hasToken = useHasToken()
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  const setPostId = useUserPostIdStore((state) => state.setPostId)
  const setIsZoomIn = useCardZoomInOutStore((state) => state.setIsZoomIn)
  const setCardIndex = useCardZoomInOutStore((state) => state.setCardIndex)

  // 삭제버튼
  const onClickDelete = async () => {
    const success = await deleteUserQuote(hasToken, item.id)
    if (success) {
      router.back()
      router.refresh()
    }
  }
  // 수정버튼
  const onClickUpdate = () => {
    setPostId(Number(item.id))
    router.push('/update-wisesaying')
  }



  useEffect(() => {
    if (hasToken) {
      const json = localStorage.getItem('user')!
      const user = JSON.parse(json)
      const { dbEmail } = user
      setUserEmail(dbEmail)
    }
  }, [hasToken])

  return (
    <article
      aria-label="수정 및 삭제, 꾸미기,담기, 확대, 듣기 버튼의 컨테이너"
      className={`${userEmail === item.email ? 'flex absolute top-0 right-[1em]' : 'hidden'
        } min-h-[50px] min-w-[50px]`}
    >
      {/* 수정 */}
      <button
        className={` hover:bg-[tomato] text-[1.25em] hover:text-[white] rounded-[0.3em] p-[5px] `}
        onClick={onClickUpdate}
        aria-label="수정버튼"
      >
        <HiOutlinePencil />
      </button>

      {/* 삭제 */}
      <button
        className={` hover:bg-[tomato] text-[1.25em] hover:text-[white] rounded-[0.3em] p-[5px]  `}
        onClick={onClickDelete}
        aria-label="삭제버튼"
      >
        <HiOutlineTrash />
      </button>
      <QuotesCardCommonButton item={item} index={index}/>

    </article>
  )
}
