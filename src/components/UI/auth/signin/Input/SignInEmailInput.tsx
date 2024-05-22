
import { KeyboardEvent, useState } from 'react'

import ValidityMessage from '../message/ValidityMessage'
import DupEmailCheckButton from '../button/DupEmailCheckButton'
import Label from '@/components/UI/common/Label'
import Input from '@/components/UI/common/Input'

import { HiOutlineMail } from 'react-icons/hi'

import { defaultFetch } from '@/utils/fetcher'
import { Method, defaultConfig } from '@/configs/config.api'
import toast from 'react-hot-toast'

interface PropsType {
  isEmail: boolean
  email: string
  setIsEmail: (p: boolean) => void
  setEmail: (p: string) => void
  setExistsEmail: (p: boolean) => void
}

const URL = '/api/auth/general-auth/check-email-duplication'
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


  // POST | 이메일 중복 및 본인인증 체크
  async function userExists(email: string) {
    setIsLoading(true)
    const { success, meg } = await postFetch(email)
    if (success) {
      setExistsEmail(true)
      toast.success(meg + '이메일 인증을 진행해 주세요. 인증번호는 현재 입력하신 이메일로 전송되므로 확인 후 입력해 주세요.')
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

  function onClickDupEmailCheck() {
    userExists(email)
  }

  return (
    <div className="mt-[3.5em] mb-[1em] mx-[10px]">
      <div className="flex">
        {/* 이메일 입력 */}
        <Label
          className="rounded-s-lg text-[1.1em] text-[white] text-center p-[0.8em] inline-block min-w-[50px]"
          htmlFor="user-email"
        >
          <span className=" inline-block">
            <HiOutlineMail />
          </span>
        </Label>
        <Input
          autoComplete="on"
          onInput={onInputEmail}
          className="text-white pl-[8px]  min-w-[230px] w-[100%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-transparent focus:bg-white focus:outline-none focus:text-black focus:font-bold hover:bg-[rgba(255,255,255,0.05)]"
          type="email"
          id="user-email"
          name="user-email"
          placeholder="이메일"

        />
        <DupEmailCheckButton
          isLoading={isLoading}
          onClickDupEmailCheck={onClickDupEmailCheck}
        />
      </div>
      <ValidityMessage isPass={isEmail}>
        {isEmail ? '이메일 형식과 일치합니다.' : '이메일 형식과 일치시키세요.'}
      </ValidityMessage>
    </div>
  )
}



  /**
   * 이메일 도메인의 휴효성 및 중복 확인 요청
   * @param email 이메일 ex. example@domain.com
   * @returns 성공/실패 유무에 대한 boolean 과 메시지를 {success,meg} 형태로 반환
   */
  async function postFetch(email: string) {
    const config = defaultConfig(Method.POST, email)
    return await defaultFetch(URL, config)
  }