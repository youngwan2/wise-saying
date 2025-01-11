
import { Method, defaultConfig, fetchConfig, getDefaultConfig } from '@/configs/config.api'
import apiRoute from '@/configs/config.api-route'
import { ConsentsType } from '@/types/consent.types'
import { defaultFetch } from '@/utils/fetcher'

import { toast } from 'react-toastify'


/**
 * POST | 로그인 요청
 * @param email
 * @param password
 */
interface UserType {
    email: string
    password: string
}
export const reqLogin = async (userInfo: UserType) => {
    const { email: reqEmail, password } = userInfo
    if (!(reqEmail && password)) return false

    const url = apiRoute.AUTH.LOGIN();
    const config = fetchConfig(Method.POST, userInfo)
    const response = await fetch(url, config);
    const { meg, success, exp, email, profile } = await response.json();
    const accessToken = response.headers.get('authorization')||'';


    if (success) {
        return { meg, success, accessToken, exp, email, profile }
    }
    if (!success) { toast.error(meg); return }
}

interface SignInUserType {
    email: string
    password: string
    reConfirmPw: string
}

/**
 * POST | 회원가입 요청
 * @param userInfo  
 * @param consents 
 * @returns 로그인 성공 유무 반환(true/false)
 */
export async function reqSignIn({ ...userInfo }: SignInUserType, consents: ConsentsType) {
    const body = { ...userInfo, consents }
    const config = defaultConfig(Method.POST, body)
    const url = apiRoute.AUTH.REGISTER()
    const response = await fetch(url, config)
    if (!response.ok) {
        return false
    } else {
        return true
    }
}




/** 로그아웃 */
export async function logoutUser() {
    const url = '/api/auth/logout'
    const config = getDefaultConfig(Method.GET, false)
    try {
        const response = await fetch(url, config)
        const { success, meg } = await response.json()

        if (success) {
            toast.success(meg)
            sessionStorage.clear()
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
        if (!success) toast.error(meg)
    } catch (error) {
        console.error('로그아웃 요청 실패:', error)
    }
}

/** POST | 이메일 중복 체크 */
export async function existsEmail(email: string) {

    const url = apiRoute.AUTH.EMAIL_CHECK()
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ email })
        })

        const { success, meg } = await response.json();
        return { success, meg }

    } catch (error) {
        console.error('이메일 중복 확인 실패:', error)
        return { success: false, meg: "이메일 중복 확인 실패" }
    }
}


/** POST | 이메일 본인인증 */
export async function requestEmailAuth(body: { email: string, value: string }) {

    const url = apiRoute.AUTH.AUTH_EMAIL()
    const config = {
        method: 'POST',
        body: JSON.stringify(body),
    }

    try {
        const response = await fetch(url, config)
        const { success, meg } = await response.json();
        return { success, meg }

    } catch (error) {
        console.error('이메일 본인인증 실패:', error)
        return { success: false, meg: "이메일 본인인증 실패" }
    }
}

