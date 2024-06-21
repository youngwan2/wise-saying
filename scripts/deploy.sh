#!/bin/bash
# project.zip 설치 후 해당 파일이 있는 경로로 이동합니다.
cd /home/ec2-user

# project.zip 의 압축을 현재 경로에 풉니다.
# -o : 압축을 푸는 경우 기존 동일한 파일을 새로운 파일로 덮어쓰기 합니다.
unzip -o project.zip -d project

# project 폴더로 들어갑니다.
cd project

# 종속성이 있으면 설치합니다.
npm install

# 서버를 재시작 합니다.
pm2 restart 'start'
