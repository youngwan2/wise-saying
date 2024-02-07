import Image from 'next/image'
import { ChangeEventHandler } from 'react'
import { HiUpload } from 'react-icons/hi'

interface PropsType {
  src: string
  onChange: ChangeEventHandler<HTMLInputElement>
}
export default function MypageImageUploadInput({ src, onChange }: PropsType) {
  return (
    <article className="relative group">
      <Image
        className="mx-auto rounded-full min-w-[230px] max-w-[230px] min-h-[230px] max-h-[230px] w-full"
        src={src}
        alt="유저의 프로필 이미지"
        width={250}
        height={230}
      />
      <label
        htmlFor="profile_image"
        className="group-hover:visible group-hover:scale-100 transition-all hover:cursor-pointer hover:border border-[black] p-[10px]  invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[3em] scale-50"
      >
        <HiUpload />
      </label>
      <input
        aria-label="유저의 프로필 이미지 업로드 창"
        id="profile_image"
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </article>
  )
}
