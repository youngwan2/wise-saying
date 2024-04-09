'use client'

import { Method, getDefaultConfig } from '@/configs/config.api'
import useHasToken from '@/custom/useHasToken'
import { postLike } from '@/services/user/post'
import { defaultFetch } from '@/utils/fetcher'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import {toast} from 'react-toastify'

interface PropsType {
  id: string
  textColor:string
}

export default function QuoteLikeBox({ id, textColor }: PropsType) {
  const [likeCount, setLikeCount] = useState(0)
  const [quoteId, setQuoteId] = useState(0)

  const hasToken = useHasToken()
  const { data: session } = useSession()

  const onClickHandleLikeClick = async () => {
    if (!hasToken && !session) return toast.error('로그인 후 이용 가능 합니다.')
    const { isSuccess, likeCount } = (await postLike(Number(id))) || {
      isSuccess: false,
      count: 0,
    }

    if (isSuccess) {
      setLikeCount(likeCount)
      setQuoteId(quoteId)
    }
  }

  const getLikeCountFormDB = useCallback(async () => {
    const url = '/api/quotes/' + id + '/like'
    const config = getDefaultConfig(Method.GET, false)
    const { results } = await defaultFetch(url, config)
    const { likeCount, quoteId } = results || { likeCount: 0, quoteId: 0 }
    setLikeCount(likeCount)
    setQuoteId(quoteId)
  }, [id])

  const showLikeCountQuoteIdMatch = Number(quoteId) === Number(id)

  useEffect(() => {
    getLikeCountFormDB()
  }, [getLikeCountFormDB])

  return (
    <button
      aria-label="해당 명언에 대한 좋아요 클릭"
      onClick={onClickHandleLikeClick}
      className={`${textColor} text-white  rounded-[2px] max-w-[120px] mt-[8px]  transition-shadow  text-[1.15em] flex justify-center p-[5px] text-center shadow-[inset_0_0_2px_0_white,inset_-1px_-1px_5px_0_rgba(255,255,255,0.06)] relative left-[50%] translate-x-[-50%] hover:bg-[#e5e4e411] `}
    >
      <p>명언</p>
      <span className="mx-[2px]">
        ({showLikeCountQuoteIdMatch ? likeCount : 0})
      </span>
    </button>
  )
}
