import { HiPaintBrush } from "react-icons/hi2";
import type { TextStyleType } from "./QuotesTextStyler";
import { useImageElementStore, useQuotesTextStyleStore } from "@/store/store";

interface PropsType {
    setTextStyleState: (p: TextStyleType) => void
    textStyle: TextStyleType
}

export default function QuotesTextFontStyler({ setTextStyleState, textStyle }: PropsType) {

    const fontFamilies = [
        'Arial',
        'Helvetica',
        'Times New Roman',
        'Times',
        'Courier New',
        'Courier',
        'monospace',
        'Georgia',
        'Palatino',
        'Palatino Linotype',
        'Verdana',
        'Geneva',
        'Trebuchet MS',
        'Impact',
        'Charcoal',
        'sans-serif',
        'MS Sans Serif',
        'MS Serif',
        'serif',
        '궁서',
        '궁서체'
    ];

    const fontStyles = ['fill', 'stroke', 'hybrid']

    return (
        <article className="flex">
            {/* 폰트 */}
            <article>
                <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">폰트</p></h2>
                <select className="p-[1px] w-[163px]"
                    onChange={(e) => {
                        const font = e.currentTarget.value
                        setTextStyleState({ ...textStyle, font })
                    }}>
                    {fontFamilies.map((font) => {
                        return (<option value={font} key={font}>{font}</option>)
                    })}
                </select>
            </article>
            {/* 폰트 스타일 */}
            <article className="ml-[1em]">
                <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">폰트 스타일</p></h2>
                <select className="p-[1px] w-[107px]" id="" onChange={(e) => {
                    const fontStyle = e.currentTarget.value
                    setTextStyleState({ ...textStyle, fontStyle })
                }}>
                    {fontStyles.map((fontStyle) => {
                        return (<option value={fontStyle} key={fontStyle}>{fontStyle}</option>)
                    })}

                </select>
            </article>
        </article>
    )
}