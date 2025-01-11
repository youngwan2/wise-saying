import { ConsentsType } from "@/types/consent.types"

/**  필수 약관에 동의하였는지 체크*/
export function consentCheck(consents: ConsentsType) {
    const { term, child, private: privateConsent } = consents

    if (term && child && privateConsent) {
        return true
    } else { return false }
}

/**  회원가입 요청 가능 유무 체크*/
export function checkTransmissionAvailability(isVaildForm: boolean, existsEmail: boolean, isAuthEmail: boolean) {
    const isPass = isVaildForm && existsEmail && isAuthEmail
    return isPass
}