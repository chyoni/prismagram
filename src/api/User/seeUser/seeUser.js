import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT, FULL_POST } from "../../../fragments";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username } = args;
      const user = await prisma.user({ username }).$fragment(USER_FRAGMENT);
      const posts = await prisma
        .user({ username })
        .posts()
        .$fragment(FULL_POST);
      return {
        user,
        posts
      };
    }
  }
};
