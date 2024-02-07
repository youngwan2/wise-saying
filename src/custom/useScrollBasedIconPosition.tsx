import { RefObject, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

/**
 * @param ref useRef() 로 생성된 참조 객체를 전달(ex. const buttonRef = useRef<HTMLButtonElement>(null))
 * @param fiexdPositionY 특정위치로 스크롤 이후 고정될 Y축 좌표 지점(px단위)
 * @param fiexdPositionX   특정위치로 스크롤 이후 고정될 X축 좌표 지점(px단위)
 * @param backgroundColor 배경색
 * @param padding 안쪽 여백(px 단위)
 */
export default function useScrollBasedIconPosition(
  ref: RefObject<any>,
  fiexdPositionY: number,
  fiexdPositionX: number,
  backgroundColor: string,
  padding: number,
) {
  useEffect(() => {
    if (ref.current) {
      const element = ref.current
      gsap.registerPlugin(ScrollTrigger)
      gsap.registerPlugin(Draggable)
      let draggableInstance: any = null

      ScrollTrigger.create({
        trigger: element,
        onEnterBack() {
          gsap.set(element, {
            y: 'none',
            x: 'none',
            boxShadow: 'none',
            background: 'none',
            zIndex: 'none',
          })
          draggableInstance[0].kill()
        },
        onLeave() {
          gsap.set(element, {
            padding,
            borderRadius: '50%',
            color: 'white',
            background: backgroundColor,
            boxShadow: '0 0 5px 0 rgba(0,0,0,0.5)',
            y: fiexdPositionY,
            x: fiexdPositionX,
            zIndex: 1000,
          })
          draggableInstance = Draggable.create(element, {
            type: 'x',
            bounds: document.querySelector('body'),
          })
        },
      })
    }
  }, [ref, backgroundColor, padding, fiexdPositionY, fiexdPositionX])
}
