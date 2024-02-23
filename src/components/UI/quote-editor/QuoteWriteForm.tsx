'use client'
import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'
import { postUserPost } from '@/services/user/post'
import { useRef } from 'react'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import QuoteFormButtons from './QuoteFormButtons'
import QuoteTopicInput from './QuoteTopicInput'
import QuoteContentInput from './QuoteContentInput'
import QuoteAuthorInput from './QuoteAuthorInput'

export default function QuoteWriteForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()

  const router = useRouter()

  // 포스트 요청
  const postQuoteAction = async (form: FormData) => {
    const category = form.get('category')?.valueOf().toString() || ''
    const content = form.get('content')?.valueOf().toString() || ''
    const author = form.get('author')?.valueOf().toString() || ''

    const body = {
      category,
      content,
      author,
      isUser: true,
    }
    const isSuccess = await postUserPost(hasToken, body)
    if (isSuccess) router.push('/user-quotes')
  }

  function onClickCancel() {
    router.push('/user-quotes')
  }

  if (!hasToken)
    return <ReplaceMessageCard childern="로그인 후 이용해주세요." />
  return (
    <form
      ref={formRef}
      action={postQuoteAction}
      className="sm:mx-auto mx-[10px] text-white max-w-[560px] mt-[5em] rounded-[10px] shadow-[inset_0_0_0_2px_white] "
    >
      <h2 className="text-[1.25em] mt-[-4px] mb-[1em] bg-transparent text-[white] p-[8px]  rounded-t-lg shadow-[inset_0_0_0_2px_white] ">
        명언 등록
      </h2>
      <QuoteTopicInput
        name="category"
        placeholder="2자 이상 3자 이하의 명언의 주제 ex) 사랑"
      />
      <QuoteContentInput
        name="content"
        placeholder="최소 3자 이상 ex) 해내지 못할 것을 걱정할게 아니라 시도조차 하지 않으려는 자신을 걱정해라."
      />
      <QuoteAuthorInput
        name="author"
        placeholder="최소 2자 이상 8자 이하 ex) 지나가는 고양이"
      />
      <QuoteFormButtons onClickCancel={onClickCancel} />
    </form>
  )
}

