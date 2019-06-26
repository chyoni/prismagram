import { prisma } from "../../generated/prisma-client";

//여기서 밑에 parent는 자기를 사용하는 resolver를 말함
//me라는 resolver가 fullName을 호출하면 me가 parent고
//seeUser라는 resolver가 fullName을 호출하면 seeUser가 parent임
//즉 날 사용한 resolver가 가지고있는 속성을 이용해서 어떤 특정값을 리턴해주는것
//얘는 어디서도 사용이 가능함 왜냐면 resolver들을 다 병합해서 한 파일로 만들어버렸으니까 우리는 ㅇㅇ
//저것(fullName)을 Compute Field라고 함 DB에 있는건 아니고 우리가 계산해서 값을 낸다 이거임
//fullName이 User라는 type에 들어있으니까 User : { fullName ~~} 이렇게쓰는거임

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  },
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      });
    }
  }
};
