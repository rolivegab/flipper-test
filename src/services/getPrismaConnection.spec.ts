import {PrismaClient} from ".prisma/client";
import { getPrismaConnection } from "./getPrismaConnection";

describe('getPrismaConnection', () => {
  it('connects successfully', async () => {
    const prisma = getPrismaConnection()
    expect(typeof await prisma.subtitle.count()).toBe('number')
  })

  it('returns the same prisma connection every call', () => {
    const prisma1 = getPrismaConnection()
    const prisma2 = getPrismaConnection()

    expect(prisma1 === prisma2).toBeTruthy()
  })
})
