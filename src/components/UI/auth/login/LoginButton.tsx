'use client'

import useHasToken from '@/custom/useHasToken'
import { HiUser } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function LoginButton() {
  const router = useRouter()
  const hasToken = useHasToken()
  const { data: session } = useSession()
  if (hasToken || session) return <></>
  return (
    <button
      aria-label="로그인 아이콘"
      onClick={() => {
        router.push('/login')
      }}
      className="sm:text-[1.5em] text-[1.25em]  p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_2px_white]"
    >
      <HiUser />
    </button>
  )
}
