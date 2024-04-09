'use client'

import styles from './eidtor.module.css'
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
import { hoverAnimation } from '@/utils/common-func'

export type PostType = {
  id: number
  category: string
  quote: string
  author: string
  email: string
}

export default function QuoteEditForm() {
  const router = useRouter()
  const updateFormRef = useRef<HTMLFormElement>(null)

  useDraggable(updateFormRef, 'free')

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
    <form
      onMouseMove={hoverAnimation}
      action={updateFormAction}
      ref={updateFormRef}
      className={`${styles.card} text-white z-[1000] w-full  max-w-[560px]  rounded-[5px] hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] backdrop-blur-[3px]`}    >
      <h2 className="text-[1.25em] mb-[1em] p-[8px]  rounded-t-lg  hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        명언 수정
      </h2>
      <QuoteTopicInput post={post} name="category" />
      <QuoteContentInput post={post} name="content" />
      <QuoteAuthorInput post={post} name="author" />
      <QuoteFormButtons onClickCancel={onClickCancel} />
    </form>
  )
}
