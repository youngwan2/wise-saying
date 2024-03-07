'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SignInEmailInput from './SignInEmailInput'
import SignInPasswordInput from './SignInPasswordInput'
import SignInPasswordReConfirmInput from './SignInPwReConfirmInput'
import SignInSubmitButton from './SignInSubmitButton'
import { onSubmit } from '@/utils/common-func'
import useDraggable from '@/custom/useDraggable'
import { reqSingIn } from '@/services/user/post'
import BackButton from '../common/BackButton'
import SignInWarnModal from './SignInWarnModal'
import FormTitle from '../common/FormTitle'

export default function SignInForm() {
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isReconfirmPassword, setIsReconfirmPassword] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const [existsEmail, setExistsEmail] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reConfirmPw, setReConfirmPw] = useState('')

  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const isVaildForm = isEmail && isPassword && isReconfirmPassword

  const [isShowModal, setIsShowModal] = useState(true)

  useDraggable(formRef, null)

  useEffect(() => {
    if (isSuccess) return router.push('/login')
  }, [isSuccess, router])

  // onClick | 로그인 요청
  async function onClickReqSingin() {
    router.prefetch('/')
    const isSuccess =
      (await reqSingIn({ email, password, reConfirmPw })) || null
    if (isSuccess) {
      setExistsEmail(false)
      setisSuccess(true)
      router.push('/')
    }
  }

  function onClickBack() {
    router.back()
  }

  function onClickModalClose() {
    setIsShowModal(false)
  }

  useDraggable(formRef, 'free')

  return (
    <form
      ref={formRef}
      className="rounded-[10px] flex flex-col fixed max-w-[480px] px-[5px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] shadow-[inset_0_0_0_2px_white] "
      onSubmit={onSubmit}
    >
      <FormTitle> 회원가입</FormTitle>
      <BackButton onClickBack={onClickBack} />
      {/* 임시 메시지 */}
      <SignInWarnModal
        isShow={isShowModal}
        onClickModalClose={onClickModalClose}
      />

      {/* 이메일 */}
      <SignInEmailInput
        email={email}
        isEmail={isEmail}
        setEmail={setEmail}
        setIsEmail={setIsEmail}
        setExistsEmail={setExistsEmail}
      />

      {/* 패스워드 */}
      <SignInPasswordInput
        isPassword={isPassword}
        setPassword={setPassword}
        setIsPassword={setIsPassword}
      />

      {/* 패스워드 재검증 */}
      <SignInPasswordReConfirmInput
        isReconfirmPassword={isReconfirmPassword}
        password={password}
        setIsReconfirmPassword={setIsReconfirmPassword}
        setReConfirmPw={setReConfirmPw}
      />

      {/* 전송버튼 */}
      <SignInSubmitButton
        isDisabled={isSuccess}
        existsEmail={existsEmail}
        isVaildForm={isVaildForm}
        onClick={onClickReqSingin}
      />
    </form>
  )
}
