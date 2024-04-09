"use client"
import { hoverAnimation } from '@/utils/common-func'
import styles from '../quote/Quotes.module.css'
import { ItemsType } from "@/types/items.types"
import { useRouter } from 'next/navigation'

interface PropsType {
  recommandItems : ItemsType[]
}
export default function RecommandQuote({recommandItems}:PropsType) {
  const {push} = useRouter()

  function onClickPageSwitchHandle(name:string, quoteId:number){
      push('/quotes/authors/'+ name+ '/'+quoteId+'?type=no-user')
  }

    return (
        <article className='mt-[1em]'>
        <h3 className="text-white sm:text-[1.5em] text-[1.25em] mt-[2em]  bg-[rgba(255,255,255,0.05)]">
          추천 명언(TOP 10)</h3>
        <ul className=' pt-[2em] flex flex-wrap w-full'>
          {recommandItems.map((item: any) => {
            return (
              <li
                onClick={()=> onClickPageSwitchHandle(item.author, item.quote_id)}
                onMouseMove={hoverAnimation}
                key={item.quote_id}
                className={`${styles.card} cursor-pointer shrink-0 border border-[rgba(255,255,255,0.1)] px-[15px] py-[35px] w-[98%] my-[1em] max-w-[580px] mx-auto relative text-white  `}
              >
                <blockquote>
                  <span>{item.category}</span>
                  <p className='p-[10px] text-[1.08em]'>{item.quote}</p>
                  <span className='text-right block mt-[1em] bg-[rgba(255,255,255,0.05)]'>{item.author}({item.job})</span>
                </blockquote>
              </li>
            )

          })}
        </ul>
      </article>
        
    )
}