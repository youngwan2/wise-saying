'use client'
import styles from './common.module.css'
import { HiBackspace } from 'react-icons/hi2'

import { useRouter } from 'next/navigation'
export default function BackMoveButton() {
  const router = useRouter()
  return (
    <button
      aria-label="뒤로가기"
      onClick={() => {
        router.back()
      }}
      className={`${styles.back_btn} text-[1.5em] top-[3em] left-5 flex items-center text-white fixed z-[100000]`}
    >
      <HiBackspace className="animate-bounce-x-2" />{' '}
    </button>
  )
}
