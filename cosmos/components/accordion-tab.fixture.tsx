import {AccordionTab} from '../../src/components/accordion-tab';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const AccordionTabFixture = (group: Group, filter: string) => {
    return <AccordionTab group={group} filter={filter} onClick={() => {}} />;
};

const group = mockGroups[0];
export default {
    open: AccordionTabFixture({...group, defaultOpen: true}, ''),
    closed: AccordionTabFixture(group, ''),
    filtered: AccordionTabFixture({...group, defaultOpen: true}, 'featured'),
};
