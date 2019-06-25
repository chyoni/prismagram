//jwt 토큰을 받아서 확인하고 처리하기 위한 파일
//passport를 사용할것임
//첫번째로 할 일은 passport.js 파일을 만들어서 passport모듈이 사용할 파일을 지정하는거임
//그게 이 파일이고 이 파일은 토큰을 해석해서 사용자를 확인하는 로직이 있음
//두번째로 할일은 토큰을 만들어야함 그건 utils.js에 generateToken함수임
//토큰을 만들었으면 사용자에게 부여해야함 로그인을 했을때 사용자에게 토큰을 주는 것
//그건 confirmSecret.js에서 실행함
//그리고 마지막으로는 이 서버가 가지는 모든 경로(모든 api)는 해당 jwt토큰으로 보호가되어야함
//즉 허가된 토큰으로만 api를 접근할수있게 해야한다는 소리
//그러기위해 server.js에서 passport모듈이랑 이 파일을 import하고
//미들웨어로 추가해줌
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

//payload 는 jwt토큰을 해석해서 나온 결과(오브젝트형태의)
//done은 다하고 결과를 실행할 함수라고 보면됨
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      //prisma에서 확인해보면 없는 id로 유저를 찾으면 null을 반환함
      return done(null, user); //에러가 없으며 (null) user를 반환한단 얘기임
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

//지금 보면 authenticateJwt 는 미들웨어 함수임
//미들웨어란 브라우저와 서버사이에 있어서 미들웨어고
//사용자가 request를 하면 그 request가 모든 미들웨어를 거쳐서 서버로 들어옴 이 정도만 알아두고 여튼
//모든 서버로 들어오는 요청(request)는 저미들웨어를 지나야함
//근데 저 미들웨어 함수는 passport 모듈과 관련이있음
//즉 모든사용자는 jwt토큰을 헤더에 넣고 요청을 함
//그럼 jwtOptions에서보면 jwt토큰을 헤더의 Authorization에서부터 받아옴
//해당 시크릿키는 우리가 정해놓은 시크릿키고
//그 시크릿키는 토큰을 만들때도 해석할때도 같은 시크릿키여야함 땅오한테 배운거처럼
//그래서 45번 라인에서 passport.use로 해당 jwt에 관한 옵션을가지고 토큰을 해석을 함
//그리고 그 해석한 결과로 verifyUser 함수를 실행함
//그 결과는 payload로 담겨지고 만약 payload의 id를 가지고 있는 유저가 db에 있다면
//그 user를 리턴해줌 아니면 false를 리턴하고
//그래서 37번라인 부터 미들웨어에서 passport모듈이 실행한 jwt관련 로직으로부터
//user가 있다면 passport의 request에 user를 담는거임
//아니면 다음 미들웨어를 실행하는거고 next() 이거를 통해서
//그래서 결론적으로 토큰이 있고 그 토큰을가지는 유저가있어서
//요청이들어오면 context.req.request 안에 user가 담긴다 이거임
//참고로 context.req 이 안에 passport.request가 있는거임

//1단계 모든 요청은 저 미들웨어(authenticateJwt)를 거친다
//2단계 그 미들웨어는 passport.authenticate("jwt")함수를 실행한다.
//3단계 passport.authenticate("jwt")함수는 Strategy를 활용해서 jwt토큰을 추출한다
//4단계 토큰을 추출하면 verifyUser함수를 실행한다.
//5단계 토큰에서 해석된 id가 payload에 담기고 그 id로부터 db에서 유저를 찾는다.
//6단계 verifyUser 함수가 user가 있으면 리턴을해준다
//7단계 그러고나면 passport.authenticate() 이 함수의 세번째 인자인 콜백함수가 실행된다.
//8단계 그 콜백함수는 리턴받은 값에 user가 있다면 req에 user를 담는다
//8.5단계 미들웨어는 중간에서 역할을 다끝내고 서버에게 할 일을 양도한다
//9단계 server는 context에 passport.request를 담아준다
