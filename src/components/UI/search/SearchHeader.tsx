import { MouseEventHandler } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'

interface PropsType {
  onClickSetDisplay: MouseEventHandler<HTMLButtonElement>
}

export default function SearchHeader({ onClickSetDisplay }: PropsType) {
  return (
    <div className="flex justify-between text-white text-[1.1em] m-[5px] mt-[-0.25em]">
      <h3>검색(Search)</h3>
      <button type="button" onClick={onClickSetDisplay}>
        <HiOutlineXMark />
      </button>
    </div>
  )
}
