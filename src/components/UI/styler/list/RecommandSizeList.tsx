import { MouseEventHandler } from "react"
import { FaRegImage, FaInstagram, FaFacebook, FaYoutube, FaRegClone, FaRegSquare, FaRegRectangleList, FaRegIdBadge } from "react-icons/fa6"

interface PropsType {
  onSetSize: MouseEventHandler<HTMLUListElement>
  onSetMessage: (size: { width: number, height: number, message: string }) => void
}

const backgroundSizes = getBackgroundSizeList()

const sizeIcons: Record<string, React.ReactNode> = {
  '기본': <FaRegImage className="inline mr-1 text-lg" />, // 300x400
  '소셜': <FaRegClone className="inline mr-1 text-lg" />, // 500x500, 800x600
  '카드': <FaRegRectangleList className="inline mr-1 text-lg" />, // 600x400, 800x400
  '포스터': <FaRegIdBadge className="inline mr-1 text-lg" />, // 1000x700
  '인스타': <FaInstagram className="inline mr-1 text-lg text-pink-500" />, // 1080x1080
  '페이스북': <FaFacebook className="inline mr-1 text-lg text-blue-600" />, // 1260x630
  '유튜브': <FaYoutube className="inline mr-1 text-lg text-red-500" />, // 1920x1080
}


export default function RecommandSizeList({ onSetSize, onSetMessage }: PropsType) {
  return (
    <ul onClick={onSetSize} className='flex flex-wrap justify-between'>
      {backgroundSizes.map((size) => {
        return <li
          data-width={size.width}
          data-height={size.height}
          onMouseEnter={() => onSetMessage(size)}
          className='border ml-[0] m-[5px] p-[5px] min-w-[120px] flex items-center hover:bg-[#c5c3c361] hover:cursor-pointer'
          key={size.message}>
          {getIconBySize(size)}
          <span>{size.width} x {size.height}</span>
        </li>
      })}
    </ul>
  )
}


function getIconBySize(size: { width: number, height: number, message: string }) {
  if (size.width === 300 && size.height === 400) return sizeIcons['기본']
  if (size.width === 500 && size.height === 500) return sizeIcons['소셜']
  if (size.width === 600 && size.height === 400) return sizeIcons['카드']
  if (size.width === 800 && size.height === 600) return sizeIcons['소셜']
  if (size.width === 800 && size.height === 400) return sizeIcons['카드']
  if (size.width === 1000 && size.height === 700) return sizeIcons['포스터']
  if (size.width === 1080 && size.height === 1080) return sizeIcons['인스타']
  if (size.width === 1260 && size.height === 630) return sizeIcons['페이스북']
  if (size.width === 1920 && size.height === 1080) return sizeIcons['유튜브']
  return <FaRegSquare className="inline mr-1 text-lg" />
}



function getBackgroundSizeList() {
  return [
    {
      width: 300,
      height: 400,
      message: '기본으로 지정되어 있는 사이즈. 간편하게 소장하기 좋은 사이즈'
    },
    {
      width: 500,
      height: 500,
      message: '작은 이미지로 소셜 미디어에 공유하기 적합한 사이즈'
    },
    {
      width: 600,
      height: 400,
      message: '카드나 포스터로 사용하기 적합한 사이즈'
    },
    {
      width: 800,
      height: 600,
      message: '소셜 미디어에 공유하기 적합한 사이즈'
    },
    {
      width: 800,
      height: 400,
      message: '가로로 긴 형태의 카드로 적합한 사이즈'
    },
    {
      width: 1000,
      height: 700,
      message: '소형 포스터로 사용하기 적합한 사이즈'
    },
    {
      width: 1080,
      height: 1080,
      message: '인스타그램 및 기타 소셜 미디어 피드에 적합한 사이즈'
    },

    {
      width: 1260,
      height: 630,
      message: '페이스북 포스트나 링크 미리보기에 적합한 사이즈'
    },

    {
      width: 1920,
      height: 1080,
      message: '유튜브나 기타 동영상 플랫폼에 적합한 사이즈'
    },
  ]

}