import {BlockButton} from '../../src/components/block-button';
import type {Block} from '../../src/types.d';
import {mockGroups} from '../mock';

const BlockButtonFixture = (block: Block) => {
    return <BlockButton block={block} onClick={() => {}} />;
};

const block = mockGroups[0].blocks[0];
export default {
    plain: BlockButtonFixture({...block, description: undefined, imageURL: undefined}),
    'with description': BlockButtonFixture({...block, imageURL: undefined}),
    'with image': BlockButtonFixture({...block, description: undefined}),
    'with all': BlockButtonFixture(block),
};
