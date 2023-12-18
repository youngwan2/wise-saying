import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { NextRequest, NextResponse } from 'next/server'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function GET(req: NextRequest, res: { params: { name: string } }) {
  const { name } = res.params
  if (!db) {
    db = await open({
      filename: './wise_saying.db',
      driver: sqlite3.Database,
    })
  }
  const query = `
        SELECT id, B.author_name AS author, A.wise_sayings AS wise_sayings 
        FROM quotes_authors A JOIN authors_group B
        
        ON A.author_id = B.author_id AND B.author_name=?
    `
  interface ItemsType {
    id: number
    author: string
    wise_sayings: string
  }

  const items: ItemsType[] = await db.all(query, [name])
  return NextResponse.json(items)
}
