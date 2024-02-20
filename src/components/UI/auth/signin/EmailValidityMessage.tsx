export default function EmailValidityMessage({
  isEmail,
}: {
  isEmail: boolean
}) {
  if (isEmail)
    return (
      <span className="block px-[5px] text-[#292997] ml-[0.5em]">
        - 이메일 형식과 일치합니다.{' '}
      </span>
    )

  if (!isEmail)
    return (
      <span className="text-[red] block  ml-[0.5em]">
        - 이메일 형식과 일치시키세요{' '}
      </span>
    )
}
