import {Dialog} from '../../src/sanity/dialog';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const DialogFixture = (groups: Group[]) => {
    return <Dialog groups={groups} onClose={() => {}} onSelectBlock={() => {}} />;
};

export default DialogFixture(mockGroups);
