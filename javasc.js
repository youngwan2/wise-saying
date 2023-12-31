const string = [
  '가까운 사람이 죽을 때마다 느끼는 깊은 고통은 오직 그 사람만이 갖고 있던 형언할 수 없는 무언가가 세상에서 완전히 사라졌다는 느낌으로부터 나온다. -쇼펜하우어',
  '가장 악한 것은 늙는 것이다. 온갖 즐거움을 앗아가면서도 즐거움을 바라는 마음은 남겨두고 대신 온갖 고통을 안기기 때문이다. 그런데도 우리는 죽음을 두려워하고 늙은 채로 있기를 바란다. -자코모 레오파르디',
  '걷은 것은 넘어지지 않으려는 노력에 의해서 우리의 몸의 생명은 죽지 않으려는 노력에 의해서 유지된다. 삶은 연기된 죽음에 불과하다. -아르투르 쇼펜하우어',
  '겁쟁이는 죽음에 앞서 몇 번이고 죽지만 용감한 사람은 한 번밖에 죽음을 맛보지 않는다. -윌리엄 셰익스피어',
  '사람은 누구나 모든 사람들이 다 죽는다고 하면서도 자신은 죽지 않을 것처럼 생각한다. 사람들은 죽는것을 다 알고 있다. 그럼에도 불구하고 마치 그것을 알지 못하는 듯 미친 듯이 산다. -박스터',
  '사람은 혼자 나서 혼자 죽고 혼자 가고 혼자 운다. -무량수경',
  '사람의 비운은 이런 것이다. 모든 것을 알아낼 시간이 75년 밖에 없다는 것. 그 모든 책과 세월과 아이들을 뒤에 남긴 연후보다 차라리 어릴 때에 본능적으로더 많이 안다는 것. -베리 한나',
  '사람이 어떻게 죽느냐가 문제가 아니라 어떻게 사느냐가 문제다. -제임스 보즈웰',
  '사망은 출생과 마찬가지로 자연의 비밀이다. -아우렐리우스 안토니우스',
  '산 자는 모두 고통을 두려워하고 죽음을 두려워한다. -석가모니',
  '산다는 것은 호흡하는 것이 아니라 행동하는 일이다. -루소',
  '살아야 할 때 죽는 것은 천벌이요 죽어야 할 때 사는 것도 천벌이다. -양주',
  '삶은 내가 10세부터 줄곧 말해 온 대로 무지무지하게 흥미롭다. 44세인 지금의 삶은 24세일 때보다 굳이 말하자면 더 빠르고 더 통렬하고 뭐랄까 더 절박하다. 나이아가라폭포를 향해 달려가는 강물처럼 - 버지니아 울프',
  '삶을 깊이 이해하면 할수록 죽음으로 인한 슬픔은 그만큼 줄어들 것입니다. -톨스토이',
  '삶이란 기운의 모임이다. 기운이 모이면 태어나고 기운이 흩어지면 죽는다. 이와 같이 죽음과 삶이 같은 짝임을 안다면 무엇은 근심하랴. -장자',
  '새는 죽음을 당하면 그 소리가 슬프고 사람은 죽음을 당하면 어진 말을 남긴다. -증자',
  '석 자 흙 속으로 돌아가지 않고서는 백 년의 몸을 보전하기 어렵고 이미 석 자 흙 속으로 돌아간 뒤에는 백 년의 무덤을 보전하기 어렵다. -명심보감',
  '설익은 모험을 하려 들면 지독한 대가를 치르는 법이다. 언젠가도 말했지만 18세에서 19세에 술을 마신 남자애들은 지금 다들 안전하게 무덤 속에 누워 있지. - F. 스콧 피츠제럴드',
  '세상의 모든 쓸모 있고 감동적이고 고무적인 업적은 25세에서 40세 사이의 사람들이 이룬 것이다. -윌리엄 오슬러',
  '수의(壽衣)에는 호주머니가 달려있지 않다. -동유럽 유대인 격언',
  '신이 부르실 때는 당신의 모든 소유를 버려야 한다. -동유럽 유대인 격언',
  '싸움이 급하다. 부디 내 죽음을 알리지 말라. -이순신',
  '아무도 죽기를 원하지 않는다. 그래도 죽음은 우리 모두의 숙명이다. 아무도 피할 수 없다. 왜냐하면 삶이 만든 최고의 발명품이 죽음이기 때문이다. -스티브 잡스',
  '아버지~ 왜 죽음을 두려워하십니까? 아직 죽음을 경험해 본 사람은 없지 않습니까? -러시아 속담',
  '아직 삶을 모르는데 어찌 죽음을 알겠는가. -논어',
  '앞으로의 모습을 그리지 말고 어떤 모습으로 죽을 것인가를 그려보아라. 어떻게 살아가야 하는 지 해답을 줄 것이다. -구스타프클림트[죽음과 삶]',
  '오늘의 문제는 싸우는 것이요 내일의 문제는 이기는 것이며 모든 날의 문제는 죽는 것이다. -위고',
  '왜? 죽음을 두려워하는가? 죽음은 인생의 가장 아름다운 모험이다. -C.프로우먼',
  '요람은 심연 위에서 흔들거린다. 그리고 상식적으로 생각해보건대 우리는 단지 영원이라는 두 어둠 사이 잠시 갈라진 틈으로 새어 나오는 빛과 같은 존재다.-블라디미르 나보코프',
  '우리가 여기에 있는 까닭은 운석이 지구를 덮쳐서 공룡을 멸종시켰기 때문이다. 사람들은 ‘고차원적인’ 대답을 갈구하지만 사실 그런 답은 없다. -스티븐 제이골드',
  '우리는 단지 소작인에 불과하다. 조만간에 대지주는 계약기간이 만기되었음을 통보할 것이다. -죠셉 제퍼슨',
  '우리는 모두 벌거숭이로 이 세상에 왔으니 벌거숭이로 이 세상을 떠나리라. -이솝[그리스의 우화 작가]',
  '우리는 모두 타인의 고통 속에서 태어나고 자신의 고통 속에 죽어간다. - 프랜시스 톰프슨 -',
  '우리는 태어나자마자 죽기 시작하고 그 끝은 시작과 연결되어 있다. -마닐리우스',
  '의술로 생명이 연장될 수 있을지 모르나 죽음은 의사에게도 엄습한다. -윌리엄 셰익스피어',
  '이 세상에 죽음만큼 확실한 것은 없다. 그런데 사람들은 겨우살이는 준비하면서도 죽음은 준비하지 않는다.-톨스토이',
  '이별의 시간이 왔다. 우린 자기 길을 간다. 나는 죽고 너는 산다. 어느 것이 더 좋은가는 신만이 안다. -소크라테스',
  '인간은 울면서 태어나서 불평하면서 살고 실망하면서 죽어가는 것이다. -토마스 풀러',
  '인간의 일생은 구두쇠라도 양보하는 순간이 있다. 그것은 유언을 쓸 때이다. -모랑[프랑스의 작가]',
  '인간이 위대해지기 위한 나의 처방전은 아모르파티(Amor Fati : 운명에 대한 사랑)이다. 있는 그대로 외에 아무것도 바라지 않는 것이다. 미래에도 과거에도 영원히. 필연적인 일을 단지 견디기만 하는 것이 아니라 사랑하는 것이다. -프리드리히 니체',
  '인간이 품고 있는 죽음의 공포는 모두 자연에 대한 인식의 결여에서 유래한다. -루크레티우스[로마의 시인철학자]-',
  '인생에게 종말이 없었다면 누가 자기 운명에 절망할 것인가. 죽음은 비운을 더없이 괴로운 것으로 만든다. - 보브나르그[프랑스의 모럴리스트]-',
  '인생이 끝나면 우리는 빈손으로 간다. -중국 속담',
  '잘 보낸 하루가 행복한 잠을 가져 오듯이 잘 산 인생은 행복한 죽음을 가져온다.- 레오나르도 다빈치',
  '잠 못 드는 사람에게는 밤이 길고 피곤한 사람에게는 길이 멀다. 바른 법을 모르는 어리석은 자에게는 삶과 죽음의 길 또한 길고 멀다. -법구경',
  '장기적으로 볼 때 우리는 모두 죽고 없다. -존 메이너드 케인스',
  '젊은이는 곧 그의 육체이고 육체가 곧 그이다. -보이드 맥캔들리스',
  '정당하게 사는 자에게는 어느 곳이든 안전하다. -에픽테투스',
  '죽기를 원하는 사람은 불쌍하지만 죽음을 두려워 않는 사람은 더 불쌍하다. -독일 속담',
  '죽는 기분 말인가? 처음 죽어보는 거라 잘 모르겠군. 내 죽은 다음에 다시 말해주지. -정지윤-[구한말 인물]',
  '죽은 자를 위해 울지 말라. 그는 휴식을 취하고 있기 때문이다. -레오나르도 다 빈치',
  '죽은 제왕보다는 살아 있는 거지가 더 낫다. -라 퐁텐',
  '죽음과 주사위는 모두에게 공평하다. -사무엘 푸트',
  '죽음에서 이상함을 제하고 죽음을 알고 익숙해지자. 무엇보다 죽음을 자주 생각하자. 매 순간 우리 상상 속에서 죽음의 모든 측면을 그려보자. 죽음이 어디서 우릴 기다리고 있을지 불확실하다. 죽음을 미리 생각해보는 건 자유를 미리 생각해보는 것이다. 죽는 법을 배운 사람은 노예가 되는 법을 지운 셈이다. 어떻게 죽을지 알고 나면 모1든 종속과 제약에서 벗어날 수 있다. - 미셸 드 몽테뉴',
  '죽음은 감각의 휴식 충동의 절단 마음의 만족 혹은 비상 소집의 중지 육체에의 봉사의 해방에 지나지 않는다. -마르쿠스 아우렐리우스[로마 황제]-',
  '죽음은 나에게 괴롭지 않다. 나의 고통을 제거하기 때문이다. -팔라다스',
  '죽음은 높은 자나 낮은 자를 평등하게 만든다. 우리는 벌거숭이로 이 세상에 왔으니 벌거숭이로 이 세상을 떠나리라.-이솝 우화',
  '죽음은 늙어서 갚아야 할 오랜 빚과도 같다. -알베르트 아인슈타인',
  '죽음은 돌아오지 않는 파도이다. -베르길리우스[로마 시인]',
  '죽음은 때로는 벌이요 때로는 선물이며 수많은 사람에게 은혜였었다. -루시우스 아나이우스 세네카',
  '죽음은 마지막 성장의 기회다- 엘리자베스 튀블러 로스',
  '죽음은 모든 악을 고친다. - 이탈리아의 속담',
  '죽음은 사람을 슬프게 한다. 삶의 3분의 1을 잠으로 보내면서도. -바이런',
  '죽음은 선에도 악에도 평등한 운명이요 공동의 휴식처이다. -에드먼드 스펜서',
  '죽음은 영원한 궁정의 문을 여는 황금 열쇠이다. -죤 밀턴',
  '죽음은 우리의 모든 비밀 음모 간계로부터 그 베일을 벗겨 버린다. -표도르 도스토엡스키[러시아 작가]-',
  '죽음은 태어나기 이전의 나 자신이다. -아르투어 쇼펜하우어',
  '죽음은 한 순간이며 삶은 많은 순간이다. 정당하게 사는 자에게는 어느 곳이든 안전하다. -에픽테투스',
  '죽음을 찾지 말라. 죽음이 당신을 찾을 것이다. 그러나 죽음을 완성으로 만드는 길을 찾아라. -함마슐트',
  '죽음을 피하기보다 죄를 삼가는 것이 더 나을 것이다. -토마스 아 켐피스[독일의 성직자]-',
  '죽음을 혐오하는 정도는 헛되게 살았다는 인식에 비례한다. - Wiliam Hazlitt',
  '죽음의 공포는 죽음 그 자체보다 성가시다. Fear of death is worse than death itself. -라틴 속담',
  '죽음의 긴 잠은 마음의 상처를 아물게 해주고 인생의 짧은 잠은 육체의 상처를 아물게 해준다. -쟝 파울 리히터',
  '죽음이 감히 우리에게 찾아오기 전에 우리가 먼저 그 비밀스러운 죽음의 집으로 달려 들어간다면 그것은 죄일까? -윌리엄 셰익스피어',
  '죽음이란 없다. 그와 같이 보이는 것은 변화이다. 죽음의 입김이라는 이 생명은 생명 극락의 외각 지대에 불과하며 우리가 그 입구를 사망이라 부를 따름이다. -롱펠로',
  '죽음이란 영원히 잠을 자는 것과 같다. -소크라테스',
  '죽음이란 노고와 고통으로부터의 휴식이다. -마르쿠스 툴리우스 키케로',
  '지난날 모든 일을 다루던 영웅도 마침내 한 무더기의 흙이 된다. 나무꾼과 목동은 그 위에서 노래를 부르고 여우와 토끼는 그 옆에 굴을 파게 된다. -문무왕',
  '진실로 삶은 죽음으로 끝난다. -부처',
  '참된 삶을 맛보지 못한 자만이 죽음을 두려워하는 것이다. -제이메이',
  '태어난 자에게 죽음은 반드시 찾아온다. 죽은 자는 반드시 다시 태어난다. 피할 길 없는 길을 탄식해서는 안 된다. -바가바드 기타',
  '하나님이 부르실 때는 당신의 모든 소유를 버려야 한다. -동유럽 유대인 격언',
  '한 명의 죽음은 비극이요 백만 명의 죽음은 통계이다. -스탈린',
  '한알의 밀알이 땅에 떨어져 죽지 않으면 한알인 채로 남는다. 그러나 죽으면 많은 열매를 맺는다. -요한복음',
  '항상 죽을 각오를 하고 있는 사람만이 참으로 자유로운 인간이다. -디오게네스[그리스 철학자]',
  '호랑이는 죽어서 가죽을 남기고 사람은 죽어서 이름을 남긴다. - 구양수(歐陽修; 중국 철학자)',
  '황금이 귀한 것이 아니다. 편안하고 즐거운 삶이 값진 것이다. -명심보감',
  '훌륭하게 죽는 법을 모르는 사람은 한 마디로 살았을 때도 사는 법이 나빴던 사람이다. -토마스 풀러',
  '훌륭히 죽는 것을 으뜸가는 덕성이다. 그러나 단두대에 높이 서 있든 싸움터의 앞장에 서 있든 사람이 죽을 수 있는 최적의 장소는 인류를 위해 죽는 것이다.-제임스 메튜 배리경',
]
