import { HiPaintBrush } from 'react-icons/hi2'

interface PropsType {
  sizeUnits: string[]
  setTextStyleState: (p: any) => void
  textStyle: any
}
export default function QuotesTextSizeStyler({
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
      {/* 크기 변경 */}
      <input
        type="number"
        className="p-[5px] text-center rounded-[0.5em] shadow-[0_0px_0px_1px_black] w-[200px]"
        placeholder="Default : 14px"
        onChange={(e) => {
          const size = Number(e.currentTarget.value)
          setTextStyleState({ ...textStyle, size })
        }}
      />
      {/* 단위 변경 */}
      <label htmlFor="text-size"></label>
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
    </article>
  )
}
