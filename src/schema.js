//많은 api들을 이 한 파일에 다 몰아넣어서 서버에는 해당 쿼리나 뮤테이션들을 이 파일에서 읽어오는 것
//api 폴더에는 graphql과 resolvers 들만 존재해야함 다른것이 있으면 에러가 날 것

import { makeExecutableSchema } from "graphql-tools"; //스키마를 만들기위한 것
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
//파일경로를 읽어오는 fileLoader , 리졸버들을 합치는 mergeResolvers typeDef들을 합치는 mergeTypes
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));
//api폴더밑에 모든 폴더(**)밑에 모든 파일명(*).graphql(js) 들을 가져오는 것

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
