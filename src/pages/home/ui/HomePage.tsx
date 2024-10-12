import { redirect } from "next/navigation";

import { getUser } from "@/shared/api";

import { AddPasswordButton } from "@/features/password";

import { SearchInput } from "./SearchInput";

export async function HomePage() {
    const user = await getUser();
    if (!user) redirect("/auth");
    return (
        <main className={"flex min-h-screen flex-col"}>
            <div className={"flex-1 flex-col p-5"}>
                <div className={"flex flex-row items-center gap-2"}>
                    <SearchInput />
                    <AddPasswordButton />
                </div>
            </div>

            <footer
                className={
                    "text-center font-mono tracking-wide text-muted-foreground"
                }
            >
                developed by Lon4ry
            </footer>
        </main>
    );
}
