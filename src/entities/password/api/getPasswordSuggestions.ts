"use server";

import { prisma } from "@/shared";
import { getUser } from "@/shared/api";

export async function getPasswordSuggestions(searchFor: string) {
    const user = await getUser();

    return prisma.passwords.findMany({
        where: {
            userId: user?.id,
            OR: [
                {
                    service: {
                        is: {
                            OR: [
                                {
                                    name: {
                                        startsWith: searchFor,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    url: {
                                        contains: searchFor,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    categories: {
                        some: {
                            name: {
                                startsWith: searchFor,
                            },
                        },
                    },
                },
            ],
        },
        take: 5,
    });
}
