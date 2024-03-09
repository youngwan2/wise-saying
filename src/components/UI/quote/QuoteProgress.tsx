interface PropsType{
    progress:number
}
export default function QuoteProgress({progress}:PropsType){

    return (
        <progress
        id='tts-progress'
        aria-label='명언 듣기 진행률(100프로 기준)'
        className='transition-all absolute top-[1em] w-[50%]'
        max={100} value={progress} />
    )
}