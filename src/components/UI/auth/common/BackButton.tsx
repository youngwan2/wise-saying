import { MouseEventHandler } from 'react'
import { HiOutlineX } from 'react-icons/hi'

interface PropsType {
  onClickBack: MouseEventHandler<HTMLButtonElement>
}
export default function BackButton({ onClickBack }: PropsType) {
  return (
    <button
      type="button"
      className="fixed top-[0.6em] right-[10px] text-[1.5em] text-[white] hover:shadow-[inset_0_0_0_1px_tomato] p-[3px] rounded-full"
      onClick={onClickBack}
    >
      <HiOutlineX></HiOutlineX>
    </button>
  )
}
