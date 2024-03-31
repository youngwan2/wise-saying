import { HiArrowDown } from 'react-icons/hi2'
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
    {
      type: '네이버 나눔 글씨',
      fonts: [
        'NanumGothicLight',
        'NanumSquareNeo-aLt',
        'NanumSquareNeo-bRg',
        'NanumSquareNeo-cBd',
        'NanumSquareNeo-dEb',
        'NanumSquareNeo-eHv',
        'NanumMyeongjo',
        'NanumMyeongjoBold',
        'NanumMyeongjoExtraBold',
      ]
    },
    {
      type: '네이버 나눔 손글씨',
      fonts: [
        'GrandfatherSharingStyle',
        'BearStyle',
        'RestartStyle',
        'DeliciousStyle',
        'SkinPeelingStyle',
        'BossWatchfulEyeStyle',
        'DiligentStyle',
        'OvertimeWorkingKimJuimStyle',
        'HopefulGatheringStyle',
        'PatriotismOfSouthKoreaStyle'
      ]
    },

  ]


  const fontStyles = ['fill', 'stroke', 'hybrid']

  return (
    <>
      <article className='flex flex-col relative pb-[10px] justify-center'>
        {/* 폰트 */}
        <span className='absolute top-[0.5em] right-[0.5em]'><HiArrowDown /> </span>

        <select
          className="p-[5px] text-center rounded-[5px] shadow-[0_0px_0px_1px_black] w-full  appearance-none focus:outline-none focus:bg-[#e3e1e1]"
          onChange={(e) => {
            const font = e.currentTarget.value
            setTextStyleState({ ...textStyle, font })
          }}
        >
          <optgroup label={fontFamilies[0].type}>
            {fontFamilies[0].fonts.map((font) => {
              return <option key={font}>{font}</option>
            })}
          </optgroup>
          <optgroup label={fontFamilies[1].type}>
            {fontFamilies[1].fonts.map((font) => {
              return <option key={font}>{font}</option>
            })}
          </optgroup>
        </select>
        {/* 폰트 스타일 */}
        <span className='absolute top-[2.85em] right-[0.5em]'><HiArrowDown /> </span>
        <select
          className="p-[5px] text-center rounded-[5px] mt-[0.25em] shadow-[0_0px_0px_1px_black] w-full  appearance-none focus:outline-none focus:bg-[#e3e1e1]"
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
    </>
  )
}
