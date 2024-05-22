import { MouseEventHandler } from 'react'

interface PropsType {
  isLoading: boolean
  onClickDupEmailCheck: MouseEventHandler<HTMLButtonElement>
}
export default function DupEmailCheckButton({
  isLoading,
  onClickDupEmailCheck,
}: PropsType) {
  return (
    <button
      onClick={onClickDupEmailCheck}
      className="bg-[white] min-w-[50px] rounded-r-[5px] hover:bg-[#e0dfdf] hover:shadow-[inset_0_0_0_2px_white]"
    >
      {isLoading ? '확인중' : '확인'}
    </button>
  )
}
