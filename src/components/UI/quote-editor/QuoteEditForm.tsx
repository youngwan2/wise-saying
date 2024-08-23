'use client'

import styles from './eidtor.module.css'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'
import useDraggable from '@/custom/useDraggable'
import useFormStateToaster from '@/custom/useFormStateToaster'
import { useUserPostWithIdStore } from '@/store/userPostStore'

import QuoteTopicInputContainer from './QuoteTopicInputContainer'
import QuoteContentInputContainer from './QuoteContentTextareaContainer'
import QuoteAuthorInputContainer from './QuoteAuthorInputContainer'
import QuoteFormButtons from './QuoteFormButtons'
import FormTitle from '../common/Title/FormTitle'

import { hoverAnimation } from '@/utils/common-func'
import { getAccessToken } from '@/utils/session-storage'
import { updateQuoteAction } from '@/actions/update-quote.action'


import type { QuoteType } from '@/types/items.types'


export type PostType = Pick<QuoteType, 'author' | 'quote' | 'quote_id' | 'category'>

export default function QuoteEditForm() {
  const router = useRouter()
  const updateFormRef = useRef<HTMLFormElement>(null)
  const token = getAccessToken()
  const post = useUserPostWithIdStore().post


  const [state, formAction] = useFormState(updateQuoteAction, { message: '', success: false })
  useFormStateToaster(state)
  useDraggable(updateFormRef, 'free')


  function onClickCancel() {
    router.push('/user-quotes')
  }

  useEffect(() => {
    if (state.success === true) {
      router.push('/user-quotes')
    }
  }, [state.success])


  return (
    <form
      onMouseMove={hoverAnimation}
      action={formAction}
      ref={updateFormRef}
      className={`${styles.card} text-white z-[1000] w-full  max-w-[560px]  rounded-[5px] hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] backdrop-blur-[3px]`}    >

      <FormTitle elementName='h2' className='text-[1.25em] mb-[1em] p-[8px]  rounded-t-lg  hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'>
        명언 수정
      </FormTitle>
      <QuoteTopicInputContainer post={post} name="category" />{/* 주제 입력 */}
      <QuoteContentInputContainer post={post} name="content" />{/* 명언 입력 */}
      <QuoteAuthorInputContainer post={post} name="author" />{/* 저자 입력 */}
      <QuoteFormButtons onClickCancel={onClickCancel} />
      <HiddenTextInput quoteId={post.quote_id} token={token || ''} />
    </form>
  )
}


function HiddenTextInput({ quoteId, token }: { quoteId: number, token: string }) {
  return (
    <>
      <input type="text" className='hidden' name="postId" value={quoteId} />
      <input type="text" className='hidden' name="token" value={token} />
    </>
  )

}