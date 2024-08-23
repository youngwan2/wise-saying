'use client'
import styles from './eidtor.module.css'

import {  useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'

import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import QuoteFormButtons from './QuoteFormButtons'
import QuoteTopicInputContainer from './QuoteTopicInputContainer'
import QuoteContentInputContainer from './QuoteContentTextareaContainer'
import QuoteAuthorInputContainer from './QuoteAuthorInputContainer'
import FormTitle from '../common/Title/FormTitle'

import { hoverAnimation } from '@/utils/common-func'
import { postQuoteAction } from '@/actions/add-quote.action'
import { getAccessToken } from '@/utils/session-storage'
import { useFormState } from 'react-dom'
import useFormStateToaster from '@/custom/useFormStateToaster'


export default function QuoteWriteForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()
  const token = getAccessToken()
  const router = useRouter()

  // 포스트 추가 액션
  const [state, formAction] = useFormState(postQuoteAction, { message: '', success: false })
  
  useFormStateToaster(state)
  useEffect(()=>{
    if(state.success === true) {
      router.push('/user-quotes')
    }
  },[state.success])

  function onClickCancel() {
    router.push('/user-quotes')
  }

  if (!hasToken)
    return <ReplaceMessageCard>로그인 후 이용해주세요.</ReplaceMessageCard>
  return (
    <form
      ref={formRef}
      onMouseMove={hoverAnimation}
      action={formAction}
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
      <QuoteFormButtons onClickCancel={onClickCancel} disabled={state.success} />
      <input className='hidden' type="text" value={token || ''} name='token' />
    </form>
  )
}
