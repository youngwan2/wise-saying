'use client'

import useHasToken from '@/custom/useHasToken'
import { useRouter } from 'next/navigation'
import { HiPower } from 'react-icons/hi2'
import { useSession, signOut } from 'next-auth/react'

export default function LogoutButton() {
  const router = useRouter()
  const hasToken = useHasToken()
  const { data: session } = useSession()

  if (!hasToken && !session) return <></>
  if (hasToken || session)
    return (
      <button
        aria-label="로그아웃 아이콘"
        onClick={() => {
          session ? signOut() : router.push('/logout')
        }}
        className="sm:text-[1.5em] text-[1.25em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]"
      >
        <HiPower />
      </button>
    )
}
