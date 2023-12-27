import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { NextRequest, NextResponse } from 'next/server'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function GET(req: NextRequest,  res: { params: { id: string } }) {
  const { id: groupId } = res.params

  if (!db) {
    db = await open({
      filename: './wise_saying.db',
      driver: sqlite3.Database,
    })
  }
  const query = `
        SELECT id, author, wise_sayings, day_group_id 
        FROM days 
        WHERE day_group_id=?
        ORDER BY id DESC
    `
  const items = await db.all(query, [Number(groupId)])
  return NextResponse.json(items)
}
