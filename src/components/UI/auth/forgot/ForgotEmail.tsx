import EmailInput from "./EmailInput";
import SubmitButton from "./SubmitButton";

export default function ForgotEmail() {

    return (
        <form className="mt-[2em] w-full">
            <EmailInput/>
            <SubmitButton>이메일 찾기</SubmitButton>
        </form>
    );
};

