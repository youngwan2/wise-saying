

export default function ReplaceMessageCard({childern}:{childern:React.ReactNode}) {

    return (

        <h2 className="z-50  border inline-block p-[2em] absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[1.25em] 
        rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white">
            {childern}</h2>
    )

}