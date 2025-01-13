'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, redirect } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'
import useDraggable from '@/custom/useDraggable'

import FormTitle from '../common/FormTitle'
import BackButton from '../common/BackButton'
import SignInGuideLink from '../signin/SignInGuideLink'
import ForgotLink from '../forgot/ForgotLink'
import LoginDefault from './LoginDefault'
import LoginButton from '../signin/Input/LoginButton'
import { reqLogin } from '@/services/user/auth.service'

import { setAccessToken, setLoginExp, setUserInfo } from '@/utils/session-storage'
import { toast } from 'react-toastify'

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
  }, [hasToken])
  

  // 드래그어블 적용
  useDraggable(loginFormRef, 'free')

  async function loginAction(form: FormData) {
    setIsLoading(true)
    const email = form.get('email')?.valueOf().toString() || ''
    const password = form.get('password')?.valueOf().toString() || ''

    const result = await reqLogin({ email, password })
    console.log("로그인 결과:", result)
    if (result) {
      const { accessToken, email, exp, profile } = result

      setAccessToken(accessToken)
      setLoginExp(exp)
      setUserInfo({ profile, dbEmail: email })

      setIsLoading(false)
      toast.info("로그인 중입니다. 잠시만 기다려주세요.")
      setTimeout(() => {
        
        window.location.reload()
      }, 1500)
    } else {
      toast.error("로그인 실패")
      setIsLoading(false)
    }
  }


function onClickBackMove() {
  router.push('/')
}




return (
  <form
    ref={loginFormRef}
    action={loginAction}
    className="shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)]  rounded-[5px] flex flex-col fixed max-w-[480px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-transparent p-[5px] backdrop-blur-[5px]"
  >
    <FormTitle>로그인</FormTitle>
    <BackButton onClickBack={onClickBackMove} />
    <LoginDefault />
    <LoginButton isLoading={isLoading} />

    <div className="flex items-center justify-center my-[2em]">
      <SignInGuideLink />
      <ForgotLink />
    </div>
  </form>
)
}
