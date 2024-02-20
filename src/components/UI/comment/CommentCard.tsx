import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { HiDotsVertical, HiOutlineX } from 'react-icons/hi'
import { MouseEventHandler, useRef, useState } from 'react'
import CommentEditDeleteMenu from './CommentEditDeleteMenu'
import CommentEditForm from './CommentEditForm'
import { getUserEmail } from '@/utils/sessionStorage'
import CommentProfileImage from './CommentProfileImage'
import CommentContent from './CommentContent'
import { postReply } from '@/services/user/post'
import ReplyList from '../reply/ReplyList'
import ReplyForm from '../reply/ReplyForm'
import { CommentType, ReplyInfoType } from '@/types/items.types'
import { deleteComment } from '@/services/user/delete'
import { useSwrFetch } from '@/utils/swr'
import { useSWRConfig } from 'swr'
import ReplyButtons from '../reply/ReplyButtons'

interface PropsType extends CommentType {}

export default function CommentCard({ comment }: PropsType) {
  const [isShow, setIsShow] = useState(false)
  const [editFormDisplay, setEditFormDisplay] = useState(false)
  const [replyFormDisply, setReplyFormDisplay] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const commentId = (comment && comment.id) || 0
  const userEmail = getUserEmail()
  const { mutate } = useSWRConfig()

  // 댓글 수정 창 열기
  function onClickFormDisplay() {
    setEditFormDisplay(true)
  }

  // 댓글 수정 창 닫기
  function onClickEditCancel() {
    setEditFormDisplay(false)
  }

  // 대댓글 등록 창 열기
  function onClickReplyFormDisplay() {
    setReplyFormDisplay(!replyFormDisply)
  }
  // Actions : 대댓글 등록 액션
  async function addReplyAction(formData: FormData) {
    const content = formData.get('reply-content')?.valueOf().toString() || ''
    const commentId = comment.id
    const isSuccess = await postReply(commentId, content)

    if (isSuccess) {
      mutate(`/api/quotes/0/comments/reply?comment-id=${commentId}`)
      clearTextarea()
    }
  }

  function clearTextarea() {
    if (textareaRef.current) {
      textareaRef.current.value = ''
    }
  }

  type DataType = {
    data: ReplyInfoType
    isLoading: boolean
    error: Error
  }

  // SWR + GET | 대댓글 정보 요청
  const { data: replyInfo, isLoading }: DataType = useSwrFetch(
    `/api/quotes/0/comments/reply?comment-id=` + commentId,
  )

  if (isLoading || !(comment && replyInfo))
    return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />

  const emailInfo = {
    userEmail,
    commentEmail: comment.email,
  }
  return (
    <>
      <li className="bg-white  min-h-[50px] rounded-[5px] first:mt-[2em] mt-[1em] flex justify-start items-center w-full mx-auto relative">
        <CommentProfileImage comment={comment} />
        <CommentContent comment={comment} />
        <CommentMenuDropdownButton
          isShow={isShow}
          onClick={() => setIsShow(!isShow)}
        />

        {/* 글쓴이라면 편집 버튼 활성화 */}
        <CommentEditDeleteMenu
          emailInfo={emailInfo}
          isShow={isShow}
          onClickDeleteComment={() => {
            deleteComment(commentId)
          }}
          onClickFormDisplay={onClickFormDisplay}
        />
        <CommentEditForm
          commentId={comment.id}
          editFormDisplay={editFormDisplay}
          setEditFormDisplay={setEditFormDisplay}
          onClickEditCancel={onClickEditCancel}
        />
        <ReplyButtons
          totalCount={replyInfo.totalCount || 0}
          onClickReplyFormDisplay={onClickReplyFormDisplay}
        />
      </li>
      <li>
        <ReplyList
          commentId={commentId}
          userEmail={userEmail}
          replyInfo={replyInfo}
        />
        <ReplyForm
          isShow={replyFormDisply}
          action={addReplyAction}
          onClickShowReplyForm={onClickReplyFormDisplay}
          ref={textareaRef}
        />
      </li>
    </>
  )
}

interface MenuButtonPropsType {
  isShow: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

function CommentMenuDropdownButton({ isShow, onClick }: MenuButtonPropsType) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[5px] top-[0.5em]  hover:shadow-[0_0_0_1px_tomato] rounded-[50%] p-[5px]"
    >
      {isShow ? <HiOutlineX /> : <HiDotsVertical />}
    </button>
  )
}
