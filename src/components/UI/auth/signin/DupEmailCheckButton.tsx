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
      className="bg-[white] min-w-[50px] rounded-r-[5px] hover:shadow-[0px_0px_0px_2px_black] "
    >
      {isLoading ? '대기' : '확인'}
    </button>
  )
}
