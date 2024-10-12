"use server";

import { prisma } from "@/shared";
import { Service } from "@/shared/model";

export async function createService(name: string): Promise<Service | null> {
    try {
        return prisma.service.create({
            data: {
                name,
            },
        });
    } catch {
        return null;
    }
}
