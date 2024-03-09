import { HTTP_CODE } from "@/app/http-code";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, res: { params: { id: string } }) { 
  const { id } = res.params

  try {
    const db = await openDB();

    const selectQuery = `
    SELECT views
    FROM views
    WHERE quote_id = $1 
    `
    const selectResult = await db.query(selectQuery, [id])
    const views = selectResult.rows[0]?.views || 0

    return NextResponse.json({...HTTP_CODE.OK, views})



  } catch (error) {
    console.error('/api/quotes/[id]/views/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }


}



// PATCH | 명언 조회수 업데이트
export async function PATCH(req: NextRequest, res: { params: { id: string } }) {

  const { id } = res.params

  try {
    const db = await openDB();

    const selectQuery = `
    SELECT COUNT(quote_id) as count
    FROM views
    WHERE quote_id = $1 
    `
    const insertQuery = `
    INSERT INTO views(quote_id)
    VALUES ($1)
    `
    const updateQuery = `
    UPDATE views
    SET views = $1
    WHERE quote_id =  $2
    `
    const selectResult = await db.query(selectQuery, [id])
    const isViews = (selectResult.rows[0].count || 0) > 0
    const views = selectResult.rows[0].count
    let viewsTypeToNum = Number(views)


    // 게시글을 1번이라도 조회하여 테이블에 등록된 경우
    if (isViews) {
      const newViews = viewsTypeToNum + 1
      await db.query(updateQuery, [newViews, id])
      db.end()
      return NextResponse.json({ success: true })


      // 아무도 게시글을 보지 않은 경우(초기상태)
    } else {
      const newViews = viewsTypeToNum + 1
      await db.query(insertQuery, [id])
      await db.query(updateQuery, [newViews, id])

      db.end()
      return NextResponse.json({ success: true })
    }

  } catch (error) {
    console.error('/api/quotes/[id]/views/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}