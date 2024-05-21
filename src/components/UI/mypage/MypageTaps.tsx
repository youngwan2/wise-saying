'use client'

import { useMypageTapsStore } from '@/store/store'

import ButtonContainer from '../common/container/ButtonContainer'

const tapNameList = ['프로필', '작성한 명언', '개인정보']
export default function MypageTaps() {

  const { tapId, setTapId } = useMypageTapsStore()

  function handleSetTapId(i: number) {
    setTapId(i)
  }

  return (
    <ButtonContainer elementName='article' className="md:flex-col md:w-[40%] flex-row w-full border-[1px] border-[rgba(255,255,255,0.1)] text-start flex  ">
      {tapNameList.map((tapName, i) => {
        return (
          <button
            key={tapName}
            className={`text-start transition text-[1.25em] px-[1em] p-[5px] ${tapId === i
              ? 'bg-[rgba(255,255,255,0.1)] text-[white]'
              : 'text-[gray]'
              } `}
            onClick={() => handleSetTapId(i)}
          >
            {tapName}
          </button>
        )
      })}
    </ButtonContainer>
  )
}
