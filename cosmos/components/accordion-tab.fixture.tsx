import {AccordionTab} from '../../src/components/accordion-tab';
import {mockGroups} from '../mock';

const AccordionTabFixture = (defaultOpen: boolean) => {
    return <AccordionTab group={mockGroups[0]} defaultOpen={defaultOpen} onClick={() => {}} />;
};

export default {
    open: AccordionTabFixture(true),
    closed: AccordionTabFixture(false),
};
