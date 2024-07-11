import MypageMain from "../MypageMain";
import MypageTaps from "../MypageTaps";

export default function MyPageContainer() {

    return (
        <div className="md:flex-row flex h-[80vh] flex-col mt-[6.5rem]">
            <MypageTaps />
            <MypageMain />
        </div>
    )
}