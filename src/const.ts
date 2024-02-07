/**
 * * 이메일 정규표현식
 */
export const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/g

/**
 * 비밀번호 정규표현식
 */
export const PASSWORD_REGEXP =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/g
