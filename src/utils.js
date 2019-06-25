import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

//math.floor 는 내림이고 adjectives.length는 500임 그걸 random에 곱해서 실행하면 0 부터 500사이의 랜덤값이생성됨
// 그래서 그 0 부터 500 사이의 랜덤수를 생성해서 내림을 하면 정수형태로 무작위 리턴을 함
// 그럼 그 무작위 수를 저 만든 두개의 배열 (adjectives, nouns) 에 index로 설정해서 값을 받아오는 함수임

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

//일단 보낼 이메일과 시크릿키를 받아서 해당 메일에 시크릿을 보내주는건데
//이를 위해 nodemailer와 sendgrid를 이용함
//sendSecretMail 이 sendMail을 호출하는 형식임
//외부에서는 sendSecretMail 만 가져와서 사용하면 되므로 저놈만 export해줌

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "chyoni@prismagram.com",
    to: address,
    subject: "🔐Login Secret for Prismagram🔐",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app to log in`
  };
  return sendMail(email);
};

//jwt토큰을 생성하기위한 함수
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
