'use client'

import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'

import { HiUser } from 'react-icons/hi2'

export default function LoginButton() {
  const router = useRouter()
  const hasToken = useHasToken()
  

  if (hasToken) return <></>
  return (
    <button
      aria-label="로그인 아이콘"
      onClick={() => {
        router.push('/login')
      }}
      className="sm:text-[1.5em] text-[1.25em]  p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.4)]"
    >
      <HiUser />
    </button>
  )
}
