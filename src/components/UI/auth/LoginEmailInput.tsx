import useFocus from "@/custom/useFocus";
import { useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";

export default function LoginEmailInput(){

    const emailInputRef = useRef<HTMLInputElement>(null)

    useFocus(emailInputRef)

    return (
        <article className="flex mt-[3.5em] mb-[1em] mx-[10px]">
        <label
          className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]"
          htmlFor="user-email"
        >
          <span className=" inline-block">
            <HiOutlineMail />
          </span>
        </label>
        <input
          ref={emailInputRef}
          className="pl-[5px] rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]"
          type="email"
          id="user-email"
          name="email"
        />
      </article>
    )
}