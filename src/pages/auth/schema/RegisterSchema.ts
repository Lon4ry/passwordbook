import { z } from "zod";

import { isEmailAvailable } from "../action";

export const registerSchema = z
    .object({
        email: z
            .string()
            .min(5, "Слишком короткая почта")
            .max(50, "Слишком длинная почта")
            .email("Некорректная почта")
            .toLowerCase(),
        password: z
            .string()
            .min(6, "Слишком короткий пароль")
            .max(32, "Слишком длинный пароль"),
        confirm: z
            .string()
            .min(6, "Слишком короткий пароль")
            .max(32, "Слишком длинный пароль"),
    })
    .refine(({ password, confirm }) => password === confirm, {
        message: "Пароли не совпадают",
        path: ["confirm"],
    })
    .refine(async ({ email }) => await isEmailAvailable(email), {
        message: "Аккаунт с такой почтой уже существует",
        path: ["email"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
