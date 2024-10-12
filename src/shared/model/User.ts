import { $Enums } from "@prisma/client";

export type User = {
    id: string;
    email: string;
    role: $Enums.UserRole;
};