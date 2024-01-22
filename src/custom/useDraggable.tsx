import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { RefObject, useEffect } from "react"


export default function useDraggable(elementRef: RefObject<HTMLFormElement>){

    useEffect(() => {
        gsap.registerPlugin(Draggable)
    
        if (elementRef.current) {
          setTimeout(() => {
            Draggable.create(elementRef.current, {
              dragClickables: false,
              bounds: document.querySelector('body'),
            })
          }, 1000)
        }
      }, [elementRef])


}