"use client"

interface PropsType {
    tapNum: number
    onClickChangeTap: (num: number) => void
}
export default function PolicyTaps({ tapNum, onClickChangeTap }: PropsType) {

    return (
        <article className="max-w-[1200px] mx-auto w-full h-[50px] shadow-[0_0_2px_0_white] mt-[7.5em] flex justify-center">
            <button className={`${tapNum === 0 ? 'bg-[tomato]' : ''} p-[10px] text-white`} onClick={() => onClickChangeTap(0)}>이용약관</button>
            <button className={`${tapNum === 1 ? ' bg-[tomato]' : ''} p-[10px] text-white`} onClick={() => onClickChangeTap(1)}>개인정보처리방침</button>
        </article>
    )
}