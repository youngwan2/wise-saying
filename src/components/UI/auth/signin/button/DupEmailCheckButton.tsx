import { MouseEventHandler } from 'react'

interface PropsType {
  isLoading: boolean
  onClickCheck: MouseEventHandler<HTMLButtonElement>
}
export default function DupEmailCheckButton({
  isLoading,
  onClickCheck,
}: PropsType) {
  return (
    <button
      onClick={onClickCheck}
      className="bg-[white] min-w-[50px] rounded-r-[5px] hover:bg-[#e0dfdf] hover:shadow-[inset_0_0_0_2px_white]"
    >
      {isLoading ? '대기' : '확인'}
    </button>
  )
}
