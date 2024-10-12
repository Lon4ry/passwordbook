"use server";

import { prisma } from "@/shared";
import { getUser } from "@/shared/api";
import { Category } from "@/shared/model";

export async function getCategorySuggestions(
    searchFor: string,
): Promise<Category[]> {
    const user = await getUser();

    return prisma.category.findMany({
        where: {
            passwords: {
                some: {
                    userId: user?.id,
                },
            },
            name: {
                startsWith: searchFor,
            },
        },
        take: 5,
    });
}
