import type { ItemsType } from "@/types/items.types"
export default function QuotesCard({ items }:{items:ItemsType[]}){
    return (

        <section>
            <ul className="flex justify-center flex-wrap  overflow-y-auto  max-h-[500px]  ">
                {items.map((item)=>{
                    return <li key={item.id} className="
                    p-[3em]
                    odd:-rotate-2 
                    even:rotate-2 
                    min-h-[230px]  
                    max-h-[490px]  
                    bg-[#FFE5A0] 
                    m-3 max-w-[300px] min-w-[200px] 
                    w-[100%] text-center 
                    transition-all
                    hover:shadow-md
                    hover:translate-y-[-20px]
                    hover:bg-[#fae259]
                    hover:cursor-pointer
                    relative">
                        <blockquote>
                            <span className="block my-[1em] rounded-[1em] bg-[brown] text-[white]">{item.id}</span>
                            <p className="leading-[2]">{item.wise_sayings}</p>
                        </blockquote>

                    </li>
                })}
            </ul>
        </section>
    )
}