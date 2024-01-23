'use client'

import { useMypageTapsStore } from '@/store/store'
import MypageProfileForm from '../form/MypageProfileForm'
import useHasToken from '@/custom/useHasToken'
import useSWR from 'swr'
import MypageMyQuoteList from '../list/MypageMyQuoteList'
import { useState } from 'react'
import ReplaceMessageCard from '../card/ReplaceMessageCard'
import { getUserInfoFromDb, getUserQuotesFromDb } from '@/api/user/get'

export default function MypageContainer() {
  const tapId = useMypageTapsStore((state) => state.tapId)
  const hasToken = useHasToken()
  const [page, setPage] = useState(0)

  const token = (hasToken && localStorage.getItem('token')) || ''

  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR(
    ['/api/users/', token],
    ([url, token]) => getUserInfoFromDb(url, token),
    { refreshInterval: 5000 },
  )

  const { data: userQuotesInfo } = useSWR(
    () =>
      tapId === 1
        ? '/api/users/mypage/posts/?userId=' +
          userInfo.user_id +
          '&page=' +
          page
        : null,
    getUserQuotesFromDb,
  )

  if (isLoading && !userInfo)
    return (
      <ReplaceMessageCard
        childern={'게시글을 불러오는 중입니다. 잠시만 기다려주세요.'}
      />
    )
  if (error)
    return (
      <ReplaceMessageCard
        childern={'게시글 조회에 실패하였습니다. 나중에 다시 시도 해주세요.'}
      />
    )
  return (
    <>
      {tapId === 0 && <MypageProfileForm userInfo={userInfo} />}
      {tapId === 1 && (
        <MypageMyQuoteList
          userQuotes={userQuotesInfo?.userInfo}
          setPage={setPage}
          page={page}
          count={userQuotesInfo?.count}
        />
      )}
    </>
  )
}
