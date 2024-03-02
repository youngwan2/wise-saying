'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useHasToken from '@/custom/useHasToken'
import { reqLogin } from '@/services/user/post'
import useDraggable from '@/custom/useDraggable'
import { redirect } from 'next/navigation'
import FormTitle from '../common/FormTitle'
import BackButton from '../common/BackButton'
import ReqLoginInput from '../signin/ReqLoginInput'
import SignInGuideLink from '../signin/SignInGuideLink'
import ForgotLink from '../forgot/ForgotLink'
import LoginSocial from './LoginSocial'
import LoginDefault from './LoginDefault'
import { useSession } from 'next-auth/react'

export default function LoginForm() {
  const loginFormRef = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const hasToken = useHasToken()
  const {data:session} = useSession()

  const [isLoading, setIsLoading] = useState(false)

  // 토큰 존재 시 리디렉트
  useEffect(() => {
    if(hasToken || session) { redirect('/') }
  }, [ hasToken, session])

  // 드래그어블 적용
  useDraggable(loginFormRef, 'free')

  async function loginAction(form: FormData) {
    setIsLoading(true)
    const email = form.get('email')?.valueOf().toString() || ''
    const password = form.get('password')?.valueOf().toString() || ''

    reqLogin({ email, password }).then(() => setIsLoading(false))
  }

  function onClickBackMove() { router.back() }

  return (
    <form
      ref={loginFormRef}
      action={loginAction}
      className="shadow-[inset_0_0_0_2px_white]  rounded-[5px] flex flex-col fixed max-w-[480px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-transparent p-[5px] backdrop-blur-[5px]"
    >
      <FormTitle>로그인</FormTitle>
      <BackButton onClickBack={onClickBackMove} />
      <LoginSocial />
      <LoginDefault/>
      <ReqLoginInput isLoading={isLoading} />
      <div className='flex items-center justify-center my-[2em]'>
        <SignInGuideLink />
        <ForgotLink />
      </div>

    </form>
  )
}
