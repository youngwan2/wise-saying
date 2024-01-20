'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { signIn } from 'next-auth/react'
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineX } from 'react-icons/hi'
import { BsGithub } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import useHasToken from '@/custom/useHasToken'
import gsap from 'gsap/all'
import { Draggable } from 'gsap/Draggable'
import { reqLogin } from '@/services/item.post'

export default function LoginForm() {
  const loginFormRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const hasToken = useHasToken()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // 토큰이 존재하거나 세션이 존재한다면 리디렉트
  useEffect(() => {
    const clear = setTimeout(() => {
      if (hasToken) {
        router.replace('/')
      }
    }, 500)
    return () => {
      clearTimeout(clear)
    }
  }, [router, hasToken])

  // 드래그어블 적용
  useEffect(() => {
    gsap.registerPlugin(Draggable)

    if (loginFormRef.current) {
      setTimeout(() => {
        Draggable.create(loginFormRef.current, {
          dragClickables: false,
          bounds: document.querySelector('body'),
        })
      }, 1000)
    }
  }, [])

  return (
    <>
      <div
        aria-label="로그인 화면을 감싸고 있는 배경"
        className="fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] "
      ></div>
      <form
        ref={loginFormRef}
        className="shadow-2xl  rounded-[10px] flex flex-col fixed max-w-[400px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#E76F51]"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <h2 className="rounded-t-[10px]  p-[10px] font-bold text-[1.25em] bg-[#413A3A] text-[white]">
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
        <div className="flex mt-[3.5em] mb-[1em] mx-[10px]">
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
            onInput={(e) => {
              const email = e.currentTarget.value
              setEmail(email)
            }}
            className="pl-[5px] rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]"
            type="email"
            id="user-email"
            name="user-email"
          />
        </div>
        {/* 패스워드 */}
        <div className="flex  mx-[10px]">
          <label
            className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
            htmlFor="user-password"
          >
            <span className="inline-block">
              <HiOutlineLockClosed />
            </span>
          </label>
          <input
            onInput={(e) => {
              const password = e.currentTarget.value
              setPassword(password)
            }}
            className="pl-[5px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]"
            type="password"
            id="user-password"
            name="user-password"
          />
        </div>

        {/* 로그인 요청 */}
        <input
          onClick={() => {
            reqLogin(email, password)
          }}
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
