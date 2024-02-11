'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useUserPostIdStore } from '@/store/store'
import useHasToken from '@/custom/useHasToken'
import UpdatePostSubjectInput from './UpdatePostSubjectInput'
import UpdatePostContentInput from './UpdatePostContentInput'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import UpdatePostAuthorInput from './UpdatePostAuthorInput'
import useDraggable from '@/custom/useDraggable'
import { updateUserPost } from '@/services/user/patch'

export type PostType = {
  id: number
  category: string
  quote: string
  author: string
  email: string
}

export default function UpdatePostForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()

  const [post, setPost] = useState<PostType | null>(null)
  const postId = useUserPostIdStore((state) => state.postId)

  const [loading, setLoading] = useState(false)

  // GET | 유저가 작성한 단일 포스트 요청
  const getUserPostBy = async (postId: number) => {
    setLoading(true)
    const response = await fetch(`/api/quotes/users/post/${postId}`)
    const { item, status, meg } = await response.json()
    if (status === 200) {
      setPost(item)
    }
    if (status !== 200) {
      alert(meg)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserPostBy(postId)
  }, [postId])

  useDraggable(formRef, null)

  if (loading)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." />
  if (!post)
    return <ReplaceMessageCard childern="포스트가 존재하지 않습니다..." />

  // 글 수정
  function updateFormAction(form: FormData) {
    const content = form.get('content') || ''
    const category = form.get('category') || ''
    const author = form.get('author') || ''
    const userPost = {
      category,
      content,
      author,
    }
    updateUserPost(postId, hasToken, router, userPost)
  }
  return (
    <>
      <div className="bg-[#0000005c] fixed left-0 top-0 right-0 bottom-0 rounded-[10px]"></div>
      <form
        action={updateFormAction}
        ref={formRef}
        className="z-[1000] w-full  max-w-[560px]  bg-[#fc7e54]  rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] "
      >
        {/* 주제(카테고리) */}
        <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">
          명언 수정
        </h2>
        <UpdatePostSubjectInput post={post} name="category" />
        <br />
        {/* 내용 */}
        <UpdatePostContentInput post={post} name="content" />
        <br />
        {/* 작성자(유저작명) */}
        <UpdatePostAuthorInput post={post} name="author" />
        <br />

        <article className="p-[2em]">
          {/* 전송버튼 */}
          <button
            className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold hover:bg-[#162557] hover:text-white rounded-[5px]"
          >
            등록하기
          </button>
          {/* 취소 버튼 */}
          <button
            type="button"
            onClick={() => {
              router.push('/user-quotes')
            }}
            className="bg-[#ffffff] p-[10px] font-bold hover:bg-[#162557] hover:text-white rounded-[5px]"
          >
            취소
          </button>
        </article>
      </form>
    </>
  )
}
