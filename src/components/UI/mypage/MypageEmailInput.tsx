
interface PropsType {
    email:string
}
export default function MypageEmailInput({email}:PropsType) {
    return (
        <div className="mx-auto my-[1em]">
            <label
                htmlFor="email"
                className=" mr-[5px] rounded-[5px]  text-center font-bold min-w-[70px] inline-block"
            >
                이메일
            </label>
            <input
                readOnly
                value={email}
                id="email"
                className="text-black bg-[transparent] shadow-[inset_0_-2px_0_0_black]  min-w-[200px]  p-[6px]"
            ></input>
        </div>
    )
}