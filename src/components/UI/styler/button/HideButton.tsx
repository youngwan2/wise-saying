import { MouseEventHandler } from "react"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2"

interface PropsType {
    isShowStyler: boolean
    onToggle: MouseEventHandler<HTMLButtonElement>
}
export default function HideButton({ isShowStyler, onToggle }: PropsType) {

    return (
        <button
            onClick={onToggle}
            className={`flex items-center px-2 justify-center h-10 rounded-lg transition-all duration-200 ease-in-out
                ${!isShowStyler
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
        >
            {!isShowStyler ?
                <div className="flex items-center gap-2">
                    <HiArrowLeft className="text-lg" />
                    <span>편집도구 열기</span>
                </div>
                :
                <div className="flex items-center gap-2">
                    <HiArrowRight className="text-lg" />
                    <span>편집도구 닫기</span>
                </div>

            }

        </button>
    )
}