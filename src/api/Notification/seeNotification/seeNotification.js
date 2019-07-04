import { prisma } from "../../../../generated/prisma-client";
import { NOTIFICATION_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeNotification: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .notifications({ username: user.username })
        .$fragment(NOTIFICATION_FRAGMENT);
    }
  }
};
