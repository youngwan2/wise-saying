import EmailInput from './EmailInput'
import SubmitButton from './SubmitButton'

interface PropsType {
  uId: string
  action: (formData: FormData) => void
}
export default function ForgotPassword({ uId, action }: PropsType) {
  return (
    <form
      action={action}
      className="w-full max-w-mdp-8 rounded shadow-md mt-[2em]"
    >
      <EmailInput uId={uId} />
      <SubmitButton>임시 비밀번호 발급 받기</SubmitButton>
    </form>
  )
}
