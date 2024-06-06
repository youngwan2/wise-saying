'use client'

import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'

import ControlButton from '../../common/button/ControlButton'

import { HiPower } from 'react-icons/hi2'

export default function LogoutButton() {
  const router = useRouter()
  const hasToken = useHasToken()


    function handleLogout(){
      router.push('/logout')
    }


  if (!hasToken) return <></>
  return (
    <ControlButton
      ariaLabel="로그아웃 아이콘"
      onClick={handleLogout}
      className="sm:text-[1.5em] text-[1.25em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]"
    >
      <HiPower />
    </ControlButton>
  )
}
