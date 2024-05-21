'use client'

import { useNavDisplayStateStore } from '@/store/store'

import ButtonContainer from '../../common/container/ButtonContainer'
import ControlButton from '../../common/button/ControlButton'
import { HiXCircle } from 'react-icons/hi2'

export default function HeaderNavCloseButton() {
  const { isDisplay, setIsDisplay } = useNavDisplayStateStore()
  
  return (
    <ButtonContainer elementName='div' className={`${isDisplay
      ? 'visible opacity-100 scale-100'
      : 'invisible opacity-0 scale-0'
      } fixed left-0 top-0 right-0 bottom-0 rounded-[10px] bg-[#0000005c]`}>

      <ControlButton
        ariaLabel='닫기 버튼'
        onClick={() => {
          setIsDisplay(!isDisplay)
        }}
        className="absolute right-[10px] top-[10px] text-[3em] text-[#ededed] hover:border"
      >
        <HiXCircle />
      </ControlButton>
    </ButtonContainer>

  )
}
