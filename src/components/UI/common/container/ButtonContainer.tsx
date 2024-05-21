import { ButtonHTMLAttributes, ReactNode } from "react"

interface PropsType  extends ButtonHTMLAttributes<HTMLElement>  {
    elementName:  React.ElementType
    children: ReactNode
}

export default function ButtonContainer({ elementName, children, ...props }: PropsType) {
    const Container: React.ElementType = elementName;
    return (
        <Container {...props}>
            {children}
        </Container>
    )
}