'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useUserPostIdStore } from '@/store/store'
import useHasToken from '@/custom/useHasToken'
import UpdateSubjectInput from '../input/UpdateSubjectInput'
import UpdateContentInput from '../input/UpdateContentInput'
import ReplaceMessageCard from '../card/ReplaceMessageCard'
import UpdateAuthorInput from '../input/UpdateAuthorInput'
import useDraggable from '@/custom/useDraggable'

export type PostType = {
  id: number
  category: string
  wise_sayings: string
  author: string
  email: string
}

export default function UpdateForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()

  const [post, setPost] = useState<PostType>()
  const postId = useUserPostIdStore((state) => state.postId)
  const [loading, setLoading] = useState(false)

  // PUT | 사용자가 작성한 명언 등록 
  const updateUserPost = async () => {
    if (!hasToken) {
      alert('로그인 해주세요')
      router.push('/login')
    }

    const accessToken = localStorage.getItem('token')
    const headers = {
      authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch(`/api/items/users/${postId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(post),
    })

    const { status, meg } = await response.json()
    if (status === 201) {
      alert(meg)
      router.push('/user-quotes')
      setTimeout(() => {
        location.reload()
      }, 1000)

      if (status !== 201) {
        alert(meg)
      }
    }
  }

  // GET | 유저가 작성한 단일 포스트 요청
  const getUserPostBy = async (postId: number) => {
    setLoading(true)
    const response = await fetch(`/api/items/users/post/${postId}`)
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

  useDraggable(formRef)

  if (loading) return ( <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." />)
  if (!post) return ( <ReplaceMessageCard childern="포스트가 존재하지 않습니다..." /> )
  return (
    <>
      <div className="bg-[#0000005c] fixed left-0 top-0 right-0 bottom-0 rounded-[10px]"></div>
      <form
        ref={formRef}
        className="z-[1000]  max-w-[560px]  bg-[#fc7e54]  rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] "
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {/* 주제(카테고리) */}
        <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">
          명언 수정
        </h2>
        <UpdateSubjectInput post={post} setPost={setPost} />
        <br />
        {/* 내용 */}
        <UpdateContentInput post={post} setPost={setPost} />
        <br />
        {/* 작성자(유저작명) */}
        <UpdateAuthorInput post={post} setPost={setPost} />
        <br />

        <article className="p-[2em]">
          {/* 전송버튼 */}
          <button
            className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold"
            onClick={updateUserPost}
          >
            등록하기
          </button>
          {/* 취소 버튼 */}
          <button
            onClick={() => {
              router.push('/user-quotes')
            }}
            className="bg-[#ffffff] p-[10px] font-bold"
          >
            취소
          </button>
        </article>
      </form>
    </>
  )
}
