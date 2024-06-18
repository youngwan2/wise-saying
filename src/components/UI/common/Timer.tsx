'use client'

import { useCallback, useEffect, useState } from 'react'

import { requestNewAccessToken } from '@/services/user/post'
import { getLoginExp, setLoginExp } from '@/utils/session-storage'

import { HiRefresh } from 'react-icons/hi'
import { HiClock } from 'react-icons/hi2'



const MINUTE_TO_SEC = 60

export default function Timer() {

  const [timeScale, setTimeScale] = useState(0)
  const [isExpire, setIsExpire] = useState(false)

  /** 토큰 만료 시간 측정 */
  const checkTokenExp = useCallback(async (exp: number | false | undefined) => {
    if (typeof exp !== 'number') return

    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간
    const expired60SecondsAgo = exp - (currentTime - MINUTE_TO_SEC) //  현재(sec) - 60(sec) = 1분 전 토큰 만료

    setTimeScale(Number(expired60SecondsAgo)) // 만료 시간 추적
    if (expired60SecondsAgo < 1) setIsExpire(true)

  }, [])

  /** 토큰 갱신 */
  async function updateToken( isExpire: boolean) {
    if (isExpire) {
      const {isSuccess} = await requestNewAccessToken()

      // 토큰 갱신 성공 시
      if (isSuccess) setIsExpire(false); 
    }
  }

  useEffect(() => {
    const update = async () => await updateToken( isExpire)
    update()
  }, [isExpire])



  /** 토큰 강제 갱신을 위한 만료 상태 설정 */
  function handleSetIsExpire() {
    setIsExpire(true)
  }

  useEffect(() => {
    const exp = getLoginExp()
    const timeId = setInterval(() => checkTokenExp(exp), 1000)
    return () => {
      clearTimeout(timeId)
    }
  }, [checkTokenExp,isExpire])




  return (
    <article className="fixed flex items-start flex-col justify-start right-[2em] top-[3em] text-white bg-[#00000039] rounded-[10px] p-[8px] font-sans text-[0.95em] ">
      <div title={`재로그인 까지 ${timeScale}초, 윈도우창 바깥으로 포커스 후 다시 접속하면 자동으로 로그인 상태를 갱신 `} className='flex items-center'><HiClock className='mr-[1.8px] mt-1' />{timeScale}</div>
      <button title={'수동으로 로그인 상태 갱신'} className='hover:text-[rgba(255,255,255,0.6)] flex items-center' onClick={handleSetIsExpire}>
        <HiRefresh className='mr-[1px]' />갱신
      </button>
    </article>
  )
}


