import { TextOptionType } from '@/types/store.type'
import { ChangeEvent } from 'react'

interface PropsType {
  textOptions: TextOptionType,
  onSetOption: (e: ChangeEvent<HTMLInputElement>, target: string) => void
}
export default function TextPositionStyler(props: PropsType) {

  const { textOptions, onSetOption } = props

  return (
    <article>
      <article className='max-w-[250px] w-full mt-[1em]'>
        <div className='flex justify-between items-center mb-[0.5em] font-bold'>
          <h2 aria-label='텍스트 높이' className="flex items-center text-[1em] pl-[5px] ">
            위치(X)
          </h2>
          <input min={0} max={999} onChange={(e) => onSetOption(e, 'textPositionX')} value={textOptions.textPositionX} maxLength={3} type="number" className='appearance-none w-[65px] rounded-[5px] p-[5px] h-[30px] focus:outline-none border border-slate-300  font-thin' />
        </div>
        {/* 텍스트 좌우 이동 */}
        <input
          value={textOptions.textPositionX}
          type="range"
          className="appearance-none border bg-gradient-to-r from-slate-300 to-slate-400 h-[10px] accent-slate-700  text-center rounded-[0.5em] max-w-[250px] w-full"
          min={0} max={999}
          placeholder="Default : 0"
          onChange={(e) => onSetOption(e, 'textPositionX')}
        />
      </article>
      <article className='max-w-[250px] w-full mt-[1em]'>
        <div className='flex justify-between items-center mb-[0.5em] font-bold'>
          <h2 aria-label='텍스트 높이' className="flex items-center text-[1em] pl-[5px] ">
            위치(Y)
          </h2>
          <input min={0} max={500} onChange={(e) => onSetOption(e, 'textPositionY')} value={textOptions.textPositionY} maxLength={3} type="number" className='appearance-none w-[65px] rounded-[5px] p-[5px] h-[30px] focus:outline-none border border-slate-300  font-thin' />
        </div>
        {/* 텍스트 상하 이동 */}
        <input
          value={textOptions.textPositionY}
          type="range"
          className="appearance-none border bg-gradient-to-r from-slate-300 to-slate-400 h-[10px] accent-slate-700  text-center rounded-[0.5em] max-w-[250px] w-full"
          min={0} max={500}
          placeholder="Default : 0"
          onChange={(e) => onSetOption(e, 'textPositionY')}
        />
      </article>

    </article>
  )
}

