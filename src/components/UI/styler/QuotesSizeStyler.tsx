'use client'
import { useQuotesCardSizeStore } from '@/store/store'
import { useEffect, useState } from 'react'
import { HiScissors, HiX } from 'react-icons/hi'

interface PropsType {
  selectTapNum: number
}
export default function QuotesSizeStyler({ selectTapNum }: PropsType) {
  const setSizeStore = useQuotesCardSizeStore((state) => state.setSize)
  const [size, setSize] = useState({
    width: 300,
    height: 400,
  })

  useEffect(() => {
    setSizeStore(size)
  }, [setSizeStore, size])

  // 디바운스 클로저
  function debounce() {
    let timerId: NodeJS.Timeout

    return function (newValue: number, targetName: string, delayTime: number) {
      clearTimeout(timerId)

      timerId = setTimeout(() => {
        console.log('디바운스 적용 후', newValue)
        setSize({ ...size, [targetName]: newValue })
      }, delayTime)
    }
  }

  // 디바운스 함수 호출 : debonce 함수의 클로저 반환하고 이를 활용.
  const debounceFunWrapper = debounce()

  return (
    <article
      className={`${selectTapNum === 2 ? 'block' : 'hidden'} transition-all`}
    >
      <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]">
        <HiScissors color="white" />{' '}
        <p className="ml-[0.5em]">카드 크기 변경</p>
      </h2>
      <div className="flex items-center text-center">
        {/* 캔버스 넓이 */}
        <input
          aria-label="카드 넓이 사용자 입력창"
          className="p-[5px] mb-[0.5em] max-w-[150px] w-full rounded-[10px] "
          type="number"
          placeholder="넓이(기본: 300px)"
          onChange={(e) => {
            const width = Number(e.currentTarget.value)
            console.log('디바운스 적용전:', width)
            debounceFunWrapper(width, 'width', 500)
          }}
        ></input>
        <HiX className="text-[2em] ml-[5px] pb-[5px]" color="white" />

        {/* 캔버스 높이 */}
        <input
          aria-label="카드 눂이 사용자 입력창"
          className="ml-[3px] p-[5px] mb-[0.5em] max-w-[150px] w-full rounded-[10px]"
          type="number"
          placeholder="높이(기본: 400px)"
          onChange={(e) => {
            const height = Number(e.currentTarget.value)

            debounceFunWrapper(height, 'height', 1000)
          }}
        ></input>
      </div>
    </article>
  )
}
