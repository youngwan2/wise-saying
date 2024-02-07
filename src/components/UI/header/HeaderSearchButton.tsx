'use client'
import { useHeaderSearchFormStateStore } from '@/store/store'
import { HiOutlineSearch } from 'react-icons/hi'
import { HiMiniXMark } from 'react-icons/hi2'

export default function HeaderSearchButton() {
  const setIsDisplay = useHeaderSearchFormStateStore(
    (state) => state.setIsDisplay,
  )
  const isDisplay = useHeaderSearchFormStateStore((state) => state.isDisplay)

  return (
    <button
      aria-label="검색 아이콘"
      className="text-[1.5em] hover:shadow-[0_0_0_1px_rgba(999,999,999,0.3)] p-[9px] mt-[0.25em]"
      onClick={() => {
        setIsDisplay(!isDisplay)
      }}
    >
      {isDisplay ? <HiMiniXMark /> : <HiOutlineSearch />}
    </button>
  )
}
