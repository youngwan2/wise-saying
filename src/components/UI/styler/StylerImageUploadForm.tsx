'use client'
import { HiUpload } from 'react-icons/hi'
import { imagePreviewReader } from '@/utils/common-func'

interface PropsType {
  setImages: (src: string[]) => void
  images: string[]
}
export default function StylerImageUploadForm({
  setImages,
  images,
}: PropsType) {
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
        onChange={(e) => {
          const src = imagePreviewReader(e)
          images && src ? setImages([...images, src]) : null
        }}
        id="image_upload"
        type="file"
        className="hidden"
      />
    </form>
  )
}
