'use client'

import { Method, getDefaultConfig } from '@/configs/config.api'
import { postLike } from '@/services/user/post'
import { defaultFetch } from '@/utils/fetcher'
import { getAccessToken } from '@/utils/session-storage'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiHandThumbUp } from 'react-icons/hi2'

interface PropsType {
  id: string
}

const TOKEN = getAccessToken() || ''
export default function QuoteLikeBox({ id }: PropsType) {
  const [likeCount, setLikeCount] = useState(0)
  const [quoteId, setQuoteId] = useState(0)

  const onClickHandleLikeClick = async () => {
    if (TOKEN.length < 2) return toast.error('로그인 후 이용해주세요.')
    const isSuccess = await postLike(Number(id))

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
      className={` bg-[#bfbdbd] bottom-3 left-[43%] transform-x-[-50%]  transition-shadow  text-[1.2em] flex items-center px-[15px] rounded-[10px] absolute `}
    >
      <HiHandThumbUp color="black" />
      <span className="mx-[2px]">
        {showLikeCountQuoteIdMatch ? likeCount : 0}
      </span>
    </button>
  )
}
