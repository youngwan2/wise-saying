import { MouseEventHandler } from "react"

interface PropsType {
    onClick:MouseEventHandler<HTMLButtonElement>
 }
  
export default function QuoteCommentationButton({onClick}:PropsType) {
return (
  <button onClick={onClick} className="absolute top-[0.75rem] left-3 text-white hover:shadow-[0_0_0_1px_tomato] px-2 ">
    AI 해설
</button>
)}