import { BsBrush, BsCardImage, BsUpload } from 'react-icons/bs'

interface PropsType {
  setSelectTapNum: (p: number) => void
  selectTapNum: number
}

export default function StylerTaps({
  selectTapNum,
  setSelectTapNum,
}: PropsType) {


  const taps = [
    { num: 0, text: <div className='flex items-center gap-1'><BsBrush className="mr-2" />스타일</div> },
    { num: 1, text: <div className='flex items-center gap-1'><BsCardImage className="mr-2" />배경</div> },
    { num: 2, text: <div className='flex items-center gap-1'><BsUpload className="mr-2" />업로드</div> },
  ]

  function handleTapSlect(num: number) {
    setSelectTapNum(num)

  } return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
      {taps.map((tap) => {
        return (
          <button
            onClick={() => handleTapSlect(tap.num)}
            key={tap.num}
            className={`
            ${selectTapNum === tap.num
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } flex-1 py-3 px-4 rounded-md transition-all duration-200 ease-in-out font-medium`}
          >
            {tap.text}
          </button>
        )
      })}
    </div>
  )
}
