"use server";

import { cookies } from "next/headers";
import { cache } from "react";

import { prisma } from "@/shared";
import { User } from "@/shared/model";

export const getUser: () => Promise<User | null> = cache(async () => {
    const cookieStore = await cookies();

    const userRaw = cookieStore.get("user")?.value;
    if (!userRaw) return null;

    try {
        const { id } = JSON.parse(userRaw);
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    } catch {
        return null;
    }
});
