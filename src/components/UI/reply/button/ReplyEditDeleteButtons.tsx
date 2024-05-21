import { MouseEventHandler } from 'react'

import ControlButton from '../../common/button/ControlButton'
import ButtonContainer from '../../common/container/ButtonContainer'

import { HiOutlineDocumentRemove } from 'react-icons/hi'
import { HiMiniPencilSquare } from 'react-icons/hi2'

interface PropsType {
  emailInfo: {
    userEmail: string
    replyEmail: string
  }
  isShow: boolean
  onLeaveMenuHide: MouseEventHandler<HTMLElement>
  onClickShowEditForm: MouseEventHandler<HTMLButtonElement>
  onClickDeleteReply: MouseEventHandler<HTMLButtonElement>
}
export default function ReplyEditDeleteButtons({
  emailInfo,
  isShow,
  onLeaveMenuHide,
  onClickShowEditForm,
  onClickDeleteReply,
}: PropsType) {
  const { userEmail, replyEmail } = emailInfo
  return (
    <>
      {userEmail !== replyEmail ? null : isShow ? (
        <ButtonContainer
          elementName='div'
          onMouseLeave={onLeaveMenuHide}
          className="flex flex-col absolute right-[2.3em] top-[50%] translate-y-[-50%] bg-[white] shadow-[0_0_5px_1px_rgba(0,0,0,0.5)] rounded-[5px]"
        >
          <ControlButton
            ariaLabel='수정 버튼'
            onClick={onClickShowEditForm}
            className="hover:bg-[tomato] hover:text-white p-[5px] flex items-center"
          >
            <HiMiniPencilSquare />
            수정
          </ControlButton>

          <ControlButton
            ariaLabel='삭제 버튼'
            onClick={onClickDeleteReply}
            className="hover:bg-[tomato] hover:text-white p-[5px] flex items-center"
          >
            <HiOutlineDocumentRemove />
            삭제
          </ControlButton>
        </ButtonContainer>
      ) : null
      }
    </>
  )
}
