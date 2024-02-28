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

