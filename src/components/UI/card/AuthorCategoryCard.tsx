'use client'
import gsap from 'gsap/all'
import { useRouter } from 'next/navigation'

interface PropsType {
  item: {
    id: number
    author: string
  }
}

const authorTl = gsap && gsap.timeline()

export default function AuthorsCategoryCard({ item }: PropsType) {
  const router = useRouter()

  return (
    <li
      ref={(element) => {
        if(gsap)
        authorTl.fromTo(element, { y: -80, opacity: 0 }, { y: 0, opacity: 0.8}, '=-0.2')
      }}
      tabIndex={0}
      onKeyUp={(e) => {
        const key = e.key
        if (key !== 'Enter') return
        item.author.replace(' ', '')
        router.push(`/author-quotes/${item.author}`)
      }}
      onClick={() => {
        item.author.replace(' ', '')
        router.push(`/author-quotes/${item.author}`)
      }}
      className="
                p-[4em]
                pt-[3em]
                opacity-0
                odd:-rotate-2 
                even:rotate-2 
                font-bold
                bg-gradient-to-bl from-white to-[#e0dddd2f]
                text-[1.4em]
                min-h-[230px]  
                border-[8px]
                rounded-[20%]
                max-h-[280px]  
                bg-[white] 
                m-[1em] max-w-[300px] min-w-[200px] 
                w-[100%] text-center 
                transition-all
                shadow-[5px_10px_5px_0_rgba(0,0,0,0.5)]
                hover:underline
                hover:decoration-wavy
                decoration-[tomato]
                hover:border-[tomato]
                hover:translate-y-[-20px]
                hover:bg-[white]
                hover:z-10
                hover:cursor-pointer
                hover:shadow-[0_10px_5px_0_rgba(0,0,0,0.4)]
                relative"
      key={item.author}
    >
      {item.author}
    </li>
  )
}
