'use client'
import { HiOutlineMenu } from 'react-icons/hi'
import { useNavDisplayStateStore } from '@/store/store'
import { HiOutlineXCircle } from 'react-icons/hi2'
import ControlButton from '../../common/button/ControlButton'

export default function HeaderNavButton() {

  const { isDisplay,setIsDisplay} = useNavDisplayStateStore()
  return (
    <ControlButton
      ariaLabel="상단 메뉴 아이콘"
      onClick={() => { setIsDisplay(!isDisplay)}}
      className={
        'sm:text-[1.5em] sm:p-[10px] text-[1.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)] p-[8px] mt-[0.25em]'
      }
    >
      {isDisplay ? (
        <HiOutlineXCircle color="white" />
      ) : (
        <HiOutlineMenu color="white" />
      )}
    </ControlButton>
  )
}
