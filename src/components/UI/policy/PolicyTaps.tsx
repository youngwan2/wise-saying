"use client"

import ButtonContainer from "../common/container/ButtonContainer"

interface PropsType {
    tapNum: number
    onClickChangeTap: (num: number) => void
}

const policyList = ['이용약관', '개인정보처리방침', '개인정보 이용 및 수집 동의서']
export default function PolicyTaps({ tapNum, onClickChangeTap }: PropsType) {

    return (
        <ButtonContainer elementName='article' className="max-w-[1200px] mx-auto w-full h-[50px] shadow-[0_0_2px_0_white] mt-[7.5em] flex justify-center">
            {policyList.map((poliy, i) =>
                <button
                    onClick={() => onClickChangeTap(i)}
                    key={poliy}
                    className={`${tapNum === i ? 'bg-[tomato]' : ''} p-[10px] text-white`}>
                    {poliy}
                </button>)}
        </ButtonContainer>
    )
}