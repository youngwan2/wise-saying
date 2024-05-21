import type { ConsentsType } from "@/types/items.types"
import { ChangeEvent, MouseEvent, useState } from "react"
import PolicyModal from "./PolicyModal"
import { createPortal } from "react-dom"

interface ProsType {
    consents: ConsentsType
    setConsents: ({ }: any) => void
}

const checkBoxStyle = `
    before:absolute before:top-[55%] before:translate-y-[-45%] before:left-[50%] before:translate-x-[-50%]
    relative hover:cursor-pointer shadow-[0_0_0_1px_gray] w-[18px] h-[18px] inline-block transition-all
`

const consentItems = [
    { id: 'all', label: '전체동의' },
    { id: 'term', label: '이용약관(필수)', href: '/policy' },
    { id: 'private', label: '개인정보 이용 및 수집 동의(필수)', href: '/policy' },
    { id: 'child', label: '만 14세 이상(필수)' },
    { id: 'event', label: '이벤트 등의 프로모션 메일 수신 동의' }
];

export default function Consent({ setConsents, consents }: ProsType) {

    const [isOpenModal, setIsOpenModal] = useState({ term: false, private: false })

    function openModal(target: string) {
        target === 'term' && setIsOpenModal({ ...isOpenModal, term: !isOpenModal.term })
        target === 'private' && setIsOpenModal({ ...isOpenModal, private: !isOpenModal.private })
    }

    function onClickAgreement(target: string) {
        openModal(target)
        target === 'term' && setConsents({ ...consents, term: true })
        target === 'private' && setConsents({ ...consents, private: true })

    }

    function onChangeCheck(e: ChangeEvent<HTMLElement> | MouseEvent<HTMLSpanElement>) {
        const type = e.currentTarget.dataset.id
        const { all, term, private: privateConsent, child, event } = consents
        if (type === 'all') return setConsents({ all: !all, term: !all, private: !all, child: !all, event: !all })
        if (type === 'term') return setConsents({ ...consents, term: !term })
        if (type === 'private') return setConsents({ ...consents, private: !privateConsent })
        if (type === 'child') return setConsents({ ...consents, child: !child })
        if (type === 'event') setConsents({ ...consents, event: !event })
    }

    return (
        <>
            <article aria-label="약관동의 체크박스" className="max-w-[450px] w-full mx-auto bg-white rounded-[2px] p-[10px] mt-[2em] shadow-[inset_3px_3px_5px_rgba(0,0,0,0.5)] text-gray-700">
                {consentItems.map(item => (
                    <div key={item.id} className="py-[0.5em] flex items-center">
                        <label className="w-[300px] inline-block font-bold"> {item.id === 'term' || item.id === 'private' ? <span onClick={() => openModal(item.id)} className="text-black shadow-[inset_0_-1px_0_0_green] hover:cursor-pointer">{item.label}</span> : item.label} </label>
                        <input onChange={onChangeCheck} className="hidden" checked={consents[item.id]} data-id={item.id} type="checkbox" name={`${item.id}-consent`} />
                        <span
                            onPointerDown={onChangeCheck}
                            data-id={item.id}
                            className={`${consents[item.id] ? 'before:content-["✔"] before:opacity-100 text-green-600 ' : 'before:content-[""] before:opacity-0'} ${checkBoxStyle}`}
                        ></span>
                    </div>
                ))}
            </article>
            { typeof window === 'object'&& createPortal(
                <PolicyModal isOpenModal={isOpenModal} onClickAgreement={onClickAgreement} />, document.body
            )}
        </>
    );
};