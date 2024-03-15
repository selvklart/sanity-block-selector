import {useFixtureInput} from 'react-cosmos/client';

import {ContentArrayButton} from '../../src/sanity/content-array-button';
import {mockGroups} from '../mock';

const ContentArrayButtonFixture = () => {
    const [groups] = useFixtureInput('groups', mockGroups);
    const [open, setOpen] = useFixtureInput('open', false);
    return <ContentArrayButton groups={groups} open={open} setOpen={setOpen} />;
};

export default ContentArrayButtonFixture();
