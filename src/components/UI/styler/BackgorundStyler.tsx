
import BackgroundColorStyler from './BackgroundColorStyler'
import BackgroundSizeStyler from './BackgroundSizeStyler'

interface PropsType {
  selectTapNum: number
}
export default function BackgroundStyler({ selectTapNum }: PropsType) {

  return (
      <div
        className={`${selectTapNum === 1 ? 'visible ' : 'invisible absolute'} flex flex-col justify-between `}
      >
        <BackgroundColorStyler />
        <BackgroundSizeStyler />
      </div>
  )
}
