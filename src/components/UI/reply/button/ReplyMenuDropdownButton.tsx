import { MouseEventHandler } from "react";
import { HiDotsVertical, HiOutlineX } from "react-icons/hi";

interface PropsType {
    isShow: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
  }
  
export function ReplyMenuDropdownButton({ isShow, onClick }: PropsType) {
    return (
      <button
        onClick={onClick}
        className="absolute right-[5px] top-[0.5em]  hover:shadow-[0_0_0_1px_tomato] rounded-[50%] p-[5px]"
      >
        {isShow ? <HiOutlineX /> : <HiDotsVertical />}{' '}
      </button>
    )
  }
  