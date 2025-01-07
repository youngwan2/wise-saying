import {
  setAccessToken,
  setLoginExp,
} from '@/utils/session-storage'

/**
 * POST | 새로운 refreshToken 발급
 */
export const requestNewRefreshToken = async () => {
  const token = sessionStorage.getItem('token')
  const config = {
    method: 'POST',
    header: {
      authorization: 'Bearer ' + token,
    },
  }

  try {
    const response = await fetch('/api/auth/general-auth/refresh', config)
    if (!response.ok) throw new Error('토큰 발급 요청이 실패하였습니다.')

    const { status } = await response.json()

    if (status === 201) return true
    if (status === 401) return false
  } catch (error) {
    console.error(error)
  }
}

/**
 * POST | 새로운 accessToken 발급 및 저장
 * @returns
 */
export const requestNewAccessToken = async () => {
  const config = { method: 'POST' }

  try {
    const respone = await fetch('/api/auth/general-auth/access', config)
    const { status, accessToken, exp} = await respone.json()

    if (status === 201) {
      setAccessToken(accessToken)
      setLoginExp(exp)
      return {exp:exp||0, isSuccess:true}
    } else {
      throw new Error("토큰 갱신 실패")
    }
  } catch (error) {
    console.error('accessToken 발급 실패: ', error)
    return {exp:0, isSuccess:false}
  }
}
