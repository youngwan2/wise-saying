
### 15 버전 이후 바뀐 것
#### 슬러그 가져오려면 비동기적으로 가져와야 함
- 모든 route.ts 의 두 번쨰 인자의 슬러그를 받을 때(15.x 부터 바뀜)
 { params }: { params: Promise<{ category: string }> }

- page.tsx 내 에서도 동일

#### cookies, headers 등의 메서드도 비동기적으로 가져와야 함
 - cookies().set() --> (await cookies()).set() 

#### 타입 체크가 엄격해짐
- 타입스크립트의 버전도 같이 업데이트되면서 빌드 시 이전 보다 타입 체크를 엄격하게 함.

### pwa 적용 시 사용한 패키지의 공식문서
- https://ducanh-next-pwa.vercel.app/docs/next-pwa/getting-started