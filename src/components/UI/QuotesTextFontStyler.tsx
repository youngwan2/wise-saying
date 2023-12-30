import { HiPaintBrush } from "react-icons/hi2";
import type { TextStyleType } from "./QuotesTextStyler";

interface PropsType {
    setTextStyleState: (p:TextStyleType) => void
    textStyle: TextStyleType
}
export default function QuotesTextFontStyler({ setTextStyleState,textStyle }: PropsType) {

    const fontFamilies = [
        "Arial",
        "Helvetica",
        "Times New Roman",
        "Courier New",
        "Georgia",
        "Palatino Linotype",
        "Verdana",
        "Garamond",
        "Comic Sans MS",
        "Impact",
        "Lucida Sans Unicode",
        "Tahoma",
        "Trebuchet MS",
        "Arial Black",
        "Book Antiqua",
        "Candara",
        "Consolas",
        "Copperplate",
        "Franklin Gothic Medium",
        "Geneva",
        "Jokerman",
        "MS Serif",
        "Perpetua",
        "Rockwell",
        "Symbol",
        "Webdings",
        "Wingdings"
    ];

    const fontStyles =['fill','stroke','hybrid']

    return (
        <article>
            {/* 폰트 */}
           <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">폰트 변경</p></h2>
            <select className="p-[0.2em] max-w-[50%] w-full" id="" onChange={(e)=>{
                const font = e.currentTarget.value
                setTextStyleState({...textStyle, font})
            }}>
                {fontFamilies.map((font)=>{
                    return (<option value={font} key={font}>{font}</option>)
                })}
            </select>

            {/* 폰트 스타일 */}
            <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">폰트 스타일 변경</p></h2>
            <select className="p-[0.2em] max-w-[50%] w-full" id="" onChange={(e)=>{
                const fontStyle = e.currentTarget.value
                setTextStyleState({...textStyle, fontStyle})
            }}>
                {fontStyles.map((fontStyle)=>{
                    return (<option value={fontStyle} key={fontStyle}>{fontStyle}</option>)
                })}

            </select>
        </article>
    )
}