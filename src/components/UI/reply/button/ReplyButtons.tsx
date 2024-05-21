import { MouseEventHandler } from 'react'

import ControlButton from '../../common/button/ControlButton'
import ButtonContainer from '../../common/container/ButtonContainer'

import { HiChatBubbleOvalLeftEllipsis, HiPencilSquare } from 'react-icons/hi2'

interface PropsType {
  totalCount: number
  onClickIsShowReplies: MouseEventHandler<HTMLButtonElement>
  onClickReplyFormDisplay: MouseEventHandler<HTMLButtonElement>
}
export default function ReplyButtons({
  totalCount,
  onClickIsShowReplies,
  onClickReplyFormDisplay,
}: PropsType) {
  return (
    <ButtonContainer elementName='div' className='flex items-center'>
      {/* 답글  쓰기 버튼 */}
      <ControlButton
        ariaLabel='답글 쓰기'
        className='sm:text-[18px] text-[14px] flex  items-center hover:shadow-[0_2px_0_0_tomato] absolute right-[3em] bottom-[0.44em] hover:font-bold'
        onClick={onClickReplyFormDisplay}
      >
        <HiPencilSquare color="rgba(0,0,0,0.8)" />
        <span className="text-[14px] font-sans">답글</span>
      </ControlButton>

      {/* 대댓글 목록 표시 버튼 */}
      <ControlButton
        ariaLabel='대댓글 목록 표시'
        className='sm:text-[1.25em] text-[14px] flex items-center hover:shadow-[0_2px_0_0_tomato] absolute right-[0.5em] bottom-[0.4em]  hover:font-bold'
        onClick={onClickIsShowReplies}
      >
        <HiChatBubbleOvalLeftEllipsis color="rgba(0,0,0,0.8)" />
        <span className=" text-[14px] font-bold">({totalCount})</span>
      </ControlButton>
    </ButtonContainer>
  )
}
