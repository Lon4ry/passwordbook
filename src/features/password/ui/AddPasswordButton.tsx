import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui";

import { AddPasswordForm } from "./AddPasswordForm";

export function AddPasswordButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Добавить</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Создание пароля</DialogTitle>
                    <DialogDescription>
                        Сохраните пароль от сервиса у нас. Мы будем с ним
                        осторожны ❣️
                    </DialogDescription>
                </DialogHeader>
                <AddPasswordForm />
            </DialogContent>
        </Dialog>
    );
}
