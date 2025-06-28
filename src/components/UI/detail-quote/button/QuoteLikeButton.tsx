'use client'

import { useEffect, useState } from 'react'
import useHasToken from '@/custom/useHasToken'

import ControlButton from '../../common/button/ControlButton'

import { toast } from 'react-toastify'
import { getLikeCountFromDB, updateLikeCount } from '@/services/quotes/like-count.service'



interface PropsType {
  id: string
  textColor: string
}

export default function QuoteLikeButton({ id, textColor }: PropsType) {
  const [count, setLikeCount] = useState(0)
  const [quoteId, setQuoteId] = useState(0)

  const hasToken = useHasToken()

  /** 좋아요 상태 업데이트 */
  function updateLikeCountState(results: { likeCount: number, quoteId: number, success: boolean }) {
    const { likeCount, quoteId, success } = results;
    console.log(count, quoteId, success)
    if (success) {
      setLikeCount(likeCount);
      setQuoteId(quoteId);
    } else {
      toast.error('좋아요 업데이트(조회)에 실패하였습니다.')
    }
  }

  const onLikeClick = async () => {
    if (!hasToken) return toast.info('로그인 후 이용 가능 합니다.')
    const { success, likeCount } = await updateLikeCount(id)
    updateLikeCountState({ success, likeCount, quoteId })

  }

  const showLikeCountQuoteIdMatch = Number(quoteId) === Number(id)

  async function initializeLikeCount() {
    const { success, likeCount, quoteId: resQuoteId } = await getLikeCountFromDB(id)
    updateLikeCountState({ success, likeCount: likeCount || 0, quoteId: resQuoteId || 0 })
  }

  useEffect(() => {
    initializeLikeCount()
  }, [])

  return (
    <ControlButton
      ariaLabel="해당 명언에 대한 좋아요 클릭"
      onClick={onLikeClick}
      className={`${textColor} text-white  rounded-[2px] max-w-[120px] mt-[8px]  transition-shadow  text-[1.15em] flex justify-center p-[5px] text-center shadow-[inset_0_0_2px_0_white,inset_-1px_-1px_5px_0_rgba(255,255,255,0.06)] relative left-[50%] translate-x-[-50%] hover:bg-[#e5e4e411] `}
    >
      <p>명언</p>
      <span className="mx-[2px]">
        ({showLikeCountQuoteIdMatch ? count : 0})
      </span>
    </ControlButton>
  )
}
