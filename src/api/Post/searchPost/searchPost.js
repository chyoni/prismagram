import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST } from "../../../fragments";

export default {
  Query: {
    searchPost: async (_, args) => {
      return prisma
        .posts({
          where: {
            OR: [
              { location_starts_with: args.term },
              { caption_starts_with: args.term }
            ]
          },
          orderBy: "createdAt_DESC"
        })
        .$fragment(FULL_POST);
    }
  }
};
