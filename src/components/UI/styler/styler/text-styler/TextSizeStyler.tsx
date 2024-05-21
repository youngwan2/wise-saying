import { debounceCloser } from '@/utils/common-func'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import TextSizeList from '../../list/TextSizeList'

interface PropsType {
  setTextStyleState: (p: any) => void
  textStyle: any
}

const DEFAULT_TEXT_SIZE = '14.3'
export default function TextSizeStyler({
  setTextStyleState,
  textStyle,
}: PropsType) {


  const [isShowSelector, setIsShowSelector] = useState(false)
  const [textSizes, _] = useState([0,7,
    9,
    11,
    14,
    18,
    24,
    28,
    32,
    40,
    48,
    54,
    60,
    68,
    74,
    78,
    84,
    90,
    100,])
  const inputRef = useRef<HTMLInputElement>(null)


  function onClickTextSizeSelect(size: number) {
    if (!inputRef.current) return
    debounceCloser(size, 'size', textStyle, setTextStyleState, 500)
    inputRef.current.value = size.toString()


  }
  function onClickSetDisplaySelect(isDisplay: boolean) {
    setIsShowSelector(isDisplay)
  }

  function onSetTextSize(e: ChangeEvent<HTMLInputElement>) {
    const size = Number(e.currentTarget.value)
    debounceCloser(size, 'size', textStyle, setTextStyleState, 500)
  }

  function decrease() {
    if (!inputRef.current) return
    let value = Number(inputRef.current.value)
    const size = --value
    if (size < 1) return
    debounceCloser(size, 'size', textStyle, setTextStyleState, 500)
    inputRef.current.value = (size).toString()
  }
  
  function increase() {
    if (!inputRef.current) return
    let value = Number(inputRef.current.value)
    const size = ++value
    if (size > 100) return
    debounceCloser(size, 'size', textStyle, setTextStyleState, 500)
    inputRef.current.value = (size).toString()
  }

  useEffect(() => {
    inputRef.current && (inputRef.current.value = DEFAULT_TEXT_SIZE)
  }, [])


  return (
    <article className='max-w-[150px] ml-[0.51em] px-[10px] rounded-sm flex flex-col items-center relative  border'>
      <h2 aria-label='텍스트 크기'  className="flex items-center text-[1.2em] ">
      </h2>
      <div className="flex  rounded-[3px]">
        <button className='text-white hover:text-[#ffcdc5]  text-[1.15em] pr-[5px]' onClick={decrease}><HiMinus /></button>
        {/* 크기 변경 */}
        <input
          onClick={() => onClickSetDisplaySelect(!isShowSelector)}
          type="number"
          ref={inputRef}
          className="p-[15px] text-center rounded-[3px] focus:outline-none bg-transparent text-white h-[35px] max-w-[100px] w-full"
          onChange={onSetTextSize}
        />
        <button className='text-white hover:text-[#97ef97] text-[1.15em] pl-[5px]' onClick={increase}><HiPlus /></button>
      </div>
      <TextSizeList textSizes={textSizes} isShowSelector={isShowSelector} onClickTextSizeSelect={onClickTextSizeSelect} onClickDisplaySelect={onClickSetDisplaySelect} />
    </article>
  )
}
