import {Accordion} from '../../src/components/accordion';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const AccordionFixture = (groups: Group[], filter: string) => {
    return <Accordion groups={groups} filter={filter} onSelectBlock={() => {}} />;
};

export default {
    normal: AccordionFixture(mockGroups, ''),
    filtered: AccordionFixture(mockGroups, 'featured'),
};
