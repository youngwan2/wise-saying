import { useEffect, useState } from 'react'

interface PropsType {
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<any[] | undefined>
  size: number
  maxPage: number
  isLoadingMore: boolean
}
export default function LoadMoreButton({
  setSize,
  size,
  maxPage,
  isLoadingMore,
}: PropsType) {
  const [isLastPage, setIsLastPage] = useState(false)

  useEffect(() => {
    setIsLastPage(size === maxPage)
  }, [size, maxPage])
  return (
    <button
      disabled={isLoadingMore || isLastPage}
      className={`${
        isLastPage
          ? 'bg-[#00000042] hover:cursor-not-allowed'
          : 'hover:cursor-pointer'
      } z-0  relative left-[50%] translate-x-[-50%] mt-[1em] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] rounded-[5px] border-[3px]  bg-white to-slate-400 w-[150px] h-[50px] hover:bg-[tomato] hover:text-white font-semibold text-[1.15em] `}
      onClick={() => {
        setSize(size + 1)
      }}
    >
      {isLastPage
        ? '마지막 페이지'
        : isLoadingMore
          ? '조회중 입니다...'
          : size + '페이지'}
    </button>
  )
}
