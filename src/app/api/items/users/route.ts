import sqlite3 from "sqlite3";
import {open, Database} from 'sqlite'
import { NextRequest, NextResponse } from "next/server";

let db:Database<sqlite3.Database, sqlite3.Statement>  | null = null
export async function GET(){
    if(!db) {
        db = await open({
            filename:'./wise_saying.db',
            driver:sqlite3.Database
        })
    }

    const joinQuery = `
        SELECT A.id AS id, A.wise_sayings AS wise_sayings, A.category AS category, A.author AS author, B.email AS email
        FROM quotes_users A JOIN users_group B
        ON A.user_id = B.user_id
        ORDER BY A.id DESC
    `


    const items = await db.all(joinQuery)
    return NextResponse.json(items)

}