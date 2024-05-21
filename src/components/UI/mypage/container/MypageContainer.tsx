import MypageMain from "../MypageMain";
import MypageTaps from "../MypageTaps";

export default function MyPageContainer() {

    return (
        <div className="md:flex-row flex h-[80vh] flex-col">
            <MypageTaps />
            <MypageMain />
        </div>
    )
}