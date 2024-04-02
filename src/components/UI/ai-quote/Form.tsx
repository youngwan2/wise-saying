import { forwardRef, type MouseEventHandler } from 'react'
import {IoSend}  from 'react-icons/io5'
interface PropsType {
  generateAction: (form: FormData) => Promise<string | void>
}
const Form = forwardRef<HTMLTextAreaElement, PropsType>(
  function Form(props, textAreaRef) {
    const { generateAction} = props

    return (
      <form className="font-sans mt-[1.5em] flex justify-center items-center  rounded-[5px] bg-[#ffffff21]" action={generateAction}>
        <textarea
          placeholder='예) 여름에도 가을처럼 시원하고, 겨울처럼 등꼴이 오싹해지는 명언'
          ref={textAreaRef}
          name="prompt"
          id="prompt"
          className="p-[10px] w-full resize-none focus:outline-none bg-transparent   min-h-[30px]"
        ></textarea>
          <button className="hover:text-[#bcbbbb]  mx-[1em] text-[1.25em]">
            <IoSend/>
          </button>
      </form>
    )
  },
)

export default Form
