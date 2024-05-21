import { HTMLAttributes } from "react"

interface PropsType extends HTMLAttributes<HTMLElement> {
    elementName: React.ElementType
}

export default function Container({ elementName, children, ...props }: PropsType) {
    const Container: React.ElementType = elementName

    return (
        <Container {...props}>
            {children}
        </Container>
    )
}