'use client'

import { useRouter } from 'next/navigation'
import { useUserPostWithIdStore } from '@/store/userPostStore'

import QuoteCardControlButtons from './QuoteCardControlButtons'
import ButtonContainer from '../../common/container/ButtonContainer'
import ControlButton from '../../common/button/ControlButton'

import { getAccessToken, getUserEmail } from '@/utils/session-storage'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

import { deleteUserQuoteAction } from '@/actions/delete-quote.action'
import { toast } from 'react-toastify'
import { QuoteType } from '@/types/quote.types'

interface PropsType {
  item: QuoteType
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
  const setUserPost = useUserPostWithIdStore().setPost
  const token = getAccessToken() || ''

  // 명언 삭제
  const onClickDelete = async () => {
    const state = await deleteUserQuoteAction(item.quote_id, token)
    if (state.success) {
      toast.success(state.message)
      router.push('/user-quotes')
    } else {
      toast.error(state.message)
    }

  }

  // 명언 수정
  const onClickUpdate = () => {
    setUserPost(item)
    router.push('/update-quote')
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
