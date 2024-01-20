'use client'
import { HiUpload } from 'react-icons/hi'
import { ChangeEvent } from 'react'

interface PropsType {
  setImages: (src: string[]) => void
  images: string[]
}
export default function ImageUploadForm({ setImages, images }: PropsType) {
  const imageSrcReader = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target && e.target.files) {
        const files = e.target.files[0]
        const imageSrc = URL.createObjectURL(files)
        setImages([...images, imageSrc])
      }
    } catch (error) {
      console.error(error)
      alert('유효하지 않은 이미지이거나 이미지 파일이 존재하지 않습니다.')
    }
  }

  return (
    <form
      className="hover:cursor-pointer group min-w-[230px] h-[230px] bg-[white] rounded-[1em]"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <label
        className="hover:cursor-pointer transition-all scale-[1] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:visible group-hover:opacity-100 group-hover:scale-[1.5]"
        htmlFor="image_upload"
      >
        <HiUpload className={'text-[3em]'} />
        <p className="font-bold">업로드</p>
      </label>
      <input
        onChange={imageSrcReader}
        id="image_upload"
        type="file"
        className="hidden"
      />
    </form>
  )
}
