import WeekdayCategory from "@/components/UI/WeekdayCategory";
import { getWeekdayList } from "@/services/item.services";
import { HiCalculator } from "react-icons/hi";

export default async function DayPage(){

    const daysOfWeek = await getWeekdayList()
    console.log(daysOfWeek)

    return (
        <section className="w-full">
              <h2 className="flex items-center text-[1.5em] p-[5px] "><span className="bg-[#ca9039] p-[1.5px] rounded-[5px] mx-[2px]"><HiCalculator color={'white'} /></span>요일별 명언</h2>
              <WeekdayCategory categories ={daysOfWeek}/>
        </section>
    )
}