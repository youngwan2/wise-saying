import{consentSchema, emailShema, userSchema} from '../schema'


describe('joi | 이메일 스키마',()=>{

    it('이메일이 유효하다면 에러가 발생하지 않는다.',()=>{
        const {error} = emailShema.validate({email: 'test@example.com'})
        expect(error).toBeUndefined()
    })

    it('이메일이 유효하지 않다면 에러가 발생한다.',()=>{
        const {error} = emailShema.validate({email: 'test@example'})
        expect(error).toBeDefined()
    })
})

describe('joi | 사용자 스키마',()=>{
    
    // memo: 비밀번호 정규 표현식은 /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/ 입니다.
    /** 패스워드 정규식: 알파벳 대소문자, 숫자, 특수 문자가 각각 최소 하나 이상 포함되고, 총 길이가 8자 이상인 문자열 */
    it('사용자 정보가 유효하다면 에러가 발생되지 않는다.',()=>{
        const {error} = userSchema.validate({
            email: 'test@example.com',
            password: 'Password1!',
            reConfirmPw: 'Password1!',
        })
        expect(error).toBeUndefined()
    })

    it('사용자 정보가 유효하지 않다면 에러가 발생된다.',()=>{
        const {error} = userSchema.validate({
            email: 'test@example.com',
            password: 'Password1',
            reConfirmPw: 'Password1',
        })
        expect(error).toBeDefined()
    })
})


describe('joi | 약관 스키마',()=>{
    it('약관 정보가 유효하다면 에러가 발생되지 않는다.',()=>{
        const {error} = consentSchema.validate({
            all: true,
            term: true,
            private: true,
            child: true,
            event: true,
        })
        expect(error).toBeUndefined()
    })

    it('child 에 동의하지 않은 경우 에러가 발생한다.',()=>{
        const {error} = consentSchema.validate({
            all: true,
            term: true,
            private: true,
            child: false,
            event: true,
        })
        expect(error).toBeDefined()
    })

    it('term 에 동의하지 않은 경우 에러가 발생한다.',()=>{ 
        const {error} = consentSchema.validate({
            all: true,
            term: false,
            private: true,
            child: true,
            event: true,
        })
        expect(error).toBeDefined()
    })

    it('private 에 동의하지 않은 경우 에러가 발생한다.',()=>{
        const {error} = consentSchema.validate({
            all: true,
            term: true,
            private: false,
            child: true,
            event: true,
        })
        expect(error).toBeDefined()
    })

    it('event 에 동의하지 않은 경우라도 에러느 발생하지 않는다.',()=>{ 
        const {error} = consentSchema.validate({
            all: true,
            term: true,
            private: true,
            child: true,
            event: false,
        })

        expect(error).toBeUndefined()
    })
})