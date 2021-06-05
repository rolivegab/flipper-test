import type { PrismaClient } from ".prisma/client";

declare global {
  declare namespace NodeJS {
    export interface Global {
      prisma?: PrismaClient;
    }
  }
}
