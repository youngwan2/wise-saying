import { Fragment, useCallback, useEffect, useState } from 'react'

import MypageMyQuotesCategoryList from './list/MypageMyQuotesCategoryList'
import MypageMyQuotesList from './list/MypageMyQuotesList'
import Pagination from '../common/Pagination'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'

import { HiRefresh } from 'react-icons/hi'
import { UserQuotesType } from '@/types/items.types'
import ControlButton from '../common/button/ControlButton'
import Container from '../common/container/Container'

interface PropsType {
  page: number
  setPage: (p: number) => void
  userQuotes: UserQuotesType[]
  count: number
  onClickQuoteUpdate: () => void
}



const MAX_SIZE = 5

export default function MypageMyQuote({
  userQuotes,
  setPage,
  page,
  count,
  onClickQuoteUpdate
}: PropsType) {
  const [categories, setCategories] = useState<string[]>([''])
  const [selectedMyQuotes, setSelectedMyQuotes] = useState<UserQuotesType[]>([])

  // 명언 필터
  const onClickQuotesFilter = (category: string = 'all') => {
    const result = userQuotes.filter((userQuote) => {
      if (category === 'all') return userQuote
      return userQuote.category === category
    })
    setSelectedMyQuotes(result)
  }

  // 명언 카테고리를 필터해서 카테고리 목록을 상태에 저장
  const categoryCreator = useCallback(() => {
    const tempCategories: string[] = []
    userQuotes?.forEach((item) => tempCategories.push(item.category))
    const dedupeCategories = [...new Set(tempCategories)]
    setCategories(dedupeCategories)
  }, [userQuotes])

  const [limit, setLimit] = useState(0)
  const [firstPage, setFirstPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)
  const [_, setPageGroup] = useState(1)

  const [pageList, setPageList] = useState<number[]>([])

  // 페이지네이션 렌더러
  const render = useCallback(() => {
    const pageList: number[] = []
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i)
    }
    setPageList(pageList)
  }, [firstPage, lastPage])

  // 상태 업데이트 함수
  const updateState = (pageInfo: { [key: string]: number }) => {
    const { pageGroup, limit, firstPage, lastPage } = pageInfo
    setPageGroup(pageGroup)
    setLimit(limit)
    setFirstPage(firstPage)
    setLastPage(lastPage)
  }

  // 페이지 네이션 상태 초기 셋팅
  useEffect(() => {
    // 페이지 그룹 구하기
    const pageGroup = Math.ceil((page + 1) / MAX_SIZE)
    // 페이지 렌더링 제한 값 구하기
    const limit = Math.ceil(count / MAX_SIZE)
    // 마지막 페이지 구하기
    const lastPage = pageGroup * MAX_SIZE
    // 첫 페이지 구하기
    const firstPage = lastPage - (MAX_SIZE - 1)

    // 필요한 경우에만 렌더링 함수 호출
    if (
      page !== lastPage ||
      count !== limit ||
      firstPage !== lastPage - (MAX_SIZE - 1) ||
      pageGroup !== Math.ceil((page + 1) / MAX_SIZE)
    ) {
      updateState({ pageGroup, limit, lastPage, firstPage })
      render()
    }
  }, [page, count, lastPage, render])

  useEffect(() => {
    categoryCreator()
  }, [categoryCreator])

  if (!userQuotes)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." />
  if (userQuotes.length < 1) return <ReplaceMessageCard childern='데이터가 존재하지 않습니다.' />
  return (
    <Container elementName={Fragment}>
      <MypageMyQuotesCategoryList
        categories={categories}
        onClickCategoryFilter={onClickQuotesFilter}
      />

      <ControlButton
        ariaLabel='목록 갱신 버튼'
        className='absolute border p-[5px] text-white right-[5%]'
        onClick={onClickQuoteUpdate}>
        <HiRefresh />
      </ControlButton>

      <MypageMyQuotesList
        userQuotes={userQuotes}
        selectedMyQuotes={selectedMyQuotes}
      />
      <Pagination
        limit={limit}
        pageList={pageList}
        page={page}
        setPage={setPage}
      />
    </Container>
  )
}
