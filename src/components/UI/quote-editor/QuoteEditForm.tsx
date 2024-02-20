'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useUserPostIdStore } from '@/store/store'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import useDraggable from '@/custom/useDraggable'
import { updateUserPost } from '@/services/user/patch'
import { mutate } from 'swr'
import QuoteTopicInput from './QuoteTopicInput'
import QuoteContentInput from './QuoteContentInput'
import QuoteAuthorInput from './QuoteAuthorInput'
import QuoteFormButtons from './QuoteFormButtons'
import FormOverlay from './FormOverlay'

export type PostType = {
  id: number
  category: string
  quote: string
  author: string
  email: string
}

export default function QuoteEditForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [post, setPost] = useState<PostType | null>(null)
  const postId = useUserPostIdStore((state) => state.postId)

  const [loading, setLoading] = useState(false)

  // GET | 유저가 작성한 단일 포스트 요청
  const getUserPostBy = async (postId: number) => {
    setLoading(true)
    const response = await fetch(`/api/quotes/users/post/${postId}`)
    const { item, status, meg } = await response.json()
    if (status === 200) setPost(item)
    if (status !== 200) alert(meg)
    setLoading(false)
  }

  useEffect(() => {
    getUserPostBy(postId)
  }, [postId])

  useDraggable(formRef, 'free')

  if (loading)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." />
  if (!post)
    return <ReplaceMessageCard childern="포스트가 존재하지 않습니다..." />

  // 글 수정
  async function updateFormAction(form: FormData) {
    const content = form.get('content')?.valueOf().toString() || ''
    const category = form.get('category')?.valueOf().toString() || ''
    const author = form.get('author')?.valueOf().toString() || ''
    const userPost = {
      category,
      content,
      author,
    }
    const isSuccess = await updateUserPost(postId, userPost)
    if (isSuccess) {
      router.push('/user-quotes')
      mutate(`/api/quotes/users/post/categories/`)
    }
  }

  function onClickCancel() {
    router.push('/user-quotes')
  }
  return (
    <>
      <form
        action={updateFormAction}
        ref={formRef}
        className="z-[1000] w-full  max-w-[560px]  bg-[#fc7e54]  rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] "
      >
        <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">
          명언 수정
        </h2>
        <QuoteTopicInput post={post} name="category" />
        <QuoteContentInput post={post} name="content" />
        <QuoteAuthorInput post={post} name="author" />
        <QuoteFormButtons onClickCancel={onClickCancel} />
      </form>
    </>
  )
}
