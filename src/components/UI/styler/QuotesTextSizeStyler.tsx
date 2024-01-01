import { HiPaintBrush } from 'react-icons/hi2'

interface PropsType {
    sizeUnits: string[]
    setTextStyleState:(p:any) => void
    textStyle: any
}
export default function QuotesTextSizeStyler({ sizeUnits, setTextStyleState, textStyle}:PropsType){

    return (
        <article className='ml-[1em]'>
        <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">글자 크기(단위)</p></h2>
        {/* 크기 변경 */}
        <input type="number" className='p-[1px] w-[108px] text-center' placeholder='Default : 14px' onChange={(e) => {
            const size = Number(e.currentTarget.value)
            setTextStyleState({...textStyle, size})
        }} />
        {/* 단위 변경 */}
        <label htmlFor="text-size"></label>
        <select className='bg-[#dad8d8] ml-[5px]' id='text-size' onChange={(e) => {
            const unit = e.currentTarget.value
            setTextStyleState({...textStyle, unit})
        }}>
            {sizeUnits.map((unit) => {
                return <option key={unit}>{unit}</option>
            })}
        </select>
    </article>
    )
}