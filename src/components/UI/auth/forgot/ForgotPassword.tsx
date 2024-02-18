import EmailInput from "./EmailInput";
import SubmitButton from "./SubmitButton";

export default function ForgotPassword() {

    return (
        <form className="w-full max-w-mdp-8 rounded shadow-md mt-[2em]">
            <EmailInput />
            <SubmitButton>임시 비밀번호 발급 받기</SubmitButton>
        </form>
    );
};

