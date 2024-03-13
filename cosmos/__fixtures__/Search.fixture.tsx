import { useState } from "react";
import { Search } from "../../src/search";
import { cn } from "../../src/utils";

export default () => {
    const [value, setValue] = useState('');
    return (
        <div className={cn("p-8")}>
            <Search
                value={value}
                onChange={setValue}
            />
        </div>
    );
};
