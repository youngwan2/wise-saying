import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const db = await openDb()
  const type = req.nextUrl.searchParams.get('type')
  const searchText = req.nextUrl.searchParams.get('searchText') || ''

  try {
    switch (type) {
      case 'all': {
        const authorQuery = `
                SELECT quote_id AS id, author, quote
                FROM quotes_all
                WHERE author LIKE ?
                LIMIT 5
            `

        const keywordQuery = `
                SELECT quote_id AS id, author, quote
                FROM quotes_all
                WHERE quote LIKE ?
                LIMIT 5
            `

        const authorCountQuery = `
                SELECT COUNT(*) AS  count
                FROM quotes_all
                WHERE author LIKE ?
            `

        const keywordCountQuery = `
                SELECT COUNT(*) AS count
                FROM quotes_all
                WHERE quote LIKE ?
            
            `
        const resultByKeyword = await db.all(keywordQuery, [`%${searchText}%`])
        const resultByAuthor = await db.all(authorQuery, [`%${searchText}%`])
        const resultByAuthorCount = await db.get(authorCountQuery, [
          `%${searchText}%`,
        ])
        const resultByKeywordCount = await db.get(keywordCountQuery, [
          `%${searchText}%`,
        ])

        return NextResponse.json({
          status: 200,
          meg: '성공적으로 처리 되었습니다.',
          success: true,
          totalCounts: {
            byAuthorCount: resultByAuthorCount.count,
            byKeywordCount: resultByKeywordCount.count,
          },
          items: {
            byAuthor: resultByAuthor,
            byKeyword: resultByKeyword,
          },
        })
      }
      case 'keyword': {
        const query = `
                SELECT quote_id AS id, author, quote
                FROM quotes_all
                WHERE quote LIKE ?
            `
        const keywordCountQuery = `
                SELECT COUNT(*) AS count
                FROM quotes_all
                WHERE quote LIKE ?
            
            `
        const result = await db.all(query, [`%${searchText}%`])
        const totalResult = await db.get(keywordCountQuery, [`%${searchText}%`])

        return NextResponse.json({
          status: 200,
          meg: '성공적으로 처리 되었습니다.',
          success: true,
          items: result,
          totalCount: totalResult.count,
        })
      }

      case 'author': {
        const query = `
                SELECT quote_id AS id, author, quote
                FROM quotes_all
                WHERE author LIKE ?
            `
        const authorCountQuery = `
                SELECT COUNT(*) AS  count
                FROM quotes_all
                WHERE author LIKE ?
            `
        const result = await db.all(query, [`%${searchText}%`])
        const totalResult = await db.get(authorCountQuery, [`%${searchText}%`])
        return NextResponse.json({
          status: 200,
          meg: '성공적으로 처리 되었습니다.',
          success: true,
          items: result,
          totalCount: totalResult.count,
        })
      }
    }
  } catch (error) {
    console.log('search/route.ts:', error)
    return NextResponse.json({
      status: 500,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      success: false,
    })
  }
}
