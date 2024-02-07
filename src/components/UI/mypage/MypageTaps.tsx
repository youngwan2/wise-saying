'use client'

import { useMypageTapsStore } from '@/store/store'
import { useState } from 'react'

export default function MypageTaps() {
  const [tapNameList] = useState(['프로필', '나의 명언', '회원정보'])
  const setTapId = useMypageTapsStore((state) => state.setTapId)
  const tapId = useMypageTapsStore((state) => state.tapId)
  return (
    <article
      className="mt-[2em] text-center"
      aria-label="마이페이지의 페이지 전환 탭 버튼 테두리"
    >
      {tapNameList.map((tapName, i) => {
        return (
          <button
            key={tapName}
            className={` transition text-[1.25em] mx-[1em]  ${
              tapId === i
                ? 'shadow-[0_2px_0_0_tomato] font-bold text-[white]'
                : 'text-[gray]'
            } `}
            onClick={() => {
              setTapId(i)
            }}
          >
            {tapName}
          </button>
        )
      })}
    </article>
  )
}
