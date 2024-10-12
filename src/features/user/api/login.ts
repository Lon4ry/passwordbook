import "server-only";
import { cookies } from "next/headers";

import { User } from "@/shared/model";

export async function login(user: User) {
    const cookieStore = await cookies();

    const { id, email, role } = user;

    cookieStore.set("user", JSON.stringify({ id, email, role }));
}
