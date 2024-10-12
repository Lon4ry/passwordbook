"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shared/ui";

import { getPasswordSuggestions } from "@/entities/password/api/getPasswordSuggestions";

export function SearchInput() {
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener("focus", handleFocus);
            inputElement.addEventListener("blur", handleBlur);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("focus", handleFocus);
                inputElement.removeEventListener("blur", handleBlur);
            }
        };
    }, []);

    const [suggestions, setSuggestions] = useState<Password[]>([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        async function updateSuggestions() {
            const newSuggestions = await getPasswordSuggestions(value);
            setSuggestions(() => newSuggestions);
        }

        updateSuggestions().then();
    }, [value]);

    return (
        <Command className={"border"} shouldFilter={false}>
            <CommandInput
                ref={inputRef}
                placeholder={"Поиск"}
                value={value}
                onValueChange={setValue}
            />
            {isFocused && (
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {suggestions.map((suggestion) => (
                            <CommandItem key={suggestion.id} asChild>
                                <Link href={"/"}>{suggestion.name}</Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    );
}
