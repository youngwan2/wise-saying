import { HTMLAttributes, ReactNode } from "react"

interface PropsType extends HTMLAttributes<HTMLElement> {
    elementName: React.ElementType
    children:ReactNode
 }
  
export default function FormTitle({elementName, children,...props}:PropsType) {
    const Element = elementName
return (
  <Element {...props}>
    {children}
</Element>
)}