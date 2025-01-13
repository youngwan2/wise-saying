import { Method, fetchConfig, fetchConfigNoBody } from "@/configs/config.api"
import apiRoute from "@/configs/config.api-route"


/** GET |  유저 명언 조회 */
export async function getUserQuotesOfMypage(url: string) {
    const config = fetchConfigNoBody(Method.GET)
    const response = await fetch(url, config)
    const data = await response.json()

    return data

}

/**  GET | 유저 프로필 조회 */
export async function getUserProfile(url: string) {
    const config = fetchConfigNoBody(Method.GET)
    const response = await fetch(url, config);
    const { userInfo } = await response.json()

    return userInfo
}


/**
 * PATCH | 유저 프로필 수정
 * @param nickname 유저 닉네임
 * @param imageUrl 유저 프로필 이미지 URL
 */
export async function updateUserProfile(
    nickname: FormDataEntryValue,
    imageUrl: string,
) {
    const userProfileInfo = {
        nickname: nickname,
        profile_image: imageUrl,
    }

    const url = apiRoute.USER.USER_PROFILE_UPDATE()
    const config = fetchConfig(Method.PATCH, userProfileInfo)
    try {
        const response = await fetch(url, config);
        const { success, meg } = await response.json()

        return { success, meg }

    } catch (error) {
        if (error instanceof Error) {
            return { success: false, meg: error.message || "프로필 변경 요청이 실패하였습니다." }
        }
        return { success: false, meg: "프로필 변경 요청이 실패하였습니다." }

    }
}


/**
 * PATCH | 유저 비밀번호 수정 요청
 * @param password
 */
export async function updateUserPassword(password: string) {
    const url = apiRoute.USER.USER_PASSWORD_UPDATE()
    const config = fetchConfig(Method.PATCH, { password })
    try {
        const response = await fetch(url, config);
        const { success, meg } = await response.json()

        return { success, meg }

    } catch (error) {
        if (error instanceof Error) {
            return { success: false, meg: error.message || "패스워드 변경 요청이 실패하였습니다." }
        }
        return { success: false, meg: "패스워드 변경 요청이 실패하였습니다." }

    }
}


/** DELETE | 회원탈퇴 */
export async function deleteUserAccount() {
    const url = apiRoute.USER.USER_ACCOUNT_DELETE()
    const config = fetchConfigNoBody(Method.DELETE)
    try {
        const response = await fetch(url, config)
        const { success, meg } = await response.json()
        return { success, meg }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, meg: error.message || "회원탈퇴 요청이 실패하였습니다." }
        }
        return { success: false, meg: "회원탈퇴 요청이 실패하였습니다." }
    }
}
