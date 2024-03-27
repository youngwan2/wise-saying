import Joi from 'joi'

export const emailShema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
})

export const userSchema = Joi.object({
  email: Joi.string().email({ maxDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string().pattern(
    new RegExp(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/,
    ),
  ),
  reConfirmPw: Joi.ref(`password`),
})

// 약관 동의 필수 항목 체크 유효성 검사
export const consentSchema = Joi.object({
  all : Joi.boolean(),
  term: Joi.boolean().required().valid(true),
  private: Joi.boolean().required().valid(true),
  child: Joi.boolean().required().valid(true),
  event: Joi.boolean()
  
})