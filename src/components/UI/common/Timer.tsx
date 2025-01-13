'use client'

import { useCallback, useEffect, useState } from 'react'

import { getLoginExp, setAccessToken, setLoginExp } from '@/utils/session-storage'

import { HiRefresh } from 'react-icons/hi'
import { HiClock } from 'react-icons/hi2'
import { requestNewAccessToken } from '@/services/user/jwt.service'

const TOKEN_BUFFER_TIME_SEC = 120

/**
 * Timer Component
 * - 사용자 토큰 만료 시간 확인 및 갱신 기능 제공
 * - 실시간으로 남은 시간을 UI에 표시
 * - 수동 갱신 버튼 제공
 */
export default function Timer() {
  const [timeScale, setTimeScale] = useState(0)
  const [isExpire, setIsExpire] = useState(false)

  /** 토큰 만료 시간 측정 */
  const checkTokenExp = useCallback((exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000)
    const expiredBuffer = exp - (currentTime + TOKEN_BUFFER_TIME_SEC)

    setTimeScale(Math.max(0, expiredBuffer))
    if (expiredBuffer < 1) setIsExpire(true)
  }, [])

  /** 토큰 갱신 */
  async function updateToken(isExpire: boolean) {
    if (isExpire) {
      const { accessToken, exp } = await requestNewAccessToken()
      if (accessToken) {
        setAccessToken(accessToken)
        setLoginExp(exp)
        setIsExpire(false)
      } else { console.error("토큰 갱신 실패") }
    }
  }

  useEffect(() => {
    if (isExpire) {
      (async () => {
        await updateToken(isExpire)
      })()
    }
  }, [isExpire])

  /** 토큰 강제 갱신을 위한 만료 상태 설정 */
  function handleSetIsExpire() {
    setIsExpire(true)
  }

  useEffect(() => {
    const exp = getLoginExp() || 0
    const timeId = setInterval(() => checkTokenExp(exp), 1000)
    return () => {
      clearInterval(timeId)
    }
  }, [checkTokenExp, isExpire])

  return (
    <article className="fixed flex items-start flex-col justify-start right-[2em] top-[3.8em] text-white bg-[#00000039] rounded-[10px] p-[8px] font-sans text-[0.85em] z-[1000000000000000000000000000]">
      <div title={`재로그인 까지 ${timeScale}초`} className="flex items-center">
        <HiClock className="mr-[1.8px] mt-1" />
        {timeScale}
      </div>
      <button
        title={'수동으로 로그인 상태 갱신'}
        className="hover:text-[rgba(255,255,255,0.6)] flex items-center"
        onClick={handleSetIsExpire}
      >
        <HiRefresh className="mr-[1px]" />
        갱신
      </button>
    </article>
  )
}
