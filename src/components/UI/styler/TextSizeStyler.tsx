import { debounceCloser } from '@/utils/commonFunctions'
import { HiPaintBrush } from 'react-icons/hi2'

interface PropsType {
  sizeUnits: string[]
  setTextStyleState: (p: any) => void
  textStyle: any
}
export default function TextSizeStyler({
  sizeUnits,
  setTextStyleState,
  textStyle,
}: PropsType) {
  return (
    <article>
      <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]">
        <HiPaintBrush color="white" />{' '}
        <p className="ml-[0.5em]">글자 크기(단위)</p>
      </h2>
      <div className="flex">
        {/* 크기 변경 */}
        <input
          type="number"
          className="p-[5px] text-center rounded-[0.5em] shadow-[0_0px_0px_1px_black] max-w-[200px] w-full"
          placeholder="Default : 14px"
          onChange={(e) => {
            const size = Number(e.currentTarget.value)
            debounceCloser(size, 'size', textStyle, setTextStyleState, 500)
          }}
        />
        {/* 단위 변경 */}
        <label htmlFor="text-size" className="hidden"></label>
        <select
          className="bg-[#fae04b] ml-[5px] p-[5px] rounded-[10px]"
          id="text-size"
          onChange={(e) => {
            const unit = e.currentTarget.value
            setTextStyleState({ ...textStyle, unit })
          }}
        >
          {sizeUnits.map((unit) => {
            return <option key={unit}>{unit}</option>
          })}
        </select>
      </div>
    </article>
  )
}
