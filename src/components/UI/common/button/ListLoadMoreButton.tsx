import { MouseEventHandler, useEffect, useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
  size: number
  maxPage: number
  isLoadingMore: boolean
}
export default function ListLoadMoreButton({
  onClick,
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
      className={`${isLastPage
        ? 'bg-[#00000042] hover:cursor-not-allowed'
        : 'hover:cursor-pointer'
        }   left-[50%] translate-x-[-50%] relative mt-[6em] mb-[3em] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] 
         rounded-[5px] border-[3px]  bg-white to-slate-400 w-[140px] h-[45px]
        hover:bg-[#ebe8e8]  font-semibold text-[1.15em] z-[1] 
        `}
      onClick={onClick}
    >
      {isLastPage
        ? <span>종착지</span>
        : isLoadingMore || maxPage<1
          ? '조회중 ...'
          : <span className='flex items-center justify-center'> 더보기<span className='absolute right-[0.8em] top-[-1.5em] ml-[5px] text-white font-sans font-thin rounded-[10px] text-[0.8em] px-[8px] flex flex-col-reverse'><HiArrowUpRight /> <span className='absolute left-[-2em] top-[-1.25em] w-[200px] '> { maxPage - size} 페이지 남음</span></span></span>}
    </button>
  )
}
