import { openDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(){

    const db =await openDB()

    const select  =`
        SELECT DISTINCT author FROM quotes
        
    ` 

    const results = await db.query(select);
    const result = results.rows

    const names = result.map((names)=>{
        return names.author
    })

    return NextResponse.json({names, length: names.length})
}