'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useHasToken from '@/custom/useHasToken'
import { reqLogin } from '@/services/user/post'
import useDraggable from '@/custom/useDraggable'
import { redirect } from 'next/navigation'
import LoginEmailInput from './LoginEmailInput'
import LoginPasswordInput from './LoginPasswordInput'
import FormTitle from '../common/FormTitle'
import BackButton from '../common/BackButton'
import Overlay from '../../common/Overlay'
import ReqLoginInput from '../signin/ReqLoginInput'
import SignInGuideLink from '../signin/SignInGuideLink'


export default function LoginForm() {
  const loginFormRef = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const hasToken = useHasToken()

  const [isLoading, setIsLoading] = useState(false)

  // 토큰 존재 시 리디렉트
  useEffect(() => {
    if (hasToken) {
      redirect('/')
    }
  }, [router, hasToken])

  // 드래그어블 적용
  useDraggable(loginFormRef, 'free')

  async function login(form: FormData) {
    setIsLoading(true)
    const email = form.get('email')?.valueOf().toString() || ''
    const password = form.get('password')?.valueOf().toString() || ''

    reqLogin({ email, password }).then(() =>  setIsLoading(false) )
  }

  function onClickBackMove() {
    router.back()
  }

  return (
    <>
      <form
        ref={loginFormRef}
        action={login}
        className="shadow-2xl  rounded-[10px] flex flex-col fixed max-w-[400px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#f6795a]"
      >
        <FormTitle>로그인</FormTitle>
        <BackButton onClickBack={onClickBackMove} />
        <LoginEmailInput />
        <LoginPasswordInput />
        <ReqLoginInput isLoading={isLoading} />
        <SignInGuideLink />
      </form >
      <Overlay />
    </>
  )
}

/**
 * 임서저장
 */
{
  /* 소셜 로그인 */
}
{
  /* <button
          className="hover:bg-[white] hover:text-[tomato] font-bold p-[5px] border w-[50%] mx-auto mb-[10px] flex items-center justify-center"
          onClick={() => {
            alert('향후 추가 예정입니다.')
            // signIn()
          }}
        >
          <BsGithub />
          <span className="pl-[5px]">GitHub</span>
        </button> */
}
