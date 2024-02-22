'use client'
import useSWR from 'swr'
import { getBookmarkListFetcher } from '@/services/data/get'
import { useBookmarkStore, useBookmarkUpdate } from '@/store/store'

import { useCallback, useEffect, useState } from 'react'
import { HiBookmarkSquare } from 'react-icons/hi2'

import BookmarkCloseButton from './BookmarkCloseButton'
import BookmarkPagination from './BookmarkPagination'
import BookmarkList from './BookmarkList'
import { deleteBookmark } from '@/services/user/delete'
import toast from 'react-hot-toast'
import useHasToken from '@/custom/useHasToken'

export interface BookmarkListType {
  id: number
  author: string
  quote: string
  url: string
}

const MIN_BOOKLIST_COUNT = 1
export default function BookmarkModal() {

  const [page, setPage] = useState(0)
  const isUpdate = useBookmarkUpdate((state) => state.isUpdate)
  const setIsUpdate = useBookmarkUpdate((state) => state.setIsUpdate)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toggleState, setListCount } = useBookmark()

  const hasToken = useHasToken()


  // SWR | 북마크 리스트 조회
  const { data: bookmarkInfo, isLoading, mutate } = useSWR(
    [`/api/bookmark?page=${page}&limit=5`], getBookmarkListFetcher,
    {
      // refreshInterval: 1000 * 300, // 5분
      revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      onErrorRetry: ({ retryCount }) => {
        if (retryCount >= 5) return
      },
    },
  )


  const hasData = !!bookmarkInfo
  const total = bookmarkInfo?.totalCount || 0
  const bookmarkList = bookmarkInfo?.bookmarks
  const currentListCount = bookmarkInfo?.bookmarks.length || 0
  const maxPage = Math.ceil(total / 5) || 1


  // DELETE | 북마크 삭제
  const onClickDeleteBookmark = async (bookmarkId: number) => {
    if (!hasToken) return toast.error('로그인 후 이용해주세요.')
    setIsDeleting(true)
    const success = await deleteBookmark(bookmarkId)
    if (success) {
      setIsDeleting(false)
      mutate()
    }
  }


  // MEMO : 북마크 갯수를 전역으로 관리하여 아이콘 상단에 표기
  const setBookmarkListCount = useCallback((total: number) => {
    setListCount(total)
  }, [setListCount])


  useEffect(() => {
    if (!hasData) return
    setBookmarkListCount(total)

  }, [setBookmarkListCount, total, hasData])


  
  useEffect(() => {
    if (isUpdate) { mutate().then(() => setIsUpdate(false)) }
  }, [isUpdate, setIsUpdate, mutate])




  if (!toggleState) return <></>
  return (
    <article
      aria-hidden={!toggleState}
      className={'z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] block'}
    >
      <ModalTitle total={total} />
      <BookmarkCloseButton />
      <AlertMessage currentListCount={currentListCount} />
      <BookmarkList bookmarkList={bookmarkList} page={page} isLoading={isLoading} isDeleting={isDeleting} onClickDelete={onClickDeleteBookmark} />
      <BookmarkPagination
        maxPageSize={maxPage}
        page={page}
        currentTotal={currentListCount}
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
function AlertMessage({ currentListCount }: { currentListCount: number }) {
  return (
    <>
      {
        currentListCount < MIN_BOOKLIST_COUNT
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
  const setListCount = useBookmarkStore((state) => state.setListCount)

  return { toggleState, setListCount }
}
