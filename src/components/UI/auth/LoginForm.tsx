'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiOutlineX } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'
import useHasToken from '@/custom/useHasToken'
import { reqLogin } from '@/services/user/post'
import useDraggable from '@/custom/useDraggable'
import { redirect } from 'next/navigation'
import LoginEmailInput from './LoginEmailInput'
import { Toaster } from 'react-hot-toast'
import LoginPasswordInput from './LoginPasswordInput'

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
  useDraggable(loginFormRef, null)

  async function login(form: FormData) {
    setIsLoading(true)
    const email = form.get('email')?.valueOf().toString() || ''
    const password = form.get('password')?.valueOf().toString() || ''
    reqLogin(email, password).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c]"></div>
      <Toaster />
      <form
        ref={loginFormRef}
        action={login}
        className="shadow-2xl  rounded-[5px] flex flex-col fixed max-w-[400px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#f6795a]"
      >
        <h2 className="rounded-t-[5px]  p-[10px] font-bold text-[1.25em] mt-[-0.2em] bg-[#413A3A] text-[white]">
          로그인
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
        <LoginEmailInput />
        {/* 패스워드 */}
        <LoginPasswordInput />

        {/* 로그인 요청 */}
        <input
          aria-label="로그인 요청"
          className="rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold"
          type="submit"
          value={isLoading ? '전송중..' : '로그인'}
        />

        {/* 회원가입 안내  */}
        <div
          aria-label="회원가입 안내 메시지 및 페이지 이동 링크 박스"
          className="p-[10px] text-center mb-[0.5em]"
        >
          <span>혹시.. 첫 방문 이신가요?</span>
          <Link
            className="m-[10px] underline hover:bg-[orange] text-[white]"
            href={'/signin'}
          >
            회원가입
          </Link>
        </div>
      </form>
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
