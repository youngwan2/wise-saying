'use client'
import useHasToken from '@/custom/useHasToken'
import { logoutUser } from '@/utils/common-func'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Overlay from '../common/Overlay'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { useSession } from 'next-auth/react'

export default function Logout() {
  const router = useRouter()
  const hasToken = useHasToken()
  const {data:session} = useSession()
  const [nickname, setNickname] = useState('')


  useEffect(() => {
    if (sessionStorage.getItem('user') === null) return router.push('/')
    const profile = sessionStorage.getItem('user') as string
    const user = JSON.parse(profile)
    const nickname = user.profile.nickname || '익명의 창작자'
    setNickname(nickname)
  }, [router])

  if (!hasToken && !session) return <ReplaceMessageCard childern='만일 자동으로 이동되지 않고, 해당 알림창이 보인다면 아래 버튼을 이용해주세요.'/>
  if (hasToken) {
    return (
      <>
        <Overlay isDisplay={false} />
        <section className="hover:bg-[#ffffff1f] bg-transparent border w-[280px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center rounded-[5px]">
          <p className=" text-white p-[20px] rounded-[5px]">
            <strong>{nickname}</strong> 님! <br />
            좋은 시간 되셨나요?! 로그아웃 하시려면 아래 버튼을 클릭해주세요.
          </p>
          <button
            className="border text-[white] m-[5px] p-[10px] rounded-[5px] my-[1em]"
            onClick={() => {
              router.push('/')
            }}
          >
            홈으로
          </button>
          <button
            className="border text-[white] p-[10px] rounded-[5px] my-[1em]"
            onClick={() => {
              alert('곧 로그아웃 처리가 완료 됩니다.')
              logoutUser()

            }}
          >
            로그아웃
          </button>
        </section>
      </>
    )
  }
}
