'use client'

import { useRouter } from 'next/navigation'
import { useUserPostIdStore } from '@/store/store'

import QuoteCardControlButtons from './QuoteCardControlButtons'
import ButtonContainer from '../../common/container/ButtonContainer'
import ControlButton from '../../common/button/ControlButton'

import { getUserEmail } from '@/utils/session-storage'
import { deleteUserQuote } from '@/services/data/delete'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

import { ItemsType } from '@/types/items.types'

interface PropsType {
  item: ItemsType
  index: number
  isMypage?: boolean
}
export default function UserQuoteCardBtnContainer({
  index,
  item,
  isMypage
}: PropsType) {
  const userEmail = getUserEmail()
  const router = useRouter()
  const setPostId = useUserPostIdStore((state) => state.setPostId)

  // 삭제버튼
  const onClickDelete = async () => {
    const isSuccess = await deleteUserQuote(item.quote_id)
    if (isSuccess && !isMypage) {
      router.push('/user-quotes')
    }
  }

  // 수정버튼
  const onClickUpdate = () => {
    setPostId(Number(item.quote_id))
    router.push('/update-wisesaying')
  }

  return (
    <ButtonContainer
      elementName={'div'}
    >
      <div
        className={`${userEmail === item.email
          ? isMypage ? ' flex justify-center right-[5px]' : ' flex justify-center top-[0.55em] right-[5.3em] items-start'
          : 'hidden'
          } min-h-[40px] min-w-[50px] absolute top-0 text-white `}
      >
        {/* 수정 */}
        <ControlButton
          className={`flex items-center hover:bg-[rgba(255,255,255,0.1)] rounded-[5%] border border-[transparent] text-[1em] ]  p-[5px]`}
          onClick={onClickUpdate}
          ariaLabel="수정 버튼"

        >
          <HiOutlinePencil />
        </ControlButton>
        {/* 삭제 */}
        <ControlButton
          className={`flex items-center  hover:bg-[rgba(255,255,255,0.1)] rounded-[5%] border-[transparent] text-[1em]   p-[5px]  `}
          onClick={onClickDelete}
          ariaLabel="삭제 버튼"
        >
          <HiOutlineTrash />
        </ControlButton>

      </div>
      {/* memo : 마이페이지가 아닌 경우에는 추가 컨트롤 버튼들을 보여줌 */}
      {isMypage ? null : <QuoteCardControlButtons item={item} index={index} isUserQuote={true} />}
    </ButtonContainer>
  )
}
