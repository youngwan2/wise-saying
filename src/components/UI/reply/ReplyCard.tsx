import { useState } from 'react'
import { useSWRConfig } from 'swr'

import ReplyContent from './ReplyContent'
import ReplyEditDeleteMenu from './button/ReplyEditDeleteButtons'
import ReplyEditForm from './form/ReplyEditForm'

import { deleteFetcher, patchFetcher } from '@/utils/fetcher'

import { toast } from 'react-toastify'

import { ReplyMenuDropdownButton } from './button/ReplyMenuDropdownButton'
import { ReplyType } from '@/types/reply.types'

interface PropsType extends ReplyType {
  commentId: number
  userEmail: string
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

  function revalidate(url: string) {
    mutate(url)
  }

  function setSuccessToast(text: string) {
    toast.success(text)

  }

  function handleSucessResponse(isSuccess: boolean, text: string, url: string ) {
    if (isSuccess) {
      revalidate(url)
      setSuccessToast(text)
    }
  }

  // DELETE | 대댓글 삭제
  async function deleteReply() {
    const url = `/api/quotes/0/comments/reply?comment-id=${commentId}&reply-id=${reply.id}`
    const isSuccess: boolean = await deleteFetcher(url)

    handleSucessResponse(isSuccess, '삭제 되었습니다.', `/api/quotes/0/comments/reply?comment-id=${commentId}`)
  }

  // PATCH |  대댓글 수정
  async function updateReply(replyId: number, content: string) {
    const url = `/api/quotes/0/comments/reply?reply-id=${replyId}`
    const result = await patchFetcher(url, content) || { meg: '', success: false }
    if (!(typeof result === 'object')) return
    handleSucessResponse(result.success, '삭제 되었습니다.', `/api/quotes/0/comments/reply?comment-id=${commentId}`)
  }

  // action | 대댓글 수정 액션
  async function updateReplyAtion(formData: FormData) {
    const content = formData.get('comment-reply')?.valueOf().toString() || ''
    const replyId = reply.id
    await updateReply(replyId, content)
  }

  return (
    <>
      <li
        key={reply.id}
        className="flex w-[90%] bg-white my-[0.2em] rounded-[10px] p-[8px] pt-[5px] items-center relative"
      >
        <ReplyContent reply={reply} />
        <ReplyMenuDropdownButton
          isShow={isShowMenu}
          onClick={onClickShowMenu}
        />
        <ReplyEditDeleteMenu
          emailInfo={emailInfo}
          isShow={isShowMenu}
          onLeaveMenuHide={() => setIsShowMenu(false)}
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

