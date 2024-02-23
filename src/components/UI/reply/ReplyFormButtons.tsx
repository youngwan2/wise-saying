import { MouseEventHandler } from "react"

interface PropsType {
    onClickCancelEdit?: MouseEventHandler<HTMLButtonElement>
    onClickCancelAdd?: MouseEventHandler<HTMLButtonElement>
}
export default function ReplyButtons({ onClickCancelEdit, onClickCancelAdd }: PropsType) {

    return (
        <div className="sm:mt-[10px] mt-[0.5em] flex  justify-end">
            <button
                onClick={onClickCancelEdit || onClickCancelAdd}
                className="sm:text-[14px] text-[13.5px]  mr-[5px] min-w-[35px] text-white hover:border-b  "
                type="reset"
            >
                취소
            </button>
            <button className="sm:text-[14px] text-[13.5px] min-w-[35px] text-white  hover:border-b ">
                등록
            </button>

        </div>
    )
}