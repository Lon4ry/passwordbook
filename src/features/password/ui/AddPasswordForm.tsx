"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Textarea,
} from "@/shared/ui";

import { AddPasswordSchema, addPasswordSchema } from "../schema";

import { SelectService } from "./SelectService";

export function AddPasswordForm() {
    const form = useForm<AddPasswordSchema>({
        mode: "onTouched",
        resolver: zodResolver(addPasswordSchema),
        defaultValues: {
            uniq: "",
            password: "",
            otp: "",

            serviceId: "",
            categoriesId: "",
        },
    });

    return (
        <Form {...form}>
            <form className={"space-y-3"}>
                <FormField
                    control={form.control}
                    name={"uniq"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Логин</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Почта или никнейм</FormDescription>
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
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"otp"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>OTP</FormLabel>
                            <FormControl>
                                <Textarea
                                    className={"resize-none"}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Ключ выданный сервисом для генерации OTP кода,
                                используется для 2FA аутентификации
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"serviceId"}
                    render={() => (
                        <FormItem className={"flex flex-col"}>
                            <FormLabel>Сервис</FormLabel>
                            <FormControl>
                                <SelectService
                                    select={(s) => {
                                        form.setValue(
                                            "serviceId",
                                            s?.id ?? "",
                                            {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                                shouldTouch: true,
                                            },
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={"flex flex-row-reverse"}>
                    <Button type={"submit"}>Сохранить</Button>
                </div>
            </form>
        </Form>
    );
}
