
import Image from "next/image";
import { TbTrash } from "react-icons/tb";

interface PropsType {
    image: string
    onClickDeleteImage:()=>void
    onClickSetImage:()=>void
 }
  

 const DEFAULT_IMG_SIZE = { width: 230, height: 230 }

export default function StylerCarouselCard({image, onClickDeleteImage, onClickSetImage}:PropsType) {
return (
    <div className='relative group'>
    <button onClick={onClickDeleteImage} className='group-hover:visible  invisible p-[3px] text-white text-[1.8em] bg-[#1f1f1f] hover:text-[#b2b1b1] absolute bottom-[0] right-[10px]' ><TbTrash /> </button>
    <Image
      onClick={onClickSetImage}
      className="shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] rounded-[5px] mx-[10px] hover:cursor-pointer bg-[#fafafa] max-h-[250px] max-w-[250px] min-w-[250px] w-full "
      key={image}
      src={image}
      alt="명언 카드 배경 이미지"
      width={DEFAULT_IMG_SIZE.width}
      height={DEFAULT_IMG_SIZE.height}
    ></Image>
  </div>
)}