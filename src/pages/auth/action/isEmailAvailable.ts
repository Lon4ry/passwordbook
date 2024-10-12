"use server";

import { prisma } from "@/shared";

export async function isEmailAvailable(email: string) {
    const user = await prisma.user.findFirst({
        where: { email },
        select: { id: true },
    });
    return !user;
}
