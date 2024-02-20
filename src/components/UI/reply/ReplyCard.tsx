import { MouseEventHandler, useState } from 'react'
import { HiDotsVertical, HiOutlineX } from 'react-icons/hi'
import ReplyEditDeleteMenu from './ReplyEditDeleteMenu'
import ReplyEditForm from './ReplyEditForm'
import { useSWRConfig } from 'swr'
import { deleteFetcher, patchFetcher } from '@/utils/fetcher'
import ReplyContent from './ReplyContent'
import { ReplyType } from '@/types/items.types'
import toast from 'react-hot-toast'

interface PropsType extends ReplyType {
  commentId: number
  userEmail: string
}

interface MenuButtonPropsType {
  isShow: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function ReplyCard({ commentId, userEmail, reply }: PropsType) {
  const { mutate } = useSWRConfig()

  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowEditForm, setIsShowEditForm] = useState(false)

  const emailInfo = {
    userEmail,
    replyEmail: reply.email || '',
  }

  // 드롭다운 컨트롤
  function onClickShowMenu() {
    setIsShowMenu(!isShowMenu)
  }

  // 편집 창 컨트롤
  function onClickShowEditForm() {
    setIsShowEditForm(!isShowEditForm)
    setIsShowMenu(false)
  }

  // DELETE | 대댓글 삭제
  async function deleteReply() {
    const url = `/api/quotes/0/comments/reply?comment-id=${commentId}&reply-id=${reply.id}`
    const isSuccess: boolean = await deleteFetcher(url)
    if (isSuccess) {
      toast.success('삭제 되었습니다.')
      mutate(`/api/quotes/0/comments/reply?comment-id=${commentId}`)
    }
  }

  // PATCH |  대댓글 수정
  async function updateReply(replyId: number, content: string) {
    const url = `/api/quotes/0/comments/reply?reply-id=${replyId}`
    const isSucecss: boolean = await patchFetcher(url, content)
    if (isSucecss) {
      toast.success('수정 되었습니다.')
      mutate(`/api/quotes/0/comments/reply?comment-id=${commentId}`)
    }
  }

  async function updateReplyAtion(formData: FormData) {
    const content = formData.get('comment-reply')?.valueOf().toString() || ''
    const replyId = reply.id
    await updateReply(replyId, content)
  }

  return (
    <>
      <li
        key={reply.id}
        className="flex w-[90%] bg-white my-[0.2em] rounded-[10px] p-[10px] items-center relative"
      >
        <ReplyContent reply={reply} />
        <ReplyMenuDropdownButton
          isShow={isShowMenu}
          onClick={onClickShowMenu}
        />
        <ReplyEditDeleteMenu
          emailInfo={emailInfo}
          isShow={isShowMenu}
          onClickDeleteReply={deleteReply}
          onClickShowEditForm={onClickShowEditForm}
        />
      </li>
      <ReplyEditForm
        currentContent={reply.content}
        isShowEditForm={isShowEditForm}
        updateReplyAction={updateReplyAtion}
        onClickCancelEdit={onClickShowEditForm}
      />
    </>
  )
}

// 드롭다운 버튼
function ReplyMenuDropdownButton({ isShow, onClick }: MenuButtonPropsType) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[5px] top-[0.5em]  hover:shadow-[0_0_0_1px_tomato] rounded-[50%] p-[5px]"
    >
      {isShow ? <HiOutlineX /> : <HiDotsVertical />}{' '}
    </button>
  )
}
