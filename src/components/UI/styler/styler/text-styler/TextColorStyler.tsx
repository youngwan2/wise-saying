import { useState } from 'react'
import { createPortal } from 'react-dom'
import { TextStyleType } from './TextStyler'
import { PhotoshopPicker } from 'react-color'
import { useQuotesTextStyleStore } from '@/store/stylerStore'


interface PropsType {
  setTextStyleState: (p: TextStyleType) => void
  textStyle: TextStyleType
}
export default function TextColorStyler({
  setTextStyleState,
  textStyle,
}: PropsType) {
  const [displayState, setDisplayState] = useState(false)
  const [confirmedColor, setConfirmedColor] = useState<any>()

  const { color } = useQuotesTextStyleStore()

  return (
    <div className="flex flex-col space-y-2 flex-1">
      <label className="text-sm font-medium text-gray-700">텍스트 색상</label>

      <button
        type="button"
        className="flex items-center gap-3 px-3 py-[0.41rem] border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white w-full"
        onClick={() => setDisplayState(true)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-700">T</span>
          <div
            className="w-6 h-6 rounded border border-gray-200"
            style={{ backgroundColor: color }}
          />
        </div>
        <span className="text-sm text-gray-600">색상 선택</span>
      </button>      {displayState &&
        createPortal(
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[9999999999999999]">
            <div className="relative">
              <PhotoshopPicker
                onChange={(color) => setConfirmedColor(color)}
                onCancel={() => setDisplayState(false)}
                color={confirmedColor}
                onAccept={() => {
                  const color = confirmedColor?.hex || ''
                  setConfirmedColor(color)
                  setDisplayState(false)
                  setTextStyleState({ ...textStyle, color })
                }}
              />
            </div>
          </div>,
          document.body
        )
      }
    </div>
  )
}
