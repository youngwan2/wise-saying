import { RefObject, useEffect } from "react"

/**
 * 마운트 후 입력창에 자동 포커싱 하는 커스텀 훅
 * @param ref 
 */
export default function useFocus(ref: RefObject<HTMLElement>) {
    useEffect(() => {
        if (ref.current) {
            ref.current.focus()

        }
    }, [ref])

}