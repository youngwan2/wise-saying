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
import Consent from './Consent'
import toast from 'react-hot-toast'
import { ConsentsType } from '@/types/items.types'

export default function SignInForm() {
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

  // onClick | 회원가입 요청
  async function onClickReqSingin() {
    const isAgreementConcent = consentCheck(consents)
    if(!isAgreementConcent) return toast('작업을 완료하려면 모든 필수 동의사항에 동의해야 합니다.')

    const isSuccess = await reqSingIn({ email, password, reConfirmPw }, consents)

    if (isSuccess) {
      setExistsEmail(false)
      setisSuccess(true)
      router.push('/')
      toast.success('승인되었습니다.')
    }
  }

  function onClickBack() {
    router.push('/login')
  }

  function onClickModalClose() {
    setIsShowModal(false)
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

      {/* 약관 동의 */}
      <Consent consents={consents} setConsents={setConsents} />

      {/* 전송버튼 */}
      <SignInSubmitButton
        isDisabled={isSuccess}
        isVaildForm={isVaildForm}
        existsEmail={existsEmail}
        onClick={onClickReqSingin}
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