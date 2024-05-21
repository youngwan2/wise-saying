import { ReactNode } from "react"

interface PropsType {
  isPass: boolean
  children: ReactNode
}

export default function ValidityMessage({
  isPass,
  children
}: PropsType) {

  if (isPass)
    return (
      <span className="font-sans inline-block px-[5px] text-[#56e146] text-[14.3px] ml-[3.2em]">
        {children}
      </span>
    )

  else return (
    <span className="font-sans text-[#f25555]  ml-[3.6em] text-[14.3px] inline-block">
      {children}
    </span>
  )
}
