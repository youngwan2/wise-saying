import EmailInput from './EmailInput'
import SubmitButton from './SubmitButton'

interface PropsType {
  uId: string
  action: (formData: FormData) => void
}
export default function ForgotEmail({ uId, action }: PropsType) {
  return (
    <form action={action} className="mt-[2em] w-full">
      <EmailInput uId={uId} />
      <SubmitButton>이메일 찾기</SubmitButton>
    </form>
  )
}
