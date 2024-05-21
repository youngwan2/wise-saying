import { MouseEventHandler } from "react"

interface PropsType {
    onSetSize:MouseEventHandler<HTMLUListElement>
    onSetMessage:(size: {width:number, height: number,message:string})=>void
 }
  
const backgroundSizes = getBackgroundSizeList()

export default function RecommandSizeList({onSetSize, onSetMessage}:PropsType) {

return (
    <ul onClick={onSetSize} className='flex flex-wrap justify-between text-white mt-[0.25em]'>
    {backgroundSizes.map((size) => {
      return <li  onMouseEnter={()=>onSetMessage(size)} className='border ml-[0] m-[5px] p-[5px] min-w-[100px] hover:bg-[#c5c3c361] hover:cursor-pointer' key={size.message}>{size.width} x {size.height}
      </li>
    })}
  </ul>
)}


function getBackgroundSizeList(){
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