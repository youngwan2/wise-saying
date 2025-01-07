
import { Method, defaultConfig } from '@/configs/config.api'
import { ConsentsType } from '@/types/consent.types'
import { logoutUser } from '@/utils/common-func'
import { defaultFetch } from '@/utils/fetcher'
import { setAccessToken, setLoginExp, setUserInfo } from '@/utils/session-storage'
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
export const reqLogin = async ({ ...userInfo }: UserType) => {
    const { email: reqEmail, password: reqPassword } = userInfo
    if (!(reqEmail && reqPassword)) return false

    const user = userInfo

    const url = '/api/auth/general-auth/login'
    const config = defaultConfig(Method.POST, user)
    const { meg, success, accessToken, exp, email, profile } = await defaultFetch(
        url,
        config,
    )

    if (success) {
        setUserInfo({ profile, dbEmail: email })
        setAccessToken(accessToken)
        setLoginExp(exp)

        toast.success(`${email}님 환영합니다!. 잠시 후 Home 화면으로 이동합니다.`)

        return true
    }
    if (!success) { toast.error(meg); return false }
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
    const url = '/api/auth/general-auth/signin'
    const { success: isSuccess } = await defaultFetch(url, config)
    if (isSuccess) return isSuccess
    else return false
}





/**
 * PATCH | 유저 비밀번호 수정 요청
 * @param password
 * @param userId
 * @returns
 */
export async function updateUserPassword(password: string, userId: number) {
    const url = `/api/users/${userId}`
    const config = defaultConfig(Method.PATCH, password)
    const { success, meg } = await defaultFetch(url, config)

    if (success) {
        toast.success('변경되었습니다. 보안을 위해 다시 로그인 해주세요')
        logoutUser()
    }
    if (!success) toast.error(meg)
}


/**
* DELETE | 회원탈퇴
* @param userId
* @returns
*/
export async function deleteUserInfo(userId: number) {
    if (!userId) return alert('접근 권한이 없습니다.')
    const isDelete = prompt(
        '정말로 회원탈퇴를 시도하시려면, "회원탈퇴" 라고 입력해주세요. ',
    )
    if (isDelete === null) return toast('👏 취소 되었습니다.')
    if (isDelete !== '회원탈퇴')
        return toast.error('틀렸습니다. 정확하게 입력해주세요.')

    const url = `/api/users/${userId}`
    const config = defaultConfig(Method.DELETE)
    const { success, meg } = await defaultFetch(url, config)
    if (success) return logoutUser()
    if (!success) return toast.error(meg)
}

