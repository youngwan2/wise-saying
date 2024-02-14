import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { HiDotsVertical, HiOutlineX } from 'react-icons/hi'
import { MouseEventHandler, useState } from 'react'
import CommentEditDeleteMenu from './CommentEditDeleteMenu'
import CommentEditForm from './CommentEditForm'
import useHasToken from '@/custom/useHasToken'
import { getAccessToken, getUserEmail } from '@/utils/sessionStorage'
import CommentProfileImage from './CommentProfileImage'
import CommentContent from './CommentContent'

export interface PropsType {
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
  const userEmail = getUserEmail()


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

    const token = getAccessToken() || '';
    const config = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(`/api/quotes/${item.id}/comments`, config)
    const { status, meg } = await response.json()
    if (status == 200) return alert(meg)
    alert(meg)
  }

  function onClickEditCancel() {
    setEditFormDisplay(false)
  }

  if (!item) return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />
  return (
    <li className="comment-card bg-white  min-h-[50px] rounded-[5px] first:mt-[2em] mt-[1em] flex justify-start items-center w-full mx-auto relative">
      {/* 프로필 이미지 */}
      <CommentProfileImage item={item} />
      {/* 댓글 */}
      <div className=" ml-[4em] py-[10px] pr-[1.5em]">
        <CommentContent item={item} />
        {/* 수정 아이콘 버튼 */}
        <CommentMenuDropdownButton display={display} onClick={() => setDisplay(!display)} />
      </div>

      {/* 글쓴이라면 편집 버튼 활성화 */}
      {userEmail !== item.email
        ? null
        : display
          ? (
            <CommentEditDeleteMenu
              onClickDeleteComment={onClickDeleteComment}
              onClickFormDisplay={onClickFormDisplay}
            />
          ) : null}
      <CommentEditForm
        commentId={item.id}
        editFormDisplay={editFormDisplay}
        setEditFormDisplay={setEditFormDisplay}
        onClickEditCancel={onClickEditCancel} />
    </li>
  )
}


interface MenuButtonPropsType {
  display: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

function CommentMenuDropdownButton({ display, onClick }: MenuButtonPropsType) {

  return (
    <button
      onClick={onClick}
      className="absolute right-[5px] top-[0.5em]  hover:shadow-[0_0_0_1px_tomato] rounded-[50%] p-[5px]"
    >
      {display ? <HiOutlineX /> : <HiDotsVertical />}{' '}
    </button>
  )

}