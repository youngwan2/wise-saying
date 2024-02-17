'use client'
import useSWR from 'swr'
import { getBookmarkListFetcher } from '@/services/data/get'
import { useBookmarkStore } from '@/store/store'

import { useCallback, useEffect, useState } from 'react'
import { HiBookmarkSquare } from 'react-icons/hi2'

import BookmarkCloseButton from './BookmarkCloseButton'
import BookmarkCard from './BookmarkCard'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import BookmarkSwitchButtons from './BookmarkSwitchButtons'

interface BookmarkListType {
  id: number
  author: string
  quote: string
  url: string
}

const MIN_BOOKLIST_COUNT = 1

export default function BookmarkModal() {

  const { toggleState, bookmarkList, setBookmarkList, setListCount } = useBookmark()
  const [page, setPage] = useState(0)


  // SWR | 북마크 리스트 불러온다.
  const { data: bookmarkInfo, isLoading } = useSWR(
    [`/api/bookmark?page=${page}&limit=5`], getBookmarkListFetcher,
    {
      refreshInterval: 5000,
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      onErrorRetry: ({ retryCount }) => {
        if (retryCount >= 5) return
      }
    },
  )
  const hasData = !!bookmarkInfo
  const total = bookmarkInfo?.totalCount || 0
  const currentTotal = bookmarkInfo?.bookmarks.length || 0
  const maxPage = Math.ceil(total / 5) || 1


  // 북마크 리스트를 갱신하는 함수
  const bookmarkListUpdate = useCallback(
    (
      bookmarkInfo: { totalCount: number; bookmarks: BookmarkListType[] },
      hasData: boolean,
    ) => {
      if (!hasData) return
        const { totalCount, bookmarks } = bookmarkInfo
        setBookmarkList(bookmarks)
        setListCount(totalCount)
    },
    [setListCount, setBookmarkList],
  )

  useEffect(() => {
    bookmarkListUpdate(bookmarkInfo, hasData)
  }, [bookmarkListUpdate, bookmarkInfo, hasData])



  if (!toggleState) return <></>
  return (
    <article
      aria-hidden={!toggleState}
      className={'z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] block'}
    >
      <h2 className="text-white text-[2em] mb-[1em] pl-[10px] flex items-center justify-center mt-[2em]">
        <HiBookmarkSquare className="pr-[5px]" />
        북마크 리스트({total})
      </h2>
      <BookmarkCloseButton />

      {bookmarkList.length < MIN_BOOKLIST_COUNT ? (
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
      <BookmarkSwitchButtons
        maxPageSize={maxPage}
        page={page}
        currentTotal={currentTotal}
        onClickPrevSwitch={() => setPage(Math.max(0, page - 1))}
        onClickNextSwitch={() => setPage(Math.min(maxPage, page + 1))}
      />
    </article>
  )
}

/**
 * HOOK | bookmark 관련 전역 상태를 반환하는 훅
 */
const useBookmark = () => {
  const toggleState = useBookmarkStore((state) => state.toggleState)
  const setBookmarkList = useBookmarkStore((state) => state.setBookmarkList)
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
  const setListCount = useBookmarkStore((state) => state.setListCount)

  return { toggleState, bookmarkList, setBookmarkList, setListCount }
}
