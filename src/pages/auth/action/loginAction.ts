"use server";

import { compare } from "bcrypt";
import { redirect } from "next/navigation";

import { prisma } from "@/shared";
import { User } from "@/shared/model";

import { login } from "@/features/user";

import { LoginSchema, loginSchema } from "../schema";

export async function loginAction(_: unknown, formData: FormData) {
    let data: LoginSchema;
    try {
        data = loginSchema.parse(Object.fromEntries(formData.entries()));
    } catch {
        return { error: "Данные не прошли валидацию" };
    }

    let user:
        | (User & {
              password: string;
          })
        | null;
    try {
        user = await prisma.user.findUnique({
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            },
            where: {
                email: data.email,
            },
        });
    } catch {
        return { error: "Ошибка при поиске пользователя" };
    }

    if (user && (await compare(data.password, user.password))) {
        await login(user);
        redirect("/");
        return {};
    }

    return { error: "Неверный логин или пароль" };
}
