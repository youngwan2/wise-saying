import { HiArrowLeftCircle, HiArrowRightCircle } from 'react-icons/hi2'

interface PropsType {
  page: number
  setPage: (p: number) => void
  MAX_PAGE: number
}
export default function SearchResultSwitchButton({
  page,
  setPage,
  MAX_PAGE,
}: PropsType) {
  return (
    <article className="flex p-[10px] justify-center">
      {/* 이전 */}
      <button
        className={`text-white text-[1.7em] ${
          page + 1 === 1 ? 'invisible' : 'visible'
        }`}
        onClick={() => {
          setPage(Math.max(page - 1, 0))
        }}
      >
        <HiArrowLeftCircle />
      </button>
      <span className="mx-[10px] text-white">
        {page + 1}/{MAX_PAGE}
      </span>

      {/* 다음 */}
      <button
        className={`text-white text-[1.7em] ${
          page + 1 === MAX_PAGE ? 'invisible' : 'visible'
        }`}
        onClick={() => {
          setPage(Math.min(page + 1, MAX_PAGE))
        }}
      >
        <HiArrowRightCircle />
      </button>
    </article>
  )
}
