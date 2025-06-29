
import BackgroundColorStyler from './BackgroundColorStyler'
import BackgroundSizeStyler from './BackgroundSizeStyler'

interface PropsType {
  selectTapNum: number
}
export default function BackgroundStyler({ selectTapNum }: PropsType) {

  return (
    <div
      className={`${selectTapNum === 1 ? 'block' : 'hidden'} space-y-6`}
    >
      <div className="space-y-4">
        <h3 className='text-gray-900 font-semibold text-lg'>배경 색상</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <BackgroundColorStyler />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className='text-gray-900 font-semibold text-lg'>배경 크기</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <BackgroundSizeStyler />
        </div>
      </div>
    </div>
  )
}
