import {DialogContent} from '../../src/components/dialog-content';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const DialogContentFixture = (groups: Group[], filter: string) => {
    return <DialogContent groups={groups} filter={filter} />;
};

export default {
    normal: DialogContentFixture(mockGroups, ''),
    filtered: DialogContentFixture(mockGroups, 'feature'),
    'no results': DialogContentFixture(mockGroups, 'empty'),
};
