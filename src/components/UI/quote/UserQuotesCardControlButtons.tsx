'use client'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { useUserPostIdStore } from '@/store/store'
import { ItemsType } from '@/types/items.types'
import QuotesCardControlButtons from './QuotesCardControlButtons'
import { deleteUserQuote } from '@/services/data/delete'
import { getUserEmail } from '@/utils/sessionStorage'

interface PropsType {
  item: ItemsType
  items: ItemsType[]
  index: number
}
export default function UserQuotesCardControlButtons({
  index,
  item,
}: PropsType) {
  const userEmail = getUserEmail()
  const router = useRouter()

  const setPostId = useUserPostIdStore((state) => state.setPostId)

  // 삭제버튼
  const onClickDelete = () => deleteUserQuote(item.id).then(() => router.push('/user-quotes'))
  // 수정버튼
  const onClickUpdate = () => {
    setPostId(Number(item.id))
    router.push('/update-wisesaying')
  }

  return (
      <article aria-label="수정 및 삭제, 꾸미기,담기, 확대, 듣기 버튼의 컨테이너">
        <article
          className={`${userEmail === item.email
            ? 'flex justify-center top-[0.55em] right-[5.3em] items-start'
            : 'hidden'
            } min-h-[40px] min-w-[50px] absolute top-0 text-white `}
        >
          {/* 수정 */}
          <button
            className={`flex items-center hover:border-[tomato] border border-[transparent] text-[1em] ]  p-[5px]`}
            onClick={onClickUpdate}
            aria-label="수정버튼"
          >
            <HiOutlinePencil />
          </button>

          {/* 삭제 */}
          <button
            className={`flex items-center hover:border-[tomato] border border-[transparent] text-[1em]   p-[5px]  `}
            onClick={onClickDelete}
            aria-label="삭제버튼"
          >
            <HiOutlineTrash />
          </button>
        </article>
        <QuotesCardControlButtons item={item} index={index} />
      </article>
  )
}
