import { MouseEventHandler } from "react"
import { HiDocumentMagnifyingGlass } from "react-icons/hi2"

interface PropsType {
    onClickDetailMove: MouseEventHandler<HTMLButtonElement>
}
export default function QuoteDetailMoveButton({ onClickDetailMove }: PropsType) {


    return (<button
        aria-label="상세 페이지 이동"
        onClick={onClickDetailMove}
        className="absolute right-[1.8em] top-[0.45em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white  "
    >
        <HiDocumentMagnifyingGlass />
    </button>

    )
}