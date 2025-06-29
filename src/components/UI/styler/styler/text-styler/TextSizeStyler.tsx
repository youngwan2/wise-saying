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
  const [textSizes, _] = useState([0, 7,
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
    <div className='flex flex-col space-y-2 flex-1 relative'>
      <label className="text-sm font-medium text-gray-700">글자 크기</label>

      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
        <button
          className='px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors'
          onClick={decrease}
        >
          <HiMinus className="text-sm" />
        </button>

        <input
          onClick={() => onClickSetDisplaySelect(!isShowSelector)}
          type="number"
          ref={inputRef}
          className="flex-1 p-2 text-center border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset text-gray-900"
          onChange={onSetTextSize}
          min="1"
          max="100"
        />

        <button
          className='px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors'
          onClick={increase}
        >
          <HiPlus className="text-sm" />
        </button>
      </div>

      <TextSizeList
        textSizes={textSizes}
        isShowSelector={isShowSelector}
        onClickTextSizeSelect={onClickTextSizeSelect}
        onClickDisplaySelect={onClickSetDisplaySelect}
      />
    </div>
  )
}
