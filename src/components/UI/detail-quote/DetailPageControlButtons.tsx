'use client'

import { SlEarphones } from 'react-icons/sl'
import useHasToken from '@/custom/useHasToken'
import { pageSwitch, quotesSelector } from '@/utils/common-func'
import { HiOutlineBookmark, HiScissors } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { addBookmarkItem } from '@/services/data/post'
import useTTS from '@/custom/useTTS'
import { useBookmarkUpdate } from '@/store/store'
import { useSession } from 'next-auth/react'
import {toast} from 'react-toastify'

interface PropsType {
  item: {
    quote_id: number
    quote: string
    author: string
    job?: string
    profile_img_url?:string
    created_at?:string
  }
  isUserQuote:boolean
}

export default function DetailPageControlButtons({ item, isUserQuote }: PropsType) {
  const hasToken = useHasToken()
  const { data: session } = useSession()
  const router = useRouter()
  const setIsUpdate = useBookmarkUpdate((state) => state.setIsUpdate)

  const { setText } = useTTS()

  const onClickBookmarkAdd = async () => {
    if (!item && !hasToken && !session)
      return toast.error('로그인 후 이용 가능합니다.')

    const { quote_id:quoteId } = item

    const type = isUserQuote? '?type=user':'?type=no-user'
    const isSuccess = await addBookmarkItem(
      quoteId,
      `/quotes/authors/${item.author}/${quoteId}`+type,
    )
    isSuccess && setIsUpdate(true)
  }

  const onClickStylerPageSwitch = () => {
    if (!item) return
    const { quote_id:quoteId } = item
    pageSwitch(router, quoteId)
    quotesSelector(item)
  }

  return (
    <>
      <article className="sm:text-[1.05em] text-[0.95em] flex items-start  w-full text-white ">
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
          className="flex items-center hover:bg-[tomato] mt-[0.25em] hover:text-[white] rounded-[0.3em] p-[5px] "
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
