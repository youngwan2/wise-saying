'use client'

import { useCallback, useEffect, useState } from 'react'
import { HiDocumentSearch } from 'react-icons/hi'
import { createPortal } from 'react-dom'
import ControlButton from '../../common/button/ControlButton'
import Mask from '../mask/Mask'

export default function FocusModeButton() {
  const [XY, setXY] = useState({ x: 0, y: 0 })
  const [isDisplay, setIsDisplay] = useState(false)

  function handleDisplayClick(){
    setIsDisplay(old => !old)

  }

  const onOverlayAnimation = useCallback((e: MouseEvent) => {
    const { x, y } = calculateMouseLocation(e)
    setXY({ x, y })
  }, [])

  useEffect(() => {
    if (!isDisplay) return window.removeEventListener('mousemove', onOverlayAnimation)

    window.addEventListener('mousemove', onOverlayAnimation)

    return () => {
      window.removeEventListener('mousemove', onOverlayAnimation)
    }
  }, [onOverlayAnimation, isDisplay])

  return (
    <>
      <ControlButton
        ariaLabel='화면을 어둡게 하고, 특정 지점만 밝도록 포커스를 맞추는 아이콘'
        onClick={handleDisplayClick}
        className='sm:text-[1.5em] text-[1.25em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]'
      >
        <HiDocumentSearch />
      </ControlButton>

      {/* 마스크  */}
      {
        isDisplay
          ? createPortal(<Mask XY={XY} />, document.body)
          : null
      }
    </>
  )
}


/** 현재 마우스 위치 계산 */
function calculateMouseLocation(e: MouseEvent) {
  const x = e.pageX
  const y = e.pageY - window.scrollY

  return { x, y }

}