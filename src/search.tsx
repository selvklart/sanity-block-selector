import { Dispatch, SetStateAction } from "react";
import { cn } from "./utils"
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface Props {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

export const Search = ({value, onChange}: Props) => {
    return (
        <div
            className={cn(
                "relative",
                "mt-2",
                "rounded-md",
                "shadow-sm"
            )}
        >
             <div className={cn(
                "pointer-events-none",
                "absolute",
                "inset-y-0",
                "left-0",
                "flex",
                "items-center",
                "pl-3"
             )}>
                <MagnifyingGlassIcon
                    className={cn("h-5", "w-5", "text-gray-400")}
                    aria-hidden="true"
                />
            </div>
            <input
                type="text"
                name="search"
                className={cn(
                    "block",
                    "w-full",
                    "rounded-md",
                    "border-0",
                    "py-1.5",
                    "pl-10",
                    "text-gray-900",
                    "ring-1",
                    "ring-inset",
                    "ring-gray-300",
                    "placeholder:text-gray-400",
                    "focus:ring-2",
                    "focus:ring-inset",
                    "focus:ring-indigo-600",
                    "sm:text-sm",
                    "sm:leading-6"
                )}
                placeholder="Search blocks..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
