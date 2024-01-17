"use client"
import { useCallback, useEffect} from 'react';

/**
 * @param elementRefs 해당 요소에 인터섹션 옵저버를 적용
 */
export default function useIntersectionObserver(elementRefs: any) {
   
    const intersectionObserverActive = useCallback(() => {
        // 타겟
        const lis = elementRefs.current;

        // 옵저버
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const target = entry.target;
                const isVisible = entry.isIntersecting;

                if (isVisible && target instanceof HTMLLIElement) {
                    target.style.cssText = `
                        visibility: visible;
                        opacity: 1;
                    `;
                }
                if (!isVisible && target instanceof HTMLLIElement) {
                    target.style.cssText = `
                        visibility: hidden;
                        opacity: 0;
                    `;
                }
            });
        }, { threshold: 0.5 });

        lis.forEach((li: HTMLLinkElement) => {
            observer.observe(li);
        });

        // 옵저버 반환 및 제거
        return () => {
            lis.forEach((li: HTMLLinkElement) => {
                observer.unobserve(li);
            });
        };
    }, [elementRefs]);

    // 옵저버 호출
    useEffect(() => {
        const clear = setTimeout(() => {
            intersectionObserverActive();
        }, 100);

        return (() => {
            clearTimeout(clear);
        });

    }, [intersectionObserverActive]);
}
