'use client'

import { useMypageTapsStore } from '@/store/store'
import MypageProfileForm from './MypageProfileForm'
import useHasToken from '@/custom/useHasToken'
import useSWR from 'swr'
import MypageMyQuotesList from './MypageUserQuotesList'
import { useState } from 'react'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { getUserInfoFromDb, getUserQuotesFromDb } from '@/services/user/get'
import MypageUserInfoForm from './MypageUserInfoForm'

export default function MypageContainer() {
  const tapId = useMypageTapsStore((state) => state.tapId)
  const hasToken = useHasToken()
  const [page, setPage] = useState(0)

  const token = (hasToken && localStorage.getItem('token')) || ''

  // 유저 정보
  const { data: userInfo, error } = useSWR(
    ['/api/users/', token],
    ([url, token]) => getUserInfoFromDb(url, token),
  )

  // 유저 명언 목록
  const { data: userQuotesInfo } = useSWR(
    () =>
      tapId === 1
        ? '/api/users/mypage/posts?userId=' + userInfo.user_id + '&page=' + page
        : null,
    getUserQuotesFromDb,
  )

  if (!hasToken)
    return <ReplaceMessageCard childern="로그인 후 이용해주세요." />
  if (!userInfo)
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
        <MypageMyQuotesList
          userQuotes={userQuotesInfo?.userInfo}
          setPage={setPage}
          page={page}
          count={userQuotesInfo?.count}
        />
      )}
      {tapId === 2 && <MypageUserInfoForm userInfo={userInfo} />}
    </>
  )
}
