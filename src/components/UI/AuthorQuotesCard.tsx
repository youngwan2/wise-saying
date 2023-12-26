import type { ItemsType } from '@/types/items.types'
export default function AuthorQuotesCard({ items }: { items: ItemsType[] }) {
  return (
    <section>
      <ul className="flex justify-center flex-wrap  overflow-y-auto  max-h-[500px]  ">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="
                    p-[2em]
                    odd:-rotate-2 
                    even:rotate-2 
                    min-h-[230px]  
                    max-h-[490px]  
                    bg-[#FFE5A0] 
                    m-3 max-w-[300px] min-w-[200px] 
                    w-[100%] text-center 
                    text-[#000000]
                    transition-all
                    hover:shadow-md
                    hover:translate-y-[-20px]
                    hover:bg-[#fae259]
                    hover:cursor-pointer
                    relative"
            >
               <span className="absolute top-2 left-2 rounded-[5em] bg-[white] p-[3px] px-[6px] mb-[1em] inline-block">{item.id}</span>
              <blockquote className='mt-[1.5em]'>
                <p className="leading-[2]">{item.wise_sayings}</p>
              </blockquote>
              <div className="w-[20px] h-[45px] bg-[rgba(31,31,31,0.7)] absolute top-[-1em] right-2 "></div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
