import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthPage() {
    return (
        <>
            <nav></nav>
            <main className={"p-5 py-[15vh]"}>
                <Tabs defaultValue={"login"} className={"mx-auto max-w-sm"}>
                    <TabsList className={"grid w-full grid-cols-2"}>
                        <TabsTrigger value={"login"}>Войти</TabsTrigger>
                        <TabsTrigger value={"register"}>
                            Регистрация
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={"login"}>
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value={"register"}>
                        <RegisterForm />
                    </TabsContent>
                </Tabs>
            </main>
        </>
    );
}
