import { MouseEventHandler } from 'react'
import { HiDocumentDownload } from 'react-icons/hi'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function DownloadButton({ onClick }: PropsType) {
  return (
    <button
      onClick={onClick}
      className="hover: h-[40px] rounded-[5px] border border-[rgba(255,255,255,0.2)] px-[5px] flex items-center text-white hover:bg-[#dbdada23] mr-[6px]"
    >
      <HiDocumentDownload
        color="white"
        className="mr-[2px] text-[1.5em]  p-[1px] rounded-[10px]"
      />
    </button>
  )
}
