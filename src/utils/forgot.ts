import dnsPropmises from 'node:dns/promises'
import { createToken } from './auth';


// 임시 토큰 생성
export async function generateTempAccessToken(userEmail:string) {
    const tempToken  = createToken({userEmail,userId:-999}, true)
    return tempToken
}


// MX레코드 검증
export async function emailMxValidator(userEmail: string) {

    const domain = userEmail.split('@')[1] || ''
    if (!domain.includes('.')) return false
    try {
        const mx = await dnsPropmises.resolveMx(domain)
        console.log(mx)
        return true
    } catch (error) {
        console.error('도메인 조회 실패:', error)
        return false
    }
}

