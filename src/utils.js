import { adjectives, nouns } from "./words";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

//math.floor 는 내림이고 adjectives.length는 500임 그걸 random에 곱해서 실행하면 0 부터 500사이의 랜덤값이생성됨
// 그래서 그 0 부터 500 사이의 랜덤수를 생성해서 내림을 하면 정수형태로 무작위 리턴을 함
// 그럼 그 무작위 수를 저 만든 두개의 배열 (adjectives, nouns) 에 index로 설정해서 값을 받아오는 함수임
