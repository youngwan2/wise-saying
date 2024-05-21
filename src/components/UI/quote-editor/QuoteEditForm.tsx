'use client'

import styles from './eidtor.module.css'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useUserPostIdStore } from '@/store/store'
import useDraggable from '@/custom/useDraggable'

import QuoteTopicInputContainer from './QuoteTopicInputContainer'
import QuoteContentInputContainer from './QuoteContentTextareaContainer'
import QuoteAuthorInputContainer from './QuoteAuthorInputContainer'
import QuoteFormButtons from './QuoteFormButtons'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'

import { mutate } from 'swr'

import { updateUserPost } from '@/services/user/patch'

import { hoverAnimation } from '@/utils/common-func'
import { toast } from 'react-toastify'
import FormTitle from '../common/Title/FormTitle'



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
    if (status !== 200) toast.error(meg)
    setLoading(false)
  }

  useEffect(() => {
    getUserPostBy(postId)
  }, [postId])


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
      redirectTo('/user-quotes')
      revalidateItem()

    }
  }
  function redirectTo(path: string){
    router.push(path)
  }

  function revalidateItem() {
    mutate(`/api/quotes/users/post/categories/`)
  }


  function onClickCancel() {
    router.push('/user-quotes')
  }

  if (loading)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." />
  if (!post)
    return <ReplaceMessageCard childern="포스트가 존재하지 않습니다..." />


  return (
    <form
      onMouseMove={hoverAnimation}
      action={updateFormAction}
      ref={updateFormRef}
      className={`${styles.card} text-white z-[1000] w-full  max-w-[560px]  rounded-[5px] hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] backdrop-blur-[3px]`}    >

      <FormTitle elementName='h2' className='text-[1.25em] mb-[1em] p-[8px]  rounded-t-lg  hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'>
        명언 수정
      </FormTitle>
      <QuoteTopicInputContainer post={post} name="category" />{/* 주제 입력 */}
      <QuoteContentInputContainer post={post} name="content" />{/* 명언 입력 */}
      <QuoteAuthorInputContainer post={post} name="author" />{/* 저자 입력 */}
      <QuoteFormButtons onClickCancel={onClickCancel} />
    </form>
  )
}
