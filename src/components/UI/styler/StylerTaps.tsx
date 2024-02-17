import { useState } from 'react'

interface PropsType {
  setSelectTapNum: (p: number) => void
  selectTapNum: number
}

export default function StylerTaps({
  selectTapNum,
  setSelectTapNum,
}: PropsType) {
  const [taps] = useState([
    { num: 0, text: '글자' },
    { num: 1, text: '배경' },
    { num: 2, text: '사이즈' },
  ])
  return (
    <article className="flex justify-center mt-[1em] text-[white]">
      {taps.map((tap) => {
        return (
          <button
            onClick={() => {
              setSelectTapNum(tap.num)
            }}
            key={tap.num}
            className={`${
              selectTapNum === tap.num
                ? 'bg-[#f8e787] text-[black] font-bold'
                : 'bg-[transparent]'
            } border text=white p-[5px] px-[10px] w-[100px] transition-all`}
          >
            {tap.text}
          </button>
        )
      })}
    </article>
  )
}
