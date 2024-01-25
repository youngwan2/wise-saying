'use client'
import useSWR from 'swr'
import useHasToken from '@/custom/useHasToken'
import { getBookmarkListFormDB } from '@/api/data/get'
import { useBookmarkStore } from '@/store/store'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiBookmarkSquare } from 'react-icons/hi2'
import { logoutUser } from '@/utils/commonFunctions'

import BookmarkCloseButton from '../button/BookmarkCloseButton'
import BookmarkCard from '../card/BookmarkCard'
import ReplaceMessageCard from '../card/ReplaceMessageCard'
import BookmarkSwitchButton from '../button/BookmarkSwitchButton'

interface BookmarkListType {
  id: number
  author: string
  quote: string
  url: string
}

/**
 * TODO: 분리 가능한 부분은 컴포넌트로 분리할 필요가 있어 보임.
 */
export default function BookmarkModal() {
  const toggleState = useBookmarkStore((state) => state.toggleState)
  const setBookmarkList = useBookmarkStore((state) => state.setBookmarkList)
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
  const setListCount = useBookmarkStore((state) => state.setListCount)
  const [page, setPage] = useState(0)
  const hasToken = useHasToken()
  const token = hasToken ? localStorage.getItem('token')! : ''

  const router = useRouter()
  const { data, isLoading, error } = useSWR(
    [`/api/bookmark?page=${page}&limit=5`, token],
    ([url, token]) => getBookmarkListFormDB(url, token),
    {
      refreshInterval:4000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    },
  )
  const hasData = !!data
  const total = data?.totalCount || 0
  const currentTotal = data?.items?.length || 0
  const maxPage = Math.ceil(total / 5) || 1

  // 북마크 리스트를 갱신하는 함수
  const bookmarkListUpdate = useCallback(
    (
      data: { totalCount: number; items: BookmarkListType[] },
      hasData: boolean,
    ) => {
      if (hasData) {
        const { totalCount: count, items } = data
        setBookmarkList(items)
        setListCount(count)
      }
    },
    [setListCount, setBookmarkList],
  )

  useEffect(() => {
    if (data && data.status === 401) {
      router.push('/login')
    }
  }, [router, data])

  useEffect(() => {
    bookmarkListUpdate(data, hasData)
  }, [bookmarkListUpdate, data, hasData])

  return (
    <section
      className={`${
        toggleState
          ? 'z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] block'
          : ' z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] hidden'
      }`}
    >
      <h2 className="text-white text-[2em] mb-[1em] pl-[10px] flex items-center justify-center mt-[2em]">
        <HiBookmarkSquare className="pr-[5px]" />
        북마크 리스트({total})
      </h2>
      <BookmarkCloseButton />

      {!bookmarkList ? (
        <ReplaceMessageCard childern={<p>조회 결과가 존재하지 않습니다.</p>} />
      ) : null}

      {/* 북마크 목록  */}
      <div className="px-[1em] mt-[2em] overflow-y-auto overflow-x-hidden min-h-[400px]  p-[1em] w-[90%] mx-auto flex flex-col justify-center items-center">
        {!isLoading ? (
          bookmarkList?.map((bookmark: BookmarkListType) => {
            return <BookmarkCard bookmark={bookmark} key={bookmark.id} />
          })
        ) : (
          <span>데이터를 가져오는 중입니다.</span>
        )}
      </div>

      {/* 버튼 컨테이너 */}
      <BookmarkSwitchButton
        maxPageSize={maxPage}
        page={page}
        currentTotal={currentTotal}
        onClickPrevSwitch={() => setPage(Math.max(0, page - 1))}
        onClickNextSwitch={() => setPage(Math.min(maxPage, page + 1))}
      />
    </section>
  )
}
