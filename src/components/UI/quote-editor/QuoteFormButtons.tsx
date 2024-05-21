import { MouseEventHandler } from 'react'
import ControlButton from '../common/button/ControlButton'
import ButtonContainer from '../common/container/ButtonContainer'

interface PropsType {
  onClickCancel: MouseEventHandler<HTMLButtonElement>
}
export default function QuoteFormButtons({ onClickCancel }: PropsType) {
  return (
    <ButtonContainer elementName='div' className="p-[2em]">
      {/* 전송버튼 */}
      <ControlButton
        ariaLabel='등록 버튼'
        className='shadow-[inset_0_0_0_1px_white] p-[10px] mr-[1em] bg-[white] text-black font-bold hover:bg-[#e1dfdf] rounded-[5px]'>
        등록하기
      </ControlButton>

      {/* 취소 버튼 */}
      <ControlButton
        ariaLabel='취소 버튼'
        type="button"
        onClick={onClickCancel}
        className="hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] shadow-[inset_0_0_0_1px_white] p-[10px] bg-[white] text-black font-bold hover:bg-[#e5e1e1] rounded-[5px]"
      >
        취소
      </ControlButton>
    </ButtonContainer>
  )
}
