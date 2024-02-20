import { MouseEventHandler } from 'react'

interface PropsType {
  onClickCancel: MouseEventHandler<HTMLButtonElement>
}
export default function QuoteFormButtons({ onClickCancel }: PropsType) {
  return (
    <article className="p-[2em]">
      {/* 전송버튼 */}
      <button className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold hover:bg-[#162557] hover:text-white rounded-[5px]">
        등록하기
      </button>
      {/* 취소 버튼 */}
      <button
        type="button"
        onClick={onClickCancel}
        className="bg-[#ffffff] p-[10px] font-bold hover:bg-[#162557] hover:text-white rounded-[5px]"
      >
        취소
      </button>
    </article>
  )
}
