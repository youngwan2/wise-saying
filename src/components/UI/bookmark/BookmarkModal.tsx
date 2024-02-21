'use client'
import useSWR from 'swr'
import { getBookmarkListFetcher } from '@/services/data/get'
import { useBookmarkStore } from '@/store/store'

import { useCallback, useEffect, useState } from 'react'
import { HiBookmarkSquare } from 'react-icons/hi2'

import BookmarkCloseButton from './BookmarkCloseButton'
import BookmarkPagination from './BookmarkPagination'
import BookmarkList from './BookmarkList'

export interface BookmarkListType {
  id: number
  author: string
  quote: string
  url: string
}

interface BookmarkInfoType { totalCount: number; bookmarks: BookmarkListType[] }

const MIN_BOOKLIST_COUNT = 1

export default function BookmarkModal() {
  const { toggleState, bookmarkList, setBookmarkList, setListCount } =
    useBookmark()
  const [page, setPage] = useState(0)

  const bookmarkListLength = bookmarkList?.length || 0

  // SWR | 북마크 리스트 불러온다.
  const { data: bookmarkInfo, isLoading, mutate } = useSWR(
    [`/api/bookmark?page=${page}&limit=5`],
    getBookmarkListFetcher,
    {
      refreshInterval: 10000,
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      onErrorRetry: ({ retryCount }) => {
        if (retryCount >= 5) return
      },
    },
  )
  const hasData = !!bookmarkInfo
  const total = bookmarkInfo?.totalCount || 0
  const currentTotal = bookmarkInfo?.bookmarks.length || 0
  const maxPage = Math.ceil(total / 5) || 1

  // 북마크 리스트를 갱신하는 함수
  const bookmarkListUpdate = useCallback(
    (
      bookmarkInfo: BookmarkInfoType,
    ) => {
      const { totalCount, bookmarks } = bookmarkInfo
      setBookmarkList(bookmarks)
      setListCount(totalCount)
    },
    [setListCount, setBookmarkList],
  )

  useEffect(() => {
    if (!hasData) return
    
    bookmarkListUpdate(bookmarkInfo)
  }, [bookmarkListUpdate, bookmarkInfo, hasData])

  if (!toggleState) return <></>
  return (
    <article
      aria-hidden={!toggleState}
      className={
        'z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] block'
      }
    >

      <ModalTitle total={total} />
      <BookmarkCloseButton />
      <AlertMessage bookmarkListLength={bookmarkListLength} />
      <BookmarkList bookmarkList={bookmarkList} isLoading={isLoading} page={page} mutate={mutate} />
      <BookmarkPagination
        maxPageSize={maxPage}
        page={page}
        currentTotal={currentTotal}
        onClickPrevSwitch={() => setPage(Math.max(0, page - 1))}
        onClickNextSwitch={() => setPage(Math.min(maxPage, page + 1))}
      />
    </article>
  )
}


// Child : 모달 제목
function ModalTitle({ total }: { total: number }) {
  return (
    <h2 className="text-white text-[2em] mb-[1em] pl-[10px] flex items-center justify-center mt-[2em]">
      <HiBookmarkSquare className="pr-[5px]" /> 북마크 리스트({total})
    </h2>
  )
}


// Child : 알림창
function AlertMessage({ bookmarkListLength }: { bookmarkListLength: number }) {
  return (
    <>
      {
        bookmarkListLength < MIN_BOOKLIST_COUNT
          ? (
            <p className='text-white text-[1.3em] text-center mt-[2em]'> 조회 결과가 존재하지 않습니다.</p>)
          : null
      }
    </>
  )
}


/**
 * HOOK | bookmark 관련 전역 상태를 반환하는 훅
 */
const useBookmark = () => {
  const toggleState = useBookmarkStore((state) => state.toggleState) // 모달창 온오프 여부
  const setBookmarkList = useBookmarkStore((state) => state.setBookmarkList)
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
  const setListCount = useBookmarkStore((state) => state.setListCount)

  return { toggleState, bookmarkList, setBookmarkList, setListCount }
}
