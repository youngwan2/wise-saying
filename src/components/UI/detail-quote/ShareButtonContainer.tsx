// interface Props { }

import { BiLogoFacebook } from "react-icons/bi"
import { BsTwitterX } from "react-icons/bs"
import { IoIosLink } from "react-icons/io"
import { SiNaver } from "react-icons/si"

import { toast } from 'react-toastify'
import ControlButton from "../common/button/ControlButton"
import ButtonContainer from "../common/container/ButtonContainer"

enum ShareType {
    Facebook = 'F',
    X = 'X',
    Naver = 'N',
}


export default function ShareButtonContainer() {

    const shareWithSns = (type: ShareType) => {
        const url = window.location.href
        const encodeUrl = encodeURIComponent(url)
        let urlConcat = ''

        const index = Object.values(ShareType).indexOf(type)

        index === 0 &&
            (urlConcat = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeUrl)
        index === 1 &&
            (urlConcat = 'https://twitter.com/intent/tweet?url=' + encodeUrl)
        index === 2 &&
            (urlConcat =
                'https://share.naver.com/web/shareView?url=' +
                encodeUrl +
                '&title=[공유] Wise Sayings')

        window.open(urlConcat, '_blank')
    }

    const shareWithClip = async () => {
        try {
            const url = window.location.href
            await window.navigator.clipboard.writeText(url)
            toast.success('클립보드에 복사되었습니다. 이용해 주셔서 감사합니다.')
        } catch (error) {
            toast.error('불편을 드려 죄송합니다. 나중에 다시시도 해주세요.')
            console.error(error)
        }
    }

    const buttons = [
        {
            ariaLabel: "페이스북 공유",
            onClick: () => { shareWithSns(ShareType.Facebook) },
            className: "hover:bg-[#45454527] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[60px] ",
            icon: <BiLogoFacebook className="m-[3px] rounded-[3px] text-[2em] bg-[rgb(65,93,155)]" color="white" />,
            label: "페이스북"

        },
        {
            ariaLabel: "X(구. 트위터) 공유",
            className: "hover:bg-[#45454527] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[50px] ",
            onClick: () => shareWithSns(ShareType.X),
            icon: <BsTwitterX className="m-[3px] bg-black text-[2em] p-[3px] rounded-[3px]" color="white" />,
            label: "X",
        },
        {
            ariaLabel: "네이버 공유",
            onClick: () => shareWithSns(ShareType.Naver),
            className: "hover:bg-[#45454527] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[50px] ",
            icon: <SiNaver className="m-[3px] bg-[rgb(0,198,59)] text-[2em] p-[5px] rounded-[3px]" color="white" />,
            label: "네이버",
        },
        {
            ariaLabel: "직접 URL 복사. 해당 URL 을 공유하고자 하는 곳에서 붙여넣기.",
            onClick: shareWithClip,
            className: "hover:bg-[#45454527] flex-col rounded-[5px] text-[1em] p-[3px] text-black mx-[0.3em] flex items-center",
            icon: <IoIosLink className="m-[3px] bg-black text-[2em] p-[3px] rounded-[3px]" color="white" />,
            label: "URL",
        }
    ];

    return (
        <ButtonContainer elementName='div' className="flex">
            {buttons.map(button =>
                <ControlButton
                    key={button.label}
                    onClick={button.onClick}
                    ariaLabel="페이스북 공유"
                    className={button.className}
                >
                    {button.icon}
                    {button.label}
                </ControlButton>
            )}
        </ButtonContainer>
    )
}