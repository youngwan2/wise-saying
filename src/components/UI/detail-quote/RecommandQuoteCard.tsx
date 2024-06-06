import styles from './Quotes.module.css'

import { ItemsType } from "@/types/items.types"
import { hoverAnimation } from "@/utils/common-func"
import { MouseEventHandler } from "react"

interface PropsType {
    quoteInfo : ItemsType
    onClick: MouseEventHandler<HTMLLIElement>

 }
  
export default function RecommandQuoteCard({quoteInfo, onClick}:PropsType) {
return (
    <li
    tabIndex={0}
    onClick={onClick}
    onMouseMove={hoverAnimation}
    key={quoteInfo.quote_id}
    className={`${styles.card} cursor-pointer shrink-0 border border-[rgba(255,255,255,0.1)] px-[15px] py-[35px] w-[98%] my-[1em] max-w-[580px] mx-auto relative text-white  `}
  >
    <blockquote>
      <span>{quoteInfo.category}</span>
      <p className='p-[10px] text-[1.08em]'>{quoteInfo.quote}</p>
      <span className='text-right block mt-[1em] bg-[rgba(255,255,255,0.05)]'>{quoteInfo.author}({quoteInfo.job})</span>
    </blockquote>
  </li>
)}