'use client'

import { ChangeEvent, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import TextStyler from '../styler/text-styler/TextStyler'
import BackgroundStyler from '../styler/background-styler/BackgorundStyler'
import StylerTaps from '../tap/StylerTaps'
import StylerCarosel from '../carosel/StylerCarosel'
import StylerImageUploadForm from '../form/StylerImageUploadForm'
import CanvasContainer from './CanvasContainer'
import { useImageElementStore, useImagesSrcStore } from '@/store/stylerStore'

import { imagePreviewReader } from '@/utils/imageloader'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'




export default function StylerContainer() {
  const [selecTapNum, setSelectTapNum] = useState(0)
  const [isShowStyler, setIsShowStyler] = useState(true) // 기본값을 true로 변경 (데스크톱에서는 항상 보임)
  const [panelHeight, setPanelHeight] = useState(70) // vh 단위로 패널 높이 관리
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragStartHeight, setDragStartHeight] = useState(70)

  const { imagesSrc, setImagesSrc } = useImagesSrcStore((state) => state)
  const setImageSrc = useImageElementStore((state) => state.setImageSrc)
  const panelRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  function onClickToggleStyler() {
    setIsShowStyler(!isShowStyler)
  }

  // 드래그 시작
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragStartY(clientY)
    setDragStartHeight(panelHeight)

    // 드래그 중 텍스트 선택 방지
    document.body.style.userSelect = 'none'
  }

  // 드래그 중
  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = dragStartY - clientY // 위로 드래그하면 양수
    const viewportHeight = window.innerHeight
    const heightChange = (deltaY / viewportHeight) * 100 // vh 단위로 변환

    let newHeight = dragStartHeight + heightChange

    // 최소 30vh, 최대 90vh로 제한
    newHeight = Math.max(30, Math.min(90, newHeight))

    setPanelHeight(newHeight)
  }

  // 드래그 종료
  const handleDragEnd = () => {
    setIsDragging(false)
    document.body.style.userSelect = 'auto'

    // 스냅 효과: 50vh 근처면 50vh로, 70vh 근처면 70vh로 스냅
    if (Math.abs(panelHeight - 50) < 10) {
      setPanelHeight(50)
    } else if (Math.abs(panelHeight - 70) < 10) {
      setPanelHeight(70)
    }
  }

  // 드래그 이벤트 리스너 등록
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e)
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault() // 스크롤 방지
        handleDragMove(e)
      }
      const handleMouseUp = () => handleDragEnd()
      const handleTouchEnd = () => handleDragEnd()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, dragStartY, dragStartHeight, panelHeight])

  function onClickSetBackgroundImage(imageSrc: string) {
    setImageSrc(imageSrc)
  }


  function onClickDeleteBackgroundImage(choiceIndex: number) {
    const isDelete = confirm('정말로 삭제하시겠습니까?')
    if (!isDelete) return toast('삭제요청을 취소하였습니다.')
    const delResult = imagesSrc.filter(src => src !== imagesSrc[choiceIndex])
    setImagesSrc(delResult)
  }

  async function onChangeImageUploader(e: ChangeEvent<HTMLInputElement>) {
    const src = (await imagePreviewReader(e, 'styler')) || ''
    const isValidSrc = src?.length > 5
    isValidSrc && imagesSrc ? setImagesSrc([...imagesSrc, src]) : null
  }
  return createPortal(
    <div className="fixed inset-0 bg-gray-50 flex flex-col z-[100000000000]">
      {/* 헤더 - 뒤로가기 버튼 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {/* 뒤로가기 버튼과 편집툴 토글 버튼 */}
        <div className="flex items-center gap-3">
          <button
            className='flex items-center px-3 py-2 justify-center rounded-lg transition-all duration-200 ease-in-out bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium'
            onClick={() => { router.back() }}
          >
            나가기
          </button>

          {/* 모바일에서만 보이는 편집툴 토글 버튼 */}
          <button
            className='lg:hidden flex items-center px-3 py-2 justify-center rounded-lg transition-all duration-200 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-medium'
            onClick={onClickToggleStyler}
          >
            {!isShowStyler && '편집툴 열기'}
          </button>

        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* 캔버스 영역 */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6 bg-white overflow-auto">
          <div className="w-full max-w-4xl">
            <CanvasContainer />
            <StylerCarosel imagesSrc={imagesSrc} onClickSetBackgroundImage={onClickSetBackgroundImage} onClickDeleteBackgroundImage={onClickDeleteBackgroundImage} />
          </div>
        </div>

        {/* 편집 도구 패널 */}
        <div
          ref={panelRef}
          className={`${!isShowStyler ? 'translate-y-full lg:translate-y-0' : 'translate-y-0'} 
            fixed lg:relative bottom-0 lg:bottom-auto left-0 lg:left-auto right-0 lg:right-auto
            w-full lg:w-80 xl:w-96 lg:h-full
            bg-white border-t lg:border-l lg:border-t-0 border-gray-200
            transition-transform duration-300 ease-in-out
            z-50 lg:z-auto
            overflow-y-auto lg:overflow-visible
            rounded-t-2xl lg:rounded-none
            ${isDragging ? 'transition-none' : ''}`}
          style={{
            height: window.innerWidth >= 1024 ? 'auto' : `${panelHeight}vh` // 모바일, 데스크톱 구분
          }}
        >
          <div className="p-4 space-y-4 relative">
            {/* 모바일용 드래그 핸들 */}
            <div
              className="lg:hidden flex justify-center mb-2 cursor-grab active:cursor-grabbing py-2 -mx-4 px-4"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div className={`w-10 h-1 rounded-full transition-colors duration-200 ${isDragging ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
            </div>

            <StylerTaps selectTapNum={selecTapNum} setSelectTapNum={setSelectTapNum} />
            <TextStyler selectTapNum={selecTapNum} />
            <BackgroundStyler selectTapNum={selecTapNum} />
            <StylerImageUploadForm selectTapNum={selecTapNum} onChangeImageUploader={onChangeImageUploader} />
          </div>
        </div>
      </div>      {/* 모바일에서 편집툴이 열려있을 때 배경 오버레이 */}
      {isShowStyler && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsShowStyler(false)}
        />
      )}
    </div>,
    document.body
  )
}
