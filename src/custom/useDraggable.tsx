'use client'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { RefObject, useEffect } from 'react'

/**
 * GSAP | 드래그어블 효과를 적용하는 커스텀 훅
 * @param elementRef
 * @param type 특정 타입에 따라 다른 타입의 드래그어블 애니메이션을 적용(x | rotation | null)
 */
export default function useDraggable(
  elementRef: RefObject<any> | null,
  type: string | null,
) {
  gsap.registerPlugin(Draggable)

  useEffect(() => {
    if (!elementRef?.current || document.querySelector('body') === null) return

    let instance: Draggable[]
    const hasTypeRotationOrX = type === 'x' || type === 'rotation'
    const el = elementRef.current

    const ctx = gsap.context(() => {
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
    })
    return () => {
      ctx.revert()
      instance && instance[0].kill()
    }
  }, [elementRef, type])
}
