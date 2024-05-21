import { HiEye } from "react-icons/hi2"

interface PropsType {
    viewCount:number
}
export default function QuoteViewIcon({viewCount}:PropsType){
    return (
        <span className="absolute bottom-2 right-[1em] text-white flex items-center"><HiEye className='mx-1'/> {viewCount||0}</span>
    )
}