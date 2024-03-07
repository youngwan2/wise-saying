'use client'

import { useCallback, useEffect, useState } from 'react'
import { HiDocumentSearch } from 'react-icons/hi'
import { createPortal } from 'react-dom'

export default function FocusModeButton() {
  const [XY, setXY] = useState({ x: 0, y: 0 })
  const [isDisplay, setIsDisplay] = useState(false)

  const onOverlay = useCallback((e: any) => {
    const x = e.pageX
    const y = e.pageY
    setXY({ x, y })
  }, [])

  useEffect(() => {
    if (!isDisplay) return window.removeEventListener('mousemove', onOverlay)

    window.addEventListener('mousemove', onOverlay)

    return () => {
      window.removeEventListener('mousemove', onOverlay)
    }
  }, [onOverlay, isDisplay])

  return (
    <>
      <button
        aria-label="화면을 어둡게 하고, 특정 지점만 밝도록 포커스를 맞추는 아이콘"
        onClick={() => {
          setIsDisplay(!isDisplay)
          if (!isDisplay) return (document.body.style.overflow = 'hidden')
          else return (document.body.style.overflow = 'auto')
        }}
        className="sm:text-[1.5em] text-[1.25em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]"
      >
        <HiDocumentSearch />
      </button>
      {isDisplay
        ? createPortal(
            <>
              <svg className="transition fixed top-0 w-[100%] min-h-[100%] z-[-1] mix-blend-overlay">
                <defs>
                  {/* 마스크에 표시할 패턴을 생성 */}
                  <pattern id="pattern" x={0} y={0} width={0.1} height={0.1}>
                    <rect
                      x={0}
                      y={0}
                      width={200}
                      height={200}
                      className="fill-[white] blur-[10px]"
                    ></rect>
                  </pattern>
                  {/* 마스크 생성 */}
                  <mask id="glass">
                    <circle fill="white" cx={XY.x} cy={XY.y} r={80}></circle>
                  </mask>
                </defs>
                {/* 마스크를 적용하는 그룹 지정 : 해당 그룹(마스크) 내의 rect 요소에 링크된 패턴이 표시. */}
                <g mask="url(#glass)">
                  <rect
                    x={0}
                    y={0}
                    width={'100%'}
                    height={'100%'}
                    className="fill-[url('#pattern')]"
                  ></rect>
                </g>
                <circle
                  className="fill-transparent stroke-[white] stroke-[10px] blur-[15px] "
                  cx={XY.x}
                  cy={XY.y}
                  r={80}
                ></circle>
              </svg>
            </>,
            document.body,
          )
        : null}
    </>
  )
}
