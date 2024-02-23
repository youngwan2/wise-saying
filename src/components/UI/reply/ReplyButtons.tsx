import { MouseEventHandler } from 'react'
import { HiChatBubbleOvalLeftEllipsis, HiPencilSquare } from 'react-icons/hi2'

interface PropsType {
  totalCount: number
  onClickReplyFormDisplay: MouseEventHandler<HTMLButtonElement>
}
export default function ReplyButtons({
  totalCount,
  onClickReplyFormDisplay,
}: PropsType) {
  return (
    <article className="flex items-center">
      <button
        className="sm:text-[18px] text-[14px] flex  items-center hover:shadow-[0_2px_0_0_tomato] absolute right-[3em] bottom-[0.44em] hover:font-bold"
        onClick={onClickReplyFormDisplay}
      >
        <HiPencilSquare color="rgba(0,0,0,0.8)" />
        <span className="text-[14px] font-sans">답글</span>
      </button>
      <button className="sm:text-[1.25em] text-[14px] flex items-center hover:shadow-[0_2px_0_0_tomato] absolute right-[0.5em] bottom-[0.4em]  hover:font-bold">
        <HiChatBubbleOvalLeftEllipsis color="rgba(0,0,0,0.8)" />
        <span className=" text-[14px] font-bold">({totalCount})</span>
      </button>
    </article>
  )
}
