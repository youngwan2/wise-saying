'use client'

import { Method, defaultConfig, getDefaultConfig } from '@/configs/config.api'
import { postLike } from '@/services/user/post'
import { defaultFetch } from '@/utils/fetcher'
import { getAccessToken } from '@/utils/sessionStorage'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiHeart } from 'react-icons/hi2'

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
    <article  className="absolute bottom-3 left-[43%] transform-x-[-50%] hover:shadow-[0_0_15px_3px_tomato] rounded-[10px] transition-shadow ">
      <button
      aria-label='해당 명언에 대한 좋아요 클릭'
        onClick={onClickHandleLikeClick}
        className="text-[1.2em] flex items-center px-[15px] rounded-[10px] relative bg-[#fa5669]"
      >
        <HiHeart />
        <span className="mx-[2px]">
          {showLikeCountQuoteIdMatch ? likeCount : 0}
        </span>
        <span className="border-b-[5px] border-l-[10px] border-r-[10px] border-transparent border-t-[10px] border-t-[#fa5669] bottom-[-0.8em] left-[50%] translate-x-[-50%] absolute"></span>
      </button>
    </article>
  )
}
