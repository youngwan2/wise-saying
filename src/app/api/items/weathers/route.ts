import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { NextResponse } from 'next/server'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function GET() {
  if (!db) {
    db = await open({
      filename: './wise_saying.db',
      driver: sqlite3.Database,
    })
  }
  const query = `
        SELECT id, author, wise_sayings FROM weathers
    `
  const items = await db.all(query)
  return NextResponse.json(items)
}
