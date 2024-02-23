import { useRouter } from 'next/navigation'

interface PropsType {
  category: string
}
export default function UserQuotesCategoryCard({ category }: PropsType) {
  const router = useRouter()

  return (
    <li
      tabIndex={0}
      key={category}
      onKeyUp={(e) => {
        const key = e.key
        if (key !== 'Enter') return
        router.push(`/user-quotes/${category}`)
      }}
      onClick={() => {
        router.push(`/user-quotes/${category}`)
      }}
      className="
          sm:text-[1.4em]
          sm:py-[4em]
          sm:min-h-[230px]  
          sm:rounded-[20%]
          text-[1.3em]
          py-[3em]
          p-[1em]
          min-h-[120px]
          rounded-[5%]
          odd:-rotate-2 
          even:rotate-2 
          font-bold
          bg-gradient-to-bl from-white to-[#e0dddd2f]
          opacity-80
          border-[8px]
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
    >
      {category} <br></br>
      <div className=" w-[20px] h-[45px] bg-[rgba(248,147,147,0.7)] absolute top-[-1em] right-[1em] rotate-[15deg] "></div>
    </li>
  )
}
