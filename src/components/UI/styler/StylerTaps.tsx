import styles from './styler.module.css'
import { useState } from 'react'
import { BsBrush, BsCardImage } from 'react-icons/bs'

interface PropsType {
  setSelectTapNum: (p: number) => void
  selectTapNum: number
}

export default function StylerTaps({
  selectTapNum,
  setSelectTapNum,
}: PropsType) {
  const [taps] = useState([
    { num: 0, text: <BsBrush/>},
    { num: 1, text: <BsCardImage/> },
  ])
  return (
    <article className="fixed top-[-3.1em] right-0 z-[1000] flex justify-center mt-[1em] text-[white] rounded-tl-[10px] rounded-tr-[10px] backdrop-grayscale-[50%] ">
      {taps.map((tap) => {
        return (
          <button
            onClick={() => {
              setSelectTapNum(tap.num)
            }}
            key={tap.num}
            className={`
            ${styles.styler_tap_buttons}
            ${
              selectTapNum === tap.num
                ? 'bg-[white] text-[#162557] font-bold'
                : 'bg-[transparent]'
            } first:rounded-tl-[10px] last:rounded-tr-[10px] text-[1.5em] p-[5px] px-[10px] transition-all text-center hover:bg-[#4f4e4ea8] hover:text-white`}
          >
            {tap.text}
          </button>
        )
      })}
    </article>
  )
}
