'use client'

import { Method, getDefaultConfig } from '@/configs/config.api'
import useHasToken from '@/custom/useHasToken'
import { postLike } from '@/services/user/post'
import { defaultFetch } from '@/utils/fetcher'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiHandThumbUp } from 'react-icons/hi2'

interface PropsType {
  id: string
}

export default function QuoteLikeBox({ id }: PropsType) {
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
      className={`bg-[white] right-2 sm:top-[15%] top-[13%]  transition-shadow  text-[1.2em] flex items-center px-[15px] shadow-[inset_0_0_2px_0_black] rounded-r-[5px] absolute `}
    >
      <HiHandThumbUp color="rgba(255,0,0,0.7)" />
      <span className="mx-[2px]">
        {showLikeCountQuoteIdMatch ? likeCount : 0}
      </span>
    </button>
  )
}
