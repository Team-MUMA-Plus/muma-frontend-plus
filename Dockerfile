FROM node:latest as builder

# work dir 고정
WORKDIR /app

# docker build 할 때, package.json 과 package-lock.json 파일을 복사
COPY package*.json ./
COPY package-lock.json ./

# npm install
RUN npm install

# docker build 할 때, 모든 파일을 workdir로 복사
COPY . /app

ENTRYPOINT [ "node", "app.js" ]

# 포트 3000 열기
EXPOSE 3000

# Stage 2
#FROM nginx:alpine

# nginx 설정 파일 복사
#COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

# nginx 기본 파일 삭제
#RUN rm -rf /usr/share/nginx/html/*

# app 폴더 복사
#COPY --from=builder /app /usr/share/nginx/html/

# # 포트 3000 열기
# EXPOSE 3000
# nginx 실행
#ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
