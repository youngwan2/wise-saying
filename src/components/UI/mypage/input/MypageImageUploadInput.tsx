import { ChangeEventHandler } from 'react'
import Image from 'next/image'

import Label from '../../common/Label'
import Input from '../../common/Input'
import Container from '../../common/container/Container'

import { HiUpload } from 'react-icons/hi'

interface PropsType {
  src: string
  onChange: ChangeEventHandler<HTMLInputElement>
}
export default function MypageImageUploadInput({ src, onChange }: PropsType) {
  return (
    <Container elementName='article' className="relative group">
      <Image
        className="mx-auto rounded-full min-w-[230px] max-w-[230px] min-h-[230px] max-h-[230px] w-full"
        src={src}
        alt="유저의 프로필 이미지"
        width={250}
        height={230}
      />
      <Label
        htmlFor="profile_image"
        className="group-hover:visible group-hover:scale-100 transition-all hover:cursor-pointer hover:border border-[black] p-[10px]  invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[3em] scale-50 ">
        <HiUpload />
      </Label>
      <Input
        aria-label="유저의 프로필 이미지 업로드 창"
        id="profile_image"
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </Container>
  )
}
