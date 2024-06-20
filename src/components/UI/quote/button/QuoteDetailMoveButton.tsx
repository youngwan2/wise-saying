import { MouseEventHandler } from "react"

import ControlButton from "../../common/button/ControlButton"

import { HiDocumentMagnifyingGlass } from "react-icons/hi2"

interface PropsType {
    onClickDetailMove: MouseEventHandler<HTMLButtonElement>
}
export default function QuoteDetailMoveButton({ onClickDetailMove }: PropsType) {

    return (
        <ControlButton
            title="상세 페이지 이동"
            ariaLabel="상세 페이지 이동"
            className="absolute right-[1.8em] top-[0.45em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white  "
            onClick={onClickDetailMove}>
            <HiDocumentMagnifyingGlass />
        </ControlButton>
    )
}