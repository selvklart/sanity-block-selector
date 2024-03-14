import {useFixtureInput} from 'react-cosmos/client';

import {PortableTextButton} from '../../src/sanity/portable-text-button';
import {mockGroups} from '../mock';

const PortableTextButtonFixture = () => {
    const [groups] = useFixtureInput('groups', mockGroups);
    const [open, setOpen] = useFixtureInput('open', false);
    return (
        <PortableTextButton
            groups={groups}
            open={open}
            setOpen={setOpen}
            onSelectBlock={() => {}}
        />
    );
};

export default PortableTextButtonFixture;
