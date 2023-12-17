"use client"
import { useRouter } from "next/navigation"
interface PropsType {
    items: {
        id: number,
        author:string
    }[]
}
export default function AuthorsCard({ items }: PropsType) {

    const router = useRouter()
    return (
            <ul className=" mt-[5em] flex justify-center rotate-[]  min-h-[300px] max-h-[500px] flex-wrap overflow-y-auto "
            >
                {items.map((item) => {
                    return <li
                     onClick={()=>{
                        const trim_author = item.author.replace(' ','')
                        router.push(`/author/${item.author}`)
                     }}
                    className="
                        p-[5em]
                        odd:-rotate-2 
                        even:rotate-2 
                        min-h-[230px]  
                        max-h-[300px]  
                        bg-[#FFE5A0] 
                        m-3 max-w-[300px] min-w-[200px] 
                        w-[100%] text-center 
                        transition-all
                        hover:shadow-md
                        hover:translate-y-[-20px]
                        hover:bg-[#fae259]
                        hover:cursor-pointer
                        relative" key={item.author}>
                        <div className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></div>
                        {item.author}</li>
                })}
            </ul>
    )
}