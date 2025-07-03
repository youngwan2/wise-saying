# Next.js에서 Redis 설치 및 연동 가이드

이 가이드는 Windows 환경에서 Next.js 프로젝트에 Redis를 설치하고 연동하는 방법을 안내합니다.

---

## 1. Redis 서버 설치 (로컬)

### 1-1. Windows에서 Redis 설치

#### 방법 1: 공식 바이너리(추천)
1. [MicrosoftArchive/redis](https://github.com/microsoftarchive/redis/releases)에서 최신 `Redis-x64-xxx.zip` 파일 다운로드
2. 압축 해제 후, 폴더에서 `redis-server.exe` 실행

#### 방법 2: Chocolatey 사용
```powershell
choco install redis-64 -y
```
설치 후, `redis-server` 명령어로 실행

#### 방법 3: Docker 사용
```bash
docker run --name redis-local -p 6379:6379 -d redis
```

---

## 2. Redis 서버 실행

- 명령 프롬프트(또는 PowerShell)에서 아래 명령어 실행:
```bash
redis-server
```
- 정상적으로 실행되면 `6379` 포트에서 대기

---

## 3. Node.js(Next.js)에서 redis 패키지 설치

```bash
npm install redis
```

---

## 4. Next.js에서 Redis 클라이언트 사용 예시

```typescript
// src/utils/redis.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379/0',
});

redisClient.on('connect', () => console.log('레디스 연결 성공'));
redisClient.on('error', err => console.error('레디스 연결 중 문제 발생:', err));

await redisClient.connect();
export default redisClient;
```

> **참고:** Next.js API Route 또는 서버 컴포넌트에서만 사용하세요. (클라이언트 컴포넌트에서는 사용 불가)

---

## 5. 연결 오류(ECONNREFUSED) 발생 시
- redis-server가 실행 중인지 확인 (`netstat -ano | findstr :6379`)
- 방화벽, 포트 충돌, 관리자 권한 등도 점검
- Windows에서 redis-server가 실행 중이지 않으면 반드시 먼저 실행

---

## 6. 빌드 및 실행
```bash
npm run build
npm run start
```

---

## 7. 참고
- 공식 문서: https://redis.io/
- Node.js redis 클라이언트: https://github.com/redis/node-redis
