import { MouseEventHandler } from 'react'
import { HiOutlineDocumentRemove } from 'react-icons/hi'
import { HiMiniPencilSquare } from 'react-icons/hi2'

interface PropsType {
  emailInfo: {
    userEmail: string
    commentEmail: string
  }
  isShow: boolean
  onLeaveMenuHide: MouseEventHandler<HTMLButtonElement>
  onClickFormDisplay: MouseEventHandler<HTMLButtonElement>
  onClickDeleteComment: MouseEventHandler<HTMLButtonElement>
}
export default function CommentEditDeleteMenu({
  emailInfo,
  isShow,
  onLeaveMenuHide,
  onClickFormDisplay,
  onClickDeleteComment,
}: PropsType) {
  const { userEmail, commentEmail } = emailInfo
  return (
    <>
      {userEmail !== commentEmail ? null : isShow ? (
        <article
          onMouseLeave={onLeaveMenuHide}
          className="flex flex-col absolute right-[2.3em] top-[50%] translate-y-[-50%] bg-[white]  z-20 shadow-[0_0_5px_1px_rgba(0,0,0,0.5)] rounded-[5px]"
        >
          <button
            onClick={onClickFormDisplay}
            className="hover:bg-[tomato] hover:text-white p-[5px] flex items-center"
          >
            <HiMiniPencilSquare />
            수정
          </button>
          <button
            onClick={onClickDeleteComment}
            className="hover:bg-[tomato] hover:text-white p-[5px] flex items-center"
          >
            <HiOutlineDocumentRemove />
            삭제
          </button>
        </article>
      ) : null}
    </>
  )
}
