
"use client"
import { useCallback, useEffect} from 'react'

export default function useIntersectionObserver(elementRefs: any) {
    // 아이템 드래그 이벤트
    const intersectionObserverActive = useCallback(() => {
        const lis = elementRefs.current

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const target = entry.target
                const isVisible = entry.isIntersecting

                if (isVisible && target instanceof HTMLLIElement) {
                    target.style.cssText = `
                    visibility: visible;
                    opacity:1
                `
                }
                if (!isVisible && target instanceof HTMLLIElement) {
                    target.style.cssText = `
                    visibility: hidden;
                    opacity:0
                    `
                }
            })
        },{threshold:0.5})

        lis.forEach((li: HTMLLinkElement) => {
            observer.observe(li)
        })
    }, [elementRefs])

    useEffect(() => {
        const clear = setTimeout(() => {
            intersectionObserverActive()
        }, 100)

        return (() => {
            clearTimeout(clear)
        })

    }, [intersectionObserverActive])
}