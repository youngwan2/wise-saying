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
 * SET SessionStorage | 유저 정보 저장
 * @param user
 */
export const setUserInfo = (user: UserInfoType) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

/**
 * GET SessionStorage | 유저 정보 가져오기
 */
export const getUserInfo = () => {
  try {
    sessionStorage.getItem('user')
  } catch (error) {
    console.error('user 정보 가져오기 실패:', error)
  }
}

/**
 * SET SessionStorage | 유저의 로그인 만료 시간 저장
 * @param exp 
 */
export const setLoginExp = (exp: number) => {
  sessionStorage.setItem('exp', JSON.stringify(exp))
}

/**
 * GET essionStorage | 로그인 만료시간 가져오기
 */
export const getLoginExp = () => {
  try {
    const exp = sessionStorage.getItem('exp')
    if(exp) {return Number(exp)}
  } catch (error) {
    console.error('exp 가져오기 실패:', error)
    return false
  }
}

/**
 * SET SessionStorage | accessToken 저장
 * @param token accessToken
 */

export const setAccessToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

/**
 * GET  SessionStorage | accessToken 가져오기
 * @returns 
 */
export const getAccessToken = () => {
  try {
    const token = sessionStorage.getItem('token')
    return token
  } catch (error) {
    console.error('accessToken 가져오기 실패:' + error)
    return null
  }
}