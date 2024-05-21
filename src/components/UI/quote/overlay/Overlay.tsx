import { MouseEventHandler } from 'react'

interface PropsType {
  isZoomIn: boolean
  onClickSetIsZoomIn: MouseEventHandler<HTMLDivElement>
}
export default function Overlay({ isZoomIn, onClickSetIsZoomIn }: PropsType) {
  return (
    <div
      aria-hidden={isZoomIn? 'false':'true'}
      aria-label="카드 오버레이(카드의 뒷배경)"
      onClick={onClickSetIsZoomIn}
      className={`${
        isZoomIn
          ? ' backdrop-blur-[3px] z-[200] fixed left-0 top-0 right-0 bottom-0 bg-[#00000086] visible opacity-100'
          : 'invisible opacity-0'
      }  rounded-[10px]`}
    ></div>
  )
}
