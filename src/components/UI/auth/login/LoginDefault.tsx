import LoginEmailInput from './LoginEmailInput'
import LoginPasswordInput from './LoginPasswordInput'

export default function LoginDefault() {
  return (
    <article className="mb-[1.25em] flex flex-col max-w-[430px] w-full mx-auto">
      <h2 className="text-[1.25em] text-center mb-[0.5em] text-white">
        일반 로그인
      </h2>
      <LoginEmailInput />
      <LoginPasswordInput />
    </article>
  )
}
