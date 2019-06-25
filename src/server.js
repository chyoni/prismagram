import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan"; //logger 미들웨어 즉, 콘솔에 찍어주는 거라고 보면됨 행동하나하나를
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

//graphqlserver는 typeDefs와 resolvers 가 필요함 그 둘을 받아온 schema에 넣었으니 schema를 넣어줌
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }) //이건 context안에 req 가 있고 그 안에 passport의 request가 있는데 우리가원하는건 passport안에 request니까 내부의 request를 context로 리턴해주는거임 즉 context.req.request를 리턴한다 이거임
});
//context는 resolver들 사이에서 정보를 공유할때 사용

server.express.use(logger("dev")); //미들웨어 추가 (graphql server는 express서버가 내장되어있음)
server.express.use(authenticateJwt); //모든 경로를 jwt로 보호하겠다는 의미임 즉 jwt토큰으로 부터 사용자를 인증해야한다는 소리

server.start({ port: PORT }, () =>
  console.log(`😍  Server running on Port http://localhost:${PORT}`)
);
