import { HiSpeakerphone } from "react-icons/hi";


interface PropsType {

    isPlaying: boolean
    progress:number
}

export default function PercentageProgress({ isPlaying, progress }: PropsType) {
    return (
        <p>{isPlaying
            ? <span className='text-[1.05em] animate-pulse absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px] flex items-center'><HiSpeakerphone color='gold' className='mr-[5px]' /> {progress}/100</span>
            : <span className='text-[1.05em] animate-none absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px]'></span>}</p>
    )
}