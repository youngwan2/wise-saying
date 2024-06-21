#!/bin/bash

# project.zip 압축풀기가 완료된 소스파일들이 모인 경로로 이동합니다.
cd /home/ec2-user/project

# 패키지가 설치된 경로의 환경변수 추가
export PATH=$PATH:/home/ec2-user/.nvm/versions/node/v20.11.0/bin

# 종속성이 있으면 설치합니다.
npm install

# 서버를 재시작 합니다 -> 여기서 'start'는 사용자 작명입니다. 
# pm2 에 대한 자세한 부분은 npm pm2 를 찾아보세요. 
pm2 restart 'start'