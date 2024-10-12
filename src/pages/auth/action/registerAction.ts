"use server";

import { hash } from "bcrypt";
import { redirect } from "next/navigation";

import { prisma } from "@/shared";

import { User } from "@/entities/user";

import { login } from "@/features/user";

import { registerSchema, RegisterSchema } from "../schema";

export async function registerAction(_: unknown, formData: FormData) {
    let data: RegisterSchema;
    try {
        data = await registerSchema.parseAsync(
            Object.fromEntries(formData.entries()),
        );
    } catch {
        return { error: "Данные не прошли валидацию" };
    }

    let user: User | null;
    try {
        user = await prisma.user.create({
            data: {
                email: data.email,
                password: await hash(data.password, 10),
            },
        });
    } catch {
        return { error: "Ошибка при регистрации" };
    }

    await login(user);
    redirect("/");
    return {};
}
