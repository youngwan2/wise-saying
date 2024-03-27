export default function EmailValidityMessage({
  isEmail,
}: {
  isEmail: boolean
}) {
  if (isEmail)
    return (
      <span className="font-sans inline-block px-[5px] text-[#56e146] text-[14.3px] ml-[3.2em]">
        이메일 형식과 일치합니다.{' '}
      </span>
    )

  if (!isEmail)
    return (
      <span className=" font-sans  text-[#f25555]  ml-[3.6em] text-[14.3px] inline-block">
        이메일 형식과 일치시키세요{' '}
      </span>
    )
}
