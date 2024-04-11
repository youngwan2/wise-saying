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

export default function MypageContainer() {
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
    return <ReplaceMessageCard childern={'로그인 후 이용해주세요.'} />
  if (!userInfo)
    return (
      <ReplaceMessageCard
        childern={'게시글을 불러오는 중입니다. 잠시만 기다려주세요.'}
      />
    )
    
  async function onClickQuotesUpdate(){
    console.log(11)
    const data = await mutate()
    toast.info(`현재 총 ${data.count} 개의 목록이 갱신되었습니다.`)
  }

  return (
    <>
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
    </>
  )
}
