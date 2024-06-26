'use client'

import { useEffect, useState } from 'react'
import useHasToken from '@/custom/useHasToken'
import { useRouter } from 'next/navigation'

import ReplaceMessageCard from '../../common/card/ReplaceMessageCard'
import ButtonContainer from '../../common/container/ButtonContainer'
import ControlButton from '../../common/button/ControlButton'

import { logoutUser } from '@/utils/common-func'

export default function LogoutGuideModal() {
  const {push} = useRouter()
  const hasToken = useHasToken()
  const [nickname, setNickname] = useState('')

  function onClickLogout() {
    logoutUser()
  }

  function onClickRedirectToHome() {
    push('/')

  }

  useEffect(() => {
    if (sessionStorage.getItem('user') === null) return push('/')
    const profile = sessionStorage.getItem('user') as string
    const user = JSON.parse(profile)
    const nickname = user.profile.nickname || '무명의 창작자'
    setNickname(nickname)
  }, [push])

  if (!hasToken) return <ReplaceMessageCard childern='로그아웃 처리 중입니다.' />
  if (hasToken) {
    return (
      <>
        <ButtonContainer elementName='article' className='bg-[#ffffff1f] w-[330px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center rounded-[5px]'>
          <p className=" text-white p-[20px] rounded-[5px]">
            <strong>{nickname}</strong> 님! <br />
            좋은 시간 되셨나요?! 로그아웃 하시려면 아래 버튼을 클릭해주세요.
          </p>
          <ControlButton
            ariaLabel='홈 이동 버튼'
            className="border text-[white] m-[5px] p-[10px] rounded-[5px] my-[1em] hover:font-bold"
            onClick={onClickRedirectToHome}
          >
            홈으로
          </ControlButton>
          <ControlButton
            ariaLabel='로그아웃 버튼'
            className="border text-[white] p-[10px] rounded-[5px] my-[1em]  hover:font-bold"
            onClick={onClickLogout}
          >
            로그아웃
          </ControlButton>
        </ButtonContainer>
      </>
    )
  }
}
