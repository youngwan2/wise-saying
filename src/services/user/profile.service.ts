
import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import { toast } from 'react-toastify'
import { requestNewRefreshToken } from './jwt.service'




/**
 * PATCH | 유저 프로필 추가
 * @param nickname 유저 닉네임
 * @param imageUrl 유저 프로필 이미지 URL
 */
export async function updateUserInfo(
    nickname: FormDataEntryValue,
    imageUrl: string,
) {
    const userInfo = {
        nickname: nickname,
        profile_image: imageUrl,
    }

    const config = defaultConfig(Method.PATCH, userInfo)
    const url = '/api/users/mypage/upload?tag=user'
    const { success } = await defaultFetch(url, config)
    if (success) toast.success('프로필 정보가 업데이트 되었습니다.')
    if (!success) {
        toast.error('프로필 정보 업데이트에 실패하였습니다.')

        requestNewRefreshToken()
    }
}
