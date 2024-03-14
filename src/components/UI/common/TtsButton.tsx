import { SlEarphones } from "react-icons/sl"


interface PropsType {
    onClickSetText: (quote:string|null) => void
    className: string
    quote:string | null
}
export default function TtsButton({ onClickSetText, className, quote }: PropsType) {

    return (

        <button
            aria-label="명언 듣기 버튼"
            className={className}
            onClick={()=>{onClickSetText(quote)}}
        >
            <SlEarphones className="pr-[2px]" />
        </button>
    )
}