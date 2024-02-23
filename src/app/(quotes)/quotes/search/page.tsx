'use client'

import SearchResultAll from '@/components/UI/search/SearchResultAll'
import SearchResults from '@/components/UI/search/SearchResults'
import SearchTaps from '@/components/UI/search/SearchTaps'
import { QuoteType } from '@/types/items.types'
import { useRouter, useSearchParams } from 'next/navigation'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'

interface TotalCountsType { byAuthorCount: number, byKeywordCount: number }

export default function SearchPage() {

  const searchText = useSearchParams().get('searchText') || ''
  const type = useSearchParams().get('type') || ''

  const [isSearch, setIsSearch] = useState(false)
  const [items, setItems] = useState<any>('')

  const router = useRouter()

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.dataset.type
    router.push(`/quotes/search?type=${type}&searchText=${searchText}`)
  }


  /**
   * * 전체, 인물별, 키워드 각 탭(타입) 별로 데이터를 처리하여 상태에 저장하는 함수
   * @param items 인물별 && 키워드별 검색 전체 결과가 담긴 배열
   * @param totalCounts 인물별 && 키워드별 검색 전체 결과 항목 수를 저장하고 있는 객체
   * @param totalCount 인물별 || 키워드별 전체 검색 결과 항목 수를 저장하고 있는 객체
   */
  const processByType = useCallback(
    (type: string, items: QuoteType[], totalCounts: TotalCountsType, totalCount: number) => {
      switch (type) {
        case 'all': {
          const mergeItems = { ...items, ...totalCounts }
          setItems(mergeItems)
          break
        }
        case 'keyword':
        case 'author': {
          const mergeItems = { quotes: items, totalCount }
          setItems(mergeItems)
        }
      }
    },
    [],
  )

  const getSearchDataFromDb = useCallback(
    async (type: string | null, searchText: string | null) => {
      if (!(type && searchText)) return

      const url = `/api/quotes/search?type=${type}&searchText=${searchText}`
      const response = await fetch(url)
      const { status, items, totalCounts, totalCount } = await response.json()

      if (status !== 200) throw new Error('요청 처리에 문제가 발생하였습니다.')

      processByType(type, items, totalCounts, totalCount)
    },
    [processByType],
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
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
        검색 결과
        <br />
      </h2>
      <div className="flex max-w-[600px] h-[100px] justify-center mx-auto items-center bg-white px-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] rounded-[10px] ">
        <HiSearch className="max-w-[10%] w-full text-[2.5em]" />
        <p className="text-[2em] max-w-[60%] w-full border-b-[2px] border-blue-950 text-center">
          {searchText}
        </p>
      </div>

      <SearchTaps onClick={onClick} />

      {type === 'all' ? <SearchResultAll items={items} /> : null}
      {type === 'author' ? <SearchResults key='author' items={items} /> : null}
      {type === 'keyword' ? <SearchResults key='keyword' items={items} /> : null}
    </>
  )
}
