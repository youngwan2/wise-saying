'use client'

import { useState } from 'react'
import { useMypageTapsStore } from '@/store/store'
import { useSwrFetchWithToken } from '@/utils/swr'
import useHasToken from '@/custom/useHasToken'

import MypageProfileForm from './form/MypageProfileForm'
import MypageUserInfoForm from './form/MypageUserInfoForm'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import MypageMyQuote from './MypageMyQuote'

import { toast } from 'react-toastify'

export default function MypageMain() {
  const tapId = useMypageTapsStore((state) => state.tapId)
  const [page, setPage] = useState(0)
  const hasToken = useHasToken()

  const hasLogin = !hasToken

  // 유저 정보
  const { data, isLoading, error } = useSwrFetchWithToken('/api/users/', true)
  const { userInfo } = data || {}

  const isReuest = (hasToken) && tapId === 1

  if (hasLogin) return <ReplaceMessageCard childern='로그인 후 이용 가능합니다.' isFull /> 
  if (isLoading) return <ReplaceMessageCard childern='유저 정보를 불러오는 중입니다.' />
  return (
    <article className='border-[1px] border-[rgba(255,255,255,0.1)] w-full'>
      {!userInfo && <ReplaceMessageCard childern='조회할 데이터가 없습니다.' />}
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
