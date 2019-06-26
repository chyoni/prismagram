import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id }).$fragment(FULL_POST);
      const likeCount = await prisma
        .likesConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      return {
        post,
        likeCount
      };
    }
  }
};
