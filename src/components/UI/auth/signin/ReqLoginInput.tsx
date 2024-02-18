export default function ReqLoginInput({ isLoading }: { isLoading: boolean }) {

    return (
        <input
            aria-label="로그인 요청"
            className="rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold"
            type="submit"
            value={isLoading ? '전송중..' : '로그인'}
        />
    )

}

