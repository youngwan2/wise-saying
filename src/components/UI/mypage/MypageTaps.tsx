'use client'

import { useMypageTapsStore } from '@/store/store'
import { useState } from 'react'

export default function MypageTaps() {
  const [tapNameList] = useState(['프로필','작성한 명언', '개인정보'])
  const setTapId = useMypageTapsStore((state) => state.setTapId)
  const tapId = useMypageTapsStore((state) => state.tapId)
  return (
    <article
      className="md:flex-col md:w-[40%] flex-row w-full border-[1px] border-[rgba(255,255,255,0.1)] text-start flex  "
      aria-label="마이페이지의 페이지 전환 탭 버튼 테두리"
    >
      {tapNameList.map((tapName, i) => {
        return (
          <button
            key={tapName}
            className={`text-start transition text-[1.25em] px-[1em] p-[5px] ${
              tapId === i
                ? 'bg-[rgba(255,255,255,0.1)] text-[white]'
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
