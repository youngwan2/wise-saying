'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { RefObject } from 'react'

/**
 * GSAP | 드래그어블 효과를 적용하는 커스텀 훅
 * @param elementRef
 * @param type 특정 타입에 따라 다른 타입의 드래그어블 애니메이션을 적용(x | rotation | null)
 * @param isActive 리사이즈에 따른 상태 
 */
export default function useDraggable(
  elementRef: RefObject<any> | null,
  type: string | null,
  isActive?: boolean
) {
  gsap.registerPlugin(Draggable)

  useGSAP(() => {
    if (!elementRef?.current || document.querySelector('body') === null) return

    let instance: Draggable[]
    const hasTypeRotationOrX = type === 'x' || type === 'rotation'
    const el = elementRef.current

    if (hasTypeRotationOrX) {
      instance = Draggable.create(el, {
        dragClickables: false,
        bounds: document.querySelector('body') as HTMLBodyElement,
        type: type,
      })
    } else
      instance = Draggable.create(el, {
        dragClickables: false,
        bounds: document.querySelector('body') as HTMLBodyElement,
      })

    if (isActive === false) return instance && instance[0].kill()

  }, [elementRef, type, isActive])
}
