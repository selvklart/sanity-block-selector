import {ModalContent} from '../../src';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const ModalContentFixture = (groups: Group[], filter: string) => {
    return <ModalContent groups={groups} filter={filter} />;
};

export default {
    normal: ModalContentFixture(mockGroups, ''),
    filtered: ModalContentFixture(mockGroups, 'feature'),
    'no results': ModalContentFixture(mockGroups, 'empty'),
};
