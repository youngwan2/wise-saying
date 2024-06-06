import LoginEmailInput from './LoginEmailInput'
import LoginPasswordInput from './LoginPasswordInput'

export default function LoginDefault() {
  return (
    <div className="mb-[1.25em]  mt-8 flex flex-col max-w-[430px] w-full mx-auto">
      <h2 className="text-[1.25em] text-center mb-6 text-white">
        일반 로그인
      </h2>
      <LoginEmailInput />
      <LoginPasswordInput />
    </div>
  )
}
