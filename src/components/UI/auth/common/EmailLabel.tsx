import { HiOutlineMail } from "react-icons/hi";

export default function EmailLabel() {
    return (
        <label
            className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]"
            htmlFor="user-email"
        >
            <span className=" inline-block">
                <HiOutlineMail />
            </span>
        </label>
    )
}