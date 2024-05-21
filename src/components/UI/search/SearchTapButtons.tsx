
import { MouseEventHandler } from 'react'
import { useSearchParams } from 'next/navigation'

import ControlButton from '../common/button/ControlButton'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function SearchTapButtons({ onClick }: PropsType) {
  const paramType = useSearchParams().get('type')
  const tapList = ['전체 검색', '인물별 검색', '키워드 검색']
  const type = ['all', 'author', 'keyword']
  return (
    <menu
      className="flex justify-center mt-[2.3em] p-[5px]"
      aria-label="탭 박스"
    >
      {tapList.map((tapName, i) => {
        return (
          <ControlButton
            ariaLabel={tapName + '버튼'}
            dataType={type[i]}
            key={tapName}
            onClick={onClick}
            className={`transition-all text-[gray]  p-[10px] max-w-[242px] w-full ${type[i] === paramType
                ? 'border-b-[2px] border-[tomato] text-white'
                : ''
              }`}
          >
            {tapName}
          </ControlButton>
        )
      })}
    </menu>
  )
}
