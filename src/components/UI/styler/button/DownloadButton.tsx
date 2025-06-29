import { MouseEventHandler } from 'react'
import { HiDocumentDownload } from 'react-icons/hi'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function DownloadButton({ onClick }: PropsType) {
  return (
    <button
      onClick={onClick}
      style={{ zIndex: 100 }}
      className="absolute top-3 right-6 h-[40px] rounded-[5px] border border-gray-300 px-[10px] flex items-center bg-[#1E306A] hover:bg-[#2A54AE] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      aria-label="이미지 다운로드"
    >
      <HiDocumentDownload
        color="white"
        className="mr-[6px] text-[1.5em] p-[1px] rounded-[10px] drop-shadow"
      />
      <span className="font-semibold text-base">다운로드</span>
    </button>
  )
}
