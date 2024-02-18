export default function EmailInput(){

    return (
        <div className="mb-4">
        <label htmlFor="email " className="hidden">이메일 주소</label>
        <input
            type="email"
            id="email"
            className="w-full  p-[0.65em] border rounded-[5px] focus:outline-none focus:border-blue-500 shadow-[inset_-1px_1px_0_0_rgba(0,0,0,0.2)]"
            placeholder="이메일 주소를 입력하세요"
            required
        />
    </div>
    )
}