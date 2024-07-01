import { MouseEventHandler } from "react"
import { SlEarphones } from "react-icons/sl"


interface PropsType {
    onClickSetText: MouseEventHandler<HTMLButtonElement>
    className: string
    quote:string | null
}
export default function TtsButton({ onClickSetText, className }: PropsType) {

    return (
        <button
            title="명언 듣기"
            aria-label="명언 듣기 버튼"
            className={className}
            onClick={onClickSetText}
        >
            <SlEarphones className="pr-[2px]" />
        </button>
    )
}