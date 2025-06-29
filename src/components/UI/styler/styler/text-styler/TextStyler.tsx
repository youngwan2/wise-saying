'use client'
import { useEffect, useState } from 'react'
import { useQuotesTextStyleStore } from '@/store/stylerStore'

import TextSizeStyler from './TextSizeStyler'
import TextFontStyler from './TextFontStyler'
import TextColorStyler from './TextColorStyler'
import TextStrokeStyler from './TextStrokeStyler'
import TextSettingOptions from '../../TextSettingOptions'
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
      className={`${selectTapNum === 0 ? 'block' : 'hidden'} space-y-6`}
    >
      <section className="space-y-2">
        <h3 className='text-gray-900 font-semibold text-lg'>폰트 & 스타일</h3>
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <TextFontStyler
            setTextStyleState={setTextStyleState}
            textStyle={textStyle}
          />
        </div>
      </section>

      <section className="space-y-2">
        <h3 className='text-gray-900 font-semibold text-lg'>텍스트 설정</h3>
        <div className='bg-white shadow-sm rounded-lg p-4 border border-gray-100 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TextColorStyler
              setTextStyleState={setTextStyleState}
              textStyle={textStyle}
            />
            <TextSizeStyler
              setTextStyleState={setTextStyleState}
              textStyle={textStyle}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TextSettingOptions />
            <TextAlignStyler />
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className='text-gray-900 font-semibold text-lg'>외곽선</h3>
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <TextStrokeStyler />
        </div>
      </section>
    </article>
  )
}
