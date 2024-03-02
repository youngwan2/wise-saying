'use client'
import { onSubmit } from '@/utils/common-func'
import { imagePreviewReader } from '@/utils/imageloader'
import { ChangeEvent } from 'react'
import { HiUpload } from 'react-icons/hi'

interface PropsType {
  setImages: (src: string[]) => void
  images: string[]
}
export default function StylerImageUploadForm({
  setImages,
  images,
}: PropsType) {

  async function onChangeImageUploader(e: ChangeEvent<HTMLInputElement>) {
    const src = await imagePreviewReader(e, 'styler') || ''
    const isValidSrc = src?.length>5
    isValidSrc && images ? setImages([...images, src]) : null
  }

  return (
    <form
      className="hover:cursor-pointer group min-w-[250px] h-[250px] bg-[white] rounded-[1em]"
      onSubmit={onSubmit}
    >
      <label
        aria-label='명언 카드 배경 이미지 업로더'
        className="hover:cursor-pointer transition-all scale-[1] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:visible group-hover:opacity-100 group-hover:scale-[1.5]"
        htmlFor="image_upload"
      >
        <HiUpload className={'text-[3em]'} />
        <p className="font-bold">업로드</p>
      </label>
      <span className='font-sans absolute left-[50%] translate-x-[-50%]  bottom-[1.5em] w-full text-center'>🔴 JPG/JPEG, PNG 만 가능</span>
      <input
        onChange={onChangeImageUploader}
        id="image_upload"
        type="file"
        className="hidden"
      />
    </form>
  )
}
