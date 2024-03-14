import {ContentArrayButton} from '../../src/sanity/content-array-button';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const ContentArrayButtonFixture = (groups: Group[]) => {
    return <ContentArrayButton groups={groups} onSelectBlock={() => {}} />;
};

export default ContentArrayButtonFixture(mockGroups);
