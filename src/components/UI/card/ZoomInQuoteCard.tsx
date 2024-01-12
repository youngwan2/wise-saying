import { useCardZoomInOutStore } from "@/store/store"
import { ItemsType } from "@/types/items.types"
import { useEffect, useRef } from "react"
import { gsap } from "gsap/gsap-core"


interface PropsType {
    item: ItemsType
}
export default function ZommInQuoteCard({ item }: PropsType) {
    const setIsZoomIn = useCardZoomInOutStore((state) => state.setIsZoomIn)
    const isZoomIn = useCardZoomInOutStore((state) => state.isZoomIn)
    const cardRef = useRef<HTMLBaseElement>(null)

    useEffect(() => {
      
        if (cardRef.current) {
            const card = cardRef.current
          if(isZoomIn) {
            gsap.to(card, { opacity:1, visibility:'visible', scale:1.25, translateY:0  } )
          } 
          if(!isZoomIn) {
            gsap.to(card, {opacity:0, visibility:'hidden', translateY:-200 , delay:-1})
          }
    
        }
      }, [isZoomIn])

    return (
        <>
            <div onClick={() => {
                setIsZoomIn(false)
            }} className={`transition-all ${isZoomIn ? 'z-50 fixed left-0 top-0 right-0 bottom-0 bg-[#00000086] visible opacity-100 ' : 'invisible opacity-0'}`}>  </div>
            <article
                ref={cardRef}
                key={item.id}
                className={`
                invisible opacity-0
                z-[100]
                fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
                shadow-[1px_10px_5px_0_rgba(0,0,0,0.3)] p-[2em] odd:-rotate-2  even:rotate-2  max-w-[280px] bg-[#FFE5A0] 
                m-3 w-[100%] text-center transition-all duration-700 delay-200
                min-h-[250px]
                `}
            >
                <blockquote className='mt-[1em]'>
                    <p className=' p-[1em]'>{item.wise_sayings}</p>
                    <footer className="font-bold mt-[1em]">{item.author}</footer>
                </blockquote>
            </article>
        </>
    )
}