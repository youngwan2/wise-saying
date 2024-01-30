import { RefObject, useEffect } from "react";



/**
 * ref 와 value 을 전달 받아 초깃값을 지정하는 커스텀 훅
 * @param ref 
 * @param initialValue 
 * @example useInitialValueSetter(ref:RefObject<HTMLInputElement | HTMLTextAreaElement> , initialValue:string){

    useEffect(()=>{
        if(ref.current) {
            ref.current.value = initialValue // 마운트 후 전달 받은 해당 값으로 지정한다.
        }
    },[initialValue,ref])
}
 */
export default function useInitialValueSetter(ref:RefObject<HTMLInputElement | HTMLTextAreaElement> , initialValue:string){

    useEffect(()=>{
        if(ref.current) {
            ref.current.value = initialValue
        }
    },[initialValue,ref])
}