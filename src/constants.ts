export const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/i
export const PASSWORD_REGEXP =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/i
export const MAX_BOOKMARK_LIMIT = 1000
export const JWT_TOKEN_REGEX =
  /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+$/
