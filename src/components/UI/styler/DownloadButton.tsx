import { MouseEventHandler } from 'react'
import { HiDocumentDownload } from 'react-icons/hi'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function DownloadButton({ onClick }: PropsType) {
  return (
    <button
      onClick={onClick}
      className="
         relative left-[50%] translate-x-[-50%] hover:bg-[#f47058]
         text-white shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] flex p-[0.25em] pr-[0.5em] mt-[1.25em] text-[16px] rounded-[10px] items-center bg-[tomato] "
    >
      <HiDocumentDownload
        color="white"
        className="mr-[2px] bg-[tomato] p-[1px] rounded-[10px]"
      />
      다운로드
    </button>
  )
}
