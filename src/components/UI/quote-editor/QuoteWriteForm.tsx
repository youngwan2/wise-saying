'use client'
import styles from './eidtor.module.css'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'
import useDraggable from '@/custom/useDraggable'

import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import QuoteFormButtons from './QuoteFormButtons'
import QuoteTopicInputContainer from './QuoteTopicInputContainer'
import QuoteContentInputContainer from './QuoteContentTextareaContainer'
import QuoteAuthorInputContainer from './QuoteAuthorInputContainer'
import FormTitle from '../common/Title/FormTitle'

import toast from 'react-hot-toast'

import { postUserPost } from '@/services/user/post'

import { hoverAnimation } from '@/utils/common-func'


export default function QuoteWriteForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()
  const router = useRouter()

  useDraggable(formRef, null)

  // 포스트 요청
  const postQuoteAction = async (form: FormData) => {
    if (hasToken) {
      const category = form.get('category')?.valueOf().toString() || ''
      const content = form.get('content')?.valueOf().toString() || ''
      const author = form.get('author')?.valueOf().toString() || ''

      const body = {
        category,
        content,
        author,
        isUser: true,
      }
      const isSuccess = await postUserPost(body)
      if (isSuccess) router.push('/user-quotes')
    } else {
      toast.error('로그인 후 이용가능 합니다.')
    }
  }

  function onClickCancel() {
    router.push('/user-quotes')
  }

  if (!hasToken)
    return <ReplaceMessageCard childern="로그인 후 이용해주세요." />
  return (
    <form
      ref={formRef}
      onMouseMove={hoverAnimation}
      action={postQuoteAction}
      className={`${styles.card} border-[1px] border-[rgba(255,255,255,0.05)]  z-[-1] sm:mx-auto mx-[10px] text-white max-w-[560px] mt-[7em] rounded-[5px]  backdrop-blur-[3px] `}     >
      <FormTitle elementName='h2' className="text-[1.25em] border-b border-[rgba(255,255,255,0.1)] mt-[-4px] mb-[1em] bg-transparent text-[white] p-[8px]  rounded-t-lg  ">
        명언 등록
      </FormTitle>

      <QuoteTopicInputContainer
        name="category"
        placeholder="2자 이상 3자 이하의 명언의 주제 ex) 사랑"
      />
      <QuoteContentInputContainer
        name="content"
        placeholder="최소 3자 이상 ex) 해내지 못할 것을 걱정할게 아니라 시도조차 하지 않으려는 자신을 걱정해라."
      />
      <QuoteAuthorInputContainer
        name="author"
        placeholder="최소 2자 이상 8자 이하 ex) 지나가는 고양이"
      />
      <QuoteFormButtons onClickCancel={onClickCancel} />
    </form>
  )
}
