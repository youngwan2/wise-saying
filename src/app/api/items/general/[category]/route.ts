import sqlite3  from "sqlite3"
import { open,Database } from "sqlite"
import { NextRequest, NextResponse } from "next/server"

let db:Database<sqlite3.Database, sqlite3.Statement> | null = null
export async function GET(req:NextRequest, res:{params:{category:string}}){
    const {category} = res.params    
    if(!db) {
        db = await open({
            driver:sqlite3.Database,
            filename:'./wise_saying.db'
        })
    }

    const query = `
        SELECT A.id AS id, A.author AS author, A.wise_sayings AS wise_sayings  
        FROM quotes_general A JOIN gneral_group B
        ON B.category_id = A.category_id AND B.category = ?
    `
    const items = await db.all(query,[category])
    return NextResponse.json(items)

}