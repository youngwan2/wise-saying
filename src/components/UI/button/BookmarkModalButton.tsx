'use client'

import { HiOutlineBookmark } from 'react-icons/hi2'
import { useBookmarkStore } from '@/store/store'
import { useRef } from 'react'

export default function BookmarkModalButton() {
  const toggleState = useBookmarkStore((state) => state.toggleState)
  const count = useBookmarkStore((state) => state.count)
  const setToggleState = useBookmarkStore((state) => state.setToggleState)
  const bookmarkButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <button
      ref={bookmarkButtonRef}
      onClick={() => {
        setToggleState(!toggleState)
      }}
      className="text-[0.82em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)] p-[10px] mt-[0.25em]"
    >
      <span className=" rounded-[1em] flex flex-col items-center ">
        <span className="bg-[#fe7c7c] px-[10px] rounded-[1em] mb-[-15px] z-[1] text-white">
          {count}
        </span>
        <HiOutlineBookmark className={'text-[25px] '} />
      </span>
    </button>
  )
}
