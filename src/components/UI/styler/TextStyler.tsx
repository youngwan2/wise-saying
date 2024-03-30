'use client'
import { useEffect, useState } from 'react'

import TextSizeStyler from './TextSizeStyler'
import { useQuotesTextStyleStore } from '@/store/store'
import TextFontStyler from './TextFontStyler'
import TextColorStyler from './TextColorStyler'
import TextStrokeStyler from './TextStrokeStyler'
import TextSettingOptions from './TextSettingOptions'
import TextAlignStyler from './TextAlignStyler'

interface PropsType {
  selectTapNum: number
}

export interface TextStyleType {
  size: number
  unit: string
  color: string
  font: string
  fontStyle: string
}
export default function TextStyler({ selectTapNum }: PropsType) {
  const [textStyle, setTextStyleState] = useState<TextStyleType>({
    size: 14.3,
    unit: 'px',
    color: 'black',
    font: 'NanumGothicLight',
    fontStyle: 'fill',
  })

  const setTextStyle = useQuotesTextStyleStore((state) => state.setTextStyle)

  useEffect(() => {
    setTextStyle(textStyle)
  }, [setTextStyle, textStyle])

  return (
    <article
      className={`${selectTapNum === 0 ? 'visible ' : 'invisible absolute'}`}
    >
      <h3 className='text-white my-[0.5em]'>스타일(폰트, 글자 선)</h3>
      <TextFontStyler
        setTextStyleState={setTextStyleState}
        textStyle={textStyle}
      />
      <h3 className='text-white mt-[0.5em]'>글자</h3>
      <div className='flex items-center mt-[0.5em] pb-[10px]'>
        <TextColorStyler
          setTextStyleState={setTextStyleState}
          textStyle={textStyle}
        />
        <TextSizeStyler
          setTextStyleState={setTextStyleState}
          textStyle={textStyle}
        />
        <TextSettingOptions />
        <TextAlignStyler />

      </div>
      <h3 className='text-white mt-[0.5em]'>외곽선</h3>
      <TextStrokeStyler />



    </article>
  )
}
