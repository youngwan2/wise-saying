'use client'

import { useCallback, useEffect, useState } from 'react'
import useHasToken from '@/custom/useHasToken'

import ControlButton from '../../common/button/ControlButton'

import { postLike } from '@/services/user/post'
import { defaultFetch } from '@/utils/fetcher'
import { Method, getDefaultConfig } from '@/configs/config.api'

import { toast } from 'react-toastify'



interface PropsType {
  id: string
  textColor: string
}

export default function QuoteLikeButton({ id, textColor }: PropsType) {
  const [likeCount, setLikeCount] = useState(0)
  const [quoteId, setQuoteId] = useState(0)

  const hasToken = useHasToken()


  function updateLikeCount(results: { likeCount: number, quoteId: number }) {
    const { likeCount = 0, quoteId = 0 } = results || {};
    setLikeCount(likeCount);
    setQuoteId(quoteId);
  }

  const handleLikeClick = async () => {
    if (!hasToken) return toast.error('로그인 후 이용 가능 합니다.')
    const { isSuccess = false, likeCount = 0 } = (await postLike(Number(id))) || {}

    if (isSuccess) updateLikeCount({ likeCount, quoteId })

  }

  /** GET | 현 명언의 좋아요 조회 요청 */
  const getLikeCountFromDB = useCallback(async () => {
    const url = '/api/quotes/' + id + '/like';
    const config = getDefaultConfig(Method.GET, false);
    const { results } = await defaultFetch(url, config);
    updateLikeCount(results);
  }, [id]);

  const showLikeCountQuoteIdMatch = Number(quoteId) === Number(id)

  useEffect(() => {
    getLikeCountFromDB()
  }, [getLikeCountFromDB])

  return (
    <ControlButton
      ariaLabel="해당 명언에 대한 좋아요 클릭"
      onClick={handleLikeClick}
      className={`${textColor} text-white  rounded-[2px] max-w-[120px] mt-[8px]  transition-shadow  text-[1.15em] flex justify-center p-[5px] text-center shadow-[inset_0_0_2px_0_white,inset_-1px_-1px_5px_0_rgba(255,255,255,0.06)] relative left-[50%] translate-x-[-50%] hover:bg-[#e5e4e411] `}
    >
      <p>명언</p>
      <span className="mx-[2px]">
        ({showLikeCountQuoteIdMatch ? likeCount : 0})
      </span>
    </ControlButton>
  )
}
