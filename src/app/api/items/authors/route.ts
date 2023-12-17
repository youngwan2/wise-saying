import { NextRequest } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

interface ItemsType {
    items: {
        id: number,
        author:string
    }[]
}


let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;
export async function GET(req:NextRequest){

    if(!db) {
        db  = await open({
            filename:'./wise_saying.db',
            driver:sqlite3.Database,
        })
    }
    const query = `
        SELECT author_id AS id, author_name AS author FROM authors_group 
    `
    const items:ItemsType = await db.all(query)
    return new Response(JSON.stringify(items))

}