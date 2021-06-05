import {PrismaClient} from ".prisma/client";

export const getPrismaConnection = () => {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  return global.prisma;
}
