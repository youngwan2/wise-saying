import { MouseEventHandler, ReactNode } from "react"

interface PropsType {
    ariaLabel: string
    className?: string
    type?: "submit" | "reset" | "button"
    dataType?:string |number
    children?: ReactNode
    title?:string
    onClick?: (MouseEventHandler<HTMLButtonElement>) | (() => void)

}

export default function ControlButton({ title,onClick, ariaLabel,  dataType, className, type, children }: PropsType) {
    return (
        <button
            title={title}
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