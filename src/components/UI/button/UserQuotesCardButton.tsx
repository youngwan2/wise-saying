'use client'
import { HiOutlinePencil, HiOutlineTrash, HiScissors } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useState, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { useCardZoomInOutStore, useUserPostIdStore } from '@/store/store'
import { ItemsType } from '@/types/items.types'
import QuotesCardCommonButton from './QuotesCardCommonButton'
import { deleteUserQuote } from '@/api/data/delete'
import { HiDotsVertical } from 'react-icons/hi'

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



  const [isDisplay, setIsDisplay] = useState(false)

  // 추가 메뉴 온오프 
  const onClickBtnDisplayHandler = () => {
    setIsDisplay(!isDisplay)
  }

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
    <>
      <ButtonContainerIcon onClickBtnDisplayHandler={onClickBtnDisplayHandler} />
       <article
        onMouseLeave={()=>{
          setIsDisplay(false)
        }}
        aria-label="수정 및 삭제, 꾸미기,담기, 확대, 듣기 버튼의 컨테이너"
        className={`${isDisplay? 'visible opacity-100  rounded-[10px] items-center justify-center bg-white shadow-[inset_0_0_5px_0_rgba(0,0,0,0.5)] ' : 'invisible opacity-0'} 'flex absolute right-[2em] top-0   '
          `}
      >
        <article   className={`${userEmail === item.email ? 'flex-col flex justify-center top-0 items-start' : 'hidden'} min-h-[40px] min-w-[50px] `}>
          {/* 수정 */}
          <button
            className={`flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px] `}
            onClick={onClickUpdate}
            aria-label="수정버튼"
          >
            <HiOutlinePencil />
            수정
          </button>

          {/* 삭제 */}
          <button
            className={`flex items-center hover:bg-[tomato] text-[0.95em] hover:text-[white] rounded-[0.3em] p-[5px]  `}
            onClick={onClickDelete}
            aria-label="삭제버튼"
          >
            <HiOutlineTrash />
            삭제
          </button>
        </article>
        <QuotesCardCommonButton item={item} index={index} />
      </article>
    </>
  )
}

function ButtonContainerIcon({ onClickBtnDisplayHandler }: { onClickBtnDisplayHandler: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button onClick={onClickBtnDisplayHandler} className='absolute right-[5px] top-[10px]'><HiDotsVertical /></button>
  ) 
}