import PrivacyPolicyConsent from "../../policy/PrivatePolicyConsent";
import TermsConditions from "../../policy/TermsConditions";

interface PropsType {
    isOpenModal: {
        term: boolean
        private: boolean
    }
    onClickAgreement: (target: string) => void
}


export default function PolicyModal({ isOpenModal, onClickAgreement }: PropsType) {
    return (
        <>
            {
                isOpenModal.term && <div className="rounded-[10px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-h-[85vh] w-[90%] overflow-auto bg-white shadow-[0_0_20px_10px_rgba(100,100,125,0.3)] z-[10000]">
                    <h2 className="text-[1.25em] absolute top-[0.5em] left-[0.5em] font-bold font-sans">서비스 이용약관</h2>
                    <TermsConditions />
                    <button onClick={() => onClickAgreement('term')} className="w-full bg-[tomato] text-white p-[5px] hover:bg-[#f0735c]">확인</button>
                    <button onClick={() => onClickAgreement('private')} className="w-full bg-[#ffffff] text-black text-[0.95em] p-[5px] font-sans">※ 거부시 체크박스를 직접 해제 해주시면 됩니다. 단, 회원가입을 더 이상 진행할 수 없습니다.</button>
                </div>
            }
            {
                isOpenModal.private && <div className="rounded-[10px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-h-[85vh] w-[90%] overflow-auto bg-white shadow-[0_0_20px_10px_rgba(100,100,125,0.3)] z-[10000]">
                    <h2 className="text-[1.25em] absolute top-[0.5em] left-[0.5em] font-bold font-sans">개인정보 수집 및 이용 동의서</h2>
                    <PrivacyPolicyConsent />
                    <button onClick={() => onClickAgreement('private')} className="w-full bg-[tomato] text-white p-[5px] hover:bg-[#f0735c]">확인</button>
                    <button onClick={() => onClickAgreement('private')} className="w-full bg-[#ffffff] text-black text-[0.95em] p-[5px] font-sans">※ 거부시 확인 후 체크박스를 직접 해제 해주시면 됩니다. 단, 회원가입을 더 이상 진행할 수 없습니다.</button>
                </div>
            }

        </>
    )
}