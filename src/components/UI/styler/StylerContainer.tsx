'use client'

import Canvas from './Canvas'
import TextStyler from './TextStyler'
import BackgroundStyler from './BackgorundStyler'
import { useState } from 'react'
import StylerTaps from './StylerTaps'
import StylerCarosel from './StylerCarosel'
import BackMoveButton from '../common/BackMoveButton'
import HideButton from './HideButton'


export default function StylerContainer() {
  const [selecTapNum, setSelectTapNum] = useState(0)
  const [isShowStyler, setIsShowStyler] = useState(false)


  function onClickToggleStyler() {
    setIsShowStyler(!isShowStyler)
  }


  return (
    <section className="flex flex-col justify-center w-full p-[2em] mt-[2em]">
      <BackMoveButton />
      {/* 하단/좌측 | 편집기  */}
      <article  className= {`${!isShowStyler? '' :'translate-y-[390px]'}  left-[50%] translate-x-[-50%] min-h-[390px] fixed bottom-[0] backdrop:grayscale-[50%] backdrop-grayscale-[10%] bg-[#162557b6] z-[10000000] p-[0.8em] mt-[2em] w-full flex flex-col max-w-[450px] shadow-[0_0_60px_10px_#162557] transition-transform border-t border-x `}>
        <HideButton onToggle={onClickToggleStyler} isShowStyler={isShowStyler} />
        <StylerTaps
          selectTapNum={selecTapNum}
          setSelectTapNum={setSelectTapNum}
        />
        <TextStyler selectTapNum={selecTapNum} />
        <BackgroundStyler selectTapNum={selecTapNum} />
        
      </article>
      {/* 상단/우측 | 캔버스, 캐러셀 */}
      <article className="flex flex-col items-center w-full overflow-x-hidden mr-[1em]  rounded-[5px] p-[1em]">
        <Canvas />
        <StylerCarosel />
      </article>
    </section>
  )
}
