'use client'
import { onSubmit } from '@/utils/common-func'
import { ChangeEventHandler } from 'react'
import { HiUpload } from 'react-icons/hi'

interface PropsType {
  selectTapNum: number
  onChangeImageUploader: ChangeEventHandler<HTMLInputElement>
}
export default function StylerImageUploadForm({
  selectTapNum,
  onChangeImageUploader
}: PropsType) {
  console.log(selectTapNum)

  if(selectTapNum !== 2) return
  return (
    <form
      className="hover:cursor-pointer group min-w-[200px] h-[250px] bg-[white] rounded-[0.5em]"
      onSubmit={onSubmit}
    >
      <label
        aria-label="명언 카드 배경 이미지 업로더"
        className="hover:cursor-pointer transition-all scale-[1] absolute left-[50%] top-[35%] translate-x-[-50%] translate-y-[-50%] group-hover:visible group-hover:opacity-100 group-hover:scale-[1.25]"
        htmlFor="image_upload"
      >
        <HiUpload className={'text-[3em]'} />
        <p className="font-bold">업로드</p>
      </label>
      <span className="text-white font-sans absolute left-[50%] translate-x-[-50%]  bottom-[5em] w-full text-center">
        🔴 JPG/JPEG, PNG 만 가능
      </span>
      <input
        onChange={onChangeImageUploader}
        id="image_upload"
        type="file"
        className="hidden"
      />
    </form>
  )
}
