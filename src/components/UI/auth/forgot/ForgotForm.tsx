import { ReactNode } from "react"

interface PropsType {
    action:(formData: FormData) => Promise<void>
    className:string
    children:ReactNode
 }
  
export default function ForgotForm({action, className,children}:PropsType) {
return (
  <form action={action} className={className}>
    {children}
</form>
)}