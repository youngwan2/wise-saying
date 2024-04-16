import { MouseEventHandler } from "react";
import { HiTrophy } from "react-icons/hi2";



interface PropsType {
    onClick: MouseEventHandler<HTMLButtonElement>
  }
export default function QuoteImgUploadButton({onClick}:PropsType){
    return(
        <button
        onClick={onClick}
        className="h-[40px] rounded-[5px] border border-[rgba(255,255,255,0.2)] p-[5px] flex items-center text-white hover:bg-[#dbdada23]"
      >
        <HiTrophy
          color="white"
          className="mr-[2px] text-[1.5em] p-[1px] rounded-[10px]"
        />
      </button>
    )
}