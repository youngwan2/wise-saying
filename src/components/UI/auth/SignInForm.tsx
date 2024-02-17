'use client'

import { HiOutlineX } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SignInEmailInput from './SignInEmailInput'
import SignInPasswordInput from './SignInPasswordInput'
import SignInPasswordReConfirmInput from './SignInPwReConfirmInput'
import SignInSubmitButton from './SignInSubmitButton'
import { onSubmit } from '@/utils/commonFunctions'
import useDraggable from '@/custom/useDraggable'
import { reqSingIn } from '@/services/user/post'

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

  const [messageDisplay, setMessageDisplay] = useState(true)

  useDraggable(formRef, null)

  useEffect(() => {
    if (isSuccess) return router.push('/login')
  }, [isSuccess, router])

  // onClick | 로그인 요청
  async function onClickReqSingin(){
    router.prefetch('/')
    const isSuccess = await reqSingIn({email, password, reConfirmPw}) || null
    if(isSuccess) {
      setExistsEmail(false)
      setisSuccess(true)
      router.push('/')
      
    }
  }
  
  return (
    <>
      <div className=" hover:cursor-pointer fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] rounded-[10px]"></div>
      {/* 안내 메시지(임시) */}
      {messageDisplay ? (
        <article className="bg-[white] absolute rounded-[10px] p-[15px] w-full max-w-[450px] left-[50%] top-[30%] z-50 translate-x-[-50%] shadow-[0_0_100px_1000px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between">
            <span className="bg-[#f55353] text-white inline-block rounded-[10px] p-[2px] px-[5px] mr-[0.5em] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.3)]">
              {'체험 전 주요사항'}{' '}
            </span>
          </div>
          <p className="text-red  text-start px-[5px] my-[5px]">
            회원가입에 사용되는{' '}
            <b className="underline">
              아이디와 비밀번호는 절대 타 사이트에서 사용하는 것을 사용하지
              마세요
            </b>
            . 저장된 회원정보는 1일 1회 전체 삭제 처리합니다. <br></br> <br />
            <b className="underline">
              {' '}
              Please do not use the same ID and password for registration as you
              do on other sites
            </b>
            . All stored member information will be deleted completely once a
            day.
          </p>
          <button
            className="font-bold hover:text-blue-700 p-[5px] px-[10px]"
            onClick={() => {
              setMessageDisplay(false)
            }}
          >
            확인
          </button>
        </article>
      ) : null}

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
          isDisabled={isSuccess}
          existsEmail={existsEmail}
          isVaildForm={isVaildForm}
          onClick={onClickReqSingin}
        />
      </form>
    </>
  )
}
