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
    <div className='space-y-4'>
      <div className='space-y-2'>
        <label className="text-sm font-medium text-gray-700">폰트 패밀리</label>
        <div className='relative'>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900"
            onChange={(e) => {
              const font = e.currentTarget.value
              setTextStyleState({ ...textStyle, font })
            }}
          >
            <optgroup label={fontFamilies[0].type}>
              {fontFamilies[0].fonts.map((font) => {
                return <option key={font} value={font}>{font}</option>
              })}
            </optgroup>
            <optgroup label={fontFamilies[1].type}>
              {fontFamilies[1].fonts.map((font) => {
                return <option key={font} value={font}>{font}</option>
              })}
            </optgroup>
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <HiArrowDown className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <label className="text-sm font-medium text-gray-700">폰트 스타일</label>
        <div className='relative'>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900"
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
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <HiArrowDown className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
