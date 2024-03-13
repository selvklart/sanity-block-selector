import { cn } from "../../src/utils";
import { AccordionTab } from "../../src/accordion-tab";
import { mockGroups } from "../mock";

export default () => {
    return (
        <div className={cn("p-8")}>
            <AccordionTab
                group={mockGroups[0]}
                onClick={() => {}}
            />
        </div>
    );
};
