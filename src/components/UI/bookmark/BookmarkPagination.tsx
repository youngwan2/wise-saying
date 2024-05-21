import { MouseEventHandler } from 'react'
import ControlButton from '../common/button/ControlButton'
import ButtonContainer from '../common/container/ButtonContainer'

interface PropsType {
  page: number
  maxPageSize: number
  onClickPrevSwitch: MouseEventHandler<HTMLButtonElement>
  onClickNextSwitch: MouseEventHandler<HTMLButtonElement>
}
export default function BookmarkPagination({
  page,
  maxPageSize,
  onClickPrevSwitch,
  onClickNextSwitch,
}: PropsType) {
  return (
    <ButtonContainer elementName='div' className="flex justify-center ">
      {/* 이전 */}
      <ControlButton
        ariaLabel='이전 페이지 버튼'
        className={`mx-[10px] text-white ${page === 0 ? 'invisible' : 'visible'
          }`}
        onClick={onClickPrevSwitch}>
        이전
      </ControlButton>
      <span
        aria-label={`총 ${maxPageSize} 페이지 중 ${page + 1} 페이지`}
        className={'mx-[10px] text-white'}
      >
        {page + 1}/{maxPageSize}
      </span>
      {/* 다음 */}
      <ControlButton
        ariaLabel='다음 페이지 버튼'
        className={`mx-[10px] text-white ${maxPageSize === page + 1 ? 'invisible' : 'visible'
          }`}
        onClick={onClickNextSwitch}
      >
        다음
      </ControlButton>
    </ButtonContainer>
  )
}
