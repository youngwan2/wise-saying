import React from "react";

export default function FormTitle({ children }: { children: React.ReactNode }) {

    return (
        <h2 className="rounded-t-[10px]  p-[10px] font-bold text-[1.25em] bg-[#413A3A] text-[white]">
            {children}
        </h2>
    )
}