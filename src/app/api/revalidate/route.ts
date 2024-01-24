import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){

    const tag = req.nextUrl.searchParams.get('tag')
    if(tag) revalidateTag(tag)
    return Response.json({revalidated: true, now: Date.now()})

}