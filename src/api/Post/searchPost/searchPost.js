import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      if (args.term.length >= 3) {
        const searchPost = prisma.posts({
          where: {
            OR: [
              { location_starts_with: args.term },
              { caption_starts_with: args.term }
            ]
          }
        });
        return searchPost;
      } else {
        throw Error("you should type at least more then two words");
      }
    }
  }
};
