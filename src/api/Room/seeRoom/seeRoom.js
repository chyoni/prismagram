import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const checkRoom = await prisma.$exists.room({
        id,
        participants_some: {
          id: user.id
        }
      });
      if (checkRoom) {
        return prisma
          .room({
            id
          })
          .$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("You can't access..");
      }
    }
  }
};
