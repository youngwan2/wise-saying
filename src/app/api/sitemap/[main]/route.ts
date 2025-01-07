import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ main: string }> }) {

  const {main} = await params

  try {
    const db = await openDB()

    if (main === 'authors') {
      const query = `
            SELECT DISTINCT B.author AS author, A.quote_id AS id 
            FROM quotes A
            JOIN authors B ON A.author_id = B.author_id
        `
      const results = await db.query(query)
      const items = results.rows

      return NextResponse.json(items)
    }

    if (main !== 'authors') {
      const query = `
        SELECT DISTINCT ON(category) category, quote_id AS id FROM quotes 
        `
      const results = await db.query(query)
      const items = results.rows

      return NextResponse.json(items)
    }
  } catch (error) {
    console.error(error)
  }
}
