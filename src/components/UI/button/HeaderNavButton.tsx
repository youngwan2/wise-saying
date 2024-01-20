'use client'
import { HiOutlineMenu, HiX } from 'react-icons/hi'
import { useNavDisplayStateStore } from '@/store/store'
import { useRef } from 'react'
import useScrollBasedIconPosition from '@/custom/useScrollBasedIconPosition'

export default function HeaderNavButton() {
  const navButtonRef = useRef<HTMLButtonElement>(null)

  useScrollBasedIconPosition(navButtonRef, 40, 200, 'tomato', 10)
  const setDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  return (
    <button
      ref={navButtonRef}
      className={
        'text-[1.25em] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.5)] p-[10px] mt-[0.25em]'
      }
      onClick={() => {
        setDisplay(!isDisplay)
      }}
    >
      {isDisplay ? <HiX /> : <HiOutlineMenu />}
    </button>
  )
}
