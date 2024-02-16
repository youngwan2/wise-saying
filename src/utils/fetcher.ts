import toast from "react-hot-toast"
import { getAccessToken } from "./sessionStorage"


enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export const getFetcher = async (url: string) => {
    const response = await fetch(url)
    const { success, meg, status, ...results } = await response.json()
    if (!success) throw new Error(meg)
    return { ...results }
}

export const postFetcher = async (url: string, ...data: any) => {
    const config = defaultConfig(Method.POST, ...data)
    const isSuccess:boolean = await defaultFetch(url, config)
    return isSuccess
}

export const patchFetcher = async (url: string, ...data: any) => {
    const config = defaultConfig(Method.PATCH, ...data)
    const isSuccess:boolean = await defaultFetch(url, config)
    return isSuccess
}

export const deleteFetcher = async (url: string, ...data: any) => {
    const config = defaultConfig(Method.DELETE, data)
    const isSuccess:boolean = await defaultFetch(url, config)
    return isSuccess
}

/**
 * Config | 요청 시 추가 옵션
 * @param method 요청 메소드
 * @param data 데이터
 * @returns 
 * @example
 *  const token = getAccessToken() || ''
    const config = {
        method,
        headers: {
            authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ ...data })
    }

    return config
 */
const defaultConfig = (method: Method, ...data: any) => {
    const token = getAccessToken() || ''
    const config = {
        method,
        headers: {
            authorization: 'Bearer ' + token
        },
        
        body: JSON.stringify({ ...data })
    }

    return config
}

/**
 * Fetch | 가본 fetch 공통 양식
 * @param url 요청 경로
 * @param config 추가 설정
 * @returns 
 * @example // 내부적으로 다음과 같이 처리 된다.
 *     try {
        const response = await fetch(url, config)
       
        const { meg, success } = await response.json()
          if (!success) return toast.error(meg)
          if (success) {
            toast.success(meg)
            return success
        }
    } catch (error) {
        console.error('DELETE 데이터 삭제 실패:', error)
    }
 */
const defaultFetch = async (url: string, config: any) => {
    try {
        const response = await fetch(url, config)
        const { meg, success } = await response.json()
        if (!success) return toast.error(meg)
        if (success) {
            toast.success(meg)
            return success
        }
    } catch (error) {
        console.error('DELETE 데이터 삭제 실패:', error)
    }
}
