import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    searchUser: async (_, args) =>
      prisma
        .users({
          where: {
            OR: [
              { username_contains: args.term },
              { firstName_contains: args.term },
              { lastName_contains: args.term }
            ]
          }
        })
        .$fragment(USER_FRAGMENT)
  }
};
