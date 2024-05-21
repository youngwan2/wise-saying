'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useDraggable from '@/custom/useDraggable'

import SignInEmailInput from './Input/SignInEmailInput'
import SignInPasswordInput from './Input/SignInPasswordInput'
import SignInPasswordReConfirmInput from './Input/SignInPwReConfirmInput'
import SignInSubmitButton from './button/SignInSubmitButton'
import EmailAuthInput from './Input/EmailAuthInput'
import BackButton from '../common/BackButton'
import FormTitle from '../common/FormTitle'
import Consent from './Consent'

import { reqSingIn } from '@/services/user/post'
import { onSubmit } from '@/utils/common-func'

import toast from 'react-hot-toast'

import { ConsentsType } from '@/types/items.types'

// todo:  추후 action 으로 대체하여 불필요한 리렌더링을 촉발하는 state 를 최대한 줄여야 함.
export default function SignInForm() {
  const router = useRouter()

  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isReconfirmPassword, setIsReconfirmPassword] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const [consents, setConsents] = useState({
    all: false,
    term: false,
    private: false,
    child: false,
    event: false
  })

  const [existsEmail, setExistsEmail] = useState(false)
  const [isAuthEmail, setIsAuthEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reConfirmPw, setReConfirmPw] = useState('')


  const formRef = useRef<HTMLFormElement>(null)

  const isVaildForm = isEmail && isPassword && isReconfirmPassword

  useDraggable(formRef, null)

  useEffect(() => {
    if (isSuccess) return router.push('/login')
  }, [isSuccess, router])

  // 회원가입 요청 가능 유무 체크
  function checkTransmissionAvailability(isVaildForm:boolean, existsEmail:boolean, isAuthEmail:boolean){
    const isPass= isVaildForm && existsEmail && isAuthEmail
    return isPass
  }


  // action | 이메일 본인인증(인증번호 확인 처리)
  async function reqEmailAuth(value:string|number) {
    if(value.toString().length!==4) return toast.error('정확히 4자리를 입력해주세요.')
    const url = '/api/auth/general-auth/auth-email'
    const response = await fetch(url, {
      method:'POST',
      body: JSON.stringify({email, value})
    })

    const { success } = await response.json()
    if (!success) return toast.error('인증번호가 일치하지 않습니다.')
    if (success) { toast.success('인증 되었습니다.'); return setIsAuthEmail(true)}

  }

  // onClick | 회원가입 요청
  async function onClickReqSingin() {
    const isAgreementConcent = consentCheck(consents)
    if (!isAgreementConcent) return toast('작업을 완료하려면 모든 필수 동의사항에 동의해야 합니다.')

    const isSuccess = await reqSingIn({ email, password, reConfirmPw }, consents)

    if (isSuccess) {
      toast.success('승인되었습니다.')

      setExistsEmail(false)
      setisSuccess(true)
      
      router.push('/')

    }
  }

  function onClickCloseInput(){
    const isClose = confirm('닫으시면 인증절차를 다시 시도해야 합니다. 취소하시겠습니까?')
    if(isClose) { 
      toast('인증이 취소되었습니다.')
      setExistsEmail(false)
    }
  }

  function onClickBack() {
    router.push('/login')
  }

  useDraggable(formRef, 'free')

  return (
    <form
      ref={formRef}
      className="sm:max-h-[100%] max-h-[650px] backdrop-blur-[5px] rounded-[5px] flex flex-col fixed max-w-[550px] px-[5px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-y-auto  "
      onSubmit={onSubmit}
    >
      <FormTitle> 회원가입</FormTitle>
      <BackButton onClickBack={onClickBack} />

      {/* 이메일 */}
      <SignInEmailInput email={email} isEmail={isEmail} setEmail={setEmail} setIsEmail={setIsEmail} setExistsEmail={setExistsEmail} />
      <EmailAuthInput isShowEmailAuthForm={existsEmail} reqEmailAuth={reqEmailAuth} onClickCloseInput={onClickCloseInput} isComplete={isAuthEmail} />

      {/* 패스워드 */}
      <SignInPasswordInput isPassword={isPassword} setPassword={setPassword} setIsPassword={setIsPassword}/>

      {/* 패스워드 재검증 */}
      <SignInPasswordReConfirmInput isReconfirmPassword={isReconfirmPassword} password={password} setIsReconfirmPassword={setIsReconfirmPassword} setReConfirmPw={setReConfirmPw}/>

      {/* 약관 동의 */}
      <Consent consents={consents} setConsents={setConsents} />

      {/* 전송버튼 */}
      <SignInSubmitButton isDisabled={isSuccess} isPass={checkTransmissionAvailability(isVaildForm, existsEmail, isAuthEmail)} onClick={onClickReqSingin}
      />
    </form>
  )
}

// 필수 약관에 동의하였는지 체크
function consentCheck(consents: ConsentsType) {
  const { term, child, private: privateConsent } = consents

  if (term && child && privateConsent) {
    return true
  } else { return false }
}