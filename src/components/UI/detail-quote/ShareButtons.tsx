'use client'


import { HiShare } from 'react-icons/hi2'
import { useState } from 'react'
import ShareModal from './ShareModal'

export default function ShareButtons() {
  const [isDisplay, setIsDisplay] = useState(false)


  return (
    <>
      <button
        onClick={() => {
          setIsDisplay(old=>!old)
        }}
        className="sm:text-[1.05em] text-[0.95em] hover:bg-[tomato] min-w-[60px] my-[2px] py-[5px] mx-auto rounded-[5px]  flex items-center text-white justify-center"
      >
        <HiShare className="mr-[0.5em]" />
        공유
      </button>
      <ShareModal isShow={isDisplay} onClickShowModal={()=> setIsDisplay(old => !old)}/>
    </>
  )
}
