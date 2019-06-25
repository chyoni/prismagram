# prismagram

Instargram clone with Express + React + Prisma

nodemon = 지정한 파일(nodemon.json에서)이 세이브되면 자동 재실행

babel은 멋진 코드를 못생긴 코드 즉, 최신 버전의 코드를 구버전의 코드로 바꿔주는 것 (호환성)

dotenv 모듈은 .env 파일을 읽음

.babelrc는 바벨 설정파일

yarn prisma 명령어 헷갈리면 안됨

prisma가 내 서버와 연동될려면 generate을 해야함

하게되면 prisma-client가 생성됨

Query가 하나도 없으면 에러가 생김 스키마에서 쿼리 하나는 무조건 있어야함

sendgrid 와 nodemailer 를 이용해 시크릿키를 메일로 보냄
