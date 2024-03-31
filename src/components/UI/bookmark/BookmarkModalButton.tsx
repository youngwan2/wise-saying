'use client'

import { HiOutlineBookmark } from 'react-icons/hi2'
import { useBookmarkStore } from '@/store/store'
import { useRef } from 'react'

export default function BookmarkModalButton() {
  const bookmarkButtonRef = useRef<HTMLButtonElement>(null)
  const { count, toggleState, setToggleState } = useBookmark()

  return (
    <button
      aria-label="북마크 아이콘"
      ref={bookmarkButtonRef}
      onClick={() => {
        setToggleState(!toggleState)
      }}
      className="sm:p-[6px] p-[3px] text-[0.82em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]  mt-[0.25em]"
    >
      <span
        aria-hidden="true"
        className="rounded-[1em] flex flex-col items-center "
      >
        <span
          aria-hidden="true"
          className="bg-[#fe7c7c] px-[10px] rounded-[1em] mb-[-15px] z-[1] text-white"
        >
          {count}
        </span>
        <HiOutlineBookmark aria-hidden="true" className={'text-[25px] '} />
      </span>
    </button>
  )
}

const useBookmark = () => {
  const toggleState = useBookmarkStore((state) => state.toggleState)
  const count = useBookmarkStore((state) => state.count)
  const setToggleState = useBookmarkStore((state) => state.setToggleState)

  return { count, toggleState, setToggleState }
}
