import toast from 'react-hot-toast'
import { KeyboardEvent, useState } from 'react'
import EmailValidityMessage from './EmailValidityMessage'
import { defaultFetch } from '@/utils/fetcher'
import { Method, defaultConfig } from '@/configs/config.api'
import EmailLabel from '../common/EmailLabel'
import DupEmailCheckButton from './DupEmailCheckButton'

interface PropsType {
  isEmail: boolean
  email: string
  setIsEmail: (p: boolean) => void
  setEmail: (p: string) => void
  setExistsEmail: (p: boolean) => void
}

const URL = '/api/users/check-email-duplication'

export default function SignInEmailInput({
  isEmail,
  email,
  setIsEmail,
  setEmail,
  setExistsEmail,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false)

  // 이메일 유효성 체크
  function emailChecker(email: string) {
    const test = /[a-z0-9]@[a-z]+\.[a-z]{3,}/g.test(email)
    if (test) return setIsEmail(true)
    return setIsEmail(false)
  }

  // POST | 이메일 중복 체크
  async function userExists(email: string) {
    setIsLoading(true)
    const config = defaultConfig(Method.POST, email)
    const { success, meg } = await defaultFetch(URL, config)
    if (success) {
      setExistsEmail(true)
      toast.success(meg + '다음을 진행해 주세요.')
    }
    if (!success) {
      setExistsEmail(false)
      toast.error(meg)
    }
    setIsLoading(false)
  }

  // 이메일 입력 이벤트
  function onInputEmail(e: KeyboardEvent<HTMLInputElement>) {
    const email = e.currentTarget.value
    emailChecker(email)
    setEmail(email)
  }

  function onClickCheck() {
    userExists(email)
  }

  return (
    <article className="mt-[3.5em] mb-[1em] mx-[10px]">
      <div className="flex">
        {/* 이메일 입력 */}
        <EmailLabel />
        <input
          autoComplete="on"
          onInput={onInputEmail}
          className="text-white pl-[8px]  min-w-[230px] w-[100%] shadow-[inset_0_0_0_2px_white] bg-transparent focus:bg-white focus:outline-none focus:text-black focus:font-bold"
          type="email"
          id="user-email"
          name="user-email"
          placeholder="이메일"
        />
        <DupEmailCheckButton
          isLoading={isLoading}
          onClickCheck={onClickCheck}
        />
      </div>
      <EmailValidityMessage isEmail={isEmail} />
    </article>
  )
}
