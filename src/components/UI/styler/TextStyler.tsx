'use client'
import { useEffect, useState } from 'react'

import TextSizeStyler from './TextSizeStyler'
import { useQuotesTextStyleStore } from '@/store/store'
import TextFontStyler from './TextFontStyler'
import TextColorStyler from './TextColorStyler'
import TextLineHeightStyler from './TextLineHeightStyler'
import TextStrokeStyler from './TextStrokeStyler'

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
    size: 14,
    unit: 'px',
    color: 'black',
    font: 'Arial',
    fontStyle: 'fill',
  })

  const [sizeUnits] = useState(['px', 'em', 'rem'])
  const setTextStyle = useQuotesTextStyleStore((state) => state.setTextStyle)

  useEffect(() => {
    setTextStyle(textStyle)
  }, [setTextStyle, textStyle])

  if (selectTapNum !== 0) return <></>
  return (
    <article className=" lg:max-w-[90%] flex flex-col">
      <TextColorStyler
        setTextStyleState={setTextStyleState}
        textStyle={textStyle}
      />
      <TextSizeStyler
        sizeUnits={sizeUnits}
        setTextStyleState={setTextStyleState}
        textStyle={textStyle}
      />
      <TextFontStyler
        setTextStyleState={setTextStyleState}
        textStyle={textStyle}
      />
      <TextLineHeightStyler />
      <TextStrokeStyler />
    </article>
  )
}
