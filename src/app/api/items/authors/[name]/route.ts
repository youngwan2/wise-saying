import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function GET(req:Request) {
    console.log(req.)
    if (!db) {
        db = await open({
            filename: "./wise_saying.db",
            driver: sqlite3.Database,
        })
    }
    const query = `
        SELECT id, B.author_name AS author, A.wise_sayings AS wise_sayings 
        FROM quotes_authors A JOIN authors_group B
        ON A.author_id = B.author_id
    `
    const items = await db.all(query)
    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": 'application/json' },
        status: 200
    })

}