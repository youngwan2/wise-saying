
import ControlButton from '../../common/button/ControlButton'
import ButtonContainer from '../../common/container/ButtonContainer'

import { HiArrowLeftCircle, HiArrowRightCircle } from 'react-icons/hi2'

interface PropsType {
  page: number
  setPage: (p: number) => void
  MAX_PAGE: number
}
export default function SearchPaginationContainer({
  page,
  setPage,
  MAX_PAGE,
}: PropsType) {

  function handleSetPage(newPage: number) {
    setPage(newPage)
  }

  return (
    <ButtonContainer elementName='nav' className='flex p-[10px] justify-center'>
      {/* 이전 */}
      <ControlButton
        ariaLabel='이전 페이지 설정 버튼'
        className={`text-white text-[1.7em] ${page + 1 === 1 ? 'invisible' : 'visible'}`}
        onClick={() => { handleSetPage(Math.max(page - 1, 0)) }}
      >
        <HiArrowLeftCircle />

      </ControlButton>
      {/* 현재 페이지 알림 */}
      <span
        aria-label={`전체 ${MAX_PAGE} 페이지 중 현재, ${page + 1}페이지.`}
        className="mx-[10px] text-white"
      >
        {page + 1}/{MAX_PAGE}
      </span>

      {/* 다음 */}
      <ControlButton
        ariaLabel='이전 페이지 설정 버튼'
        className={`text-white text-[1.7em] ${page + 1 === MAX_PAGE ? 'invisible' : 'visible'}`}
        onClick={() => { handleSetPage(Math.min(page + 1, MAX_PAGE)) }}
      >
        <HiArrowRightCircle />
      </ControlButton>
    </ButtonContainer>
  )
}
