'use client'

import { useState } from 'react'
import { useMypageTapsStore } from '@/store/store'
import { useSwrFetchWithToken } from '@/utils/swr'
import useHasToken from '@/custom/useHasToken'

import MypageProfileForm from './form/MypageProfileForm'
import MypageUserInfoForm from './form/MypageUserInfoForm'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import MypageMyQuote from './MypageMyQuote'

export default function MypageMain() {
  const tapId = useMypageTapsStore((state) => state.tapId)
  const [page, setPage] = useState(0)
  const hasToken = useHasToken()

  const hasLogin = !hasToken

  // 유저 정보
  const { data, isLoading } = useSwrFetchWithToken('/api/users/', true)
  const { userInfo } = data || {}

  const isReuest = (hasToken) && tapId === 1

  if (hasLogin) return <ReplaceMessageCard isFull>로그인 후 이용 가능합니다.</ReplaceMessageCard>
  if (isLoading) return <ReplaceMessageCard>유저 정보를 불러오는 중입니다.</ReplaceMessageCard>
  return (
    <article className='w-full relative'>
      {!userInfo && <ReplaceMessageCard>조회할 데이터가 없습니다</ReplaceMessageCard>}
      {tapId === 0 && (
        <MypageProfileForm userInfo={userInfo} />
      )}

      {tapId === 1 && (
        <MypageMyQuote
          setPage={setPage}
          page={page}
          userInfo={userInfo}
          isRequest={isReuest}

        />
      )}
      {tapId === 2 && (
        <MypageUserInfoForm userInfo={userInfo} />
      )}
    </article>
  )
}
