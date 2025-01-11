import { Fragment, useCallback, useEffect, useState } from 'react'

import MypageMyQuotesList from './list/MypageMyQuotesList'
import Pagination from '../common/Pagination'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import ControlButton from '../common/button/ControlButton'
import Container from '../common/container/Container'

import { toast } from 'react-toastify'
import { HiRefresh } from 'react-icons/hi'
import { UserQuotesType } from '@/types/quote.types'
import { useFetchUserMypageQuotesQuery } from '@/custom/swr/useFetchQuote'
import { usePagination } from '@/custom/usePagination'

interface PropsType {
  page: number
  setPage: (p: number) => void
  isRequest: boolean
}

const maxSize = 5

export default function MypageMyQuote({
  setPage,
  page,
  isRequest
}: PropsType) {

  // 유저 명언 목록
  const { data, mutate } = useFetchUserMypageQuotesQuery(page)

  const userQuotes: UserQuotesType[] = data?.quotes || []
  const count = data?.count || []

  async function onClickQuoteUpdate() {
    const data = await mutate()
    toast.info(`현재 총 ${data.count} 개의 목록이 갱신되었습니다.`)
  }

  // 페이지네이션 상태
  const { pageList, limit, firstPage, lastPage } = usePagination({ page, maxSize, totalCount: count })



  if (!userQuotes)
    return <ReplaceMessageCard>데이터를 불러오는 중입니다.</ReplaceMessageCard>
  if (userQuotes.length < 1) return <p className='min-h-[30vh] text-center mt-[8em] text-white'>현재 작성하신 명언정보가 없습니다.</p>
  return (
    <Container elementName={Fragment}>
      <ControlButton
        ariaLabel='목록 갱신 버튼'
        className='border border-[rgba(255,255,255,0.2)] rounded-md p-[5px] text-white relative left-[50%] translate-x-[-50%] flex items-center justify-between'
        onClick={onClickQuoteUpdate}>
        <HiRefresh /><span className='left-8'>갱신하기</span>
      </ControlButton>

      <MypageMyQuotesList
        userQuotes={userQuotes}
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
