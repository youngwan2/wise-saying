import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import data from '../../../../data.js'
import { updateData } from "../../../../data.js";

export async function POST(req: NextRequest) {

    // const query = `
    // UPDATE quotes
    // SET intro =$1, birth = $2
    // WHERE author LIKE $3
    // `

    // const db = await openDB();

    // data.forEach((data) => {
    //     const { birth, intro, name } = data
    //     db.query(query, [intro, birth, `%${name}%`])
    // })

    // db.end()
    // return NextResponse.json({ meg: "정상적으로 추가 됨." })

    const db = await openDB();
    const query = `
    SELECT DISTINCT author, job, intro, birth
    FROM quotes
    `

    // const results = await db.query(query)
    // const result = results.rows
    // return NextResponse.json(result)

    const json = [
        {
            "author": "오손 웰스",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "버지니아 울프",
            "job": "영국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 맥스웰",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "한비",
            "job": "중국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 앨런",
            "job": "영국 저술가",
            "intro": null,
            "birth": null
        },
        {
            "author": "시어도어 루즈벨트 대통령",
            "job": "미국 제 26대 대통령",
            "intro": null,
            "birth": null
        },
        {
            "author": "비비안 그린",
            "job": "영국 저술가",
            "intro": null,
            "birth": null
        },
        {
            "author": "노만 빈센트 필",
            "job": "미국 성직자",
            "intro": null,
            "birth": null
        },
        {
            "author": "미겔 데 세르반테스",
            "job": "스페인 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "요한 볼프강 폰 괴테",
            "job": "독일 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "월 스트리트 저널",
            "job": "신문사",
            "intro": null,
            "birth": null
        },
        {
            "author": "호라티우스",
            "job": "고대로마 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "쟝 파울 리히터",
            "job": "독일 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에픽테투스",
            "job": "고대그리스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "조나단 스위프트",
            "job": "영국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "노먼 빈센트 필",
            "job": "미국 성직자",
            "intro": null,
            "birth": null
        },
        {
            "author": "정주영",
            "job": "한국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "안창호",
            "job": "대한제국 운동가",
            "intro": null,
            "birth": null
        },
        {
            "author": "스티븐 그렉",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마크 후버",
            "job": "월트디즈니 직원",
            "intro": null,
            "birth": null
        },
        {
            "author": "알프레드 슬로안 2세",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "미셸 드 몽테뉴",
            "job": "프랑스 철학가",
            "intro": null,
            "birth": null
        },
        {
            "author": "프랜시스 톰프슨",
            "job": "영국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마가릿 조",
            "job": "미국 희극배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "톰 모나건",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "메리 케이 애쉬",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "톰 피터스",
            "job": "미국 저술가",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 보즈웰",
            "job": "영국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "바가바드 기타",
            "job": "힌두교 경전",
            "intro": null,
            "birth": null
        },
        {
            "author": "마릴린 먼로",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "에드거 A. 게스트",
            "job": "미국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "프랜시스 베이컨",
            "job": "영국 대법관",
            "intro": null,
            "birth": null
        },
        {
            "author": "샤를 몽테스키외",
            "job": "프랑스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "다그 함마르셸드",
            "job": "스웨덴 외교관",
            "intro": null,
            "birth": null
        },
        {
            "author": "폴 틸리히",
            "job": "독일 신학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "법정 스님",
            "job": "한국 스님",
            "intro": null,
            "birth": null
        },
        {
            "author": "그레그 S. 레이드(Greg S. Reid)",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "루이사 메이올콧",
            "job": "미국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "윌리엄 셰익스피어",
            "job": "영국 극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "래니 어레돈",
            "job": "커뮤니케이션 전문가",
            "intro": null,
            "birth": null
        },
        {
            "author": "버트런드 러셀",
            "job": "영국 수리논리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "소포클레스",
            "job": "고대그리스 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "앤드류 카네기",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "로버트 크리겔 & 루이스 패틀러",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 앨런",
            "job": "영국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "피터 템즈",
            "job": "콜롬비아 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "헬렌 켈러",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "쉐드 헴스테더",
            "job": "미국 심리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "사무엘 푸트",
            "job": "영국 극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "증자",
            "job": "중국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 고다드",
            "job": "미국 모험가",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 우든",
            "job": "미국 농구감독",
            "intro": null,
            "birth": null
        },
        {
            "author": "부커 T. 워싱턴",
            "job": "미국 교육자",
            "intro": null,
            "birth": null
        },
        {
            "author": "이사도어 샤프",
            "job": "캐나다 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "모랑",
            "job": "프랑스 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "토머스 에디슨",
            "job": "미국 발명가",
            "intro": null,
            "birth": null
        },
        {
            "author": "런던 타임즈",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "엘리자베스 튀블러로스",
            "job": "미국 정신과의사",
            "intro": null,
            "birth": null
        },
        {
            "author": "윌리엄 해즐릿",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 딘",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "보브나르그",
            "job": "프랑스 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "버트러드 러셀",
            "job": "영국 논리수리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "혼다 겐",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "이탈리아의 속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "조동성",
            "job": "한국 교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "다니엘 버넘",
            "job": "미국 건축가",
            "intro": null,
            "birth": null
        },
        {
            "author": "박형미",
            "job": "한국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "발타사르 그라시안",
            "job": "스페인 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "피터 펜",
            "job": "만화 캐릭터",
            "intro": null,
            "birth": null
        },
        {
            "author": "빌 게이츠",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마쓰오 바쇼",
            "job": "일본 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "하루야마 시게오",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "강수진",
            "job": "한국 성우",
            "intro": null,
            "birth": null
        },
        {
            "author": "콘래드 힐튼",
            "job": "멕시코 하원의원",
            "intro": null,
            "birth": null
        },
        {
            "author": "장자",
            "job": "중국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "월트 디즈니",
            "job": "미국 애니메이터",
            "intro": null,
            "birth": null
        },
        {
            "author": "펄 벅",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "김영식 천호식품 회장, ‘10미터만 더 뛰어봐’에서",
            "job": "한국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "이지성",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "토머스 칼라일",
            "job": "영국 사학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "윌리엄 아서 워드",
            "job": "미국 저술가",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 롤린스",
            "job": "영미 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "단테",
            "job": "이탈리아 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "벤자민 디즈레일리",
            "job": "미국 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "귀스타브 플로베르",
            "job": "프랑스 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "김형철",
            "job": "한국 교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "에드먼드 스펜서",
            "job": "영국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "손병두",
            "job": "한국 경제학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "플라우투스",
            "job": "로마 희극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "알베르트 아인슈타인",
            "job": "독일 이론물리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "나카타니 아키히로",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "톰 로빈스",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "해리 트루먼",
            "job": "미국 제 33대 대톨령",
            "intro": null,
            "birth": null
        },
        {
            "author": "죤 밀턴",
            "job": "영국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "관리자",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "니체",
            "job": "독일 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "하용조",
            "job": "한국 목사",
            "intro": null,
            "birth": null
        },
        {
            "author": "혜민",
            "job": "한국 스님",
            "intro": null,
            "birth": null
        },
        {
            "author": "체스티 풀러",
            "job": "미해병대 장군",
            "intro": null,
            "birth": null
        },
        {
            "author": "짐 론",
            "job": "미국 기업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "스튜어트 레빈 & 마이클 크롬 (Stuart Levine & Michael Crom)",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "J. F. 케네디",
            "job": "미국 제 35대 대통령",
            "intro": null,
            "birth": null
        },
        {
            "author": "이병철",
            "job": "한국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "스티브잡스",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "조엘 오스틴",
            "job": "미국 목사",
            "intro": null,
            "birth": null
        },
        {
            "author": "문무왕",
            "job": "신라 제30대 왕",
            "intro": null,
            "birth": null
        },
        {
            "author": "엘사 맥스웰",
            "job": "미국 언론인",
            "intro": null,
            "birth": null
        },
        {
            "author": "론 시몬스",
            "job": "미국 프로레슬링 선수",
            "intro": null,
            "birth": null
        },
        {
            "author": "러셀 유잉(Russel H. Ewing)",
            "job": "미국 언론인",
            "intro": null,
            "birth": null
        },
        {
            "author": "최염순",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "디오게네스",
            "job": "그리스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "알베르트 아인슈타인",
            "job": "독일 물리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "라틴 속담",
            "job": "작자미상",
            "intro": null,
            "birth": null
        },
        {
            "author": "알프레드 베게너",
            "job": "독일 기상학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "리타 존슨",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "헨리 포드",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "아이젠하워",
            "job": "미국 제34대 대통령",
            "intro": null,
            "birth": null
        },
        {
            "author": "프리드리히 니체",
            "job": "독일 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "게이트(인터넷가명)",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "마크 주커버그",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "괴테",
            "job": "독일 과학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "해롤드 쿠시너",
            "job": "미국 랍비",
            "intro": null,
            "birth": null
        },
        {
            "author": "조신영",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "파울로 코엘료",
            "job": "브라질 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "F.스콧 핏제랄드",
            "job": "미국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "셜리 템플",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "짐 콜린스",
            "job": "미국 컨설턴트",
            "intro": "세계에서 가장 영향력 있는 경영석학. 글로벌 베스트셀러이며 ‘경영의 바이블’로 꼽히는 『좋은 기업을 넘어 위대한 기업으로』『성공하는 기업들의 8가지 습관』『위대한 기업은 다 어디로 갔을까』의 저자. 1958년 미국 콜로라도에서 태어나 스탠퍼드대학교 경영학 과정을 마친 뒤 HP와 매킨지에서 근무했다. 이후 모교에서 「기업가 정신」을 강의하면서 1992년 ‘명강의 상’을 받았다. 현재 콜로라도 주 볼더의 ‘매니지먼트랩Management Lab’ 경영연구소에서 실천적 경영원리를 개발하며 「포춘」 「비즈니스위크」 「이코노미스트」 「USA투데이」 「하버드비즈니스리뷰」 등에 글을 발표하고 있다. 공공기관 및 민간기업 출신 경영자들과 함께 연구, 강의, 저술, 컨설팅도 진행 중이다.",
            "birth": "1958.1.25"
        },
        {
            "author": "토마스 프리드만",
            "job": "미국 언론인",
            "intro": null,
            "birth": null
        },
        {
            "author": "플로랑스 스코벨 쉰",
            "job": "미국 예술가",
            "intro": null,
            "birth": null
        },
        {
            "author": "도로시 딕스",
            "job": "미국 언론인",
            "intro": null,
            "birth": null
        },
        {
            "author": "이순신",
            "job": "조선 무신",
            "intro": null,
            "birth": null
        },
        {
            "author": "엘링 카게",
            "job": "노르웨이 탐험가",
            "intro": null,
            "birth": null
        },
        {
            "author": "산티데바라",
            "job": "인도 스님",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 호머 밀스",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "아이리스 머독",
            "job": "영국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "켄 제닝스 & 존슈탈 베르트",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "프랭크 위걸즈워스 클라크",
            "job": "미국 지구화학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "황병기",
            "job": "한국 음악가",
            "intro": null,
            "birth": null
        },
        {
            "author": "시드니 하워드",
            "job": "미국 극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "루트비히 판 베토벤",
            "job": "독일 작곡가",
            "intro": null,
            "birth": null
        },
        {
            "author": "솔론",
            "job": "고대그리스 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "작자미상",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "세릴 리치",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "스튜어트 와일드",
            "job": "영국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에리히 프롬",
            "job": "미국 사회심리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "동방의 속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "라퐁텐",
            "job": "프랑스 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "구양수(歐陽修)",
            "job": "중국철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "P.J 베일리",
            "job": "영국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "조셉 어윈밀러",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "웰링턴",
            "job": "영국 총리",
            "intro": null,
            "birth": null
        },
        {
            "author": "강헌구",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 메이너드 케인스",
            "job": "영국 경제학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "켄 블랜차드",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "루크레티우스",
            "job": "로마 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "토마스 풀러",
            "job": "영국 성직자",
            "intro": null,
            "birth": null
        },
        {
            "author": "무량수경",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "이오시프 스탈린",
            "job": "러시아 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "콜린 파월",
            "job": "미국 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "김정빈",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "브라이언 트레이시",
            "job": "미국 연설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "폴 베어 브라이언트",
            "job": "미국 미식축구인",
            "intro": null,
            "birth": null
        },
        {
            "author": "소크라테스",
            "job": "고대그리스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "미켈란젤로",
            "job": "이탈리아 조각가",
            "intro": null,
            "birth": null
        },
        {
            "author": "게리 하멜",
            "job": "미국 경영컨설턴트",
            "intro": null,
            "birth": null
        },
        {
            "author": "알버트 슈바이처",
            "job": "프랑스 의사",
            "intro": null,
            "birth": null
        },
        {
            "author": "생텍쥐페리",
            "job": "프랑스 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "알버트 그레이",
            "job": "캐나다 총독",
            "intro": null,
            "birth": null
        },
        {
            "author": "이드리스 샤흐",
            "job": "영국 작가",
            "intro": "1924년 인도에서 태어나 1996년에 세상을 떠난 작가이자 교사이며, 수피교의 수승이다. 수피즘, 영성, 심리학 및 문화에 관한 35권 이상의 책을 저술하였으며 그의 작품은 여러 언어로 번역되며 유명세를 얻었다.",
            "birth": "1924 ~ 1996 (정확한 출생날과 사망일을 알수없음)"
        },
        {
            "author": "토마스 에디슨",
            "job": "미국 발명가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에이브러햄 링컨",
            "job": "미국 제16대 대통령",
            "intro": null,
            "birth": null
        },
        {
            "author": "아놀드 글래스노",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "딘 토즈볼드 & 메리 토즈볼드 ",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "앤서니 로빈스",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에드워드 밴필드",
            "job": "미국 하버드교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "마크 머피",
            "job": "미국 가수",
            "intro": null,
            "birth": null
        },
        {
            "author": "블라디미르 나보코프",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "공자",
            "job": "고대중국 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "스티븐 제이 굴드",
            "job": "미국 생물학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "홍응명(洪應明)",
            "job": "중국 문인",
            "intro": null,
            "birth": null
        },
        {
            "author": "이성용",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "앤드류 매튜스",
            "job": "호주 대변인",
            "intro": null,
            "birth": null
        },
        {
            "author": "아베 피에르",
            "job": "로마 사제",
            "intro": null,
            "birth": null
        },
        {
            "author": "이나모리 가즈오",
            "job": "일본 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에드워드 데밍",
            "job": "미국 품질권위자",
            "intro": null,
            "birth": null
        },
        {
            "author": "루키우스 아프라니우스",
            "job": "로마 군인",
            "intro": null,
            "birth": null
        },
        {
            "author": "린 데이비스",
            "job": "미국 사진가",
            "intro": null,
            "birth": null
        },
        {
            "author": "허버트 벤슨",
            "job": "미국 의사",
            "intro": null,
            "birth": null
        },
        {
            "author": "엘리자베스 길버트",
            "job": "미국 언론인",
            "intro": null,
            "birth": null
        },
        {
            "author": "틱낫한 스님",
            "job": "베트남 평화운동가",
            "intro": null,
            "birth": null
        },
        {
            "author": "다카하라 게이치로",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 러스킨",
            "job": "영국 예술평론가",
            "intro": null,
            "birth": null
        },
        {
            "author": "뤄궈룽",
            "job": "중국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "리사 클레이파스",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "박세리",
            "job": "한국 프로골퍼",
            "intro": null,
            "birth": null
        },
        {
            "author": "코오디너",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "헨리 민츠버그",
            "job": "캐나다 교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "클레멘트 스톤",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "로저 엔리코",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "배리 포스너",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "정조대왕",
            "job": "조선 제22대 국왕",
            "intro": null,
            "birth": null
        },
        {
            "author": "워렌 베니스",
            "job": "미국 컨설턴트",
            "intro": null,
            "birth": null
        },
        {
            "author": "석가모니",
            "job": "인도 수행자",
            "intro": null,
            "birth": null
        },
        {
            "author": "논어",
            "job": "작자미상",
            "intro": null,
            "birth": null
        },
        {
            "author": "폴 J. 마이어",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "빅터 프랭클",
            "job": "오스트리아 신경학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "강준민",
            "job": "한국 목사",
            "intro": null,
            "birth": null
        },
        {
            "author": "조지 엘리엇",
            "job": "영국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "생떽쥐베리",
            "job": "프랑스 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "세스 고딘",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "조지 고든 바이런",
            "job": "영국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "미우라 아야코",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "조지 버나드 쇼",
            "job": "아일랜드 극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "프랑스 속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "마르쿠스 툴리우스 키케로",
            "job": "이탈리아 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "송길원",
            "job": "한국 목사",
            "intro": "가정행복 NGO인 (사)하이패밀리의 대표로 있다. 가정행복지킴이로 아내 김향숙 박사와 함께 가족생태계를 변화시키는 일에 30년을 헌신해 왔다. 그의 키워드는 ‘행복·가정·미래’다. 모든 사람을 ‘행복가정’으로 헹가래 치고픈 그가 이번에는 죽음에 맞장을 떴다. 고신대학과 동 신학대학원, 고려대학교대학원을 졸업하고 미국 RTS에서 학위를 받았다",
            "birth": "1957.5.25"
        },
        {
            "author": "톰 스템버그",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "레오니드 안드레예프",
            "job": "러시아 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "피터 드러커",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "우종민",
            "job": "한국 교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "리차드 백스터",
            "job": "영국 신학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "강영우",
            "job": "한국 박사",
            "intro": null,
            "birth": null
        },
        {
            "author": "데이비드 렌즈",
            "job": "미국 역사학자 ",
            "intro": "1924년 뉴욕 출생으로 조지워싱턴 대학교 역사학과 교수직을 역임하였고, 하버드 대학교 경제학과 명예교수이다. 랜즈는 1953년 하버드 대학교에서 박사 학위를 받았으며, 1942년 뉴욕시티 칼리지에서 문학사 학위를 받았다.",
            "birth": "1924 출생"
        },
        {
            "author": "마크 트웨인",
            "job": "미국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "나폴레온 힐",
            "job": "미국 작가",
            "intro": "나폴리언 힐은 미국의 세계적인 성공학 연구자이다. 유년시절에 새어머니로부터 \"너는 틀림없이 역사에 이름을 남길 위대한 작가가 될 것이다\"라는 예언적인 말을 들으면서, 지역의 여러 신문과 잡지에 글을 기고하면서, 작가의 꿈을 꾸게 되었다",
            "birth": "1883.10.26 ~ 1970.11.8"
        },
        {
            "author": "앤드류 카네기",
            "job": "미국 기업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 록펠러",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "맥스 루카도",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "킹 위트니 주니어(King Whitney Jr.)",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "손정의",
            "job": "한국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "월터 윈틀",
            "job": "미국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "조지 소로스",
            "job": "미국 경제학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "엘버트 허버드",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "윤문석",
            "job": "한국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "벤자민 젠더",
            "job": "미국 지휘자",
            "intro": null,
            "birth": null
        },
        {
            "author": "낸시 설리번",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "독일속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "셸리 템플",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "레프 톨스토이",
            "job": "러시아 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "마하트마 간디",
            "job": "인도 인권운동가",
            "intro": null,
            "birth": null
        },
        {
            "author": "아리스토텔레스",
            "job": "고대그리스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "역경",
            "job": "유교 경전",
            "intro": null,
            "birth": null
        },
        {
            "author": "스티븐 코비",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "제러인트 윈 데이비스",
            "job": "영국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "P.시루스",
            "job": "고대로마 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "마르쿠스 툴리우스 키케로",
            "job": "로마 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "호리바 마사오",
            "job": "일본 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "구스타프 클림트",
            "job": "오스트리아 화가",
            "intro": null,
            "birth": null
        },
        {
            "author": "맹자",
            "job": "중국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "자코모레오파르디",
            "job": "이탈리아 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "토마스 아켐피스",
            "job": "독일 성직자",
            "intro": null,
            "birth": null
        },
        {
            "author": "찰스 다윈",
            "job": "영국 생물학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "미뇽 맥래플린",
            "job": "프랑스 작곡가",
            "intro": null,
            "birth": null
        },
        {
            "author": "사토 도미오",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "루키우스 안나이우스 세네카",
            "job": "고대로마 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마이클 매컬러프",
            "job": "미국 박사",
            "intro": null,
            "birth": null
        },
        {
            "author": "마틴 셀리그만",
            "job": "미국 심리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "동유럽유대인격언",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "마르쿠스 마닐리우스",
            "job": "로마 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "타이이치 오노",
            "job": "일본 기술자",
            "intro": null,
            "birth": null
        },
        {
            "author": "이태석",
            "job": "한국 신부",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 맥그레이스",
            "job": "호주 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "명심보감(저자: 추적)",
            "job": "고려 문신",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 오펜하임",
            "job": "미국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "알베르 카뮈",
            "job": "프랑스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "앨톤 존스",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "라파예트 로널드 허버드",
            "job": "미국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "레지 잭슨",
            "job": "미국 야구선수",
            "intro": null,
            "birth": null
        },
        {
            "author": "로버트 엘리엇 스피어",
            "job": "미국 선교사",
            "intro": null,
            "birth": null
        },
        {
            "author": "공지영",
            "job": "한국 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "윌리엄 제임스",
            "job": "미국 하버드교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "이솝",
            "job": "그리스 우화작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "400년 전 소설 돈키호테",
            "job": "돈키호테 주인공",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 케이더",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "벤저민 프랭클린",
            "job": "미국 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "아르투어 쇼펜하우어",
            "job": "독일 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "한스 프리체",
            "job": "독일 언론인",
            "intro": null,
            "birth": null
        },
        {
            "author": "리처드 칼슨",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "표도르 도스토옙스키",
            "job": "러시아 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "앙드레 말로",
            "job": "프랑스 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "폴 케네디",
            "job": "영국 사학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "토마스 왓슨",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "일본 속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "카를 쾨르너",
            "job": "독일 군인",
            "intro": null,
            "birth": null
        },
        {
            "author": "트레이 파커",
            "job": "미국 애니메이터",
            "intro": null,
            "birth": null
        },
        {
            "author": "G. K. 체스터턴(Gilbert K. Chesterton)",
            "job": "영국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "알프레드 아들러",
            "job": "오스트리아 의사",
            "intro": null,
            "birth": null
        },
        {
            "author": "로버트 쿨리에",
            "job": "미국 고고학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "레너드 번스타인",
            "job": "미국 지휘자",
            "intro": null,
            "birth": null
        },
        {
            "author": "알랭 들롱",
            "job": "프랑스 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "윌리엄 폴라드",
            "job": "미국 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "장자크 루소",
            "job": "스위스 철학자",
            "intro": "18세기 프랑스의 사상가·소설가. 작품은《신 엘로이즈》,《에밀》,《고백록》등이다. 프랑스 혁명에서 그의 자유민권 사상은 혁명지도자들의 사상적 지주가 되었다. 19세기 프랑스 낭만주의 문학의 선구적 역할을 하였다.",
            "birth": "1712.6.28 ~ 1778.7.2"
        },
        {
            "author": "상화",
            "job": "중국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에릭 웨이언메이어",
            "job": "미국 등반가",
            "intro": null,
            "birth": null
        },
        {
            "author": "중국속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "양주",
            "job": "중국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "니이하라 히로아키",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "윤동주",
            "job": "한국 독립운동가",
            "intro": null,
            "birth": null
        },
        {
            "author": "스즈키 도시후미",
            "job": "일본 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "웨인 다이어",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "로버트 기요사키",
            "job": "미국 저술가",
            "intro": null,
            "birth": null
        },
        {
            "author": "루시우스 아나이우스 세네카",
            "job": "고대로마 정치가",
            "intro": null,
            "birth": null
        },
        {
            "author": "로저 밀러",
            "job": "카메룬 축구선수",
            "intro": null,
            "birth": null
        },
        {
            "author": "제프리 카처",
            "job": "영국 의원",
            "intro": null,
            "birth": null
        },
        {
            "author": "정약용",
            "job": "조선 문신",
            "intro": null,
            "birth": null
        },
        {
            "author": "장 아누이",
            "job": "프랑스 극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "오마에 겐이치",
            "job": "일본 경제학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "사무엘 존슨",
            "job": "영국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "헨리 워즈워스 롱펠로",
            "job": "미국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "조지 산타야나",
            "job": "미국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "마쓰시타 고노스케",
            "job": "일본 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마사 그레이엄",
            "job": "미국 무용가",
            "intro": null,
            "birth": null
        },
        {
            "author": "나폴레옹",
            "job": "전 프랑스 황제",
            "intro": null,
            "birth": null
        },
        {
            "author": "닐 도널드 월시",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "토마스 만",
            "job": "독일 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "릭 워렌",
            "job": "미국 목사",
            "intro": null,
            "birth": null
        },
        {
            "author": "W.H. 머레이",
            "job": "히말라야 탐험가",
            "intro": null,
            "birth": null
        },
        {
            "author": "마스시타 고노스케",
            "job": "일본 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "팔라다스",
            "job": "이집트 시인",
            "intro": "이집트 알렉산드리아에 살았던 그리스 시인으로 대표적인 저서로는  New Epigrams of Palladas: A Fragmentary Papyrus Codex (P. CtYBR Inv. 4000) 이 있다.",
            "birth": "서기 4세기 출생 추정"
        },
        {
            "author": "마더 테레사",
            "job": "수녀",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 보트킨",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "시드니 스미스",
            "job": "캐나다 화가",
            "intro": null,
            "birth": null
        },
        {
            "author": "션 코비",
            "job": "미국  박사",
            "intro": null,
            "birth": null
        },
        {
            "author": "벤자민 프랭클린",
            "job": "미국 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마쓰시타 고노스케",
            "job": "일본 사업가",
            "intro": null,
            "birth": null
        },
        {
            "author": "앨런 코헨",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "박해조",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "손정의",
            "job": "한국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마빈 토카이어",
            "job": "랍비",
            "intro": null,
            "birth": null
        },
        {
            "author": "캐롤 버넷",
            "job": "미국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "법구경",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "전신애",
            "job": "미국 노동부차관",
            "intro": null,
            "birth": null
        },
        {
            "author": "에밀 쿠에",
            "job": "프랑스 약사",
            "intro": null,
            "birth": null
        },
        {
            "author": "기타가와 야스시, ‘편지가게’에서",
            "job": "일본 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "데일 카네기",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "랄프 왈도 에머슨",
            "job": "미국 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "캐서린 햅번",
            "job": "미국배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "(역자) 강미경",
            "job": "한국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "릭 피티노",
            "job": "미국 농구코치",
            "intro": null,
            "birth": null
        },
        {
            "author": "다나카 가쿠에이",
            "job": "일본 정치인",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 피너텔리",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "E. W. 스크립스",
            "job": "미국 출판업자",
            "intro": null,
            "birth": null
        },
        {
            "author": "이하라 류이치",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "윈스턴 처칠",
            "job": "영국 총리",
            "intro": null,
            "birth": null
        },
        {
            "author": "게리 헤빈",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "마르쿠스 아우렐리우스 안토니우스",
            "job": "로마황제",
            "intro": null,
            "birth": null
        },
        {
            "author": "라파예트 로널드 허버드(L. 론 허바드)",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "워렌버핏",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "찰리 채플린",
            "job": "영국 배우",
            "intro": null,
            "birth": null
        },
        {
            "author": "랄프 트라인",
            "job": "미국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "라스 폰 트리에",
            "job": "덴마크 영화감독 ",
            "intro": null,
            "birth": null
        },
        {
            "author": "베르길리우스",
            "job": "로마 시인",
            "intro": null,
            "birth": null
        },
        {
            "author": "모치즈키 도시타카",
            "job": "일본 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "바바라 홀",
            "job": "미국 각본가",
            "intro": null,
            "birth": null
        },
        {
            "author": "제프리 이멜트",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "터키속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "플루타르코스",
            "job": "고대그리스 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "제프리 페퍼",
            "job": "미국 스탠퍼드교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "안네 프랭크",
            "job": "독일 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "요한복음",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "게리 베커",
            "job": "미국 경제학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "존 아사리프 & 머레이 스미스",
            "job": "한국 심리학박사",
            "intro": null,
            "birth": null
        },
        {
            "author": "마키아벨리",
            "job": "이탈리아 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "도널드 트럼프",
            "job": "미국 제45대 대통령",
            "intro": null,
            "birth": null
        },
        {
            "author": "파블로 피카소",
            "job": "스페인 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "윌리엄 오슬러",
            "job": "캐나다 의사",
            "intro": null,
            "birth": null
        },
        {
            "author": "밀턴 프리드 먼",
            "job": "미국 경제학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "노자",
            "job": "중국 철학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "넬슨 만델라",
            "job": "전 남아프리카 공화국 대통령",
            "intro": null,
            "birth": null
        },
        {
            "author": "레오나르도 다 빈치",
            "job": "이탈리가 화가",
            "intro": null,
            "birth": null
        },
        {
            "author": "신용환",
            "job": "한국 목사",
            "intro": null,
            "birth": null
        },
        {
            "author": "잭 웰치",
            "job": "미국 기업인",
            "intro": null,
            "birth": null
        },
        {
            "author": "러시아속담",
            "job": "알수없음",
            "intro": null,
            "birth": null
        },
        {
            "author": "데이비드 랜즈",
            "job": "미국 하버드교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "데모스테네스",
            "job": "고대그리스 정치가",
            "intro": null,
            "birth": null
        },
        {
            "author": "로맹 롤랑",
            "job": "프랑스 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "루이스 헤이(루이스 L. 헤이)",
            "job": "미국 연설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "에드 디너",
            "job": "미국 심리학자",
            "intro": null,
            "birth": null
        },
        {
            "author": "제임스 메튜배리 경",
            "job": "영국 극작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "키스 페라지",
            "job": "미국 작가",
            "intro": null,
            "birth": null
        },
        {
            "author": "차동엽",
            "job": "한국 신부",
            "intro": null,
            "birth": null
        },
        {
            "author": "장 파울",
            "job": "독일 소설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "만티 로버트",
            "job": "영국 엘리자베스 여왕의 말 조련사",
            "intro": null,
            "birth": null
        },
        {
            "author": "토머스 J. 드롱",
            "job": "미국 하버드교수",
            "intro": null,
            "birth": null
        },
        {
            "author": "데니스 웨이틀리",
            "job": "미국 연설가",
            "intro": null,
            "birth": null
        },
        {
            "author": "스탕달",
            "job": "프랑스 작가",
            "intro": null,
            "birth": null
        }
    ]

    const insert = `
    INSERT INTO authors(author, job, intro, birth)
    VALUES ($1, $2, $3, $4)

    `
    json.forEach(async (data) => {
        await db.query(insert, [data.author, data.job, data.intro, data.birth])
    })



    // const updateQuery = `
    // UPDATE quotes
    // SET author_id = $1
    // WHERE quote_id = $2
    // `


    // updateData.forEach(async (arr) => {
    //     await db.query(updateQuery, [arr[1], arr[0]])

    // })

    return NextResponse.json({ meg: '성공' })

}