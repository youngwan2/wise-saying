import { useQuotesStrokeStyleStore } from "@/store/store"
import { debounceCloser } from "@/utils/common-func"
import { ChangeEvent, useRef } from "react"
import { HiMinus, HiPlus } from "react-icons/hi2"

const DEFAULT_TEXT_SIZE = '1'
export default function TextStrokeThicknessStyler() {

    const inputRef = useRef<HTMLInputElement>(null)

    const setThickness = useQuotesStrokeStyleStore(
        (state) => state.setStrokeThicknessStyle,
    )

    function onSetThickness(e: ChangeEvent<HTMLInputElement>) {
        const thickness = Number(e.currentTarget.value)
        debounceCloser(thickness, '', null, setThickness, 500)
    }


    function decrease() {
        if (!inputRef.current) return
        let value = Number(inputRef.current.value)
        const size = --value
        if (size < 1) return
        debounceCloser(size, '', null, setThickness, 500)
        inputRef.current.value = (size).toString()


    }
    function increase() {
        if (!inputRef.current) return
        let value = Number(inputRef.current.value)
        const size = ++value
        if (size > 100) return
        debounceCloser(size, '', null, setThickness, 500)
        inputRef.current.value = (size).toString()
    }

    return (

        <article className='max-w-[150px] px-[10px] rounded-sm flex items-center relative ml-[0.5em] border '>
                <button className='text-white hover:text-[#ffcdc5]  text-[1.15em] pr-[5px]' onClick={decrease}><HiMinus /></button>
                <input
                    value={DEFAULT_TEXT_SIZE}
                    min={0}
                    ref={inputRef}
                    type="number"
                    className="p-[15px] text-center rounded-[3px] focus:outline-none bg-transparent text-white h-[35px] max-w-[100px] w-full"
                    onChange={onSetThickness}
                />
                <button className='text-white hover:text-[#97ef97] text-[1.15em] pl-[5px]' onClick={increase}><HiPlus /></button>
        </article>
    )
}