import { BiCircle } from "react-icons/bi"

interface PropsType {
    title: string
    message: string
}

export default function LoadingMessage({ title, message }: PropsType) {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg my-3">
            <BiCircle className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
            <p className="text-gray-500">{message}</p>
        </div>
    )
}