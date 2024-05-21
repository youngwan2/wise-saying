import { ReactNode } from "react"

interface PropsType {
  children: ReactNode
}
export default function SearchResultMeg({
  children
}: PropsType) {
  return (
    <span className="text-[14px]">
      {children}
    </span>
  )
}




