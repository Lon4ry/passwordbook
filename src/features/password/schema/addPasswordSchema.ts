import { z } from "zod";

export const addPasswordSchema = z.object({
    uniq: z.string(),
    password: z.string(),
    otp: z.string(),

    serviceId: z.string().min(1, "Выберите сервис"),
    categoriesId: z.string(),
});

export type AddPasswordSchema = z.infer<typeof addPasswordSchema>;
