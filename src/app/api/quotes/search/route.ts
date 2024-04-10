import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const db = await openDB()
  const type = req.nextUrl.searchParams.get('type')
  const searchText = req.nextUrl.searchParams.get('searchText') || ''

  try {
    switch (type) {
      // 전체 검색
      case 'all': {
        const authorCountQuery = `
        SELECT COUNT(*) as count
        FROM quotes A
        JOIN authors B ON A.author_id = B.author_id
        WHERE B.author LIKE $1
        `
        const keywordCountQuery = `
        SELECT COUNT(*) as count
        FROM quotes
        WHERE quote LIKE $1
        `
        const authorQuery = `
        SELECT quote_id, author, quote, job
        FROM quotes A
        JOIN authors B ON A.author_id = B.author_id
        WHERE B.author LIKE $1
        LIMIT 5
       `

        const keywordQuery = `
        SELECT quote_id, author, quote, job
        FROM quotes A
        JOIN authors B ON A.author_id = B.author_id
        WHERE quote LIKE $1
        LIMIT 5
        `
        const resultByKeyword = await db.query(keywordQuery, [
          `%${searchText}%`,
        ])
        const resultByAuthor = await db.query(authorQuery, [`%${searchText}%`])
        const keywordCountResult = await db.query(keywordCountQuery, [
          `%${searchText}%`,
        ])
        const authorCountResult = await db.query(authorCountQuery, [
          `%${searchText}%`,
        ])
        const byAuthor = resultByAuthor.rows
        const byKeyword = resultByKeyword.rows
        const byAuthorCount = authorCountResult.rows[0].count
        const byKeywordCount = keywordCountResult.rows[0].count

        db.end()
        return NextResponse.json({
          ...HTTP_CODE.OK,
          totalCounts: {
            byAuthorCount,
            byKeywordCount,
          },
          items: {
            byAuthor,
            byKeyword,
          },
        })
      }

      // 키워드 검색
      case 'keyword': {
        const query = `
                SELECT quote_id, author, quote, job
                FROM quotes A
                JOIN authors B ON A.author_id = B.author_id
                WHERE quote LIKE $1
            `
        const results = await db.query(query, [`%${searchText}%`])
        const totalCount = results.rowCount
        const items = results.rows

        db.end()
        return NextResponse.json({
          ...HTTP_CODE.OK,
          items,
          totalCount,
        })
      }

      // 저자별 검색
      case 'author': {
        const query = `
                SELECT quote_id, author, quote, job
                FROM quotes A
                JOIN authors B ON A.author_id = B.author_id
                WHERE B.author LIKE $1
            `

        const result = await db.query(query, [`%${searchText}%`])
        const items = result.rows
        const totalCount = result.rowCount

        db.end()
        return NextResponse.json({
          ...HTTP_CODE.OK,
          items,
          totalCount,
        })
      }
    }
  } catch (error) {
    console.log('api/quotes/search/route.ts:', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
