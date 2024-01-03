"use client"
import { useEffect, useState } from 'react'

import QuotesTextSizeStyler from './QuotesTextSizeStyler'
import { useQuotesTextStyleStore } from '@/store/store'
import QuotesTextFontStyler from './QuotesTextFontStyler'
import QuotesTextColorStyler from './QuoteTextColorStyler'
import QuotesTextLineHeightStyler from './QuotesTextLineHeightStyler'
import QuotesTextStrokeStyler from './QuotesTextStrokeStyler'


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
export default function QuotesTextStyler({ selectTapNum }: PropsType) {

    // 타입 충돌로 인해 any 타입을 임시로 지정
    const [textStyle, setTextStyleState] = useState<TextStyleType>({
        size: 14,
        unit: 'px',
        color: 'black',
        font: 'Arial',
        fontStyle: 'fill'
    })

    const [sizeUnits] = useState(['px', 'em', 'rem'])
    const setTextStyle = useQuotesTextStyleStore((state) => state.setTextStyle)

    useEffect(() => {
        setTextStyle(textStyle)
    }, [setTextStyle, textStyle])

    return (
        <article className={`${selectTapNum === 0 ? ' lg:max-w-[80%] flex flex-col' : 'hidden'}`}>
            {/* 명언 글자색 변경 */}
            <QuotesTextColorStyler setTextStyleState={setTextStyleState} textStyle={textStyle} />
            {/* 명언 글자 크기 변경 */}
            <QuotesTextSizeStyler sizeUnits={sizeUnits} setTextStyleState={setTextStyleState} textStyle={textStyle} />
            <QuotesTextFontStyler setTextStyleState={setTextStyleState} textStyle={textStyle} />
            {/* 글자 줄간격 */}
            <QuotesTextLineHeightStyler />
            {/* 글자 외곽선 편집 */}
            <QuotesTextStrokeStyler />
        </article>
    )
}