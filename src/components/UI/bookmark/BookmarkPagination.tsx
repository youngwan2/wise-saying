import { MouseEventHandler } from 'react'

interface PropsType {
  page: number
  maxPageSize: number
  currentTotal: number
  onClickPrevSwitch: MouseEventHandler<HTMLButtonElement>
  onClickNextSwitch: MouseEventHandler<HTMLButtonElement>
}
export default function BookmarkPagination({
  page,
  maxPageSize,
  currentTotal,
  onClickPrevSwitch,
  onClickNextSwitch,
}: PropsType) {

  return (
    <article className="flex justify-center ">
      {/* 이전 */}
      <button
        className={`mx-[10px] text-white ${
          page === 0 ? 'invisible' : 'visible'
        }`}
        onClick={onClickPrevSwitch}
      >
        이전
      </button>
      <span
        aria-label={`총 ${maxPageSize} 페이지 중 ${page + 1} 페이지`}
        className={'mx-[10px] text-white'}
      >
        {page + 1}/{maxPageSize}
      </span>
      {/* 다음 */}
      <button
        className={`mx-[10px] text-white ${
          currentTotal < 5 ? 'invisible' : 'visible'
        }`}
        onClick={onClickNextSwitch}
      >
        다음
      </button>
    </article>
  )
}
