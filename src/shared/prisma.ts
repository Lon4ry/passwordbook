import "server-only";

import { PrismaClient } from "@prisma/client";

function prismaClientSingleton() {
    return new PrismaClient();
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV === "production") globalThis.prismaGlobal = prisma;