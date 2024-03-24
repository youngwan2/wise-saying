'use client'

import useDraggable from '@/custom/useDraggable'
import { useHeaderSearchFormStateStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SearchInput from './SearchInput'
import SearchHeader from './SearchHeader'
import { resizeCheck } from '@/utils/common-func'

export default function SearchForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isActive, setIsActive] = useState(false)
  const isDisplay = useHeaderSearchFormStateStore((state) => state.isDisplay)
  const setIsDisplay = useHeaderSearchFormStateStore(
    (state) => state.setIsDisplay,
  )

  const searchAction = async (formData: FormData) => {
    const value = formData.get('search') || ''
    router.push(`/search?type=all&searchText=${value}`)
  }

  useEffect(() => {
    const handle = () => resizeCheck(1000, 768, setIsActive)()
    window.addEventListener('resize', handle)

    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [])

  const onClickDisplay = () => {
    setIsDisplay(false) // 검색창을 닫는 로직
  }

  useDraggable(formRef, 'x', isActive)
  return (
    // 검색창
    <form
      ref={formRef}
      action={searchAction}
      className={`
      rounded-[10px] my-[2em] max-w-[450px] min-w-[150px] w-full bg-[transparent]  z-[1000]
      right-[1.3em]  fixed p-[15px] shadow-[0_0_20px_5px_rgba(0,0,0,0.4)] backdrop-blur-[10px] 
      transition-all duration-75
      ${isDisplay
          ? 'visible opacity-100 top-[3em]  '
          : 'invisible opacity-0 top-0'
        }`}
    >
      <SearchHeader onClickDisplay={onClickDisplay} />
      <SearchInput />
    </form>
  )
}
