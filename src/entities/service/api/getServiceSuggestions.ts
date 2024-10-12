"use server";

import { prisma } from "@/shared";
import { Service } from "@/shared/model";

export async function getServiceSuggestions(
    searchFor: string,
): Promise<Service[]> {
    return prisma.service.findMany({
        where: {
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
        take: 5,
    });
}
