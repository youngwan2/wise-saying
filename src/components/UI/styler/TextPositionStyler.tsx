import { debounceCloser } from "@/utils/common-func"
import { HiPaintBrush } from "react-icons/hi2"


interface PropsType {
    setTextStyleState: (p: any) => void
    textStyle: any
}
export default function TextPositionStyler({
    setTextStyleState,
    textStyle,
}: PropsType) {


    return (
        <article>
            <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]">
                <HiPaintBrush color="white" />{' '}
                <p className="ml-[0.5em]">글자 좌표(y)</p>
            </h2>
            {/* 텍스트 높이 변경 */}
            <input
                type="number"
                className="p-[5px] text-center rounded-[0.5em] shadow-[0_0px_0px_1px_black] max-w-[200px] w-full"
                placeholder="Default : 0"
                onChange={(e) => {
                    const positionY = Number(e.currentTarget.value)
                    debounceCloser(positionY, 'textPositionY', textStyle, setTextStyleState, 500)
                }}
            />
        </article>
    )
}