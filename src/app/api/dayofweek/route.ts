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

  try {
    const query = `
        SELECT day_group_id, day_name FROM day_groups
    `
    const items = await db.all(query)
    return NextResponse.json(items)
  } catch (error) {
    console.error(error)
  }
}
