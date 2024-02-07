'use client'

import useDraggable from '@/custom/useDraggable'
import useTTL from '@/custom/useTTS'
import { useHeaderSearchFormStateStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { HiOutlineXMark } from 'react-icons/hi2'

export default function SearchForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const isDisplay = useHeaderSearchFormStateStore((state) => state.isDisplay)
  const setIsDisplay = useHeaderSearchFormStateStore(
    (state) => state.setIsDisplay,
  )

  const { setText } = useTTL()

  useDraggable(formRef, 'x')

  const search = async (formData: FormData) => {
    const value = formData.get('search')
    router.push(`/quotes/search?type=all&searchText=${value}`)
    setText('검색된 키워드는, ' + value + ' 입니다.')
  }
  return (
    // 검색창
    <form
      ref={formRef}
      action={search}
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
      <div className="flex justify-between text-white text-[1.1em] m-[5px] mt-[-0.25em]">
        <h3>검색(Search)</h3>
        <button
          type="button"
          onClick={() => {
            setIsDisplay(false)
          }}
        >
          <HiOutlineXMark />
        </button>
      </div>

      <article className="flex items-center">
        <label
          className=" text-[20px] p-[5px] py-[10px] min-w-[30px] m-[0] rounded-l-[5px] shadow-[2px_0_5px_0_rgba(0,0,0,0.3)] z-[10] "
          htmlFor="search"
        >
          <HiOutlineSearch color="white" />
        </label>
        <input
          className="p-[5px] py-[10px] w-[100%] rounded-[5px] shadow-[inset_-2px_2px_5px_0_rgba(0,0,0,0.5)]"
          type="search"
          id="search"
          name="search"
          placeholder="키워드를 입력해주세요(인물 이름, 명언 키워드 등)"
        />
      </article>
    </form>
  )
}
