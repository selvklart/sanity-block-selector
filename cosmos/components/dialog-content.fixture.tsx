import {DialogContent} from '../../src/components/dialog-content';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const DialogContentFixture = (title: string, groups: Group[], filter: string) => {
    return <DialogContent title={title} groups={groups} filter={filter} />;
};

export default {
    normal: DialogContentFixture('Select block', mockGroups, ''),
    filtered: DialogContentFixture('Select block', mockGroups, 'feature'),
    'no results': DialogContentFixture('Select block', mockGroups, 'empty'),
};
