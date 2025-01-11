
### nextjs 15 버전 이후 변경 된 것
#### 슬러그 Promise 처리로 바뀜
- 모든 route.ts 의 두 번쨰 인자의 슬러그를 받을 때(15.x 부터 바뀜)
 { params }: { params: Promise<{ category: string }> }
- page.tsx 내 에서도 동일


#### headers(), cookies() 메서드 Promise 처리로 바뀜
- await headers(), await cookies() 





### 참고
- 회원탈퇴, 비밀번호 수정 요청을 auth api 로 옮기고 api 문서화 해야함 (1.12)
-

### 현재 문제
- usePagination 에서 무한 루프 발생함. 