import { ReactNode } from "react"

interface PropsType {
    elementName: React.ElementType
    children: ReactNode
}

export default function Card({ elementName, children, ...props }: PropsType) {
    const Card = elementName
    return (
        <Card {...props}>
            {children}
        </Card>
    )
}