//많은 api들을 이 한 파일에 다 몰아넣어서 서버에는 해당 쿼리나 뮤테이션들을 이 파일에서 읽어오는 것
//api 폴더에는 graphql과 resolvers 들만 존재해야함 다른것이 있으면 에러가 날 것
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
