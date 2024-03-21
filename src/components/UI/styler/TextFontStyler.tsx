import { HiPaintBrush } from 'react-icons/hi2'
import type { TextStyleType } from './TextStyler'

interface PropsType {
  setTextStyleState: (p: TextStyleType) => void
  textStyle: TextStyleType
}

export default function TextFontStyler({
  setTextStyleState,
  textStyle,
}: PropsType) {
  const fontFamilies = [
    'TTHakgyoansimUndongjangL',
    'TTHakgyoansimMoheomgaB',
    'Dovemayo_gothic',
    'YEONGJUSeonbiTTF',
    'kdg_Medium',
    'Arial',
    'cursive', // 손으로 쓴 것 같은 서체
    'Charcoal',
    'sans-serif', // 삐침 없는 글자
    'MS Sans Serif',
    'MS Serif',
    'serif', // 삐침 있는 글자
    '궁서',
    '궁서체',
    '고딕',
    '고딕체',
    'dotum', // 돋움
    'dotumche', // 돋움체
    'gulim', // 굴림
    
  ]

  const fontStyles = ['fill', 'stroke', 'hybrid']

  return (
    <article>
      {/* 폰트 */}
      <article>
        <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]">
          <HiPaintBrush color="white" /> <p className="ml-[0.5em]">폰트</p>
        </h2>
        <select
          className="p-[5px] text-center rounded-[0.5em] shadow-[0_0px_0px_1px_black] w-[200px]"
          onChange={(e) => {
            const font = e.currentTarget.value
            setTextStyleState({ ...textStyle, font })
          }}
        >
          {fontFamilies.map((font) => {
            return (
              <option value={font} key={font}>
                {font}
              </option>
            )
          })}
        </select>
      </article>
      {/* 폰트 스타일 */}
      <article>
        <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]">
          <HiPaintBrush color="white" />{' '}
          <p className="ml-[0.5em]">폰트 스타일</p>
        </h2>
        <select
          className="p-[5px] text-center rounded-[0.5em] shadow-[0_0px_0px_1px_black] w-[200px] "
          id=""
          onChange={(e) => {
            const fontStyle = e.currentTarget.value
            setTextStyleState({ ...textStyle, fontStyle })
          }}
        >
          {fontStyles.map((fontStyle) => {
            return (
              <option value={fontStyle} key={fontStyle}>
                {fontStyle}
              </option>
            )
          })}
        </select>
      </article>
    </article>
  )
}
