

import { CgInfo } from "react-icons/cg";


interface PropsType {
    message: {
        sizes: {
            width: number
            height: number
        }
        meg: string
    }
}

export default function RecommandSizeInfoCard({ message }: PropsType) {
    return (
        <article className='absolute top-[17em] mt-[1.25em] text-white z-[-1]'>
            <strong className='ml-[3px] flex items-center'><CgInfo className='mr-[3px]' /> info</strong>
            <p className=' max-w-[400px] bg-[#00000097] p-[8px] ml-[6px] mt-[0.2em] rounded-b-[5px] rounded-tr-[5px]  text-[0.95em]'>{message.sizes.width} x {message.sizes.height} - {message.meg}</p>
        </article>
    )
}