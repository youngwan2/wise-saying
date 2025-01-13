export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { HTTP_CODE } from '@/app/http-code'


export async function GET(req: NextRequest) {
  try {

    const getSearchCount = req.nextUrl.searchParams.get('random-count')
    const limit = Number(getSearchCount) || 5
    const db = await openDB()
    const countSelectQuery = `SELECT quote_id FROM quotes `

    if (!getSearchCount) {
      return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: "잘못된 요청입니다. random-count 를 지정하였는지 확인하세요." }, { status: 400 })
    }

    const result = await db.query(countSelectQuery)

    const randomNumbers: number[] = [] // 랜덤 명언 id 배열

    try {
      let quoteIds = mappingQuoteId(result.rows)
      while (randomNumbers.length !== limit) {
        for (let i = 0; i < limit; i++) {
          const randomNum = Math.floor(Math.random() * limit) + 1;
          randomNumbers.push(quoteIds[randomNum])
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ ...HTTP_CODE.NOT_FOUND, meg: error.message }, { status: 404 })
      }

    }

    const uniqueNumbers = [...new Set(randomNumbers)] // 중복 제거된 배열


    if (!Array.isArray(uniqueNumbers)) {
      return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST }, { status: 401 })
    }

    const stringUniqueNumbers = [...new Set(randomNumbers)].join(","); // 중복 제거된 배열
    const query =
      `
      SELECT A.quote_id AS quote_id, quote, author, job, birth
      FROM quotes A
      INNER JOIN authors B ON A.author_id = B.author_id
      WHERE A.quote_id IN (${stringUniqueNumbers})
    `

    // 쿼리 실행
    const results = await db.query(query);
    await db.end();

    const items = results.rows
    return NextResponse.json({
      ...HTTP_CODE.OK,
      items,
    })
  } catch (error) {
    console.error('/api/quotes/random/routs.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}



/** 객체 형식의 명언 id 를 숫자 배열 형태로 맵핑하여 반환 */
function mappingQuoteId(quoteIds: { quote_id: number }[]) {
  if (quoteIds.length < 1) throw new Error("명언정보가 존재하지 않음")
  return quoteIds.map(item => item.quote_id)

}