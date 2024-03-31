'use client'
import { HiOutlineMenu } from 'react-icons/hi'
import { useNavDisplayStateStore } from '@/store/store'
import { useRef } from 'react'
import { HiOutlineXCircle } from 'react-icons/hi2'

export default function HeaderNavButton() {
  const navButtonRef = useRef<HTMLButtonElement>(null)

  const setDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  return (
    <button
      aria-label="상단 메뉴 아이콘"
      ref={navButtonRef}
      className={
        'sm:text-[1.5em] sm:p-[10px] text-[1.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)] p-[8px] mt-[0.25em]'
      }
      onClick={() => {
        setDisplay(!isDisplay)
      }}
    >
      {isDisplay ? (
        <HiOutlineXCircle color="white" />
      ) : (
        <HiOutlineMenu color="white" />
      )}
    </button>
  )
}
