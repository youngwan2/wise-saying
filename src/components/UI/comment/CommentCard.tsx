import Image from 'next/image'
import './CommentCard.css'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { HiDotsVertical, HiOutlineX } from 'react-icons/hi'
import { useState } from 'react'
import CommentUpdateButtons from './CommentUpdateButtons'
import CommentUpdateForm from './CommentUpdateForm'
import useHasToken from '@/custom/useHasToken'

interface PropsType {
  item: {
    id: number
    email: string
    nickname: string | null
    profile_iamge: string | null
    comment: string
    create_date: string
  }
}
export default function CommentCard({ item }: PropsType) {
  const [display, setDisplay] = useState(false)
  const [editFormDisplay, setEditFormDisplay] = useState(false)
  const hasToken = useHasToken()

  const user =
    (sessionStorage && sessionStorage?.getItem && sessionStorage?.getItem('user')) ||
    '{"dbEmail":""}'
  const { dbEmail: userEmail } = JSON.parse(user)

  // 편집 창을 활성화한다.
  function onClickFormDisplay() {
    setEditFormDisplay(true)
  }

  // DELETE | 유저가 작성한 댓글을 삭제한다.
  async function onClickDeleteComment() {
    if (!hasToken) {
      alert('로그인 해주세요.')
    }

    const isDelete = confirm('정말 삭제하시겠습니까?')
    if (!isDelete) return alert('삭제 요청을 취소하였습니다.')

    const token = sessionStorage.getItem('token')
    const response = await fetch(`/api/quotes/${item.id}/comments`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const { status, meg } = await response.json()
    if (status == 200) return alert(meg)
    alert(meg)
  }

  function onClickEditCancel() {
    setEditFormDisplay(false)
  }

  if (!item)
    return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />
  return (
    <>
      <li className="comment-card bg-white  min-h-[50px] rounded-[5px] first:mt-[2em] mt-[1em] flex justify-start items-center w-full mx-auto relative">
        <Image
          src={item.profile_iamge ?? '/images/image1.png'}
          alt="프로필 이미지"
          width={68}
          height={60}
          className="rounded-[5px] absolute left-[-1.5em] shadow-[0_0px_5px_0_rgba(0,0,0,0.8)] top-[50%] translate-y-[-50%]"
        />
        <div className=" ml-[4em] py-[10px] pr-[1.5em]">
          <span className="font-semibold inline-block mt-[0.2em] text-[14px]">
            {item.nickname || '무명의 위인'}(
            {item.email.replace(item.email.slice(2, 4), '**')})
          </span>
          <p>{item.comment}</p>
          <span className="inline-block mt-[4px] text-[14px]">
            {item.create_date}
          </span>
          <button
            onClick={() => {
              setDisplay(!display)
            }}
            className="absolute right-[5px] top-[0.5em]  hover:shadow-[0_0_0_1px_tomato] rounded-[50%] p-[5px]"
          >
            {' '}
            {display ? <HiOutlineX /> : <HiDotsVertical />}{' '}
          </button>
        </div>
        {/* 글쓴이라면 편집 버튼 활성화 */}
        {userEmail !== item.email ? null : display ? (
          <CommentUpdateButtons
            onClickDeleteComment={onClickDeleteComment}
            onClickFormDisplay={onClickFormDisplay}
          />
        ) : null}
      </li>
      {/* 댓글 수정 Form */}
      <li>
        {editFormDisplay ? (
          <CommentUpdateForm
            onClickEditCancel={onClickEditCancel}
            commentId={item.id}
            setEditFormDisplay={setEditFormDisplay}
          />
        ) : null}
      </li>
    </>
  )
}
