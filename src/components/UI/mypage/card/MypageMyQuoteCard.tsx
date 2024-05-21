import { hoverAnimation } from '@/utils/common-func'
import styles from '../UserQuotes.module.css'
import UserQuotesCardControlButtons from '../../quote/button/UserQuoteCardBtnContainer'

interface PropsType {
  item: {
    quote_id: number
    category: string
    quote: string
    author:string
    email:string
  }
  index:number
}
export default function MyQuoteCard({ item, index }: PropsType) {
  return (
      <ul
        onMouseMove={hoverAnimation}
        key={item.quote_id}
        className={`${styles.card} relative border border-[rgba(255,255,255,0.1)] p-[10px] rounded-[10px] my-[5px] max-w-[700px] mx-auto  transition-all hover:border-[1.5px]`}
      >
        <li><UserQuotesCardControlButtons item={item} index={index} isMypage/></li>
        <li className="flex text-white">
          <span className="rounded-[5px] mr-[10px] min-w-50px max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">
            구분{' '}
          </span>
          {item.quote_id}
        </li>
        <li className="flex text-white">
          <span className=" rounded-[5px] mr-[10px] min-w-50px max-w-[50px] inline-block  w-full px-[3px] m-[3px] font-semibold">
            명언{' '}
          </span>
          <p className="text-start">{item.quote}</p>
        </li>
        <li className="flex text-white">
          <span className="rounded-[5px] mr-[10px] min-w-50px max-w-[50px] inline-block  w-full px-[3px] m-[3px] font-semibold">
            분류{' '}
          </span>
          {item.category}
        </li>
      </ul>
  )
}
