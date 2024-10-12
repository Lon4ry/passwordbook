"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/shared/ui";

import { loginAction } from "../action";
import { LoginSchema, loginSchema } from "../schema";

export function LoginForm() {
    const [state, action, isPending] = useActionState(loginAction, {});

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isPwdVisible, setIsPwdVisible] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl">
                    Войти в аккаунт
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={action} className={"space-y-4"}>
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Почта</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <div
                                            className={
                                                "relative flex w-full items-center justify-center"
                                            }
                                        >
                                            <Input
                                                {...field}
                                                type={
                                                    isPwdVisible
                                                        ? "text"
                                                        : "password"
                                                }
                                                className={"pr-9"}
                                            />
                                            <Button
                                                type={"button"}
                                                variant={"ghost"}
                                                className={
                                                    "absolute right-0 m-1 h-7 w-7 items-center justify-center self-center justify-self-center rounded-full p-1.5"
                                                }
                                                onClick={() =>
                                                    setIsPwdVisible(
                                                        !isPwdVisible,
                                                    )
                                                }
                                            >
                                                {isPwdVisible ? (
                                                    <EyeNoneIcon
                                                        className={
                                                            "h-full w-full text-muted-foreground"
                                                        }
                                                    />
                                                ) : (
                                                    <EyeOpenIcon
                                                        className={
                                                            "h-full w-full text-muted-foreground"
                                                        }
                                                    />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!!state.error && (
                            <p className={"text-sm text-destructive"}>
                                {state.error}
                            </p>
                        )}
                        <div
                            className={
                                "flex flex-col gap-2 md:flex-row md:justify-between"
                            }
                        >
                            <Button
                                disabled={!form.formState.isValid || isPending}
                                type="submit"
                                className={"flex-1"}
                            >
                                {isPending ? (
                                    <>
                                        <ReloadIcon
                                            className={
                                                "mr-2 h-4 w-4 animate-spin"
                                            }
                                        />
                                        Загрузка...
                                    </>
                                ) : (
                                    "Продолжить"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
