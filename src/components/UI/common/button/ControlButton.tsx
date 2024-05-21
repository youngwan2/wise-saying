import { MouseEventHandler, ReactNode } from "react"

interface PropsType {
    ariaLabel: string
    className?: string
    type?: "submit" | "reset" | "button"
    dataType?:string |number
    children?: ReactNode
    onClick?: (MouseEventHandler<HTMLButtonElement>) | (() => void)

}

export default function ControlButton({ onClick, ariaLabel,  dataType, className, type, children }: PropsType) {
    return (
        <button
            type={type}
            data-type={dataType}
            onClick={onClick}
            className={className ?? 'flex items-center hover:bg-[tomato]  mt-[0.25em] hover:text-[white] rounded-[0.3em] p-[5px]'}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}