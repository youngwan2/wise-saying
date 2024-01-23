'use client'

import { HiOutlineX } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap/all'
import { Draggable } from 'gsap/Draggable'
import { useEffect, useRef, useState } from 'react'
import SignInEmailInput from '../input/SignInEmailInput'
import SignInPasswordInput from '../input/SignInPasswordInput'
import SignInPasswordReConfirmInput from '../input/SignInPwReConfirmInput'
import SignInSubmitButton from '../button/SignInSubmitButton'
import { onSubmit } from '@/utils/commonFunctions'

/**
 *  TODO: 하나의 페이지에 너무 긴 코드가 존재함 상태관리가 복잡해 보이고, 가독성도 매우 떨어짐. 별도의 컴포넌트로 분리하여 가독성을 높일 필요가 있음
 */
export default function SignInForm() {
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isReconfirmPassword, setIsReconfirmPassword] = useState(false)
  const [isSuccess, setisSuccessState] = useState(false)
  const [existsEmail, setExistsEmail] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reConfirmPw, setReConfirmPw] = useState('')

  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const isVaildForm = isEmail && isPassword && isReconfirmPassword

  useEffect(() => {
    if (formRef.current) {
      gsap.registerPlugin(Draggable)
      const form = formRef.current

      Draggable.create(form, {
        dragClickables: false,
        bounds: document.querySelector('body'),
      })
    }
  }, [])

  useEffect(() => {
    if (isSuccess) return router.push('/')
  }, [isSuccess, router])

  /** 회원가입 요청 */
  function userInfoPostFetch(email: string, password: string) {
    const body = {
      email,
      password,
      reConfirmPw,
    }
    fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const { success: isSuccess, status } = await response.json()
        if (status === 201) {
          setisSuccessState(isSuccess)
          setExistsEmail(false)
          alert('회원가입이 완료 되었습니다. 가입해주셔서 감사합니다.')
        }
        if (status !== 201) {
        }
      })
      .catch(() => {
        alert('요청에 실패하였습니다. 나중에 다시 시도해주세요.')
      })
  }

  return (
    <>
      <div className=" hover:cursor-pointer fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] rounded-[10px]"></div>
      <form
        ref={formRef}
        className="shadow-2xl  rounded-[10px] flex flex-col fixed max-w-[430px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#E76F51]"
        onSubmit={onSubmit}
      >
        <h2 className="rounded-t-[10px]  p-[10px] font-bold text-[1.25em] bg-[#413A3A] text-[white]">
          회원가입
        </h2>
        <button
          className="fixed top-[0.73em] right-[7px] text-[1.2em] text-[white]"
          onClick={() => {
            router.back()
          }}
        >
          <HiOutlineX></HiOutlineX>
        </button>

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
          email={email}
          password={password}
          existsEmail={existsEmail}
          isVaildForm={isVaildForm}
          userInfoPostFetch={userInfoPostFetch}
        />
      </form>
    </>
  )
}
