import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args) => {
        const { roomId, userId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                AND: [
                  {
                    node: {
                      room: { id: roomId },
                      to: { id: userId }
                    }
                  }
                ]
              }
            ]
          })
          .node();
      },
      resolve: payload => payload
    }
  }
};
