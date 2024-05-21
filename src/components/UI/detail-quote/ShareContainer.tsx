'use client'

import { useState } from 'react'

import ShareModal from './ShareModal'
import ControlButton from '../common/button/ControlButton'

import { HiShare } from 'react-icons/hi2'

export default function ShareContainer() {
  const [isDisplay, setIsDisplay] = useState(false)

  function handleDisplay() {
    setIsDisplay(old => !old)
  }
  return (
    <>
      <ControlButton
        className="sm:text-[1.05em] text-[0.95em] hover:bg-[tomato] min-w-[60px] my-[2px] py-[5px] mx-auto rounded-[5px]  flex items-center text-white justify-center"
        onClick={handleDisplay}
        ariaLabel='공유 버튼'
      >
        <HiShare className="mr-[0.5em]" />
        공유
      </ControlButton>
      <ShareModal isShow={isDisplay} onClickShowModal={() => setIsDisplay(old => !old)} />
    </>
  )
}
