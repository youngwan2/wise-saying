import { useSearchParams } from 'next/navigation'
import { MouseEventHandler } from 'react'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function SearchTaps({ onClick }: PropsType) {
  const paramType = useSearchParams().get('type')
  const tapList = ['전체 검색', '저자별 검색', '키워드 검색']
  const type = ['all', 'author', 'keyword']
  return (
    <div
      className="flex justify-center mt-[2.3em] p-[5px]"
      aria-label="탭(taps)"
    >
      {tapList.map((tapName, i) => {
        return (
          <button
            data-type={type[i]}
            key={tapName}
            onClick={onClick}
            className={`transition-all text-[gray]  p-[10px] max-w-[242px] w-full ${
              type[i] === paramType
                ? 'border-b-[2px] border-[tomato] text-white'
                : ''
            }`}
          >
            {tapName}
          </button>
        )
      })}
    </div>
  )
}
