
import Image from "next/image";
import { TbTrash } from "react-icons/tb";

interface PropsType {
  image: string
  onClickDeleteImage: () => void
  onClickSetImage: () => void
}


const DEFAULT_IMG_SIZE = { width: 230, height: 230 }

export default function StylerCarouselCard({ image, onClickDeleteImage, onClickSetImage }: PropsType) {
  return (
    <div className='relative group flex-shrink-0 mx-3'>
      <button
        onClick={onClickDeleteImage}
        className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                   absolute -top-2 -right-2 z-10
                   bg-red-500 hover:bg-red-600 text-white 
                   rounded-full w-8 h-8 flex items-center justify-center
                   border-2 border-white shadow-sm'
      >
        <TbTrash className="text-sm" />
      </button>

      <Image
        onClick={onClickSetImage}
        className="border border-gray-200 rounded-lg cursor-pointer 
                   bg-white hover:border-blue-400 transition-colors duration-200
                   w-64 h-48 object-cover"
        key={image}
        src={image}
        alt="명언 카드 배경 이미지"
        width={DEFAULT_IMG_SIZE.width}
        height={DEFAULT_IMG_SIZE.height}
      />
    </div>
  )
}