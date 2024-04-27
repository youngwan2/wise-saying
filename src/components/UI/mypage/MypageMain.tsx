'use client'

import { useMypageTapsStore } from '@/store/store'
import MypageProfileForm from './MypageProfileForm'
import { useState } from 'react'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import MypageUserInfoForm from './MypageUserInfoForm'
import { useSwrFetchWithToken } from '@/utils/swr'
import useHasToken from '@/custom/useHasToken'
import MypageMyQuote from './MypageMyQuote'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

export default function MypageMain() {
  const tapId = useMypageTapsStore((state) => state.tapId)
  const [page, setPage] = useState(0)
  const hasToken = useHasToken()
  const { data: session } = useSession()

  const hasLogin = !hasToken && !session

  // 유저 정보
  const { data } = useSwrFetchWithToken('/api/users/', true)
  const { userInfo } = data || {}

  // 유저 명언 목록
  const url =
    (hasToken || session) && tapId === 1
      ? '/api/users/mypage/posts?userId=' + userInfo.user_id + '&page=' + page
      : null

  const { data: userQuotesAndCount, mutate } = useSwrFetchWithToken(url, false)
  const { quotes: userQuotes, count: quotesCount } = userQuotesAndCount || {}

  if (hasLogin)
    return <ReplaceMessageCard childern={'로그인 후 이용해주세요.'} isFull/>

  async function onClickQuotesUpdate() {
    const data = await mutate()
    toast.info(`현재 총 ${data.count} 개의 목록이 갱신되었습니다.`)
  }

  return (
    <article className='border-[1px] border-[rgba(255,255,255,0.1)] w-full'>
      {!userInfo && <ReplaceMessageCard childern='조회할 데이터가 없습니다.' />}
      {tapId === 0 && (
        <MypageProfileForm userInfo={userInfo} session={session} />
      )}

      {tapId === 1 && (
        <MypageMyQuote
          userQuotes={userQuotes}
          setPage={setPage}
          page={page}
          onClickQuoteUpdate={onClickQuotesUpdate}
          count={quotesCount}
        />
      )}
      {tapId === 2 && (
        <MypageUserInfoForm userInfo={userInfo} session={session} />
      )}
    </article>
  )
}
