import {Search} from '../../src/components/search';

const SearchFixture = (value: string, onChange: () => void) => {
    return <Search value={value} onChange={onChange} />;
};

export default {
    empty: SearchFixture('', () => {}),
    filled: SearchFixture('featured', () => {}),
};
