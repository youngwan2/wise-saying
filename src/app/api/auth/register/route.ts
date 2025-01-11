import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { openDB } from "@/utils/connect";
import { consentSchema, userSchema } from "@/validation/joi/schema";
import { HTTP_CODE } from "@/app/http-code";

// 암호화 설정(옵션)
const SALT = 10;

export async function POST(req: NextRequest) {
  try {
    const db = await openDB();

    // 1. 요청 Body 파싱
    const body = await req.json();
    const { email, password, reConfirmPw, consents } = body;

    // 2. 유효성 검증
    const userValidation = userSchema.validate({ email, password, reConfirmPw });
    const consentValidation = consentSchema.validate(consents);

    if (userValidation.error || consentValidation.error) {
      return NextResponse.json(
        {
          ...HTTP_CODE.BAD_REQUEST,
          meg: "이용약관, 만 14세 이상, 개인정보 이용 및 수집 동의는 필수입니다.",
        },
        { status: 400 }
      );
    }

    const { email: validEmail, password: validPs } = userValidation.value;
    const { all, term, private: privateConsent, child, event } = consentValidation.value;

    // 3. 이메일 중복 확인
    const existingUserQuery = `SELECT user_id FROM users WHERE email = $1`;
    const existingUserResult = await db.query(existingUserQuery, [validEmail]);

    if (existingUserResult.rowCount && existingUserResult.rowCount > 0) {
      await db.end();
      return NextResponse.json(
        {
          ...HTTP_CODE.CONFLICT,
          meg: "이미 등록된 이메일입니다.",
        },
        { status: 409 }
      );
    }

    // 4. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(validPs, SALT);

    // 5. 사용자 등록
    const userInsertQuery = `INSERT INTO users(email, password) VALUES ($1, $2) RETURNING user_id`;
    const userInsertResult = await db.query(userInsertQuery, [validEmail, hashedPassword]);

    if (userInsertResult.rowCount === 0) {
      await db.end();
      return NextResponse.json(
        {
          ...HTTP_CODE.INTERNAL_SERVER_ERROR,
          meg: "사용자 등록 중 오류가 발생했습니다.",
        },
        { status: 500 }
      );
    }

    const { user_id } = userInsertResult.rows[0];

    // 6. 동의 정보 저장
    const consentInsertQuery = `
      INSERT INTO consents(user_id, all_consent, terms_consent, private_consent, child_consent, event_consent)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await db.query(consentInsertQuery, [user_id, all, term, privateConsent, child, event]);

    // DB 연결 종료
    await db.end();

    // 7. 성공 응답
    return NextResponse.json(HTTP_CODE.CREATED, { status: 201 });
  } catch (error) {
    console.error("Error in /api/auth/register/route.ts:", error);

    // 서버 오류 응답
    return NextResponse.json(
      {
        ...HTTP_CODE.INTERNAL_SERVER_ERROR,
        meg: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
