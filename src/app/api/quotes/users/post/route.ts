import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'
import { accessTokenVerify } from '@/utils/validation'



// POST | 유저가 작성한 포스트 등록(추가) 요청
export async function POST(req: NextRequest) {
    // 토큰 유효성 검증
    const { status, meg, success, user } = accessTokenVerify(req)

    if (status === 400) {
        return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
        return NextResponse.json({ status, success, meg })
    }

    const { userId } = user

    try {
        const db = await openDb()
        const { category, content: quote, author } = await req.json()

        const createDate = new Date().toLocaleString()
        const insertQuery = `
              INSERT INTO quotes_all(quote,category, sub_category, author,job, create_date,user_id)
              VALUES (?,?,?,?,?,?,?)
          `
        db.get(insertQuery, [quote, 'all', category.trim(), author, '사용자', createDate, userId])
        db.close()
        return NextResponse.json({
            status: 201,
            success: true,
            meg: '정상적으로 처리되었습니다.',
        })
    } catch (error) {
        console.error('/api/quotes/users/post/route.ts', error)
        return NextResponse.json({
            status: 500,
            success: false,
            meg: '서버 측 문제 입니다. 나중에 다시 시도 해주세요.',
        })
    }
}

