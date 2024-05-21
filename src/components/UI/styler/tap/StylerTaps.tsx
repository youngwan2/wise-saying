import styles from '../styler.module.css'

import { BsBrush, BsCardImage, BsUpload } from 'react-icons/bs'

interface PropsType {
  setSelectTapNum: (p: number) => void
  selectTapNum: number
}

export default function StylerTaps({
  selectTapNum,
  setSelectTapNum,
}: PropsType) {


  const taps = [
    { num: 0, text: <BsBrush /> },
    { num: 1, text: <BsCardImage /> },
    { num: 2, text: <BsUpload /> },
  ]

  function handleTapSlect(num:number){
    setSelectTapNum(num)

  }

  return (
    <div className="bg-[tomato] fixed top-[-3.3em] right-[-1.2px] z-[1000] flex justify-center mt-[1em] text-[white] rounded-tl-[10px] rounded-tr-[10px] backdrop-grayscale-[50%] border-t ">
      {taps.map((tap) => {
        return (
          <button
            onClick={()=>handleTapSlect(tap.num)}
            key={tap.num}
            className={`
            ${styles.styler_tap_buttons}
            ${selectTapNum === tap.num
                ? 'bg-[white] text-[#162557] font-bold hover:bg-[#e3e1e1]'
                : 'bg-[transparent] hover:text-white hover:bg-[#f77e69]'
              } first:rounded-tl-[10px] last:rounded-tr-[10px] border text-[1.5em] p-[5px] px-[10px] transition-all text-center `}
          >
            {tap.text}
          </button>
        )
      })}
    </div>
  )
}
