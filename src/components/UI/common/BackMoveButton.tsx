'use client'

import { HiArrowLeftCircle } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
export default function BackMoveButton() {
  const router = useRouter()
  return (
    <button
     aria-label='뒤로가기'
      onClick={() => {
        router.back()
      }}
      className="text-[1.8em] absolute top-[2em] left-3"
    >
      <HiArrowLeftCircle color="gold" />
    </button>
  )
}
