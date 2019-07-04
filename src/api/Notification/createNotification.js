import { prisma } from "../../../generated/prisma-client";

const createNotification = async (fromId, toId, noteType, post) => {
  if (post === undefined) {
    try {
      if (fromId === toId) {
        return false;
      } else {
        await prisma.createNotification({
          from: {
            connect: {
              id: fromId
            }
          },
          to: {
            connect: {
              id: toId
            }
          },
          type: noteType
        });
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    try {
      if (fromId === toId) {
        return false;
      } else {
        await prisma.createNotification({
          from: {
            connect: {
              id: fromId
            }
          },
          to: {
            connect: {
              id: toId
            }
          },
          type: noteType,
          post: {
            connect: {
              id: post
            }
          }
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

export default createNotification;
