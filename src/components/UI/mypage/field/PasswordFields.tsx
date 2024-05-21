// interface Props { }

export default function PasswordFields() {
    return (
        <article>
            <div className="mb-5">
                <label className="mb-2" htmlFor="password">
                    비밀번호(Password)
                </label>
                <input
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$"
                    type="password"
                    name="password"
                    autoComplete="off"
                    id="password"
                    className="focus:bg-[rgba(255,255,255,0.15)] focus:text-black outline-none mt-[0.25em] w-full px-3 py-2 rounded-[3px] border border-[rgba(255,255,255,0.1)] invalid:border-[#f39797] bg-transparent"
                    placeholder="8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)"
                />
            </div>
            <div className="mb-5">
                <label className="mb-2" htmlFor="confirm">
                    비밀번호 재확인(Confirm)
                </label>
                <input
                    aria-label="비밀번호 재확인 창으로, 앞서 비밀번호와 동일한 값을 입력"
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$"
                    type="password"
                    name="confirm"
                    autoComplete="off"
                    id="confirm"
                    className="focus:bg-[rgba(255,255,255,0.15)] focus:text-black outline-none mt-[0.25em] w-full px-3 py-2 rounded-[3px] border border-[rgba(255,255,255,0.1)] invalid:border-[#f39797] bg-transparent"
                    placeholder="비밀번호 재확인"
                />
            </div>
        </article>
    )
}