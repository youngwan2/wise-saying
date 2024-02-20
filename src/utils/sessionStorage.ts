/**
 * SessionStorage | 유저 이메일 정보를 로컬의 세션 스토로지에서 가져온다.
 * @returns
 */
export const getUserEmail = () => {
  try {
    const user =
      (sessionStorage &&
        sessionStorage?.getItem &&
        sessionStorage?.getItem('user')) ||
      '{"dbEmail":""}'
    const { dbEmail: userEmail } = JSON.parse(user)

    return userEmail
  } catch (error) {
    console.error('sessionStorage getItem 실패:', error)
    return ''
  }
}

interface UserInfoType {
  dbEmail: string
  profile: {
    nickname: string | null
    image: string | null
  }
}
/**
 * SessionStorage | 유저 정보를 로컬의 세션 스토로지에 저장한다.
 * @param user
 */
export const setUserInfo = (user: UserInfoType) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

/**
 * SessionStorage | 접근 토큰을 로컬의 세션 스토로지에 저장한다.
 * @param token accessToken
 */
export const setAccessToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

export const getAccessToken = () => {
  try {
    const token = sessionStorage.getItem('token')
    return token
  } catch (error) {
    console.error('sessionStorage.getItem 에러:' + error)
    return null
  }
}
