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
        const authorQuery = `
                SELECT quote_id AS id, author, quote, job
                FROM quotes
                WHERE author LIKE $1
                LIMIT 5
            `

        const keywordQuery = `
                SELECT quote_id AS id, author, quote, job
                FROM quotes
                WHERE quote LIKE $1
                LIMIT 5
            `
        const resultByKeyword = await db.query(keywordQuery, [
          `%${searchText}%`,
        ])
        const resultByAuthor = await db.query(authorQuery, [`%${searchText}%`])
        const byAuthor = resultByAuthor.rows
        const byKeyword = resultByKeyword.rows
        const byAuthorCount = resultByAuthor.rowCount
        const byKeywordCount = resultByKeyword.rowCount

        db.end()
        return NextResponse.json({
          status: 200,
          meg: '성공적으로 처리 되었습니다.',
          success: true,
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
                SELECT quote_id AS id, author, quote, job
                FROM quotes
                WHERE quote LIKE $1
            `
        const results = await db.query(query, [`%${searchText}%`])
        const totalCount = results.rowCount
        const items = results.rows

        db.end()
        return NextResponse.json({
          status: 200,
          meg: '성공적으로 처리 되었습니다.',
          success: true,
          items,
          totalCount,
        })
      }

      // 저자별 검색
      case 'author': {
        const query = `
                SELECT quote_id AS id, author, quote, job
                FROM quotes
                WHERE author LIKE $1
            `

        const result = await db.query(query, [`%${searchText}%`])
        const items = result.rows
        const totalCount = result.rowCount

        db.end()
        return NextResponse.json({
          status: 200,
          meg: '성공적으로 처리 되었습니다.',
          success: true,
          items,
          totalCount,
        })
      }
    }
  } catch (error) {
    console.log('api/quotes/search/route.ts:', error)
    return NextResponse.json({
      status: 500,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      success: false,
    })
  }
}
