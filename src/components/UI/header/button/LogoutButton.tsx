'use client'


import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import useHasToken from '@/custom/useHasToken'

import ControlButton from '../../common/button/ControlButton'

import { HiPower } from 'react-icons/hi2'

export default function LogoutButton() {
  const router = useRouter()
  const hasToken = useHasToken()
  const { data: session } = useSession()


  if (!hasToken && !session) return <></>
  return (
    <ControlButton
      ariaLabel="로그아웃 아이콘"
      onClick={() => {
        // memo: 소셜 로그인 이라면 바로 로그아웃, 일반 로그인 이라면 로그아웃 페이지로 이동
        session ? signOut() : router.push('/logout')
      }}
      className="sm:text-[1.5em] text-[1.25em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]"
    >
      <HiPower />
    </ControlButton>
  )
}
