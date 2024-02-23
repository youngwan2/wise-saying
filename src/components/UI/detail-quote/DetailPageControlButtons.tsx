'use client'

import { SlEarphones } from 'react-icons/sl'
import useHasToken from '@/custom/useHasToken'
import { pageSwitch, quotesSelector } from '@/utils/common-func'

import { HiOutlineBookmark, HiScissors } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { addBookmarkItem } from '@/services/data/post'
import useTTS from '@/custom/useTTS'
import { useBookmarkUpdate } from '@/store/store'

interface PropsType {
  item: {
    id: number
    quote: string
    author: string
    job: string
  }
}

export default function DetailPageControlButtons({ item }: PropsType) {
  const hasToken = useHasToken()
  const router = useRouter()
  const setIsUpdate = useBookmarkUpdate((state=> state.setIsUpdate))

  const { setText } = useTTS()

  const onClickBookmarkAdd = async () => {
    if (!item && !hasToken) return
    const { id } = item
    const isSuccess =await addBookmarkItem(id)
    isSuccess && setIsUpdate(true)
  }

  const onClickStylerPageSwitch = () => {
    if (!item) return
    const { id } = item
    pageSwitch(router, id)
    quotesSelector(item)
  }

  return (
    <>
      <article className="sm:text-[14.5px] text-[13px] flex items-start  w-full text-white ">
        {/* 카드 만들기 버튼 */}
        <button
          onClick={onClickStylerPageSwitch}
          className=" flex items-center hover:bg-[tomato]  mt-[0.25em] hover:text-[white] rounded-[0.3em] p-[5px] "
          aria-label="명언 꾸미기 편집화면 이동 버튼"
        >
          <HiScissors className="pr-[3px]" />
          꾸미기
        </button>

        {/* 북마크 추가 버튼 */}
        <button
          onClick={onClickBookmarkAdd}
          className="  flex items-center hover:bg-[tomato] mt-[0.25em] hover:text-[white] rounded-[0.3em] p-[5px] "
          aria-label="명언 북마크 버튼"
        >
          <HiOutlineBookmark className="pr-[3px]" />
          북마크
        </button>

        {/* 듣기 버튼 */}
        <button
          onClick={() => {
            setText(item.quote)
          }}
          className=" flex items-center hover:bg-[tomato] mt-[0.25em] hover:text-[white] rounded-[0.3em] p-[5px] "
          aria-label="명언 듣기 버튼"
        >
          <SlEarphones className="pr-[3px]" />
          듣기
        </button>
      </article>
    </>
  )
}
