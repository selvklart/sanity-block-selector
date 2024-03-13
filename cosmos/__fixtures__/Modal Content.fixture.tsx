import { ModalContent } from "../../src";
import { cn } from "../../src/utils";
import { mockGroups } from "../mock";

export default () => {
    return (
        <div className={cn("p-8")}>
            <ModalContent groups={mockGroups} />
        </div>
    );
};
