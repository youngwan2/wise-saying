import { TextOptionType } from '@/types/store.type'
import { ChangeEvent } from 'react'


interface PropsType {
    textOptions: TextOptionType,
    onSetOption: (e:ChangeEvent<HTMLInputElement>, target:string)=> void
}
export default  function TextLengthStyler({ textOptions, onSetOption }: PropsType) {
    return (
        <article className='max-w-[250px] w-full mt-[1em]'>
            <div className='flex justify-between items-center mb-[0.5em] pl-[5px] '>
                <h2 aria-label='텍스트 높이' className="flex items-center text-[1em] font-bold ">
                    길이
                </h2>
                <input
                    onChange={(e) => onSetOption(e, 'textLength')}
                    value={textOptions.textLength}
                    min={0}
                    max={100}
                    maxLength={100}
                    type="number"
                    className='appearance-none w-[65px] rounded-[5px] p-[5px] h-[30px] focus:outline-none border border-slate-300 text-black' />
            </div>
            <input
                value={textOptions.textLength}
                min={0}
                max={100}
                type="range"
                className="appearance-none border bg-gradient-to-r from-slate-300 to-slate-400 h-[10px] accent-slate-700  text-center rounded-[0.5em] max-w-[250px] w-full"
                onChange={(e) => onSetOption(e, 'textLength')}
            />
        </article>
    )
}


