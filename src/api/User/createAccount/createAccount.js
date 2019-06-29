import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const checkUsername = await prisma.$exists.user({ username });
      if (checkUsername) {
        throw Error("이미 존재하는 아이디입니다.");
      }
      const checkEmail = await prisma.$exists.user({ email });
      if (checkEmail) {
        throw Error("같은 이메일 주소를 사용할 수 없습니다.");
      }
      try {
        await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
