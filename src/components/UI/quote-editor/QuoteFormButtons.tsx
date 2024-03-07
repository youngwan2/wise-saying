import { MouseEventHandler } from 'react'

interface PropsType {
  onClickCancel: MouseEventHandler<HTMLButtonElement>
}
export default function QuoteFormButtons({ onClickCancel }: PropsType) {
  return (
    <article className="p-[2em]">
      {/* 전송버튼 */}
      <button className=" shadow-[inset_0_0_0_1px_white] p-[10px] mr-[1em] bg-[white] text-black font-bold hover:bg-[#cbc5c5] rounded-[5px]">
        등록하기
      </button>
      {/* 취소 버튼 */}
      <button
        type="button"
        onClick={onClickCancel}
        className="shadow-[inset_0_0_0_1px_white] p-[10px] bg-[white] text-black font-bold hover:bg-[#cbc5c5] rounded-[5px]"
      >
        취소
      </button>
    </article>
  )
}
