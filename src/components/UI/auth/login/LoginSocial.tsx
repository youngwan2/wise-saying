'use client'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'
import { setUserInfo } from '@/utils/session-storage'
import { toast } from 'react-toastify'

export default function LoginGoogle() {
  const { data: session } = useSession()

  async function reqGoolgeRogin() {
    const user = await signIn()
    console.log(user)
  }

  const reqLogin = useCallback(async () => {

    const response = await fetch('/api/auth/general-auth/oauth2')
    const { meg, success } = await response.json()


    const { email: dbEmail, image, name: nickname } = session?.user ?? { email: '', image: '', name: '익명의 시인' }
    const userInfo = { dbEmail, profile: { nickname, image } }
    setUserInfo(userInfo)
    if (!success) return toast(meg)
    toast.success(nickname + '님의 첫 방문을 환영합니다.🎊')
  }, [session])

  useEffect(() => {
    session && reqLogin()
  }, [session, reqLogin])

  return (
    <article className="mt-[2em] mb-[1.25em] flex flex-col max-w-[430px] w-full mx-auto">
      <h2 className="text-[1.25em] mb-[0.25em] text-white text-center">
        간편 로그인
      </h2>
      <button
        type='button'
        onClick={reqGoolgeRogin}
        className=" text-[1em] font-semibold flex items-center mx-auto bg-white justify-center p-[12px] my-[8px] hover:bg-[#dadada] hover:font-bold rounded-[5px] max-w-[220px] w-full"
      >
        <FcGoogle className={'text-[1.5em] mr-[1em]'} /> 구글 로그인(공사중)
      </button>
    </article>
  )
}
