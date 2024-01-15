import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";


/**
 * 
 * @param ref useRef() 로 생성된 참조 객체를 전달(ex. const buttonRef = useRef<HTMLButtonElement>(null))
 * @param fiexdPositionY 특정위치로 스크롤 이후 고정될 Y축 좌표 지점(px단위)
 * @param backgroundColor 배경색
 * @param padding 안쪽 여백(px 단위)
 */
export default function useScrollBasedIconPosition(ref:RefObject<any>, fiexdPositionY:number, backgroundColor:string, padding:number){

    useEffect(() => {
        if (ref.current) {
            const element  = ref.current
            gsap.registerPlugin(ScrollTrigger)
            gsap.registerPlugin(Draggable)
            let draggableInstance:any = null;

            ScrollTrigger.create({
                trigger:element,
                onEnterBack(){
                    gsap.set(element, {
                        position:'static',
                        y:'none',
                        x:'none',
                        boxShadow:'none',
                        color:'black',
                        background:'none',
                        zIndex:'none'
                    })
                    draggableInstance[0].kill()
                },
                onLeave(){
                    gsap.set(element, {
                        position:'fixed',
                        padding,
                        borderRadius:'50%',
                        color:'white',
                        background:backgroundColor,
                        boxShadow:'0 0 5px 0 rgba(0,0,0,0.5)',
                        y: fiexdPositionY,
                        zIndex:1000
                    })
                    draggableInstance =Draggable.create(element,{
                        bounds: document.querySelector('body')
                    })   
                }
            })
        }

    }, [ref,backgroundColor,padding,fiexdPositionY])
}