import MypageContainer from '@/components/UI/container/MypageContainer'
import MypageTaps from '@/components/UI/tap/MypageTaps'

export default function Mypage() {
  return (
    <section className="w-full">
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        마이페이지
      </h2>
      <MypageTaps />
      <MypageContainer />
    </section>
  )
}
