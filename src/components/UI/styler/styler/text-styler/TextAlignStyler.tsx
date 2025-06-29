import { useQuotesTextAlign } from '@/store/stylerStore'
import { MouseEvent, useState } from "react"
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi"
import { HiXMark } from "react-icons/hi2"


const aligns =
    [
        {
            type: 'center',
            icon: <BiAlignMiddle />,
            label: '가운데'
        }, {
            type: 'right',
            icon: <BiAlignRight />,
            label: '오른쪽'

        }, {
            type: 'left',
            icon: <BiAlignLeft />,
            label: '왼쪽'

        }
    ]

export default function TextAlignStyler() {

    const [isShowOptions, setIsShowOptions] = useState(false)
    const { align, setAlign } = useQuotesTextAlign()

    function onClickSetAlign(e: MouseEvent<HTMLButtonElement>) {
        const type = e.currentTarget.dataset.type || null
        type && setAlign(type)
        setIsShowOptions(false)
    }

    function onClickSetIsShowOptions() {
        setIsShowOptions(!isShowOptions)
    }

    const currentAlign = aligns.find(a => a.type === align) || aligns[0]

    return (
        <div className="flex flex-col space-y-2 flex-1 relative">
            <label className="text-sm font-medium text-gray-700">텍스트 정렬</label>

            <button
                type="button"
                onClick={onClickSetIsShowOptions}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white w-full"
            >
                <div className="flex items-center gap-2">
                    {currentAlign.icon}
                    <span className="text-sm text-gray-700">{currentAlign.label}</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>            {isShowOptions && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-2">
                        {aligns.map((alignOption) => (
                            <button
                                key={alignOption.type}
                                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors"
                                onClick={onClickSetAlign}
                                data-type={alignOption.type}
                            >
                                {alignOption.icon}
                                <span className="text-sm text-gray-700">{alignOption.label}</span>
                                {align === alignOption.type && (
                                    <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}