import { HTMLAttributes, ReactNode } from "react"

interface PropsType extends HTMLAttributes<HTMLElement> {
    htmlFor: string
    children: ReactNode
}

export default function Label({ htmlFor, children, ...props }: PropsType) {
    return (
        <label htmlFor={htmlFor} {...props}>
            {children}
        </label>
    )
}