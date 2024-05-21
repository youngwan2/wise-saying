import { MouseEventHandler } from 'react'
import ButtonContainer from '../../common/container/ButtonContainer'
import ControlButton from '../../common/button/ControlButton'

interface PropsType {
  onClickCancelEdit?: MouseEventHandler<HTMLButtonElement>
  onClickCancelAdd?: MouseEventHandler<HTMLButtonElement>
}
export default function ReplyButtons({
  onClickCancelEdit,
  onClickCancelAdd,
}: PropsType) {
  return (
    <ButtonContainer
      elementName='div'
      className="sm:mt-[10px] mt-[0.5em] flex  justify-end"
    >
      <ControlButton
        ariaLabel='취소 버튼'
        onClick={onClickCancelEdit || onClickCancelAdd}
        className="sm:text-[14px] text-[13.5px]  mr-[5px] min-w-[35px] text-white hover:border-b  "
        type="reset"
      >
        취소
      </ControlButton>

      <ControlButton
        ariaLabel='등록 버튼'
        className="sm:text-[14px] text-[13.5px] min-w-[35px] text-white  hover:border-b ">
        등록
      </ControlButton>
    </ButtonContainer>
  )
}
