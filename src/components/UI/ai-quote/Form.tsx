import { forwardRef, type MouseEventHandler } from 'react'
import { HiPencilSquare } from 'react-icons/hi2'

interface PropsType {
  onClickCancel: MouseEventHandler<HTMLButtonElement>
  generateAction: (form: FormData) => Promise<string | void>
}
const Form = forwardRef<HTMLTextAreaElement, PropsType>(
  function Form(props, textAreaRef) {
    const { generateAction, onClickCancel } = props

    return (
      <form className="mt-[1.5em]" action={generateAction}>
        <label
          htmlFor="prompt"
          className="sm:text-[1.25em] text-[1.05em] flex items-center"
        >
          <HiPencilSquare className=" mr-[5px]" />
          글쓰기
        </label>
        <textarea
          ref={textAreaRef}
          name="prompt"
          id="prompt"
          className="p-[10px] w-full resize-none focus:outline-none focus:bg-[#ffffff1a] bg-transparent shadow-[0_0_0_1px_white] mt-[5px] min-h-[150px] rounded-[5px]"
        ></textarea>
        <article className="m-[1em] text-right">
          <button className="hover:shadow-[0_2px_0_0_white]  mr-[1em]">
            생성하기
          </button>
          <button
            type="button"
            className="hover:shadow-[0_2px_0_0_white]"
            onClick={onClickCancel}
          >
            취소하기
          </button>
        </article>
      </form>
    )
  },
)

export default Form
