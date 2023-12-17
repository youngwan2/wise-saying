export const dynamic = "force-dynamic";

import WeatherCard from "@/components/UI/WeatherCard"
import { getItemFromDB } from "@/services/item.services"
import { HiSun } from "react-icons/hi"

export default async function WeatherPage() {

    const items = await getItemFromDB('weathers')

    return (
        <section>
            <h2 className="flex items-center text-[1.5em] p-[5px] "><span className="bg-[#fcb54b] p-[1.5px] rounded-[5px] mx-[2px]"><HiSun color={'white'} /></span>날씨 관련 명언/글귀</h2>

            <WeatherCard items={items} />
        </section>
    )
}