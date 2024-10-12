"use client";

import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Service } from "@/shared/model";
import {
    Button,
    cn,
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui";

import { createService, getServiceSuggestions } from "@/entities/service";

export function SelectService({
    select,
}: {
    select: (s: Service | null) => void;
}) {
    const [service, setService] = useState<Service | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [services, setServices] = useState<Service[]>([]);

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [value, setValue] = useState("");

    async function updateServices() {
        const newServices = await getServiceSuggestions(value);
        setServices(() => newServices);
    }

    useEffect(() => {
        updateServices().then();
    }, [value]);

    useEffect(() => {
        if (!isFirstRender) select(service);
        setIsFirstRender(false);
    }, [service]);

    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        className="w-[200px] justify-between"
                    >
                        {service ? service.name : "Выберите сервис"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            value={value}
                            onValueChange={setValue}
                            placeholder="Поиск сервиса"
                        />
                        <CommandList>
                            <CommandGroup>
                                {value !== "" &&
                                    !services
                                        .map(({ name }) => name)
                                        .includes(value) && (
                                        <CommandItem
                                            onSelect={() => {
                                                async function addService() {
                                                    const newService =
                                                        await createService(
                                                            value.trim(),
                                                        );
                                                    await updateServices();
                                                    if (!newService) return;
                                                    setService(newService);
                                                    setIsOpen(false);
                                                }

                                                addService().then();
                                            }}
                                        >
                                            <PlusIcon
                                                className={"mr-2 h-4 w-4"}
                                            />
                                            {value.trim()}
                                        </CommandItem>
                                    )}
                                {services.map((s) => (
                                    <CommandItem
                                        key={s.id}
                                        value={JSON.stringify(s)}
                                        onSelect={(currentValue) => {
                                            const currentService =
                                                JSON.parse(currentValue);
                                            setService(
                                                currentService.id ===
                                                    service?.id
                                                    ? ""
                                                    : currentService,
                                            );
                                            setIsOpen(false);
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                service?.id === s.id
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                        {s.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
