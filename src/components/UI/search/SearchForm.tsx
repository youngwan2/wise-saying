'use client'

import useDraggable from '@/custom/useDraggable'
import useTTL from '@/custom/useTTS'
import { useHeaderSearchFormStateStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import SearchInput from './SearchInput'
import SearchHeader from './SearchHeader'

export default function SearchForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const isDisplay = useHeaderSearchFormStateStore((state) => state.isDisplay)
  const setIsDisplay = useHeaderSearchFormStateStore(
    (state) => state.setIsDisplay,
  )

  const { setText } = useTTL()

  useDraggable(formRef, 'x')

  const searchAction = async (formData: FormData) => {
    const value = formData.get('search') || ''
    router.push(`/search?type=all&searchText=${value}`)
    setText('검색된 키워드는, ' + value + ' 입니다.')
  }

  const onClickDisplay = () => {
    setIsDisplay(false) // 검색창을 닫는 로직
  }
  return (
    // 검색창
    <form
      ref={formRef}
      action={searchAction}
      className={`
      rounded-[10px] my-[2em] max-w-[450px] min-w-[150px] w-full bg-[transparent]  z-[1000]
      left-[50%] -translate-x-[-50%]  fixed p-[15px] shadow-[0_0_20px_5px_rgba(0,0,0,0.4)] backdrop-blur-[10px] 
      transition-all duration-75
      ${
        isDisplay
          ? 'visible opacity-100 top-[3em]  '
          : 'invisible opacity-0 top-0'
      }`}
    >
      <SearchHeader onClickDisplay={onClickDisplay} />
      <SearchInput />
    </form>
  )
}
