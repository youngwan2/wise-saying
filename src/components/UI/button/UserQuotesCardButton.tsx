'use client'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserPostIdStore } from '@/store/store'
import { ItemsType } from '@/types/items.types'
import QuotesCardCommonButton from './QuotesCardCommonButton'
import { deleteUserQuote } from '@/services/item.delete'

interface PropsType {
  item: ItemsType
  items: ItemsType[]
  index: number
}
export default function UserQuotesCardButton({
  index,
  item,
  items,
}: PropsType) {
  const hasToken = useHasToken()
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  const setPostId = useUserPostIdStore((state) => state.setPostId)

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
      className={` flex justify-center items-center invisible opacity-0 bg-[#14131328] absolute left-0 right-0 top-0 bottom-0  group-hover:visible group-hover:opacity-100 flex-wrap transition-all group-hover:backdrop-blur-[1px]  `}
    >
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <article
          className={`${
            userEmail === item.email ? 'block' : 'hidden'
          } min-h-[60px] min-w-[60px]`}
        >
          {/* 수정 */}
          <button
            className={`min-w-[48px]  p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mr-[0.15em] mb-[0.4em]`}
            onClick={() => {
              setPostId(Number(item.id))
              router.push('/update-wisesaying')
            }}
            aria-label="수정버튼"
          >
            <HiOutlinePencil />
            <p className="text-[14px] font-semibold">수정</p>
          </button>

          {/* 삭제 */}
          <button
            className={`min-w-[48px]  p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.3em]`}
            onClick={() => {
              deleteUserQuote(hasToken, item.id)
            }}
            aria-label="삭제버튼"
          >
            <HiOutlineTrash />
            <p className="text-[14px] font-semibold">삭제</p>
          </button>
        </article>
        <QuotesCardCommonButton itemId={item.id} items={items} index={index} />
      </div>
    </article>
  )
}
