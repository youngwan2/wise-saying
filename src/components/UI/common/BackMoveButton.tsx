'use client'

import { HiBackward } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
export default function BackMoveButton() {
  const router = useRouter()
  return (
    <button
      aria-label="뒤로가기"
      onClick={() => {
        router.back()
      }}
      className="text-[1.5em] top-[2em] left-3 flex items-center text-white hover:text-[gold] fixed"
    >
      <HiBackward color="gold" className="animate-bounce-x-2" />{' '}
      <span className="sm:text-[0.8em] text-[0.7em] ml-[1em]">뒤로</span>
    </button>
  )
}
