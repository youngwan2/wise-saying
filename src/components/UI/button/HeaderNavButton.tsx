'use client'
import { HiOutlineMenu, HiX } from 'react-icons/hi'
import { useNavDisplayStateStore } from '@/store/store'
import { useRef } from 'react'
import { HiOutlineXCircle} from 'react-icons/hi2'

export default function HeaderNavButton() {
  const navButtonRef = useRef<HTMLButtonElement>(null)

  const setDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  return (
    <button
      ref={navButtonRef}
      className={
        'text-[1.7em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)] p-[10px] mt-[0.25em]'
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
