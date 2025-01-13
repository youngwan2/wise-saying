import { Fragment } from 'react'
import MypageMyQuotesList from './list/MypageMyQuotesList'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import ControlButton from '../common/button/ControlButton'
import Container from '../common/container/Container'
import { Pagination } from "@nextui-org/pagination";

import { toast } from 'react-toastify'
import { HiRefresh } from 'react-icons/hi'
import { UserQuotesType } from '@/types/quote.types'
import { useFetchUserMypageQuotesQuery } from '@/custom/swr/useFetchQuote'

interface PropsType {
  page: number
  setPage: (p: number) => void
  isRequest: boolean
}

const perRecord = 5

export default function MypageMyQuote({
  setPage,
  page,
  isRequest
}: PropsType) {

  // 유저 명언 목록
  const { data, mutate, isLoading } = useFetchUserMypageQuotesQuery(page, isRequest)

  console.log(data, isRequest)

  const userQuotes: UserQuotesType[] = data?.quotes || []
  const totalRecord = data?.count || []
  const totalPage = Math.ceil(totalRecord/perRecord)

  async function onClickQuoteUpdate() {
    const data = await mutate()
    toast.info(`현재 총 ${data.count} 개의 목록이 갱신되었습니다.`)
  }


  if (isLoading)
    return <ReplaceMessageCard>데이터를 불러오는 중입니다.</ReplaceMessageCard>
  if (userQuotes.length < 1) return
  return (
    <Container elementName={Fragment}>
      <ControlButton
        ariaLabel='목록 갱신 버튼'
        className='border border-[rgba(255,255,255,0.2)] rounded-md p-[5px] text-white relative left-[50%] translate-x-[-50%] flex items-center justify-between'
        onClick={onClickQuoteUpdate}>
        <HiRefresh /><span className='left-8'>갱신하기</span>
      </ControlButton>
      {userQuotes.length < 1
        ? <p className='min-h-[30vh] text-center mt-[8em] text-white'>현재 작성하신 명언정보가 없습니다.</p>
        : <MypageMyQuotesList userQuotes={userQuotes} />

      }

      <Pagination total={totalPage} initialPage={page} onChange={setPage} className='justify-center w-full flex mt-3' />
    </Container>
  )
}
