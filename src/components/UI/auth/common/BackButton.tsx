import { MouseEventHandler } from 'react'
import { HiOutlineX } from 'react-icons/hi'

interface PropsType {
  onClickBack: MouseEventHandler<HTMLButtonElement>
}
export default function BackButton({ onClickBack }: PropsType) {
  return (
    <button
      type="button"
      className="fixed top-[0.73em] right-[7px] text-[1.2em] text-[white]"
      onClick={onClickBack}
    >
      <HiOutlineX></HiOutlineX>
    </button>
  )
}
