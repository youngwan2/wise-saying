import { BiCircle } from "react-icons/bi"

interface PropsType {
    title?: string
    message?: string
}

export default function LoadingMessage({ title='데이터를 조회중입니다..', message='현재 최신 데이터 목록을 불러오고 있습니다. 잠시만 기다려 주세요.' }: PropsType) {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg my-3">
            <BiCircle className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
            <p className="text-gray-500">{message}</p>
        </div>
    )
}