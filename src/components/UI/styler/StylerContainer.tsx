'use client'

import Canvas from './Canvas'
import TextStyler from './TextStyler'
import SizeStyler from './SizeStyler'
import BackgroundStyler from './BackgorundStyler'
import { useState } from 'react'
import StylerTaps from './StylerTaps'
import StylerCarosel from './StylerCarosel'
import BackMoveButton from '../common/BackMoveButton'

export default function StylerContainer() {
  const [selecTapNum, setSelectTapNum] = useState(0)

  return (
    <div
      className={
        ' opacity-[100%] visible left-0 right-0 top-0 bottom-0 rounded-[10px] bg-[transparent] backdrop-blur-[5px] my-[2em] '
      }
    >
      <BackMoveButton />
      <section className="flex flex-col justify-center w-full p-[2em] mt-[2em] lg:flex-row lg:min-h-[90vh]">
        {/* 상단/좌측 | 캔버스, 캐러셀 */}
        <article className="flex flex-col items-center w-full overflow-x-hidden mr-[1em] bg-[#dad6d614]  rounded-[1em] shadow-[inset_-3px_-3px_5px_rgba(0,0,0,0.5)] p-[1em] ">
          <Canvas />
          <StylerCarosel />
        </article>

        {/* 하단/우측 | 편집기  */}
        <article className="mt-[2em] w-full flex flex-col max-w-[100%] lg:max-w-[25%] lg:block p-[0.8em] lg:mt-[0] bg-[#dad6d614] rounded-[1em] shadow-[inset_-3px_-3px_5px_rgba(0,0,0,0.5)] min-h-[400px]  ">
          <StylerTaps
            selectTapNum={selecTapNum}
            setSelectTapNum={setSelectTapNum}
          />
          <TextStyler selectTapNum={selecTapNum} />
          <BackgroundStyler selectTapNum={selecTapNum} />
          <SizeStyler selectTapNum={selecTapNum} />
        </article>
      </section>
    </div>
  )
}
