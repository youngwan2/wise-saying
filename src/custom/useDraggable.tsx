'use client'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { RefObject, useEffect } from 'react'

/**
 * GSAP | 드래그어블 효과를 적용하는 커스텀 훅
 * @param elementRef
 * @param type 특정 타입에 따라 다른 타입의 드래그어블 애니메이션을 적용(x | rotation | free)
 */
export default function useDraggable(
  elementRef: RefObject<HTMLElement> | null,
  type: string | null,
) {
  useEffect(() => {
    gsap.registerPlugin(Draggable)
    let instance: Draggable[]
    let clear: NodeJS.Timeout

    if (!elementRef?.current) return

    clear = setTimeout(() => {
      if (type === 'x' || type === 'rotation') {
        instance = Draggable.create(elementRef.current, {
          dragClickables: false,
          type: type,
          bounds: document.querySelector('body'),
        })
      }
      if (type === 'free') {
        console.log(type)
        instance = Draggable.create(elementRef.current, {
          dragClickables: false,
          type: 'x,y',
          bounds: document.querySelector('body'),
        })
      }
    }, 1000)
    return () => {
      clearTimeout(clear)
      if (instance) {
        instance[0].kill()
      }
    }
  }, [elementRef, type])
}
