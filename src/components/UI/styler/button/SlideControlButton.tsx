import { MouseEventHandler, ReactNode } from "react"

interface PropsType {
    onClick: MouseEventHandler<HTMLButtonElement>
    children:ReactNode
    rightMargin?:string
    ariaLabel:string
}

export default function SlideControlButton({ onClick, children, rightMargin, ariaLabel }: PropsType) {
    return (
        <button
        aria-label={ariaLabel}
        className={`p-[8px] rounded-[5px] px-[10px] hover:bg-[white] hover:font-bold hover:text-[#162557] border ${rightMargin|| 'mr-0'}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
}