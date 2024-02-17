
import { getAccessToken } from "@/utils/sessionStorage"

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}


/**
 * POST, PATCH,PUT,DETETE | 요청 시 기본 config 옵션
 * @param method 요청 메소드
 * @param data 데이터
 * @returns 
 * @example
 */
export const defaultConfig = (method: Method, ...data: any) => {
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
 * GET 요청 시 기본 config 설정
 * @param method 
 * @returns 
 */
export const getDefaultConfig = (method: Method, isTokenVertify: boolean) => {
    const token = getAccessToken() || ''
    let config;
    if (isTokenVertify) {
        config = {
            method,
            headers: {
                authorization: 'Bearer ' + token
            }
        }
    } else {
        config = { method }
    }
    
    return config
}