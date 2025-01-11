
### nextjs 15 버전 이후 변경 된 것
#### 슬러그 Promise 처리로 바뀜
- 모든 route.ts 의 두 번쨰 인자의 슬러그를 받을 때(15.x 부터 바뀜)
 { params }: { params: Promise<{ category: string }> }
- page.tsx 내 에서도 동일


#### headers(), cookies() 메서드 Promise 처리로 바뀜
- await headers(), await cookies() 



### 이메일 중복 확인 부분 api 문서화 해야 함(2025.01.06)