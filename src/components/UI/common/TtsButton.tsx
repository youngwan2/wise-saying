import { MouseEventHandler } from "react"
import { SlEarphones } from "react-icons/sl"


interface PropsType {
    onClickSetText: MouseEventHandler<HTMLButtonElement>
    className: string
}
export default function TtsButton({ onClickSetText, className }: PropsType) {

    return (

        <button
            aria-label="명언 듣기 버튼"
            className={className}
            onClick={onClickSetText}
        >
            <SlEarphones className="pr-[2px]" />
        </button>
    )
}