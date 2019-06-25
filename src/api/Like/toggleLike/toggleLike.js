import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        //$exists는 prisma 문법중 하나인데 해당 레코드가존재하는지 안하는지 파악하는것
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          //deleteLikes를 하고싶어도 해당 id를 알수가없어서 삭제가 불가능함
          //like 모델은 unique특성이 id밖에없어서 where로 id밖에 못넣어서 이런 일이발생함
          //이런경우 지울방법은 deleteManyLikes로 조건을 저런식으로 넣어주는 방법밖에 없대
          await prisma.deleteManyLikes(filterOptions);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
