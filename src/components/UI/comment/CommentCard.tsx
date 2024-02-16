import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { HiDotsVertical, HiOutlineX } from 'react-icons/hi'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import CommentEditDeleteMenu from './CommentEditDeleteMenu'
import CommentEditForm from './CommentEditForm'
import useHasToken from '@/custom/useHasToken'
import { getUserEmail } from '@/utils/sessionStorage'
import CommentProfileImage from './CommentProfileImage'
import CommentContent from './CommentContent'
import { postReply } from '@/services/user/post'
import ReplyList from '../reply/ReplyList'
import ReplyForm from '../reply/ReplyForm'
import { CommentType, ReplyInfoType } from '@/types/items.types'
import { deleteComment } from '@/services/user/delete'
import toast from 'react-hot-toast'
import { HiChatBubbleOvalLeftEllipsis, HiPencilSquare } from 'react-icons/hi2'

interface PropsType extends CommentType { }

export default function CommentCard({ comment }: PropsType) {
  const [isShow, setIsShow] = useState(false)
  const [editFormDisplay, setEditFormDisplay] = useState(false)
  const [replyFormDisply, setReplyFormDisplay] = useState(false)
  const [replyInfo, setReplyInfo] = useState<ReplyInfoType | undefined>()

  const hasToken = useHasToken()
  const commentId = comment && comment.id || 0
  const totalReply = replyInfo?.totalCount || 0
  const userEmail = getUserEmail()

  function onClickReplyFormDisplay() {
    setReplyFormDisplay(!replyFormDisply)
  }

  // 댓글 수정 창 열기
  function onClickFormDisplay() {
    setEditFormDisplay(true)
  }

  //  댓글 수정 창 닫기
  function onClickEditCancel() {
    setEditFormDisplay(false)
  }

  async function addReplyAction(formData: FormData) {
    const reply = formData.get('reply-content')?.valueOf().toString() || ''
    const commentId = comment.id
    const { replies, totalCount } = await postReply(commentId, reply) || { replies: [], totalCount: 0 }
    setReplyInfo({ replies, totalCount })
  }

  const getRepliesFromDB = useCallback(async (commentId: number) => {
    if (!commentId) return
    const url = '/api/quotes/0/comments/reply?comment-id=' + commentId

    try {
      const response = await fetch(url)
      const { meg, status, replies, totalCount } = await response.json()
      if (status === 201) {
        toast.success(meg)
        setReplyInfo({ replies, totalCount })
      }
      toast.error(meg)
    } catch (error) {
      console.error('GET reply 조회 실패:', error)
    }
  }, [])

  useEffect(() => {
    getRepliesFromDB(comment.id)
  }, [getRepliesFromDB, comment.id])

  if (!comment) return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />
  return (
    <>
      <li className="bg-white  min-h-[50px] rounded-[5px] first:mt-[2em] mt-[1em] flex justify-start items-center w-full mx-auto relative">
        <CommentProfileImage comment={comment} />

        <div className=" ml-[4em] py-[10px] pr-[1.5em]">
          <CommentContent comment={comment} />
          <CommentMenuDropdownButton isShow={isShow} onClick={() => setIsShow(!isShow)} />
        </div>

        {/* 글쓴이라면 편집 버튼 활성화 */}
        {userEmail !== comment.email
          ? null
          : isShow
            ? (
              <CommentEditDeleteMenu
                onClickDeleteComment={() => { deleteComment(hasToken, commentId) }}
                onClickFormDisplay={onClickFormDisplay}
              />
            ) : null}
        <CommentEditForm
          commentId={comment.id}
          editFormDisplay={editFormDisplay}
          setEditFormDisplay={setEditFormDisplay}
          onClickEditCancel={onClickEditCancel} />
        <article className='flex items-center'>
          <button className='flex  items-center hover:shadow-[0_2px_0_0_tomato] absolute right-[3em] bottom-[0.44em] text-[18px] hover:font-bold' onClick={onClickReplyFormDisplay} ><HiPencilSquare color='rgba(0,0,0,0.8)' /> <span className='text-[14px] font-sans'>답글</span></button>
          <button className='flex items-center hover:shadow-[0_2px_0_0_tomato] absolute right-[0.5em] bottom-[0.4em] text-[1.2em] hover:font-bold'><HiChatBubbleOvalLeftEllipsis color='rgba(0,0,0,0.8)' />
            <span className=' text-[14px] font-bold'>({totalReply})</span></button>
        </article>
      </li>
      <li>
        <ReplyList commentId={commentId} userEmail={userEmail} replyInfo={replyInfo} />
        <ReplyForm isShow={replyFormDisply} action={addReplyAction} onClickShowReplyForm={onClickReplyFormDisplay} />
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
      {isShow ? <HiOutlineX /> : <HiDotsVertical />}{' '}
    </button>
  )

}