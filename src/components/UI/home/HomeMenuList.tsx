import navList from "@/router"
import HomeMenuButton from "./HomeMenuButton"

export default function HomeMenuList() {

    return (
        <nav className="grid sm:grid-cols-3 grid-cols-2  max-w-[600px] mx-auto ">
            {navList
                .filter((navItem) => navItem.path !== '/')
                .map((navItem) => <HomeMenuButton navItem={navItem} key={navItem.label} />)}
        </nav>
    )
}