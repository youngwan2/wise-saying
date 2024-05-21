interface PropsType {
    email: string;
}

export default function EmailField({ email }: PropsType) {
    return (
        <div className="mb-5 cursor-not-allowed">
            <label className="mb-2" htmlFor='email'>
                이메일(Email)
            </label>
            <input
                aria-readonly="true"
                type="text"
                readOnly
                id='email'
                className="mt-[0.25em]  w-full px-3 py-2 rounded-[3px] outline-none bg-[#dedbdb2d] text-white cursor-not-allowed "
                value={email}
            ></input>
        </div>
    )
}