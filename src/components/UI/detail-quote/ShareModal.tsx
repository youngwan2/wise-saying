
import ShareButtonContainer from "./ShareButtonContainer"
import ButtonContainer from "../common/container/ButtonContainer"
import ControlButton from "../common/button/ControlButton"

import { HiXCircle } from "react-icons/hi2"

interface PropsType {
    onClickShowModal: () => void
    isShow: boolean
}
export default function ShareModal({ isShow, onClickShowModal }: PropsType) {

    return (
        <article
            aria-hidden={!isShow}
            className={` ${isShow
                ? 'z-50 translate-y-0 visible opacity-100'
                : 'invisible translate-y-[30px] opacity-0 '
                } absolute  right-0 top-[5%]  rounded-[5px] items-center justify-center my-[1.5em] py-[0.5em] max-w-[300px] mx-auto w-full px-[1em] bg-[white] min-h-[250px] transition-all `}
        >

            <ButtonContainer elementName="div" className="mb-[3em] flex justify-between w-full items-center">
                <strong className="font-bold text-[1.25em]">공유하기</strong>
                <ControlButton
                    onClick={onClickShowModal}
                    ariaLabel="공유하기 모달창 닫기"
                    className=" hover:bg-[tomato] rounded-[10px] hover:text-white p-[5px]"
                >
                    <HiXCircle className="text-[1.8em]" />
                </ControlButton>
            </ButtonContainer>
            {/* 공유버튼 */}
            <ShareButtonContainer />
        </article>
    )
}