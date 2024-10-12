import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Слишком короткая почта")
        .max(255, "Слишком длинная почта")
        .email("Некорректная почта")
        .toLowerCase(),
    password: z
        .string()
        .min(1, "Слишком короткий пароль")
        .max(255, "Слишком длинный пароль"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
