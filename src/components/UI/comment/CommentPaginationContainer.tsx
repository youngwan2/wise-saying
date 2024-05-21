import { MouseEventHandler } from 'react'
import ControlButton from '../common/button/ControlButton'
import PageIndicator from './PageIndicator'

interface PropsType {
  page: number
  maxPage: number
  minPage: number
  onClickPrev: MouseEventHandler<HTMLButtonElement>
  onClickNext: MouseEventHandler<HTMLButtonElement>
}
export default function CommentPaginationContainer({
  page,
  maxPage,
  minPage,
  onClickPrev,
  onClickNext,
}: PropsType) {

  function pageCloser() {
    let copyPage = 0
    return function (page: number) {
      copyPage = page
      return copyPage + 1
    }
  }

  return (
    <article
      aria-label="이전과 다음 페이지 이동 버튼 컨테이너"
      className="relative left-[50%] translate-x-[-50%] inline-block text-white"
    >
      <ControlButton
        ariaLabel="이전 페이지 버튼"
        onClick={onClickPrev}
        className={`bg-[tomato] m-[5px] rounded-[5px] p-[5px] mt-[1em] ${minPage === page ? 'invisible' : 'visible'
          }`}

      >
        이전
      </ControlButton>
      <PageIndicator
        ariaLabel={`전체 ${maxPage} 페이지 중 현재 ${pageCloser()(page)} 페이지`}
        maxPage={maxPage}
        currentPage={pageCloser()(page)}

      />
      <ControlButton
        ariaLabel="다음 페이지 이동"
        onClick={onClickNext}
        className={`bg-[tomato] m-[5px] rounded-[5px] p-[5px] mt-[1em] ${maxPage === pageCloser()(page) ? 'invisible' : 'visible'
          }`}
      >
        다음
      </ControlButton>
    </article>
  )
}
