'use client'

import useHasToken from '@/custom/useHasToken'
import { HiUser } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'

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
      className="text-[1.5em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]"
    >
      <HiUser />
    </button>
  )
}
