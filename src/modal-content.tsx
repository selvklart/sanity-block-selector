import { useState } from "react";
import { Accordion } from "./list-container";
import { Search } from "./search";
import { Group } from "./types.d";
import { cn } from "./utils";

interface Props {
    groups: Group[];
}

export const ModalContent = ({groups}: Props) => {
    const [value, setValue] = useState('');
    return (
        <>
            <Search value={value} onChange={setValue} />
            <Accordion groups={groups} />
        </>
    );
}





