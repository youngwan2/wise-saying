'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineX } from 'react-icons/hi'
import { BsGithub } from 'react-icons/bs'
import { useEffect, useRef } from 'react'
import useHasToken from '@/custom/useHasToken'
import { reqLogin } from '@/api/user/post'
import useDraggable from '@/custom/useDraggable'
import { redirect } from 'next/navigation'

export default function LoginForm() {
  const loginFormRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const hasToken = useHasToken()

  // 토큰 존재 시 리디렉트
  useEffect(() => {
    if (hasToken) {
      redirect('/')
    }
  }, [router, hasToken])

  // 드래그어블 적용
  useDraggable(loginFormRef,null)

  async function login(form: FormData) {
    const email = form.get('email')
    const password = form.get('password')
    reqLogin(email, password)
  }

  return (
    <>
      <div
        aria-label="로그인 화면을 감싸고 있는 배경"
        className="fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] "
      ></div>
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
        <article className="flex mt-[3.5em] mb-[1em] mx-[10px]">
          <label
            className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]"
            htmlFor="user-email"
          >
            <span className=" inline-block">
              <HiOutlineMail />
            </span>
          </label>
          <input
            ref={emailInputRef}
            className="pl-[5px] rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]"
            type="email"
            id="user-email"
            name="email"
          />
        </article>
        {/* 패스워드 */}
        <div className="flex  mx-[10px]">
          <label
            className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
            htmlFor="user-password"
          >
            <HiOutlineLockClosed className={'inline-block'} />
          </label>
          <input
            className="pl-[5px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]"
            type="password"
            id="user-password"
            name="password"
          />
        </div>

        {/* 로그인 요청 */}
        <input
          className="rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold"
          type="submit"
          value={'로그인'}
        />

        {/* 소셜 로그인 */}
        <button
          className="hover:bg-[white] hover:text-[tomato] font-bold p-[5px] border w-[50%] mx-auto mb-[10px] flex items-center justify-center"
          onClick={() => {
            alert('향후 추가 예정입니다.')
            // signIn()
          }}
        >
          <BsGithub />
          <span className="pl-[5px]">GitHub</span>
        </button>
        {/* 회원가입 안내  */}
        <div
          aria-label="회원가입 안내 메시지 및 페이지 이동 링크"
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
