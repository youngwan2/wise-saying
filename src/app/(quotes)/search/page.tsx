'use client'


import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import SearchResultAll from '@/components/UI/search/SearchResultAll'
import SearchResultContainer from '@/components/UI/search/container/SearchResultContainer'
import SearchTapButtons from '@/components/UI/search/SearchTapButtons'

import { HiSearch } from 'react-icons/hi'

import { QuoteType } from '@/types/items.types'
import { toast } from 'react-toastify'

interface TotalCountsType {
  byAuthorCount: number
  byKeywordCount: number
}

export default function SearchPage() {
  const searchText = useSearchParams().get('searchText') || ''
  const type = useSearchParams().get('type') || ''

  const [isSearch, setIsSearch] = useState(false)
  // memo : any 타입은 임시적으로 지정해둔 것으로 향후 수정할 것
  const [items, setItems] = useState<any>('')

  const router = useRouter()

  const onClickSetResultType = (e: MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset
    if (!type) return toast.error('알 수 없는 문제로 요청이 전달되지 않았습니다. 해당 문제가 계속 발생하는 경우, 구글폼을 통해서 신고해주세요.')
    router.push(`/search?type=${type}&searchText=${searchText}`)
  }

  /**
   * * 전체, 인물별, 키워드 각 탭(타입) 별로 데이터를 처리하여 상태에 저장하는 함수
   * @param items 인물별 && 키워드별 검색 전체 결과가 담긴 배열
   * @param totalCounts 인물별 AND 키워드별 전체 검색 결과 항목 수를 저장하고 있는 객체
   * @param totalCount 인물별 OR 키워드별 개별 검색 결과 항목 수를 저장하고 있는 객체
   */
  const sortByType = useCallback(
    (
      type: string,
      items: QuoteType[],
      totalCounts: TotalCountsType,
      totalCount: number,
    ) => {
      switch (type) {
        // 전체 검색 결과에 검색된 항목수를 결합
        case 'all': {
          setItems({ ...items, ...totalCounts })
          break
        }
        // 개별 검색 결과에 검색된 항목수를 결합
        case 'keyword':
        case 'author': {
          setItems({ quotes: items, totalCount })
        }
      }
    },
    [],
  )


  const getSearchDataFromDb = useCallback(
    async (type: string | null, searchText: string | null) => {
      if (!(type && searchText)) return

      const url = `/api/quotes/search?type=${type}&searchText=${searchText}`

      try {
        const response = await fetch(url)
        const { status, items, totalCounts, totalCount } = await response.json()

        if (status !== 200) throw new Error('요청 처리에 문제가 발생하였습니다.')
        sortByType(type, items, totalCounts, totalCount)
      } catch (error) {
        console.error('검색 요청 실패:', error)
      }
    },
    [sortByType],
  )

  useEffect(() => {
    setIsSearch(true)
    if (isSearch) getSearchDataFromDb(type, searchText)

    return () => {
      setIsSearch(false)
    }
  }, [isSearch, type, searchText, getSearchDataFromDb])

  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px] font-sans  text-center text-white max-w-[280px] mx-auto  border-b-[2px] mt-[4em] mb-[3em] ">
        검색 결과
        <br />
      </h2>
      <div className="flex max-w-[600px] h-[100px] justify-center mx-auto items-center bg-white px-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] rounded-[10px] ">
        <HiSearch className="max-w-[10%] w-full text-[2.5em]" />
        <p className="text-[2em] max-w-[60%] w-full border-b-[2px] border-blue-950 text-center">
          {searchText}
        </p>
      </div>

      <SearchTapButtons onClick={onClickSetResultType} />

      {type === 'all' ? <SearchResultAll items={items} /> : null}
      {type === 'author' ? <SearchResultContainer key="author" title='인물별' items={items} /> : null}
      {type === 'keyword' ? <SearchResultContainer key="keyword" title='키워드별' items={items} /> : null}
    </>
  )
}
